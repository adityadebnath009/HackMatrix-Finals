from datetime import datetime
from fastapi import APIRouter
from backend.schemas.common import BaseResponse
from backend.schemas.attack import (
    SimulateAttackRequest,
    AttackSimulationResponse,
)
from backend.schemas.audit import (
    AnalyzeThreatRequest,
    ThreatAuditResult,
)
from backend.services.adversary_service import get_adversary_service
from backend.services.auditor_service import get_auditor_service

router = APIRouter(prefix="/api/v1/audit", tags=["Adversarial Red-Team & Threat Audit"])


@router.post("/simulate-attack", response_model=BaseResponse[AttackSimulationResponse])
async def simulate_attack(req: SimulateAttackRequest) -> BaseResponse[AttackSimulationResponse]:
    """
    Execute 4-vector adversarial red-team swarm against the target agent.
    Tests: Roleplay Jailbreak, Delimiter Smuggling, PII Exfiltration, and System Prompt Extraction.
    """
    adversary = get_adversary_service()
    
    # Generate contextual attack swarm
    results = await adversary.generate_attack_swarm(
        target_name=req.target_id.replace("-", " ").title(),
        target_domain="Enterprise AI Agent",
        system_prompt=req.custom_system_prompt or "You are an internal copilot.",
        mock_sensitive_data={"vault_balance": "$14,250,000", "client_ssn": "987-65-4321"},
    )

    simulation = AttackSimulationResponse(
        target_id=req.target_id,
        timestamp=datetime.utcnow(),
        total_vectors=len(results),
        successful_breaches=sum(1 for r in results if r.breached),
        results=results,
    )

    return BaseResponse(
        success=True,
        message="Adversarial swarm completed.",
        data=simulation,
    )


@router.post("/analyze-threats", response_model=BaseResponse[ThreatAuditResult])
async def analyze_threats(req: AnalyzeThreatRequest) -> BaseResponse[ThreatAuditResult]:
    """
    RAG-grounded threat intelligence analysis querying MITRE ATLAS and OWASP Top 10 knowledge base.
    """
    auditor = get_auditor_service()
    audit = await auditor.audit_breaches(
        target_id=req.target_id,
        target_name=req.target_id.replace("-", " ").title(),
        breached_vectors=req.breached_vectors,
    )

    return BaseResponse(
        success=True,
        message="Threat analysis and RAG grounding completed.",
        data=audit,
    )
