from typing import Optional, List
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from backend.models.audit_ledger import AuditLedger
from backend.repositories.base_repository import BaseRepository
from backend.exceptions.custom_exceptions import DatabaseOperationException


class AuditLedgerRepository(BaseRepository[AuditLedger]):
    """Async repository managing immutable audit ledger records in Neon PostgreSQL."""

    def __init__(self, session: AsyncSession):
        super().__init__(AuditLedger, session)

    async def get_by_transaction_id(self, transaction_id: str) -> Optional[AuditLedger]:
        """Fetch individual cryptographic audit block by its public transaction ID."""
        try:
            stmt = select(AuditLedger).where(AuditLedger.transaction_id == transaction_id)
            result = await self.session.execute(stmt)
            return result.scalar_one_or_none()
        except Exception as e:
            raise DatabaseOperationException(
                "get_by_transaction_id on AuditLedger",
                {"transaction_id": transaction_id, "error": str(e)},
            )

    async def get_recent_audits(self, limit: int = 50) -> List[AuditLedger]:
        """Query recent immutable audit records sorted chronologically descending."""
        try:
            stmt = select(AuditLedger).order_by(AuditLedger.created_at.desc()).limit(limit)
            result = await self.session.execute(stmt)
            return list(result.scalars().all())
        except Exception as e:
            raise DatabaseOperationException(
                "get_recent_audits on AuditLedger",
                {"limit": limit, "error": str(e)},
            )

    async def record_audit(self, **kwargs) -> AuditLedger:
        """Commit an immutable SHA-256 verified audit transaction block."""
        return await self.create(**kwargs)
