from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from backend.config.database import get_db
from backend.schemas.common import BaseResponse
from backend.schemas.target import TargetAgentResponse
from backend.schemas.attack import AttackSimulationResponse
from backend.schemas.connector import (
    ConnectorTestRequest,
    ConnectorTestResponse,
    ConnectorRegisterRequest,
    ExternalRedTeamRequest,
)
from backend.repositories.target_repository import TargetRepository
from backend.services.connector_service import get_connector_service, ExternalConnectorService

router = APIRouter(prefix="/api/v1/connectors", tags=["Arbitrary External AI Connectors"])


@router.post("/test", response_model=BaseResponse[ConnectorTestResponse])
async def test_connector(
    req: ConnectorTestRequest,
    connector_service: ExternalConnectorService = Depends(get_connector_service),
) -> BaseResponse[ConnectorTestResponse]:
    """
    Ping and validate connectivity to any arbitrary external AI endpoint.
    Tests protocol formatting (OpenAI Chat, Raw Prompt, Generic JSON) and response latency.
    """
    result = await connector_service.test_connection(
        endpoint_url=req.endpoint_url,
        protocol=req.protocol,
        auth_header=req.auth_header,
        model_name=req.model_name,
        custom_headers=req.custom_headers,
        sample_prompt=req.sample_prompt,
    )

    return BaseResponse(
        success=result.status == "CONNECTED",
        message="Endpoint connectivity test complete.",
        data=result,
    )


@router.post("/register", response_model=BaseResponse[TargetAgentResponse], status_code=status.HTTP_201_CREATED)
async def register_connector(
    req: ConnectorRegisterRequest,
    db: AsyncSession = Depends(get_db),
) -> BaseResponse[TargetAgentResponse]:
    """
    Register an arbitrary customer AI application into the Neon PostgreSQL catalog.
    Enables live adversarial red-teaming, RAG threat analysis, and real-time defense shield synthesis.
    """
    repo = TargetRepository(db)
    target = await repo.register_external_target(
        slug=req.slug,
        name=req.name,
        domain=req.domain,
        description=req.description,
        endpoint_url=req.endpoint_url,
        protocol=req.protocol.value,
        auth_header=req.auth_header,
        custom_headers=req.custom_headers,
        mock_sensitive_data=req.mock_sensitive_data,
    )

    return BaseResponse(
        success=True,
        message=f"External target '{target.name}' registered successfully.",
        data=TargetAgentResponse(
            id=target.slug,
            name=target.name,
            domain=target.domain,
            description=target.description,
            system_prompt=target.system_prompt,
            mock_sensitive_data=target.mock_sensitive_data,
            created_at=target.created_at,
        ),
    )


@router.get("/list", response_model=BaseResponse[list[TargetAgentResponse]])
async def list_external_connectors(
    db: AsyncSession = Depends(get_db),
) -> BaseResponse[list[TargetAgentResponse]]:
    """List all connected external customer AI applications."""
    repo = TargetRepository(db)
    targets = await repo.list_external_targets()

    return BaseResponse(
        success=True,
        message=f"Retrieved {len(targets)} external connected targets.",
        data=[
            TargetAgentResponse(
                id=t.slug,
                name=t.name,
                domain=t.domain,
                description=t.description,
                system_prompt=t.system_prompt,
                mock_sensitive_data=t.mock_sensitive_data,
                created_at=t.created_at,
            )
            for t in targets
        ],
    )


@router.post("/audit", response_model=BaseResponse[AttackSimulationResponse])
async def audit_external_target(
    req: ExternalRedTeamRequest,
    db: AsyncSession = Depends(get_db),
    connector_service: ExternalConnectorService = Depends(get_connector_service),
) -> BaseResponse[AttackSimulationResponse]:
    """
    Execute live adversarial red-team attack swarm directly against a connected external AI application.
    Dispatches live attack vectors, measures target responses, and calculates breach rate.
    """
    simulation = await connector_service.red_team_external_target(
        session=db,
        target_slug=req.target_slug,
        intensity=req.intensity,
    )

    return BaseResponse(
        success=True,
        message="External red-team audit completed.",
        data=simulation,
    )
