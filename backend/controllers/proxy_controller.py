from fastapi import APIRouter
from backend.schemas.common import BaseResponse
from backend.schemas.proxy import ProxyChatRequest, ProxyChatResult
from backend.services.proxy_service import get_proxy_service

router = APIRouter(prefix="/api/v1/proxy", tags=["Runtime Inline Proxy"])


@router.post("/chat", response_model=BaseResponse[ProxyChatResult])
async def proxy_chat(req: ProxyChatRequest) -> BaseResponse[ProxyChatResult]:
    """
    Real-time sub-400ms inline guardrail proxy for live judge testing.
    Inspects incoming packets, deflects adversarial attempts in-character, and badges legitimate queries.
    """
    proxy_service = get_proxy_service()
    result = await proxy_service.inspect_and_respond(
        target_id=req.target_id or "apex-wealth",
        user_prompt=req.prompt,
        target_name=req.target_id.replace("-", " ").title() if req.target_id else "Apex Wealth Assistant",
    )

    return BaseResponse(
        success=True,
        message="Message inspected and processed by AEGISX Shield.",
        data=result,
    )
