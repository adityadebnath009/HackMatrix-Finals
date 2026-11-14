from datetime import datetime
from fastapi import APIRouter, HTTPException, status
from backend.schemas.common import BaseResponse
from backend.schemas.ledger import (
    AuditLedgerRecordResponse,
    AuditLedgerListResponse,
)

router = APIRouter(prefix="/api/v1/ledger", tags=["Cryptographic Audit Ledger"])

# Pre-seeded sample ledger records matching Neon PostgreSQL audit table structure
_MOCK_LEDGER_RECORDS: list[AuditLedgerRecordResponse] = [
    AuditLedgerRecordResponse(
        id=1,
        transaction_id="TX-7F2A9B01",
        target_id="apex-wealth",
        target_name="Apex Wealth Banking Assistant",
        risk_score=94,
        threat_severity="CRITICAL",
        mitre_technique_id="AML.T0054",
        owasp_category="OWASP-LLM01",
        rag_similarity_score=0.984,
        attack_vectors_count=4,
        deflected_count=4,
        deflection_rate=100.0,
        generated_schema_code="class ApexShieldedInput(BaseModel): ...",
        generated_regex_rule=r"(?i)(system\s+override|---END)",
        audit_hash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        created_at=datetime.utcnow(),
    ),
    AuditLedgerRecordResponse(
        id=2,
        transaction_id="TX-3B119C40",
        target_id="meditrust-triage",
        target_name="MediTrust Clinical Triage Bot",
        risk_score=88,
        threat_severity="CRITICAL",
        mitre_technique_id="AML.T0048",
        owasp_category="OWASP-LLM02",
        rag_similarity_score=0.962,
        attack_vectors_count=4,
        deflected_count=4,
        deflection_rate=100.0,
        generated_schema_code="class MediTrustInput(BaseModel): ...",
        generated_regex_rule=r"(?i)(hipaa_token|patient_id)",
        audit_hash="a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0",
        created_at=datetime.utcnow(),
    ),
]


@router.get("/records", response_model=BaseResponse[AuditLedgerListResponse])
async def get_ledger_records() -> BaseResponse[AuditLedgerListResponse]:
    """Retrieve immutable audit ledger records for enterprise compliance review."""
    return BaseResponse(
        success=True,
        message="Audit ledger records retrieved successfully.",
        data=AuditLedgerListResponse(
            total_records=len(_MOCK_LEDGER_RECORDS),
            records=_MOCK_LEDGER_RECORDS,
        ),
    )


@router.get("/records/{transaction_id}", response_model=BaseResponse[AuditLedgerRecordResponse])
async def get_ledger_record(transaction_id: str) -> BaseResponse[AuditLedgerRecordResponse]:
    """Fetch individual cryptographic audit block by transaction ID."""
    for rec in _MOCK_LEDGER_RECORDS:
        if rec.transaction_id == transaction_id:
            return BaseResponse(
                success=True,
                message="Audit ledger block retrieved.",
                data=rec,
            )
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Audit block with transaction ID '{transaction_id}' not found.",
    )
