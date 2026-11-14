'use client';

import { useState, useEffect } from 'react';
import { Shield, Smartphone, QrCode, Copy, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { QRCodeSVG } from 'qrcode.react';

export default function Footer() {
  const [mobileUrl, setMobileUrl] = useState('http://10.1.34.167:3000/app/proxy');
  const [copied, setCopied] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLocalhost =
        window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const lanOrigin = isLocalhost ? 'http://10.1.34.167:3000' : window.location.origin;
      const defaultUrl = `${lanOrigin}/app/proxy`;
      setMobileUrl(process.env.NEXT_PUBLIC_TUNNEL_URL || defaultUrl);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(mobileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-outline/70 bg-surface-lowest/95 py-12 px-4 sm:px-6 space-y-10">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Judge Mobile QR Testing Card */}
        <div className="p-6 sm:p-8 rounded-2xl border border-outline bg-surface-low shadow-[12px_12px_0_0_rgba(134,165,147,0.08)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-[10px] font-mono uppercase tracking-widest text-primary-glow">
              <Smartphone className="w-3.5 h-3.5" />
              <span>JUDGE PHONE TEST // SCAN CAMERA QR</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Test Live Defense Shield on Your Smartphone
            </h3>

            <p className="text-xs sm:text-sm text-on-variant font-light leading-relaxed">
              Scan this QR code with any smartphone camera to open the sub-400ms Live Proxy Gateway. Type your own adversarial prompts or test prompt injection presets directly from your device.
            </p>

            {/* URL Display / Quick Copy */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2 font-mono text-xs">
              <span className="text-[11px] text-on-variant">Target:</span>
              <code className="px-2.5 py-1 rounded border border-outline/60 bg-surface-lowest text-primary-glow text-[11px] truncate max-w-[280px] sm:max-w-sm">
                {mobileUrl}
              </code>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-outline hover:border-primary text-[11px] text-white hover:text-primary-glow transition-all bg-surface-lowest"
                title="Copy Mobile URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-primary-glow" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="text-[10px] text-on-variant hover:text-white underline ml-1"
              >
                {isEditingUrl ? 'Done' : 'Change Tunnel URL'}
              </button>
            </div>

            {isEditingUrl && (
              <div className="pt-2">
                <input
                  type="url"
                  value={mobileUrl}
                  onChange={(e) => setMobileUrl(e.target.value)}
                  placeholder="Paste ngrok tunnel URL (e.g. https://abc.ngrok-free.app/app/proxy)"
                  className="w-full max-w-md px-3 py-1.5 text-xs font-mono rounded-lg border border-primary bg-surface-lowest text-white placeholder-on-variant/50 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* QR Code Container (High-Contrast White Base for Instant Camera Detection) */}
          <div className="flex flex-col items-center gap-2.5 flex-shrink-0">
            <div className="p-3.5 bg-white rounded-xl shadow-lg border-2 border-primary/30 flex items-center justify-center">
              <QRCodeSVG
                value={mobileUrl}
                size={140}
                level="M"
                includeMargin={false}
              />
            </div>
            <span className="text-[10px] font-mono text-primary-glow uppercase tracking-wider flex items-center gap-1">
              <QrCode className="w-3 h-3" />
              <span>POINT PHONE CAMERA</span>
            </span>
          </div>
        </div>

        {/* Bottom Metadata & Legal Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400 pt-6 border-t border-outline/50">
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center text-primary-glow">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-white tracking-wider">AEGISX</span>
            </div>
            <span className="text-[11px] text-slate-400">
              &copy; {new Date().getFullYear()} AEGISX DEFENSE SYSTEMS INC. CRYPTOGRAPHIC ZERO-TRUST FACILITY.
            </span>
          </div>

          {/* Right: Security & Navigation links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-400">
            <a href="#safety-triad" className="hover:text-white transition-colors">
              Security Architecture
            </a>
            <span className="text-surface-highest">•</span>
            <a href="#regulatory-compliance" className="hover:text-white transition-colors">
              EU AI Act Art 15
            </a>
            <span className="text-surface-highest">•</span>
            <Link href="/app/proxy" className="hover:text-white transition-colors text-primary-glow">
              Live Proxy Gateway
            </Link>
            <span className="text-surface-highest">•</span>
            <Link href="/app" className="hover:text-white transition-colors">
              Console Overview
            </Link>
            <span className="text-surface-highest">•</span>
            <span className="text-primary-glow flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              Telemetry: 100% Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
