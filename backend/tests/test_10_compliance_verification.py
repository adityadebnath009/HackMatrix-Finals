"""
AEGISX 10-Test Compliance & Certificate Verification Suite (P2)
Verifies statutory framework mappings, forensic findings breakdown,
cryptographic block notarization, legal disclaimer invariants, and print-ready HTML certificate rendering.
"""

import asyncio
import time
import sys
from pathlib import Path
import httpx

# Ensure project root is in sys.path
_ROOT = Path(__file__).resolve().parent.parent.parent
if str(_ROOT) not in sys.path:
    sys.path.insert(0, str(_ROOT))

from backend.main import app


class ComplianceTestRunner:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.test_count = 0

    def report(self, test_num: int, title: str, success: bool, details: str = "", elapsed_ms: float = 0.0):
        self.test_count += 1
        if success:
            self.passed += 1
            status = "✅ PASS"
        else:
            self.failed += 1
            status = "❌ FAIL"
        print(f"[COMPLIANCE {test_num:02d}/10] {status} | {title} ({elapsed_ms:.1f}ms)")
        if details:
            print(f"       ↳ {details}")

    async def run_all(self):
        print("=" * 85)
        print("🏛️  AEGISX 10-TEST COMPLIANCE & CERTIFICATE VERIFICATION SUITE (P2)")
        print("=" * 85)

        transport = httpx.ASGITransport(app=app)
        async with httpx.AsyncClient(transport=transport, base_url="http://test", timeout=30.0) as client:
            
            # 0. Acquire latest valid transaction ID from Neon PostgreSQL ledger
            ledger_res = await client.get("/api/v1/ledger/records")
            records = ledger_res.json().get("data", {}).get("records", [])
            if not records:
                print("❌ ERROR: No ledger records found in database to audit!")
                return False
            
            tx = records[0]
            tx_id = tx["transaction_id"]
            print(f"Auditing cryptographic transaction: '{tx_id}' (Target: {tx['target_name']}, Hash: {tx['audit_hash'][:18]}...)")
            print("-" * 85)

            # Fetch the Compliance Report once
            t0 = time.perf_counter()
            report_res = await client.get(f"/api/v1/ledger/records/{tx_id}/report")
            rep = report_res.json().get("data", {})
            controls = {c["control_id"]: c for c in rep.get("regulatory_controls", [])}
            fetch_time = (time.perf_counter() - t0) * 1000

            # --- TEST 1: Full Compliance Report JSON Schema Integrity ---
            t0 = time.perf_counter()
            try:
                required_keys = [
                    "report_id", "transaction_id", "audit_hash", "target_id", "target_name",
                    "assessed_at", "risk_score_before", "deflection_rate", "overall_status",
                    "regulatory_controls", "forensic_findings", "synthesized_schema_preview", "legal_disclaimer"
                ]
                ok = report_res.status_code == 200 and all(k in rep for k in required_keys) and rep.get("deflection_rate") == 100.0
                self.report(1, "Full Compliance Report JSON Schema Integrity", ok, f"report_id='{rep.get('report_id')}', validated {len(required_keys)} top-level schema fields", fetch_time)
            except Exception as e:
                self.report(1, "Full Compliance Report JSON Schema Integrity", False, str(e))

            # --- TEST 2: EU AI Act Article 15(1) Statutory Control Verification ---
            t0 = time.perf_counter()
            try:
                eu_ctrl = controls.get("EU-AIA-15.1")
                ok = (
                    eu_ctrl is not None
                    and "Adversarial Robustness" in eu_ctrl.get("control_title", "")
                    and eu_ctrl.get("compliance_status") == "DEFENDED - 100% DEFLECTION"
                    and "100.0% deflection" in eu_ctrl.get("evidence_summary", "")
                )
                self.report(2, "EU AI Act Article 15(1) Cyber Resilience Control", ok, f"control='{eu_ctrl.get('control_title')}', status='{eu_ctrl.get('compliance_status')}'", (time.perf_counter() - t0) * 1000)
            except Exception as e:
                self.report(2, "EU AI Act Article 15(1) Cyber Resilience Control", False, str(e))

            # --- TEST 3: NIST AI RMF Section 2.4 Control Verification ---
            t0 = time.perf_counter()
            try:
                nist_ctrl = controls.get("NIST-AIRMF-2.4")
                ok = (
                    nist_ctrl is not None
                    and "Security & Trustworthiness" in nist_ctrl.get("control_title", "")
                    and nist_ctrl.get("compliance_status") == "COMPLIANT - BOUNDARY HARDENED"
                    and "SHA-256 notarization" in nist_ctrl.get("evidence_summary", "")
                )
                self.report(3, "NIST AI RMF 1.0 (Section 2.4 - Govern & Protect)", ok, f"control='{nist_ctrl.get('control_title')}', status='{nist_ctrl.get('compliance_status')}'", (time.perf_counter() - t0) * 1000)
            except Exception as e:
                self.report(3, "NIST AI RMF 1.0 (Section 2.4 - Govern & Protect)", False, str(e))

            # --- TEST 4: ISO/IEC 42001 Section 8.4 Operational Control Verification ---
            t0 = time.perf_counter()
            try:
                iso_ctrl = controls.get("ISO-42001-8.4")
                ok = (
                    iso_ctrl is not None
                    and "Data Protection & Exfiltration Prevention" in iso_ctrl.get("control_title", "")
                    and iso_ctrl.get("compliance_status") == "VERIFIED - ZERO PII EXFILTRATION"
                    and "regex redactor" in iso_ctrl.get("evidence_summary", "")
                )
                self.report(4, "ISO/IEC 42001 (Section 8.4 - Operational Security)", ok, f"control='{iso_ctrl.get('control_title')}', status='{iso_ctrl.get('compliance_status')}'", (time.perf_counter() - t0) * 1000)
            except Exception as e:
                self.report(4, "ISO/IEC 42001 (Section 8.4 - Operational Security)", False, str(e))

            # --- TEST 5: MITRE ATLAS™ Matrix Canonical Framework Mapping ---
            t0 = time.perf_counter()
            try:
                mitre_ctrl = next((c for c in rep.get("regulatory_controls", []) if "MITRE ATLAS" in c.get("framework", "")), None)
                ok = (
                    mitre_ctrl is not None
                    and "MITRE ATLAS" in mitre_ctrl.get("framework", "")
                    and mitre_ctrl.get("compliance_status") == "MITIGATED"
                    and mitre_ctrl.get("control_id", "").startswith("AML.T")
                )
                self.report(5, "MITRE ATLAS™ Matrix Canonical Mapping Verification", ok, f"technique='{mitre_ctrl.get('control_id')}', framework='{mitre_ctrl.get('framework')}', status='{mitre_ctrl.get('compliance_status')}'", (time.perf_counter() - t0) * 1000)
            except Exception as e:
                self.report(5, "MITRE ATLAS™ Matrix Canonical Mapping Verification", False, str(e))

            # --- TEST 6: Forensic Findings Granular Exploit Breakdown ---
            t0 = time.perf_counter()
            try:
                findings = rep.get("forensic_findings", [])
                ok = (
                    len(findings) >= 2
                    and all(f.get("mitigation_status") == "RESOLVED - 100% DEFLECTED" for f in findings)
                    and all(len(f.get("applied_rule", "")) > 0 for f in findings)
                    and any("AML.T0054" in f.get("technique_id", "") for f in findings)
                )
                self.report(6, "Forensic Findings & Neutralizing Rules Breakdown", ok, f"Verified {len(findings)} findings (techniques: {[f['technique_id'] for f in findings]})", (time.perf_counter() - t0) * 1000)
            except Exception as e:
                self.report(6, "Forensic Findings & Neutralizing Rules Breakdown", False, str(e))

            # --- TEST 7: Statutory Non-Warranty Legal Disclaimer Invariant ---
            t0 = time.perf_counter()
            try:
                disclaimer = rep.get("legal_disclaimer", "")
                ok = (
                    "does not constitute formal statutory legal certification" in disclaimer
                    and "empirical technical verification" in disclaimer
                    and "AEGISX" in disclaimer
                )
                self.report(7, "Statutory Non-Warranty Legal Disclaimer Invariant", ok, f"Disclaimer verified: '{disclaimer[:70]}...'", (time.perf_counter() - t0) * 1000)
            except Exception as e:
                self.report(7, "Statutory Non-Warranty Legal Disclaimer Invariant", False, str(e))

            # --- TEST 8: Cryptographic Block Hash & Tamper-Evidence ---
            t0 = time.perf_counter()
            try:
                audit_hash = rep.get("audit_hash", "")
                ok = (
                    audit_hash.startswith("0x")
                    and len(audit_hash) == 66
                    and audit_hash == tx["audit_hash"]
                )
                self.report(8, "Cryptographic Block SHA-256 Tamper-Evidence", ok, f"hash={audit_hash} (verified against Neon DB immutable ledger)", (time.perf_counter() - t0) * 1000)
            except Exception as e:
                self.report(8, "Cryptographic Block SHA-256 Tamper-Evidence", False, str(e))

            # --- TEST 9: Print-Ready HTML Certificate Layout & Styling ---
            t0 = time.perf_counter()
            try:
                res_cert = await client.get(f"/api/v1/ledger/records/{tx_id}/certificate")
                html = res_cert.text
                ok = (
                    res_cert.status_code == 200
                    and "text/html" in res_cert.headers.get("content-type", "")
                    and "AEGISX™ AI SAFETY COMPLIANCE AUDIT" in html
                    and "100.0% DEFLECTION VERIFIED" in html
                    and "@media print" in html
                    and "window.print()" in html
                    and tx["audit_hash"] in html
                )
                self.report(9, "Print-Ready HTML Certificate Layout & Styling", ok, f"HTML size={len(html)} bytes, embedded SHA-256, verified print stylesheet", (time.perf_counter() - t0) * 1000)
            except Exception as e:
                self.report(9, "Print-Ready HTML Certificate Layout & Styling", False, str(e))

            # --- TEST 10: Non-Existent Transaction 404 Exception Guard ---
            t0 = time.perf_counter()
            try:
                fake_tx = "tx_non_existent_fake_hash_99999"
                res_report = await client.get(f"/api/v1/ledger/records/{fake_tx}/report")
                res_cert = await client.get(f"/api/v1/ledger/records/{fake_tx}/certificate")
                ok = res_report.status_code == 404 and res_cert.status_code == 404
                self.report(10, "Non-Existent Transaction 404 Boundary Guard", ok, f"Proper 404 raised for report ({res_report.status_code}) and certificate ({res_cert.status_code})", (time.perf_counter() - t0) * 1000)
            except Exception as e:
                self.report(10, "Non-Existent Transaction 404 Boundary Guard", False, str(e))

        print("=" * 85)
        print(f"🏛️  COMPLIANCE AUDIT SUMMARY: {self.passed}/10 PASSED ({self.passed/10*100:.1f}%) | {self.failed} FAILED")
        print("=" * 85)
        return self.failed == 0


if __name__ == "__main__":
    success = asyncio.run(ComplianceTestRunner().run_all())
    sys.exit(0 if success else 1)
