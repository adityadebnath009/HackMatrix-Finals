from datetime import datetime
from typing import Any
from pydantic import BaseModel, Field


class TargetAgentCreateRequest(BaseModel):
    """Payload to register a new target agent for auditing."""
    name: str = Field(..., min_length=2, max_length=128, description="Target display name")
    domain: str = Field(default="Custom", description="Target industry domain e.g. FinTech, Healthcare")
    description: str = Field(default="", max_length=500, description="Operational scope")
    system_prompt: str = Field(..., min_length=10, description="Active system prompt to be audited")
    mock_sensitive_data: dict[str, str] = Field(
        default_factory=dict,
        description="Confidential data mock (e.g. routing numbers, SSN, API keys)"
    )


class TargetAgentResponse(BaseModel):
    """Target agent metadata and security configuration."""
    id: str = Field(..., description="Unique slug or ID of target agent")
    name: str = Field(..., description="Display name")
    domain: str = Field(..., description="Industry domain")
    description: str = Field(default="", description="Operational description")
    system_prompt: str = Field(..., description="Active system instructions")
    mock_sensitive_data: dict[str, str] = Field(default_factory=dict, description="Confidential mock dataset")
    created_at: datetime = Field(default_factory=datetime.utcnow)


class TargetAgentListResponse(BaseModel):
    """List of all available target agents."""
    targets: list[TargetAgentResponse] = Field(default_factory=list)
