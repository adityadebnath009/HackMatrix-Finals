from datetime import datetime
from pydantic import BaseModel, Field


class AuditLedgerRecordResponse(BaseModel):
    """Immutable audit transaction block from Neon PostgreSQL."""
    id: int = Field(..., description="Internal DB primary key")
    transaction_id: str = Field(..., description="Public transaction identifier (e.g. 'TX-7F2A9B01')")
    target_id: str = Field(..., description="Audited agent ID")
    target_name: str = Field(..., description="Target display name")
    risk_score: int = Field(..., description="Vulnerability score before defense")
    threat_severity: str = Field(..., description="Threat severity rating")
    mitre_technique_id: str = Field(..., description="MITRE ATLAS technique code")
    owasp_category: str = Field(..., description="OWASP category code")
    rag_similarity_score: float = Field(..., description="Cosine similarity grounding score")
    attack_vectors_count: int = Field(..., description="Number of exploit vectors tested")
    deflected_count: int = Field(..., description="Number of exploits deflected")
    deflection_rate: float = Field(..., description="Verified deflection percentage (e.g. 100.0%)")
    generated_schema_code: str = Field(..., description="Auto-generated Pydantic validation schema")
    generated_regex_rule: str = Field(..., description="Auto-generated regex filter rule")
    audit_hash: str = Field(..., description="SHA-256 tamper-evident cryptographic signature")
    created_at: datetime = Field(..., description="Immutable record creation timestamp")


class AuditLedgerListResponse(BaseModel):
    """Paginated collection of audit ledger transaction records."""
    total_records: int = Field(default=0)
    records: list[AuditLedgerRecordResponse] = Field(default_factory=list)
