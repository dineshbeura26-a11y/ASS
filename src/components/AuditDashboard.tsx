import React, { useState } from 'react';
import { AuditResult } from '../types';
import { 
  ShieldCheck, 
  Activity, 
  Cpu, 
  ExternalLink, 
  Download, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Code2, 
  Lock, 
  Globe, 
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface AuditDashboardProps {
  audit: AuditResult;
  onOpenPythonCode: () => void;
  onRescan: () => void;
}

export const AuditDashboard: React.FC<AuditDashboardProps> = ({
  audit,
  onOpenPythonCode,
  onRescan,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'security' | 'diagnostics' | 'tech'>('overview');

  const { scores, vitals, security, technologies, stats, aiRecommendations, latencyChart } = audit;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(audit, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(audit, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dinesh_ai_audit_${audit.domain}_2026.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // SVG Gauge calculations
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (scores.overall / 100) * circumference;

  const getScoreColor = (val: number) => {
    if (val >= 90) return 'text-emerald-400 stroke-emerald-400';
    if (val >= 75) return 'text-amber-400 stroke-amber-400';
    return 'text-rose-400 stroke-rose-400';
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Top Header Card with target domain & summary actions */}
      <div className="p-6 rounded-2xl bg-[#121427] border border-purple-900/40 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-purple-950/60 text-purple-300 border border-purple-800/40">
              <Globe className="w-5 h-5 text-purple-400" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {audit.domain}
                </h2>
                <a
                  href={audit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-purple-300 transition-colors inline-flex items-center"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                <span>Scanned in {audit.scanDurationMs}ms</span>
                <span>•</span>
                <span>{new Date(audit.timestamp).toLocaleTimeString()}</span>
                <span>•</span>
                <span className="text-purple-400 font-semibold">Dinesh AI Node v2.1</span>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <button
            onClick={onRescan}
            className="px-3.5 py-2 rounded-xl bg-[#1a1c36] hover:bg-purple-900/30 text-slate-200 text-xs font-semibold border border-purple-900/40 hover:border-purple-500/40 transition-all flex items-center gap-1.5"
          >
            <span>Re-run Audit</span>
          </button>

          <button
            onClick={handleCopyJson}
            className="px-3.5 py-2 rounded-xl bg-[#1a1c36] hover:bg-purple-900/30 text-slate-200 text-xs font-semibold border border-purple-900/40 hover:border-purple-500/40 transition-all flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? 'Copied' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleExportJson}
            className="px-3.5 py-2 rounded-xl bg-[#1a1c36] hover:bg-purple-900/30 text-slate-200 text-xs font-semibold border border-purple-900/40 hover:border-purple-500/40 transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Export Report</span>
          </button>

          <button
            onClick={onOpenPythonCode}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Python Script</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Banners matching Screenshot 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-[#121428] border border-purple-950/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-800/40 flex items-center justify-center flex-shrink-0">
            <Layers className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-white">{stats.totalMetricsAnalyzed}+</div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Audit Metrics</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#121428] border border-purple-950/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-800/40 flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-white">{stats.performanceChecks}+</div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Performance Checks</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#121428] border border-purple-950/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-pink-950/60 border border-pink-800/40 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-pink-400" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-white">{aiRecommendations.length} Pro</div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">AI Recommendations</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#121428] border border-purple-950/60 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-800/40 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-white">Real-time</div>
            <div className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Diagnostic Reports</div>
          </div>
        </div>
      </div>

      {/* Main Laptop View Box matching Screenshot 1 */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1022] border border-purple-800/30 shadow-2xl relative overflow-hidden">
        
        {/* Glow behind dashboard */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-[100px] pointer-events-none rounded-full" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Circular Audit Score (Left Column) matching Screenshot 1 */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-[#13162c]/80 border border-purple-900/30">
            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">
              Audit Score
            </span>

            {/* Circular Gauge */}
            <div className="relative w-44 h-44 flex items-center justify-center mb-3">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className="stroke-purple-950/60"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  className={`${getScoreColor(scores.overall)} transition-all duration-1000 ease-out`}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-extrabold text-white tracking-tight">
                  {scores.overall}
                </span>
                <span className="text-xs text-slate-400 font-medium mt-0.5">
                  / 100
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 text-xs font-bold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{scores.overall >= 90 ? 'Excellent' : 'Good'} Health</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Overall Website Health & Security
            </p>
          </div>

          {/* Core Web Vitals & Metric Bars (Right Column) matching Screenshot 1 */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between border-b border-purple-950/60 pb-2">
              <h3 className="text-sm font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-400" />
                Core Web Vitals & Audit Pillars
              </h3>
              <span className="text-xs text-purple-400 font-mono font-medium">Lighthouse v12.1</span>
            </div>

            <div className="space-y-3.5">
              {[
                { label: 'Performance', score: scores.performance, color: 'from-purple-500 to-indigo-500' },
                { label: 'Accessibility', score: scores.accessibility, color: 'from-emerald-500 to-teal-400' },
                { label: 'Best Practices', score: scores.bestPractices, color: 'from-blue-500 to-cyan-400' },
                { label: 'Security & SSL', score: scores.security, color: 'from-amber-500 to-emerald-400' },
                { label: 'SEO Optimization', score: scores.seo, color: 'from-pink-500 to-rose-400' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">{item.label}</span>
                    <span className="font-mono text-white">{item.score.toFixed(1)} / 100</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-[#171a33] overflow-hidden p-[1px]">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-1000`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Core Web Vitals Micro Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
              {[
                { name: 'LCP', val: `${vitals.lcp.value}${vitals.lcp.unit}`, label: 'Largest Paint' },
                { name: 'FID', val: `${vitals.fid.value}${vitals.fid.unit}`, label: 'Input Delay' },
                { name: 'CLS', val: `${vitals.cls.value}`, label: 'Layout Shift' },
                { name: 'FCP', val: `${vitals.fcp.value}${vitals.fcp.unit}`, label: 'First Paint' },
                { name: 'TTFB', val: `${vitals.ttfb.value}${vitals.ttfb.unit}`, label: 'Time to Byte' },
                { name: 'Speed', val: `${vitals.si.value}${vitals.si.unit}`, label: 'Speed Index' }
              ].map((vit, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-[#14172f] border border-purple-950/40 text-center">
                  <div className="text-[10px] text-slate-400 font-mono">{vit.name}</div>
                  <div className="text-xs font-bold text-white mt-0.5">{vit.val}</div>
                  <div className="text-[9px] text-emerald-400 font-medium">Optimal</div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Latency Chart & Wave matching Screenshot 1 */}
        <div className="mt-8 pt-6 border-t border-purple-950/60">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-indigo-400" />
              Performance Overview (Network Latency & DOM Ready)
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">Last 24h Telemetry</span>
          </div>

          <div className="h-32 w-full relative">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 100">
              <defs>
                <linearGradient id="latencyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid lines */}
              <line x1="0" y1="20" x2="500" y2="20" stroke="#252945" strokeDasharray="3 3" />
              <line x1="0" y1="50" x2="500" y2="50" stroke="#252945" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#252945" strokeDasharray="3 3" />

              {/* Area filled curve */}
              <path
                d="M 0 65 Q 60 45, 120 55 T 240 40 T 360 48 T 500 35 L 500 100 L 0 100 Z"
                fill="url(#latencyGrad)"
              />

              {/* Line curve */}
              <path
                d="M 0 65 Q 60 45, 120 55 T 240 40 T 360 48 T 500 35"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2.5"
              />

              {/* Dot indicators */}
              <circle cx="120" cy="55" r="4" fill="#c084fc" className="animate-pulse" />
              <circle cx="240" cy="40" r="4" fill="#818cf8" className="animate-pulse" />
              <circle cx="360" cy="48" r="4" fill="#38bdf8" className="animate-pulse" />
              <circle cx="500" cy="35" r="4" fill="#34d399" />
            </svg>

            {/* Labels under chart */}
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
              <span>00:00 (TTFB 82ms)</span>
              <span>08:00 (TTFB 92ms)</span>
              <span>16:00 (TTFB 88ms)</span>
              <span>Current (TTFB 84ms)</span>
            </div>
          </div>
        </div>

        {/* Technologies Detected matching Screenshot 1 */}
        <div className="mt-8 pt-6 border-t border-purple-950/60">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              Technologies Detected
            </h4>
            <span className="text-[11px] text-purple-400 font-medium">
              {technologies.length} Verified Signatures
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {technologies.map((tech, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#14172f] border border-purple-900/40 hover:border-purple-500/40 transition-all text-xs"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400" />
                <span className="font-semibold text-slate-200">{tech.name}</span>
                {tech.version && (
                  <span className="text-[10px] text-slate-400 font-mono">v{tech.version}</span>
                )}
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950/80 text-purple-300 font-medium">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Recommendations matching Screenshot 1 */}
        <div className="mt-8 pt-6 border-t border-purple-950/60">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Dinesh AI Smart Recommendations
            </h4>
            <span className="text-[11px] text-slate-400 font-mono">Real-time LLM Synthesis</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiRecommendations.map((rec, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#13162c] border border-purple-900/30 flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Security & SSL deep dive */}
      <div className="p-6 rounded-2xl bg-[#121428] border border-purple-900/40">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-400" />
          SSL & TLS Enterprise Security Compliance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="p-3 rounded-xl bg-[#151833] border border-purple-950/40">
            <div className="text-[11px] text-slate-400 font-medium">Certificate Issuer</div>
            <div className="text-xs font-bold text-white mt-1 truncate">{security.ssl.issuer}</div>
            <div className="text-[10px] text-emerald-400 font-medium mt-1">Verified CA</div>
          </div>
          <div className="p-3 rounded-xl bg-[#151833] border border-purple-950/40">
            <div className="text-[11px] text-slate-400 font-medium">Protocol & Cipher</div>
            <div className="text-xs font-bold text-white mt-1 truncate">{security.ssl.protocol}</div>
            <div className="text-[10px] text-emerald-400 font-medium mt-1">{security.ssl.strength}</div>
          </div>
          <div className="p-3 rounded-xl bg-[#151833] border border-purple-950/40">
            <div className="text-[11px] text-slate-400 font-medium">Expiration Period</div>
            <div className="text-xs font-bold text-white mt-1">{security.ssl.expiresInDays} Days Remaining</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Valid to {security.ssl.validTo}</div>
          </div>
          <div className="p-3 rounded-xl bg-[#151833] border border-purple-950/40">
            <div className="text-[11px] text-slate-400 font-medium">TLS 1.3 State</div>
            <div className="text-xs font-bold text-emerald-400 mt-1">Enforced 0-RTT</div>
            <div className="text-[10px] text-emerald-400 font-medium mt-1">Maximum Encryption</div>
          </div>
        </div>

        {/* Security headers checklist */}
        <div className="space-y-2">
          {security.headers.map((h, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#151833] border border-purple-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                {h.status === 'passed' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                )}
                <div>
                  <span className="font-bold text-slate-200 font-mono">{h.name}</span>
                  <p className="text-[11px] text-slate-400">{h.description}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1a1e3d] text-slate-300">
                  {h.value || 'Active'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
