from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.target_model import TargetAgentModel
from backend.repositories.base_repository import BaseRepository
from backend.exceptions.custom_exceptions import DatabaseOperationException


class TargetRepository(BaseRepository[TargetAgentModel]):
    """Async repository managing target agent profiles in Neon PostgreSQL."""

    def __init__(self, session: AsyncSession):
        super().__init__(TargetAgentModel, session)

    async def get_by_slug(self, slug: str) -> Optional[TargetAgentModel]:
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

    async def list_all_targets(self) -> List[TargetAgentModel]:
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
