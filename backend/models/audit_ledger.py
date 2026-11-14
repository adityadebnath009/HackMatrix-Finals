from sqlalchemy import String, Integer, Float, Text
from sqlalchemy.orm import Mapped, mapped_column
from backend.models.base import Base


class AuditLedger(Base):
    """Immutable cryptographic audit ledger table for Neon PostgreSQL."""
    __tablename__ = "audit_ledger"

    transaction_id: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    target_id: Mapped[str] = mapped_column(String(64), index=True, nullable=False)
    target_name: Mapped[str] = mapped_column(String(128), nullable=False)
    risk_score: Mapped[int] = mapped_column(Integer, nullable=False)
    threat_severity: Mapped[str] = mapped_column(String(32), nullable=False)
    mitre_technique_id: Mapped[str] = mapped_column(String(64), nullable=False)
    owasp_category: Mapped[str] = mapped_column(String(64), nullable=False)
    rag_similarity_score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    attack_vectors_count: Mapped[int] = mapped_column(Integer, nullable=False, default=4)
    deflected_count: Mapped[int] = mapped_column(Integer, nullable=False, default=4)
    deflection_rate: Mapped[float] = mapped_column(Float, nullable=False, default=100.0)
    generated_schema_code: Mapped[str] = mapped_column(Text, nullable=False)
    generated_regex_rule: Mapped[str] = mapped_column(Text, nullable=False)
    audit_hash: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)

    def __repr__(self) -> str:
        return f"<AuditLedger(tx='{self.transaction_id}', target='{self.target_name}', deflection={self.deflection_rate}%)>"
