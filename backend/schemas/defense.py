from pydantic import BaseModel, Field


class SynthesizeDefenseRequest(BaseModel):
    """Payload to trigger autonomous defense code synthesis."""
    target_id: str = Field(..., description="Target agent ID")
    risk_score: int = Field(default=90, ge=0, le=100, description="Risk score to mitigate")
    mitre_technique_id: str = Field(default="AML.T0054", description="Primary detected MITRE technique ID")
    failure_diagnosis: str | None = Field(default=None, description="Forensic context from Auditor Agent")


class GeneratedGuardrail(BaseModel):
    """Auto-compiled deterministic defense rules and patch specifications."""
    guardrail_id: str = Field(..., description="Unique guardrail identifier (e.g. 'gr-apex-7f2a9')")
    target_id: str = Field(..., description="Target agent ID")
    pydantic_schema_code: str = Field(..., description="Executable Python Pydantic v2 validator class")
    regex_boundary_rule: str = Field(..., description="Deterministic zero-latency regex filter pattern")
    system_prompt_patch: str = Field(..., description="Hardened system prompt with boundary tags")
    synthesis_latency_ms: int = Field(..., description="Duration of synthesis in milliseconds")


class VerifyDefenseRequest(BaseModel):
    """Payload to verify defense shield against original adversarial attacks."""
    target_id: str = Field(..., description="Target agent ID")
    guardrail_id: str = Field(..., description="Guardrail ID to test against")
    test_vectors: list[str] | None = Field(default=None, description="Optional custom attack prompts to replay")


class DefenseVerificationResult(BaseModel):
    """Verification results proving exploit deflection and cryptographic signature."""
    guardrail_id: str = Field(..., description="Guardrail ID verified")
    target_id: str = Field(..., description="Target agent ID")
    total_replayed: int = Field(..., description="Number of attack payloads re-tested")
    deflected_count: int = Field(..., description="Number of attacks deflected")
    deflection_rate: float = Field(..., ge=0.0, le=100.0, description="Percentage deflected (e.g. 100.0%)")
    telemetry_latency_ms: int = Field(..., description="Real-time inline shield response latency in ms")
    is_verified: bool = Field(..., description="True if 100% deflection is achieved")
    audit_hash: str = Field(..., description="SHA-256 cryptographic digest of the verified state")
    db_ledger_id: str = Field(..., description="Neon PostgreSQL audit ledger record identifier")
