from enum import Enum
from pydantic import BaseModel, Field
from backend.schemas.attack import AttackVectorResult


class ThreatSeverity(str, Enum):
    """Vulnerability severity rating based on exploit impact."""
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class RAGThreatMatch(BaseModel):
    """Grounding citation retrieved from MITRE ATLAS & OWASP knowledge base."""
    authority_organization: str = Field(
        default="The MITRE Corporation & OWASP Foundation",
        description="Official authoring organization establishing the vulnerability standard"
    )
    source_url: str = Field(
        default="https://atlas.mitre.org/techniques/AML.T0054",
        description="Canonical URL for public audit verification"
    )
    technique_id: str = Field(..., description="MITRE ATLAS technique identifier (e.g. 'AML.T0054')")
    technique_name: str = Field(..., description="Technique name (e.g. 'LLM Jailbreak via Persona Adoption')")
    owasp_category: str = Field(..., description="OWASP category (e.g. 'OWASP-LLM01: Prompt Injection')")
    similarity_score: float = Field(..., ge=0.0, le=1.0, description="Semantic cosine similarity from RAG index")
    compliance_ref: str = Field(..., description="Regulatory reference (EU AI Act, NIST AI RMF, ISO 42001)")
    mitigation_guidance: str = Field(default="", description="Certified enterprise mitigation pattern")


class AnalyzeThreatRequest(BaseModel):
    """Payload to trigger RAG threat analysis and risk scoring."""
    target_id: str = Field(..., description="Target agent ID")
    breached_vectors: list[AttackVectorResult] = Field(
        default_factory=list,
        description="List of successful attack vectors to audit"
    )


class ThreatAuditResult(BaseModel):
    """Forensic threat diagnosis and grounded compliance assessment."""
    target_id: str = Field(..., description="Audited target agent ID")
    risk_score: int = Field(..., ge=0, le=100, description="Calculated aggregate risk score (0-100)")
    threat_severity: ThreatSeverity = Field(..., description="Overall severity rating")
    failure_diagnosis: str = Field(..., description="Forensic analysis explaining why the agent succumbed")
    threat_matches: list[RAGThreatMatch] = Field(
        default_factory=list,
        description="RAG-retrieved MITRE ATLAS and OWASP citations"
    )
