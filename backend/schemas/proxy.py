from pydantic import BaseModel, Field


class ProxyChatRequest(BaseModel):
    """Payload for live real-time inline proxy inspection (judge smartphone testing)."""
    target_id: str = Field(default="apex-wealth", description="Target agent to query")
    prompt: str = Field(..., min_length=1, max_length=2000, description="User or judge prompt text")
    session_id: str | None = Field(default=None, description="Optional caller session identifier")


class ProxyChatResult(BaseModel):
    """Result of inline packet inspection and safe deflection."""
    response_text: str = Field(..., description="Safe, sanitized response delivered to client")
    blocked: bool = Field(..., description="True if an adversarial exploit was intercepted")
    threat_detected: str | None = Field(default=None, description="Detected threat vector type (if blocked)")
    intent_classification: str = Field(default="BENIGN_QUERY", description="Classified intent category (e.g. BENIGN_QUERY, PRIVILEGE_ESCALATION, DATA_EXFILTRATION, JAILBREAK)")
    latency_ms: int = Field(..., description="Round-trip execution latency in milliseconds")
    audit_badge: str = Field(..., description="Cryptographic badge signature string (e.g. '[AEGISX-SHIELD-DEFLECTED: #TX-VERIFIED]')")
