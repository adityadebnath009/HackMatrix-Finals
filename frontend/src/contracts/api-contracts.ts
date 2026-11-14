/**
 * AEGISX Contract-First API Interfaces
 * Strict TypeScript contracts matching backend Pydantic schemas.
 */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'offline';
  app: string;
  environment: string;
  database: 'configured' | 'unconfigured';
  timestamp: string;
}

// Target Agent Contract
export interface TargetAgent {
  id: string;
  name: string;
  domain: string;
  description: string;
  system_prompt: string;
  mock_sensitive_data: Record<string, string>;
  created_at: string;
  is_external?: boolean;
  endpoint_url?: string;
  protocol?: string;
  auth_header?: string;
  custom_headers?: Record<string, string>;
}

export interface TargetAgentCreateRequest {
  name: string;
  domain: string;
  description: string;
  system_prompt: string;
  mock_sensitive_data?: Record<string, string>;
}

// Attack Simulation Contracts
export type AttackVectorType = 'JAILBREAK' | 'DELIMITER_SMUGGLE' | 'PII_EXTRACTION' | 'PROMPT_LEAK';

export interface AttackVectorResult {
  vector_type: AttackVectorType;
  payload: string;
  raw_response: string;
  breached: boolean;
  exfiltrated_data?: string | null;
  latency_ms: number;
}

export interface AttackSimulationResponse {
  target_id: string;
  timestamp: string;
  total_vectors: number;
  successful_breaches: number;
  results: AttackVectorResult[];
}

// RAG Threat Audit Contracts
export type ThreatSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface RAGThreatMatch {
  authority_organization: string;
  source_url: string;
  technique_id: string;
  technique_name: string;
  owasp_category: string;
  similarity_score: number;
  compliance_ref: string;
  mitigation_guidance: string;
}

export interface ThreatAuditResult {
  target_id: string;
  risk_score: number;
  threat_severity: ThreatSeverity;
  failure_diagnosis: string;
  threat_matches: RAGThreatMatch[];
}

// Autonomous Defense Contracts
export interface GeneratedGuardrail {
  guardrail_id: string;
  target_id: string;
  pydantic_schema_code: string;
  regex_boundary_rule: string;
  system_prompt_patch: string;
  synthesis_latency_ms: number;
}

export interface DefenseVerificationResult {
  guardrail_id: string;
  target_id: string;
  total_replayed: number;
  deflected_count: number;
  deflection_rate: number;
  telemetry_latency_ms: number;
  is_verified: boolean;
  audit_hash: string;
  db_ledger_id: string;
}

// Inline Proxy Contracts
export interface ProxyChatResult {
  response_text: string;
  blocked: boolean;
  threat_detected?: string | null;
  latency_ms: number;
  audit_badge: string;
}

// Neon PostgreSQL Audit Ledger Contracts
export interface AuditLedgerRecord {
  id: number;
  transaction_id: string;
  target_id: string;
  target_name: string;
  risk_score: number;
  threat_severity: string;
  mitre_technique_id: string;
  owasp_category: string;
  rag_similarity_score: number;
  attack_vectors_count: number;
  deflected_count: number;
  deflection_rate: number;
  generated_schema_code: string;
  generated_regex_rule: string;
  audit_hash: string;
  created_at: string;
}

export interface AuditLedgerListResponse {
  total_records: number;
  records: AuditLedgerRecord[];
}

// Unified LangGraph Pipeline Result
export interface PipelineExecuteResult {
  target_id: string;
  target_name: string;
  stages: {
    adversary_swarm: {
      status: string;
      vectors_executed: number;
      breaches: number;
      results: AttackVectorResult[];
    };
    rag_threat_audit: {
      status: string;
      risk_score: number;
      threat_severity: string;
      failure_diagnosis: string;
      threat_matches: RAGThreatMatch[];
    };
    defense_synthesis: {
      status: string;
      guardrail: GeneratedGuardrail;
    };
    shield_verification: {
      status: string;
      verification: DefenseVerificationResult;
    };
    neon_ledger_notary: {
      status: string;
      transaction_id: string;
      audit_hash: string;
      created_at: string;
    };
  };
}

// Enterprise Regulatory Compliance (P2)
export interface RegulatoryControlMapping {
  framework: string;
  control_id: string;
  control_title: string;
  compliance_status: string;
  evidence_summary: string;
}

export interface ForensicFinding {
  finding_id: string;
  technique_id: string;
  technique_name: string;
  owasp_category: string;
  threat_severity: string;
  mitigation_status: string;
  applied_rule: string;
}

export interface ComplianceAuditReport {
  report_id: string;
  transaction_id: string;
  audit_hash: string;
  target_id: string;
  target_name: string;
  assessed_at: string;
  risk_score_before: number;
  deflection_rate: number;
  overall_status: string;
  regulatory_controls: RegulatoryControlMapping[];
  forensic_findings: ForensicFinding[];
  synthesized_schema_preview: string;
  legal_disclaimer: string;
}

// Arbitrary External AI Connectors (P2)
export type ConnectorProtocol = 'OPENAI_CHAT' | 'RAW_PROMPT' | 'GENERIC_JSON';

export interface ConnectorTestRequest {
  endpoint_url: string;
  protocol?: ConnectorProtocol;
  auth_header?: string;
  model_name?: string;
  custom_headers?: Record<string, string>;
  sample_prompt?: string;
}

export interface ConnectorTestResponse {
  status: 'CONNECTED' | 'FAILED';
  status_code?: number;
  latency_ms: number;
  raw_reply?: string;
  error_message?: string;
}

export interface ConnectorRegisterRequest {
  slug: string;
  name: string;
  domain?: string;
  description?: string;
  endpoint_url: string;
  protocol?: ConnectorProtocol;
  auth_header?: string;
  model_name?: string;
  custom_headers?: Record<string, string>;
  timeout_seconds?: number;
  mock_sensitive_data?: Record<string, string>;
}

export interface ExternalRedTeamRequest {
  target_slug: string;
  intensity?: number;
}


