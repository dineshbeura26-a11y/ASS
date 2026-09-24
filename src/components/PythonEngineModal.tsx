import React, { useState } from 'react';
import { 
  PYTHON_CLI_CODE, 
  PYTHON_FASTAPI_CODE, 
  PYTHON_REQUIREMENTS, 
  PYTHON_DOCKERFILE 
} from '../data/pythonCode';
import { 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Play, 
  X, 
  Sparkles, 
  Server, 
  FileCode, 
  Box, 
  Cpu,
  RefreshCw
} from 'lucide-react';

interface PythonEngineModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isStandaloneTab?: boolean;
  targetDomain?: string;
}

export const PythonEngineModal: React.FC<PythonEngineModalProps> = ({
  isOpen = true,
  onClose,
  isStandaloneTab = false,
  targetDomain = 'react.dev'
}) => {
  const [activeTab, setActiveTab] = useState<'cli' | 'fastapi' | 'requirements' | 'docker' | 'runner'>('cli');
  const [copied, setCopied] = useState(false);
  
  // Terminal Simulator State
  const [cliTarget, setCliTarget] = useState(targetDomain);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([
    "Dinesh AI Python 2026 Engine Ready.",
    "Type target domain and click 'Execute Python Audit' to run live simulation."
  ]);

  const getActiveCode = () => {
    switch (activeTab) {
      case 'cli': return PYTHON_CLI_CODE;
      case 'fastapi': return PYTHON_FASTAPI_CODE;
      case 'requirements': return PYTHON_REQUIREMENTS;
      case 'docker': return PYTHON_DOCKERFILE;
      default: return PYTHON_CLI_CODE;
    }
  };

  const getFileName = () => {
    switch (activeTab) {
      case 'cli': return 'dinesh_ai_auditor_2026.py';
      case 'fastapi': return 'main.py';
      case 'requirements': return 'requirements.txt';
      case 'docker': return 'Dockerfile';
      default: return 'dinesh_ai_auditor_2026.py';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([getActiveCode()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = getFileName();
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  const runSimulation = () => {
    setIsRunningSim(true);
    setSimLogs([
      `$ python3 dinesh_ai_auditor_2026.py https://${cliTarget.replace(/^https?:\/\//, '')}`,
      `[*] Dinesh AI (2026) Platform Owner: Dinesh Kumar Beura (Bhubaneswar, Odisha)`,
      `[*] Resolving DNS & TLS handshake for ${cliTarget}...`
    ]);

    setTimeout(() => {
      setSimLogs(prev => [
        ...prev,
        `[✓] TLS 1.3 Handshake completed: 256-bit ECC (Let's Encrypt Enterprise CA)`,
        `[*] Measuring Network Latency & TTFB...`
      ]);
    }, 600);

    setTimeout(() => {
      setSimLogs(prev => [
        ...prev,
        `[✓] HTTP 200 OK | Round-trip Latency: 84.2ms | Page Size: 384 KiB`,
        `[*] Auditing OWASP Top 10 Security Headers...`,
        `    - Strict-Transport-Security: PASS (max-age=63072000)`,
        `    - Content-Security-Policy: PASS (Strict Nonce)`,
        `    - X-Frame-Options: PASS (DENY)`,
        `    - X-Content-Type-Options: PASS (nosniff)`
      ]);
    }, 1200);

    setTimeout(() => {
      setSimLogs(prev => [
        ...prev,
        `[*] Parsing DOM AST with BeautifulSoup4 & detecting technologies...`,
        `    - Detected: React 19, TypeScript 5.8, Tailwind CSS, Vercel Edge, Cloudflare`,
        `[*] Running WCAG 2.1 AA Accessibility & Core Web Vitals algorithms...`,
        `=============================================================`,
        `📊 DINESH AI 2026 AUDIT SCORECARD:`,
        `   • Overall Health: 96 / 100 [EXCELLENT]`,
        `   • Performance: 95.5 / 100  (LCP: 1.1s, FID: 14ms, CLS: 0.012)`,
        `   • Security: 100 / 100`,
        `   • SEO Readiness: 98.0 / 100`,
        `   • Accessibility: 92.3 / 100`,
        `✨ AI RECOMMENDATIONS GENERATED: 4 high-impact optimizations`,
        `✅ Full audit report exported to dinesh_ai_audit_report.json`,
        `=============================================================`
      ]);
      setIsRunningSim(false);
    }, 2000);
  };

  if (!isOpen && !isStandaloneTab) return null;

  return (
    <div className={isStandaloneTab ? "w-full" : "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-fade-in"}>
      
      <div className={`w-full max-w-6xl rounded-3xl bg-[#0d0f22] border border-purple-800/40 shadow-2xl flex flex-col ${isStandaloneTab ? "" : "max-h-[90vh]"}`}>
        
        {/* Modal / Card Header */}
        <div className="p-5 sm:p-6 border-b border-purple-950/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#121428]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-indigo-600 p-[1px] flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-[#0d0f22] rounded-xl flex items-center justify-center">
                <Terminal className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Dinesh AI Python 2026 Engine
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/80 text-amber-300 border border-amber-800/40">
                  Python 3.12+
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Complete standalone CLI auditor, FastAPI microservice, & automated scanner
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[#1a1c36] hover:bg-purple-900/30 text-slate-200 text-xs font-semibold border border-purple-900/40 hover:border-purple-500/40 transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {getFileName()}</span>
            </button>

            {!isStandaloneTab && onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-[#1a1c36] hover:bg-rose-900/30 text-slate-400 hover:text-rose-300 border border-purple-900/40 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-1 px-5 pt-3 border-b border-purple-950/60 bg-[#0e1022] overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('cli')}
            className={`px-3.5 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'cli'
                ? 'bg-[#151833] text-amber-300 border-t-2 border-amber-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>dinesh_ai_auditor_2026.py (CLI & Engine)</span>
          </button>

          <button
            onClick={() => setActiveTab('fastapi')}
            className={`px-3.5 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'fastapi'
                ? 'bg-[#151833] text-teal-300 border-t-2 border-teal-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>FastAPI Server (main.py)</span>
          </button>

          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-3.5 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'requirements'
                ? 'bg-[#151833] text-purple-300 border-t-2 border-purple-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>requirements.txt</span>
          </button>

          <button
            onClick={() => setActiveTab('docker')}
            className={`px-3.5 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'docker'
                ? 'bg-[#151833] text-blue-300 border-t-2 border-blue-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>Dockerfile</span>
          </button>

          <button
            onClick={() => setActiveTab('runner')}
            className={`px-3.5 py-2 rounded-t-lg font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'runner'
                ? 'bg-[#151833] text-emerald-300 border-t-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Terminal Simulator</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 bg-[#0a0c18]">
          
          {activeTab === 'runner' ? (
            /* Interactive Simulation Runner */
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#13162c] border border-purple-900/40 flex flex-col sm:flex-row items-center gap-3">
                <div className="flex-1 w-full flex items-center px-3 py-2 rounded-xl bg-[#0c0e1e] border border-purple-950/60 font-mono text-sm">
                  <span className="text-amber-400 mr-2">$ python3 dinesh_ai_auditor.py</span>
                  <input
                    type="text"
                    value={cliTarget}
                    onChange={(e) => setCliTarget(e.target.value)}
                    placeholder="https://react.dev"
                    className="bg-transparent text-white focus:outline-none w-full"
                  />
                </div>

                <button
                  onClick={runSimulation}
                  disabled={isRunningSim}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isRunningSim ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Auditing target...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Execute Python Audit</span>
                    </>
                  )}
                </button>
              </div>

              {/* Terminal Screen */}
              <div className="p-4 rounded-2xl bg-[#090b16] border border-slate-800 font-mono text-xs text-slate-300 min-h-[340px] max-h-[420px] overflow-y-auto space-y-1.5 shadow-inner">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-slate-500 text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="ml-2">bash - dinesh_ai_auditor_2026 (Python 3.12)</span>
                </div>

                {simLogs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={`${
                      log.includes('[✓]') || log.includes('PASS') ? 'text-emerald-400' :
                      log.includes('EXCELLENT') ? 'text-emerald-300 font-bold' :
                      log.includes('RECOMMENDATIONS') || log.includes('SCORECARD') ? 'text-amber-300 font-bold' :
                      log.startsWith('$') ? 'text-cyan-400 font-bold' :
                      'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Code View with instructions */
            <div className="space-y-4">
              {/* Quick instructions pill banner */}
              <div className="p-3.5 rounded-xl bg-[#141731] border border-purple-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-slate-300">
                    <strong className="text-white">Run locally:</strong> pip install -r requirements.txt && python dinesh_ai_auditor_2026.py https://example.com
                  </span>
                </div>
                <span className="text-[11px] font-mono text-purple-400">Dinesh AI v2.1 (2026)</span>
              </div>

              {/* Code Box */}
              <div className="relative rounded-2xl bg-[#080914] border border-purple-950/60 p-4 font-mono text-xs overflow-x-auto max-h-[500px]">
                <pre className="text-slate-200 leading-relaxed select-all">
                  <code>{getActiveCode()}</code>
                </pre>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
