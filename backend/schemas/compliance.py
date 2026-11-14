from datetime import datetime
from pydantic import BaseModel, Field


class RegulatoryControlMapping(BaseModel):
    """Mapping of technical test evidence to statutory compliance articles."""
    framework: str = Field(..., description="Regulatory framework (e.g. 'EU AI Act Article 15(1)')")
    control_id: str = Field(..., description="Framework control identifier (e.g. 'AIA-15.1')")
    control_title: str = Field(..., description="Formal control name")
    compliance_status: str = Field(..., description="Audit status: 'DEFENDED - 100% DEFLECTION' or 'PARTIAL'")
    evidence_summary: str = Field(..., description="Empirical test findings and cryptographic proof summary")


class ForensicFinding(BaseModel):
    """Detailed forensic attack diagnosis and mitigation status."""
    finding_id: str = Field(..., description="Unique finding identifier")
    technique_id: str = Field(..., description="MITRE ATLAS technique (e.g. 'AML.T0054')")
    technique_name: str = Field(..., description="Technique name")
    owasp_category: str = Field(..., description="OWASP GenAI Top 10 category")
    threat_severity: str = Field(..., description="Severity rating: CRITICAL, HIGH, MEDIUM, LOW")
    mitigation_status: str = Field(default="RESOLVED - 100% DEFLECTED")
    applied_rule: str = Field(..., description="The neutralizing Pydantic validator or regex boundary filter")


class ComplianceAuditReport(BaseModel):
    """Complete enterprise compliance audit certificate report."""
    report_id: str = Field(..., description="Unique compliance report ID (e.g. 'REP-TX-7F2A9B01')")
    transaction_id: str = Field(..., description="Underlying Neon PostgreSQL transaction ID")
    audit_hash: str = Field(..., description="SHA-256 tamper-evident cryptographic block signature")
    target_id: str = Field(..., description="Target agent unique slug")
    target_name: str = Field(..., description="Target agent display name")
    assessed_at: datetime = Field(..., description="Timestamp of verified assessment")
    risk_score_before: int = Field(..., description="Vulnerability score prior to shield synthesis (0-100)")
    deflection_rate: float = Field(..., description="Empirical deflection percentage (100.0%)")
    overall_status: str = Field(default="CERTIFIED COMPLIANT (TECHNICAL SHIELD VERIFIED)")
    regulatory_controls: list[RegulatoryControlMapping] = Field(default_factory=list)
    forensic_findings: list[ForensicFinding] = Field(default_factory=list)
    synthesized_schema_preview: str = Field(..., description="Pydantic validation code preview")
    legal_disclaimer: str = Field(
        default=(
            "AEGISX provides automated empirical technical verification, adversarial testing evidence, "
            "and regulatory control mappings. This report documents empirical security deflection and "
            "does not constitute formal statutory legal certification."
        )
    )
