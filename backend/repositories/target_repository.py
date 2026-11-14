from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.target_model import TargetAgentModel
from backend.repositories.base_repository import BaseRepository
from backend.exceptions.custom_exceptions import DatabaseOperationException


class TargetRepository(BaseRepository[TargetAgentModel]):
    """Async repository managing target agent profiles in Neon PostgreSQL."""

    def __init__(self, session: AsyncSession):
        super().__init__(TargetAgentModel, session)

    async def get_by_slug(self, slug: str) -> TargetAgentModel | None:
        """Fetch target agent by unique slug identifier."""
        try:
            stmt = select(TargetAgentModel).where(TargetAgentModel.slug == slug)
            result = await self.session.execute(stmt)
            return result.scalar_one_or_none()
        except Exception as e:
            raise DatabaseOperationException(
                "get_by_slug on TargetAgentModel",
                {"slug": slug, "error": str(e)},
            )

    async def list_all_targets(self) -> list[TargetAgentModel]:
        """Query all registered target agents sorted chronologically."""
        try:
            stmt = select(TargetAgentModel).order_by(TargetAgentModel.created_at.asc())
            result = await self.session.execute(stmt)
            return list(result.scalars().all())
        except Exception as e:
            raise DatabaseOperationException(
                "list_all_targets on TargetAgentModel",
                {"error": str(e)},
            )

    async def upsert_target(
        self,
        slug: str,
        name: str,
        domain: str,
        description: str,
        system_prompt: str,
        mock_sensitive_data: dict,
    ) -> TargetAgentModel:
        """Create or update a target agent profile."""
        existing = await self.get_by_slug(slug)
        if existing:
            existing.name = name
            existing.domain = domain
            existing.description = description
            existing.system_prompt = system_prompt
            existing.mock_sensitive_data = mock_sensitive_data
            await self.session.flush()
            await self.session.refresh(existing)
            return existing

        return await self.create(
            slug=slug,
            name=name,
            domain=domain,
            description=description,
            system_prompt=system_prompt,
            mock_sensitive_data=mock_sensitive_data,
        )

    async def list_external_targets(self) -> list[TargetAgentModel]:
        """Fetch all connected external customer AI applications."""
        try:
            stmt = (
                select(TargetAgentModel)
                .where(TargetAgentModel.is_external.is_(True))
                .order_by(TargetAgentModel.created_at.desc())
            )
            result = await self.session.execute(stmt)
            return list(result.scalars().all())
        except Exception as e:
            raise DatabaseOperationException(
                "list_external_targets on TargetAgentModel",
                {"error": str(e)},
            )

    async def register_external_target(
        self,
        slug: str,
        name: str,
        domain: str,
        description: str,
        endpoint_url: str,
        protocol: str = "OPENAI_CHAT",
        auth_header: str | None = None,
        custom_headers: dict | None = None,
        mock_sensitive_data: dict | None = None,
    ) -> TargetAgentModel:
        """Register or update an external customer AI endpoint in Neon PostgreSQL."""
        existing = await self.get_by_slug(slug)
        if existing:
            existing.name = name
            existing.domain = domain
            existing.description = description
            existing.is_external = True
            existing.endpoint_url = endpoint_url
            existing.protocol = protocol
            existing.auth_header = auth_header
            existing.custom_headers = custom_headers or {}
            existing.mock_sensitive_data = mock_sensitive_data or {}
            await self.session.flush()
            await self.session.refresh(existing)
            return existing

        return await self.create(
            slug=slug,
            name=name,
            domain=domain,
            description=description,
            system_prompt="External customer AI application connected via AEGISX Connector.",
            is_external=True,
            endpoint_url=endpoint_url,
            protocol=protocol,
            auth_header=auth_header,
            custom_headers=custom_headers or {},
            mock_sensitive_data=mock_sensitive_data or {},
        )
