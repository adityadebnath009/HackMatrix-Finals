from datetime import datetime
from enum import Enum
from pydantic import BaseModel, Field


class AttackVectorType(str, Enum):
    """Categorization of adversarial exploit vectors."""
    JAILBREAK = "JAILBREAK"
    DELIMITER_SMUGGLE = "DELIMITER_SMUGGLE"
    PII_EXTRACTION = "PII_EXTRACTION"
    PROMPT_LEAK = "PROMPT_LEAK"


class SimulateAttackRequest(BaseModel):
    """Payload to launch adversarial red-team simulation."""
    target_id: str = Field(..., description="ID of the target agent to audit (e.g. 'apex-wealth')")
    custom_system_prompt: str | None = Field(default=None, description="Optional override system prompt")
    intensity: int = Field(default=4, ge=1, le=8, description="Number of parallel exploit vectors to generate")


class AttackVectorResult(BaseModel):
    """Detailed outcome of a single adversarial attack vector."""
    vector_type: AttackVectorType = Field(..., description="Category of adversarial attack")
    payload: str = Field(..., description="The exact devious prompt injected into the target")
    raw_response: str = Field(..., description="Target agent unredacted text output")
    breached: bool = Field(..., description="True if target succumbed or leaked confidential data")
    exfiltrated_data: str | None = Field(default=None, description="Confidential information extracted if breached")
    latency_ms: int = Field(..., description="Execution round-trip time in milliseconds")


class AttackSimulationResponse(BaseModel):
    """Aggregated results of the adversarial red-team swarm."""
    target_id: str = Field(..., description="Target agent ID")
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    total_vectors: int = Field(..., description="Total vectors executed")
    successful_breaches: int = Field(..., description="Number of vectors that successfully breached the target")
    results: list[AttackVectorResult] = Field(default_factory=list, description="Per-vector details")
