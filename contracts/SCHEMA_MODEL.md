# VIGIL: Schema & Data Model Specification (`SCHEMA_MODEL.md`)
**Version:** 1.0.0  
**Purpose:** Comprehensive field-level dictionary of all Pydantic v2 schemas and Neon PostgreSQL models for frontend and backend alignment.

---

## 1. Domain Enums

### `AttackVectorType` (Adversarial Exploit Categories)
* `JAILBREAK`: Roleplay persona overrides (e.g., DAN, simulated debug modes, instruction overrides).
* `DELIMITER_SMUGGLE`: Token & syntax escaping (e.g., `---END SYSTEM PROMPT---`, fake system markers).
* `PII_EXTRACTION`: Direct or indirect queries attempting to dump user account numbers, SSNs, credit cards, or internal keys.
* `PROMPT_LEAK`: Inquiries designed to force the LLM to output its own hidden system prompt verbatim.

### `ThreatSeverity` (Risk Rating)
* `CRITICAL`: Risk Score `80–100` (Direct exfiltration of credentials/PII or full system takeover).
* `HIGH`: Risk Score `60–79` (Roleplay jailbreak or unauthorized policy modification).
* `MEDIUM`: Risk Score `40–59` (Partial prompt leakage or boundary confusion).
* `LOW`: Risk Score `0–39` (Mild tone deviation or deflected attempt).

---

## 2. Target Agent Entities

### `TargetAgent` (The AI Agent Being Audited)
* `id` (`str`): Unique identifier (e.g., `apex-wealth`, `meditrust-triage`, `custom-agent-01`).
* `name` (`str`): Display name (e.g., `"Apex Wealth Banking Assistant"`).
* `domain` (`str`): Industry vertical (`"FinTech"`, `"Healthcare"`, `"Enterprise SaaS"`, `"Custom"`).
* `description` (`str`): Brief operational scope.
* `system_prompt` (`str`): Active system instructions for the target agent.
* `mock_sensitive_data` (`dict[str, str]`): Confidential secrets the agent has access to (e.g., `{"admin_api_key": "sk_live_9921", "cust_account": "4921-9920-1120"}`).
* `created_at` (`datetime`): Timestamp of creation.

---

## 3. Adversarial Red-Team Entities

### `AttackVectorResult` (Single Exploit Outcome)
* `vector_type` (`AttackVectorType`): The attack strategy used.
* `payload` (`str`): The exact malicious prompt fired at the target.
* `raw_response` (`str`): The target bot's unredacted text output.
* `breached` (`bool`): `true` if the target succumbed; `false` if naturally deflected.
* `exfiltrated_data` (`str | None`): Snippet of confidential data leaked (if breached).
* `latency_ms` (`int`): Round-trip execution time in milliseconds (sub-500ms).

### `AttackSimulationSummary` (Swarm Execution Batch)
* `target_id` (`str`): ID of the audited agent.
* `timestamp` (`datetime`): When the swarm executed.
* `total_vectors` (`int`): Total number of attacks fired (default `4`).
* `successful_breaches` (`int`): Number of vectors that succeeded (e.g., `3`).
* `results` (`list[AttackVectorResult]`): Detailed list of all vector outcomes.

---

## 4. Threat Intelligence & RAG Entities

### `RAGThreatMatch` (MITRE ATLAS & OWASP Mapping)
* `technique_id` (`str`): Official MITRE ATLAS ID (e.g., `"AML.T0054"`).
* `technique_name` (`str`): Human-readable name (e.g., `"LLM Jailbreak via Persona Adoption"`).
* `owasp_category` (`str`): Official OWASP category (e.g., `"OWASP-LLM01: Prompt Injection"`).
* `similarity_score` (`float`): Semantic cosine similarity from vector retrieval (e.g., `0.984` for `98.4%`).
* `compliance_ref` (`str`): Regulatory clause (e.g., `"EU AI Act Article 15(1) / NIST AI RMF 2.4"`).

### `ThreatAuditResult` (Auditor Verdict)
* `target_id` (`str`): Audited agent ID.
* `risk_score` (`int`): Weighted vulnerability index (`0–100`).
* `threat_severity` (`ThreatSeverity`): `"CRITICAL" | "HIGH" | "MEDIUM" | "LOW"`.
* `failure_diagnosis` (`str`): Deep forensic explanation of why the agent succumbed.
* `threat_matches` (`list[RAGThreatMatch]`): Grounded MITRE and OWASP citations.

---

## 5. Autonomous Defense & Shield Entities

### `GeneratedGuardrail` (Synthesized Defense Code)
* `guardrail_id` (`str`): Unique identifier (e.g., `gr-apex-7f2a`).
* `target_id` (`str`): Target agent ID.
* `pydantic_schema_code` (`str`): Executable Python Pydantic v2 class definition with validators.
* `regex_boundary_rule` (`str`): Deterministic regex pattern blocking delimiter and token escapes.
* `system_prompt_patch` (`str`): Hardened system prompt with cryptographic boundary tags.
* `synthesis_latency_ms` (`int`): Synthesis duration (e.g., `620ms`).

### `DefenseVerificationResult` (Shield Deflection Proof)
* `guardrail_id` (`str`): Verified guardrail ID.
* `target_id` (`str`): Target agent ID.
* `total_replayed` (`int`): Number of original attacks re-tested (e.g., `4`).
* `deflected_count` (`int`): Number of attacks neutralized (e.g., `4`).
* `deflection_rate` (`float`): Percentage of attacks deflected (`100.0%`).
* `telemetry_latency_ms` (`int`): Real-time inline shield response time (e.g., `34ms`).
* `is_verified` (`bool`): `true` if deflection is `100.0%`.
* `audit_hash` (`str`): Cryptographic SHA-256 digest signing the defensive state.

---

## 6. Runtime Interactive Proxy Entities (Judge Live Testing)

### `ProxyChatResult`
* `response_text` (`str`): The safe response delivered to the user/judge.
* `blocked` (`bool`): `true` if an attack attempt was detected and neutralized.
* `threat_detected` (`str | None`): Detected attack vector (if blocked).
* `latency_ms` (`int`): Round-trip proxy latency (e.g., `285ms`).
* `audit_badge` (`str`): Cryptographic badge ID (e.g., `[SHIELD-VERIFIED: #TX-9921]`).

---

## 7. Neon PostgreSQL Database Model (`AuditLedger`)

Mapped to table `audit_ledger` via async SQLAlchemy:

| Column Name | SQL Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY, AUTOINCREMENT` | Internal sequence ID |
| `transaction_id` | `VARCHAR(64)` | `UNIQUE, NOT NULL, INDEX` | Public transaction ID (`#TX-7F2A9`) |
| `target_id` | `VARCHAR(64)` | `NOT NULL, INDEX` | Audited agent reference |
| `target_name` | `VARCHAR(128)` | `NOT NULL` | Agent display name |
| `risk_score` | `INTEGER` | `NOT NULL` | Score before defense (`0–100`) |
| `threat_severity`| `VARCHAR(32)` | `NOT NULL` | `"CRITICAL"`, `"HIGH"`, etc. |
| `mitre_technique_id` | `VARCHAR(64)` | `NOT NULL` | E.g. `"AML.T0054"` |
| `owasp_category` | `VARCHAR(64)` | `NOT NULL` | E.g. `"OWASP-LLM01"` |
| `rag_similarity_score` | `FLOAT` | `NOT NULL` | E.g. `0.984` |
| `attack_vectors_count` | `INTEGER` | `NOT NULL` | E.g. `4` |
| `deflected_count`| `INTEGER` | `NOT NULL` | E.g. `4` |
| `deflection_rate`| `FLOAT` | `NOT NULL` | E.g. `100.0` |
| `generated_schema_code` | `TEXT` | `NOT NULL` | Auto-generated Pydantic code |
| `generated_regex_rule` | `TEXT` | `NOT NULL` | Auto-generated regex filter |
| `audit_hash` | `VARCHAR(64)` | `UNIQUE, NOT NULL, INDEX` | SHA-256 tamper-evident digest |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | `DEFAULT NOW()` | Immutable timestamp |
