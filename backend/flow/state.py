from typing import TypedDict, Any
from backend.schemas.attack import AttackVectorResult
from backend.schemas.audit import ThreatAuditResult, RAGThreatMatch
from backend.schemas.defense import GeneratedGuardrail, DefenseVerificationResult
from backend.schemas.ledger import AuditLedgerRecordResponse


class AegisWorkflowState(TypedDict, total=False):
    """
    Strongly typed state dictionary passed across LangGraph nodes in the
    Closed-Loop AI Safety Triad (Adversary -> Synthesizer -> Verifier -> Notary).
    """
    target_id: str
    target_name: str
    target_domain: str
    target_system_prompt: str
    mock_sensitive_data: dict[str, Any]

    # Triad Node Outputs
    attack_vectors: list[dict[str, Any]]
    breached_vectors: list[dict[str, Any]]
    audit_result: dict[str, Any] | None
    synthesized_guardrail: dict[str, Any] | None
    verification_result: dict[str, Any] | None
    ledger_record: dict[str, Any] | None

    # Workflow Diagnostics
    current_step: str
    error: str | None
