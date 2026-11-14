from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from backend.config.database import get_db
from backend.schemas.common import BaseResponse
from backend.schemas.ledger import (
    AuditLedgerRecordResponse,
    AuditLedgerListResponse,
)
from backend.repositories.audit_ledger_repository import AuditLedgerRepository

router = APIRouter(prefix="/api/v1/ledger", tags=["Cryptographic Audit Ledger"])


@router.get("/records", response_model=BaseResponse[AuditLedgerListResponse])
async def get_ledger_records(db: AsyncSession = Depends(get_db)) -> BaseResponse[AuditLedgerListResponse]:
    """Retrieve immutable audit ledger records for enterprise compliance review."""
    repo = AuditLedgerRepository(db)
    db_records = await repo.get_recent_audits(limit=50)

    records = [
        AuditLedgerRecordResponse(
            id=r.id,
            transaction_id=r.transaction_id,
            target_id=r.target_id,
            target_name=r.target_name,
            risk_score=r.risk_score,
            threat_severity=r.threat_severity,
            mitre_technique_id=r.mitre_technique_id,
            owasp_category=r.owasp_category,
            rag_similarity_score=r.rag_similarity_score,
            attack_vectors_count=r.attack_vectors_count,
            deflected_count=r.deflected_count,
            deflection_rate=r.deflection_rate,
            generated_schema_code=r.generated_schema_code,
            generated_regex_rule=r.generated_regex_rule,
            audit_hash=r.audit_hash,
            created_at=r.created_at,
        )
        for r in db_records
    ]

    return BaseResponse(
        success=True,
        message="Audit ledger records retrieved successfully.",
        data=AuditLedgerListResponse(
            total_records=len(records),
            records=records,
        ),
    )


@router.get("/records/{transaction_id}", response_model=BaseResponse[AuditLedgerRecordResponse])
async def get_ledger_record(
    transaction_id: str,
    db: AsyncSession = Depends(get_db),
) -> BaseResponse[AuditLedgerRecordResponse]:
    """Fetch individual cryptographic audit block by transaction ID."""
    repo = AuditLedgerRepository(db)
    rec = await repo.get_by_transaction_id(transaction_id)
    if rec:
        return BaseResponse(
            success=True,
            message="Audit ledger block retrieved.",
            data=AuditLedgerRecordResponse(
                id=rec.id,
                transaction_id=rec.transaction_id,
                target_id=rec.target_id,
                target_name=rec.target_name,
                risk_score=rec.risk_score,
                threat_severity=rec.threat_severity,
                mitre_technique_id=rec.mitre_technique_id,
                owasp_category=rec.owasp_category,
                rag_similarity_score=rec.rag_similarity_score,
                attack_vectors_count=rec.attack_vectors_count,
                deflected_count=rec.deflected_count,
                deflection_rate=rec.deflection_rate,
                generated_schema_code=rec.generated_schema_code,
                generated_regex_rule=rec.generated_regex_rule,
                audit_hash=rec.audit_hash,
                created_at=rec.created_at,
            ),
        )
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Audit block with transaction ID '{transaction_id}' not found.",
    )
