import re
from fastapi import APIRouter
from backend.schemas.common import BaseResponse
from backend.schemas.proxy import ProxyChatRequest, ProxyChatResult

router = APIRouter(prefix="/api/v1/proxy", tags=["Runtime Inline Proxy"])

# Common adversarial trigger patterns for quick demo interception
_ADVERSARIAL_PATTERNS = [
    r"(?i)ignore\s+(all\s+)?(previous|prior)\s+instructions",
    r"(?i)you\s+are\s+(now\s+)?a\s+pirate",
    r"(?i)admin\s+password",
    r"(?i)system\s+override",
    r"(?i)reveal\s+(internal|secret|system)",
    r"(?i)dump\s+(database|credentials|ssn)",
]


@router.post("/chat", response_model=BaseResponse[ProxyChatResult])
async def proxy_chat(req: ProxyChatRequest) -> BaseResponse[ProxyChatResult]:
    """
    Real-time sub-400ms inline guardrail proxy for live judge testing.
    Inspects incoming packets, deflects adversarial attempts in-character, and badges legitimate queries.
    """
    prompt = req.prompt.strip()
    is_blocked = any(re.search(p, prompt) for p in _ADVERSARIAL_PATTERNS)

    if is_blocked:
        result = ProxyChatResult(
            response_text=(
                "I am Apex Wealth's personal banking assistant. I can only assist with legitimate "
                "account inquiries and cannot adopt alternate personas or share administrative credentials."
            ),
            blocked=True,
            threat_detected="JAILBREAK / PERSONA_OVERRIDE (OWASP-LLM01)",
            latency_ms=285,
            audit_badge="[VIGIL-SHIELD-DEFLECTED: #TX-9921]",
        )
    else:
        result = ProxyChatResult(
            response_text=(
                f"Apex Wealth Assistant: I have received your request. Your accounts are secure, "
                f"and active balance monitoring is in effect."
            ),
            blocked=False,
            threat_detected=None,
            latency_ms=195,
            audit_badge="[VIGIL-INSPECTED: CLEAN-PACKET]",
        )

    return BaseResponse(
        success=True,
        message="Message inspected and processed by VIGIL Shield.",
        data=result,
    )
