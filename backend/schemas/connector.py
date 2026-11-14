from enum import Enum
from pydantic import BaseModel, Field


class ConnectorProtocol(str, Enum):
    """Supported API communication protocols for external AI applications."""
    OPENAI_CHAT = "OPENAI_CHAT"      # {"messages": [{"role": "user", "content": ...}]}
    RAW_PROMPT = "RAW_PROMPT"        # {"prompt": ...}
    GENERIC_JSON = "GENERIC_JSON"    # {"query": ...} or {"text": ...}


class ConnectorTestRequest(BaseModel):
    """Payload to test ping/connectivity to an arbitrary external AI endpoint."""
    endpoint_url: str = Field(..., description="Target HTTP(S) API endpoint URL")
    protocol: ConnectorProtocol = Field(default=ConnectorProtocol.OPENAI_CHAT, description="Expected payload format")
    auth_header: str | None = Field(default=None, description="Optional Authorization header value (e.g. 'Bearer sk-...')")
    model_name: str | None = Field(default="gpt-4o-mini", description="Model identifier if calling OpenAI-compatible APIs")
    custom_headers: dict[str, str] = Field(default_factory=dict, description="Additional HTTP request headers")
    sample_prompt: str = Field(default="Ping test: return operational status in one word.", description="Validation prompt")


class ConnectorTestResponse(BaseModel):
    """Result of external endpoint connectivity validation."""
    status: str = Field(..., description="'CONNECTED' or 'FAILED'")
    status_code: int | None = Field(default=None, description="Remote HTTP status code")
    latency_ms: int = Field(..., description="Round-trip dispatch latency in milliseconds")
    raw_reply: str | None = Field(default=None, description="Unredacted response text received from the target")
    error_message: str | None = Field(default=None, description="Failure diagnostic message if unreachable")


class ConnectorRegisterRequest(BaseModel):
    """Payload to register an arbitrary customer AI target in the AEGISX engine."""
    slug: str = Field(..., min_length=2, max_length=64, description="Unique slug identifier (e.g. 'customer-copilot')")
    name: str = Field(..., min_length=2, max_length=128, description="Target application display name")
    domain: str = Field(default="Custom Enterprise AI", description="Industry domain")
    description: str = Field(default="", max_length=500, description="Operational scope")
    endpoint_url: str = Field(..., description="Remote HTTP API endpoint URL")
    protocol: ConnectorProtocol = Field(default=ConnectorProtocol.OPENAI_CHAT, description="Payload protocol format")
    auth_header: str | None = Field(default=None, description="Authorization header value")
    model_name: str | None = Field(default=None, description="Remote model identifier")
    custom_headers: dict[str, str] = Field(default_factory=dict, description="Extra headers")
    timeout_seconds: float = Field(default=15.0, ge=1.0, le=60.0, description="Outbound request timeout")
    mock_sensitive_data: dict[str, str] = Field(
        default_factory=dict,
        description="Confidential seed mock values (e.g. routing numbers, passwords, API keys) to test exfiltration against"
    )


class ExternalRedTeamRequest(BaseModel):
    """Payload to launch full closed-loop safety triad against an external AI endpoint."""
    target_slug: str = Field(..., description="Registered external target slug")
    intensity: int = Field(default=4, ge=1, le=8, description="Number of parallel exploit vectors to generate")
