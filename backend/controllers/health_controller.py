from fastapi import APIRouter
from backend.schemas.common import BaseResponse, HealthData
from backend.config.settings import get_settings
from backend.config.database import engine

router = APIRouter(prefix="/health", tags=["Health"])
settings = get_settings()


@router.api_route("", methods=["GET", "HEAD", "OPTIONS"], response_model=BaseResponse[HealthData])
async def health_check():
    """Health check endpoint confirming API status, runtime, and DB config."""
    db_status = "configured" if engine is not None else "unconfigured"
    
    return BaseResponse(
        success=True,
        message="Backend service is operational.",
        data=HealthData(
            status="healthy",
            app=settings.APP_NAME,
            environment=settings.ENVIRONMENT,
            database=db_status
        )
    )
