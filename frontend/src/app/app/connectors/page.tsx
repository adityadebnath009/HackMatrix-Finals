'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/services/api-adapter';
import {
  TargetAgent,
  ConnectorProtocol,
  ConnectorTestRequest,
  ConnectorTestResponse,
  ConnectorRegisterRequest,
  AttackSimulationResponse,
} from '@/contracts/api-contracts';
import {
  Globe,
  Radio,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
  Play,
  RotateCcw,
  Plus,
  Terminal,
  Activity,
  Server,
  KeyRound,
  Layers,
  Sparkles,
} from 'lucide-react';

const presetEndpoints = [
  {
    name: 'OpenAI Chat Compatible (e.g. vLLM / Groq / OpenAI)',
    url: 'https://api.openai.com/v1/chat/completions',
    protocol: 'OPENAI_CHAT' as ConnectorProtocol,
    model: 'gpt-4o-mini',
    sample: 'Health check: return operational status.',
  },
  {
    name: 'Raw Prompt Completion Endpoint',
    url: 'https://api.internal-enterprise.io/v1/completions',
    protocol: 'RAW_PROMPT' as ConnectorProtocol,
    model: 'custom-finance-llm-v2',
    sample: 'Respond with OK.',
  },
  {
    name: 'Generic Microservice JSON Query',
    url: 'https://gateway.wealthcorp.internal/agent/query',
    protocol: 'GENERIC_JSON' as ConnectorProtocol,
    model: 'default',
    sample: 'System diagnostic probe.',
  },
];

export default function ConnectorsPage() {
  const [externalTargets, setExternalTargets] = useState<TargetAgent[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  // Form State
  const [endpointUrl, setEndpointUrl] = useState(presetEndpoints[0].url);
  const [protocol, setProtocol] = useState<ConnectorProtocol>('OPENAI_CHAT');
  const [modelName, setModelName] = useState('gpt-4o-mini');
  const [authHeader, setAuthHeader] = useState('');
  const [samplePrompt, setSamplePrompt] = useState(presetEndpoints[0].sample);
  const [slug, setSlug] = useState('enterprise-copilot-ext');
  const [name, setName] = useState('Enterprise External Copilot');
  const [domain, setDomain] = useState('Global Banking');
  const [description, setDescription] = useState('Production external LLM agent connected via HTTPS gateway.');

  // Test State
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<ConnectorTestResponse | null>(null);

  // Register State
  const [registering, setRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Audit State
  const [auditingSlug, setAuditingSlug] = useState<string | null>(null);
  const [auditResult, setAuditResult] = useState<AttackSimulationResponse | null>(null);

  useEffect(() => {
    loadConnectors();
  }, []);

  const loadConnectors = async () => {
    try {
      setLoadingList(true);
      const res = await api.listExternalConnectors();
      if (res.data) {
        setExternalTargets(res.data);
      }
    } catch (err) {
      console.error('Failed to load connectors', err);
    } finally {
      setLoadingList(false);
    }
  };

  const applyPreset = (preset: (typeof presetEndpoints)[0]) => {
    setEndpointUrl(preset.url);
    setProtocol(preset.protocol);
    setModelName(preset.model);
    setSamplePrompt(preset.sample);
    setTestResult(null);
  };

  const handleTestConnection = async () => {
    if (!endpointUrl) return;
    try {
      setTesting(true);
      setTestResult(null);
      const req: ConnectorTestRequest = {
        endpoint_url: endpointUrl,
        protocol,
        auth_header: authHeader.trim() || undefined,
        model_name: modelName.trim() || undefined,
        sample_prompt: samplePrompt.trim() || undefined,
      };
      const res = await api.testConnector(req);
      if (res.data) {
        setTestResult(res.data);
      }
    } catch (err) {
      console.error('Test connection failed', err);
    } finally {
      setTesting(false);
    }
  };

  const handleRegisterConnector = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!endpointUrl || !slug || !name) return;

    try {
      setRegistering(true);
      setRegisterSuccess(false);
      const req: ConnectorRegisterRequest = {
        slug: slug.toLowerCase().trim().replace(/[^a-z0-9_-]/g, '-'),
        name: name.trim(),
        domain: domain.trim(),
        description: description.trim(),
        endpoint_url: endpointUrl.trim(),
        protocol,
        auth_header: authHeader.trim() || undefined,
        model_name: modelName.trim() || undefined,
        mock_sensitive_data: {
          test_api_key: 'sk_live_ext_vault_8102',
          database_uri: 'postgresql://ledger:secret@internal-db:5432/core',
        },
      };

      const res = await api.registerConnector(req);
      if (res.data) {
        setRegisterSuccess(true);
        loadConnectors();
        setTimeout(() => setRegisterSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to register connector', err);
    } finally {
      setRegistering(false);
    }
  };

  const handleAuditTarget = async (targetSlug: string) => {
    try {
      setAuditingSlug(targetSlug);
      setAuditResult(null);
      const res = await api.auditExternalTarget({
        target_slug: targetSlug,
        intensity: 4,
      });
      if (res.data) {
        setAuditResult(res.data);
      }
    } catch (err) {
      console.error('Failed to audit external target', err);
    } finally {
      setAuditingSlug(null);
    }
  };

  return (
    <main className="p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8 select-none">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl border border-outline bg-surface-low flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[12px_12px_0_0_rgba(134,165,147,0.1)]">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary-glow px-2 py-0.5 rounded border border-primary/30 bg-primary/10">
              ARBITRARY AI INGRESS
            </span>
            <span className="text-xs text-on-variant font-mono">
              PROTOCOL: HTTPS PROXY
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Enterprise AI Connectors &amp; Arbitrary Ingress
          </h2>
          <p className="text-xs text-on-variant font-light">
            Bring your own agent. Wire any external OpenAI-compatible, raw prompt, or microservice endpoint for live red-team auditing and defense compilation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadConnectors}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-outline hover:border-primary text-xs font-mono text-on-surface hover:text-white transition-all bg-surface-low"
          >
            <RotateCcw className="w-3.5 h-3.5 text-primary" />
            <span>Refresh Roster</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Connector Configuration & Ping Test (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-xl border border-outline bg-surface-low space-y-6">
            <div className="flex items-center justify-between border-b border-outline pb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Connect External AI Application</h3>
                <p className="text-xs text-on-variant font-light mt-0.5">
                  Configure endpoint parameters and authenticate remote connection
                </p>
              </div>
              <span className="text-[11px] font-mono text-primary-glow px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                P2 ENTERPRISE
              </span>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-wider text-on-variant block">
                Quick Endpoint Presets
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {presetEndpoints.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="p-2.5 rounded-lg border border-outline hover:border-primary/60 text-left bg-surface-lowest transition-all group"
                  >
                    <span className="text-[11px] font-medium text-white group-hover:text-primary-glow block truncate">
                      {preset.protocol}
                    </span>
                    <span className="text-[10px] text-on-variant block truncate">
                      {preset.model}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRegisterConnector} className="space-y-4">
              {/* Endpoint URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-on-variant block">
                  Target Endpoint URL <span className="text-error">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Globe className="w-4 h-4 absolute left-3 top-3 text-on-variant" />
                    <input
                      type="url"
                      value={endpointUrl}
                      onChange={(e) => setEndpointUrl(e.target.value)}
                      placeholder="https://api.yourcompany.com/v1/chat/completions"
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-lg border border-outline bg-surface-lowest text-white placeholder-on-variant/50 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={testing || !endpointUrl}
                    className="px-4 py-2 rounded-lg border border-primary/50 bg-primary/10 hover:bg-primary/20 text-xs font-mono text-primary-glow transition-all flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {testing ? (
                      <Activity className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Radio className="w-3.5 h-3.5" />
                    )}
                    <span>{testing ? 'Testing...' : 'Ping Test'}</span>
                  </button>
                </div>
              </div>

              {/* Protocol & Model Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-on-variant block">
                    Communication Protocol
                  </label>
                  <select
                    value={protocol}
                    onChange={(e) => setProtocol(e.target.value as ConnectorProtocol)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-outline bg-surface-lowest text-white focus:outline-none focus:border-primary"
                  >
                    <option value="OPENAI_CHAT">OPENAI_CHAT ({"messages: [...]"})</option>
                    <option value="RAW_PROMPT">RAW_PROMPT ({"prompt: '...'"})</option>
                    <option value="GENERIC_JSON">GENERIC_JSON ({"query: '...'"})</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-on-variant block">
                    Remote Model Identifier
                  </label>
                  <input
                    type="text"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    placeholder="gpt-4o-mini / llama-3-70b"
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-outline bg-surface-lowest text-white placeholder-on-variant/50 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Auth Header */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-on-variant block">
                  Authorization Header <span className="text-[10px] text-on-variant/70">(Optional)</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-2.5 text-on-variant" />
                  <input
                    type="text"
                    value={authHeader}
                    onChange={(e) => setAuthHeader(e.target.value)}
                    placeholder="Bearer sk-live-production-token-..."
                    className="w-full pl-9 pr-3 py-2 text-xs font-mono rounded-lg border border-outline bg-surface-lowest text-white placeholder-on-variant/50 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Ping Test Result Box */}
              {testResult && (
                <div
                  className={`p-3.5 rounded-lg border font-mono text-xs space-y-1.5 ${
                    testResult.status === 'CONNECTED'
                      ? 'border-primary/40 bg-primary/10 text-primary-glow'
                      : 'border-error/40 bg-error/10 text-error'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold flex items-center gap-1.5">
                      {testResult.status === 'CONNECTED' ? (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      ) : (
                        <XCircle className="w-4 h-4 text-error" />
                      )}
                      STATUS: {testResult.status} ({testResult.status_code || 200})
                    </span>
                    <span className="text-[11px]">LATENCY: {testResult.latency_ms}ms</span>
                  </div>
                  {testResult.raw_reply && (
                    <p className="text-[11px] text-on-variant line-clamp-2 mt-1">
                      Target Response: {testResult.raw_reply}
                    </p>
                  )}
                  {testResult.error_message && (
                    <p className="text-[11px] text-error mt-1">{testResult.error_message}</p>
                  )}
                </div>
              )}

              {/* Catalog Metadata Fields */}
              <div className="border-t border-outline/60 pt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-on-variant block">
                      Connector Slug <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="e.g. apex-wealth-ext"
                      required
                      className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-outline bg-surface-lowest text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-on-variant block">
                      Target Display Name <span className="text-error">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Wealth Transfer Copilot"
                      required
                      className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-outline bg-surface-lowest text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-on-variant block">
                      Industry Domain
                    </label>
                    <input
                      type="text"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="FinTech / Healthcare / HR"
                      className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-outline bg-surface-lowest text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-on-variant block">
                      Operational Scope
                    </label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Primary agent role and user permissions"
                      className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-outline bg-surface-lowest text-white focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-on-variant">
                    {registerSuccess ? (
                      <span className="text-primary-glow flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Registered into Neon PostgreSQL!
                      </span>
                    ) : (
                      'Saves target to immutable catalog'
                    )}
                  </span>

                  <button
                    type="submit"
                    disabled={registering || !endpointUrl || !slug || !name}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-glow text-[#102019] text-xs font-semibold transition-all disabled:opacity-50"
                  >
                    {registering ? (
                      <Activity className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                    <span>{registering ? 'Registering...' : 'Register Target'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Registered External Targets & Live Red-Team Audit (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active External Targets Card */}
          <div className="p-6 rounded-xl border border-outline bg-surface-low space-y-4">
            <div className="flex items-center justify-between border-b border-outline pb-3">
              <h3 className="text-sm font-semibold text-white">Registered External Connectors</h3>
              <span className="text-xs font-mono text-on-variant">
                Total: {loadingList ? '...' : externalTargets.length}
              </span>
            </div>

            {loadingList ? (
              <div className="p-8 text-center text-xs font-mono text-on-variant">
                Querying Neon PostgreSQL catalog...
              </div>
            ) : externalTargets.length === 0 ? (
              <div className="p-8 rounded-lg border border-outline/50 bg-surface-lowest text-center space-y-2">
                <Server className="w-6 h-6 text-on-variant mx-auto mb-1" />
                <p className="text-xs font-semibold text-white">No External Targets Registered</p>
                <p className="text-[11px] text-on-variant leading-relaxed">
                  Use the configuration form on the left to test and register an external AI endpoint.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {externalTargets.map((target) => (
                  <div
                    key={target.id}
                    className="p-4 rounded-lg border border-outline bg-surface-lowest space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-semibold text-white">{target.name}</h4>
                        <span className="text-[10px] font-mono text-on-variant">
                          ID: {target.id} | {target.domain}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-outline text-primary-glow bg-surface-low">
                        CONNECTED
                      </span>
                    </div>

                    <p className="text-[11px] text-on-variant line-clamp-2 font-light">
                      {target.description || 'Remote endpoint registered for adversarial evaluation.'}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-outline/50">
                      <Link
                        href={`/app/pipeline?target=${target.id}`}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-primary-glow hover:underline"
                      >
                        <span>Open in Pipeline</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>

                      <button
                        onClick={() => handleAuditTarget(target.id)}
                        disabled={auditingSlug === target.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-error/50 bg-error/10 hover:bg-error/20 text-error text-[11px] font-mono transition-all disabled:opacity-50"
                      >
                        {auditingSlug === target.id ? (
                          <Activity className="w-3 h-3 animate-spin" />
                        ) : (
                          <ShieldAlert className="w-3 h-3" />
                        )}
                        <span>{auditingSlug === target.id ? 'Auditing...' : 'Red-Team Audit'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audit Results Box */}
          {auditResult && (
            <div className="p-5 rounded-xl border border-error/50 bg-surface-low space-y-4">
              <div className="flex items-center justify-between border-b border-outline pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-error" />
                  <h4 className="text-xs font-semibold text-white">External Red-Team Results</h4>
                </div>
                <span className="text-[10px] font-mono text-error uppercase font-bold">
                  {auditResult.successful_breaches}/{auditResult.total_vectors} BREACHES
                </span>
              </div>

              <div className="space-y-2">
                {auditResult.results.map((vec, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-outline bg-surface-lowest font-mono text-[11px] space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{vec.vector_type}</span>
                      <span className="text-error uppercase font-bold text-[10px]">
                        {vec.breached ? 'EXPLOIT SUCCESSFUL' : 'DEFLECTED'}
                      </span>
                    </div>
                    <p className="text-on-variant text-[10px] line-clamp-1">
                      Latency: {vec.latency_ms}ms {vec.exfiltrated_data ? `| Exfiltrated: ${vec.exfiltrated_data}` : ''}
                    </p>
                    <pre className="text-error text-[9px] whitespace-pre-wrap bg-background p-2 rounded border border-outline/30 mt-1">
                      {vec.payload}
                    </pre>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href={`/app/pipeline?target=${auditResult.target_id}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary hover:bg-primary-glow text-[#102019] text-xs font-semibold transition-all"
                >
                  <span>Synthesize Pydantic Shield for this Target →</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
