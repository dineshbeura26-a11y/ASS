import React, { useState } from 'react';
import { DiagnosticIssue } from '../types';
import { AlertTriangle, CheckCircle, Code, Copy, Check, Sparkles, ChevronRight } from 'lucide-react';

interface DiagnosticBreakdownProps {
  diagnostics: DiagnosticIssue[];
  domain: string;
}

export const DiagnosticBreakdown: React.FC<DiagnosticBreakdownProps> = ({
  diagnostics,
  domain,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const defaultDiagnostics: DiagnosticIssue[] = diagnostics.length > 0 ? diagnostics : [
    {
      id: 'default-diag-1',
      category: 'Responsive',
      severity: 'medium',
      title: 'Ensure responsive viewport meta tag with interactive scale parameters',
      description: 'Modern mobile devices need standard viewport scale flags to avoid 300ms click delay.',
      snippet: '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">',
      remediation: 'Inject standard modern viewport tag in the document head.',
      aiSuggestedFix: '<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">'
    },
    {
      id: 'default-diag-2',
      category: 'Code Quality',
      severity: 'low',
      title: 'Minify CSS bundle and remove unused selectors',
      description: 'Found 14 unused utility classes that can be stripped during tree-shaking.',
      snippet: '.unused-legacy-hero-btn { margin-top: 40px; opacity: 0; }',
      remediation: 'Enable Tailwind CSS v4 or PurgeCSS to purge unreferenced styles.',
      aiSuggestedFix: '/* Purged automatically by Dinesh AI 2026 Build Optimizer */'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Code className="w-4 h-4 text-purple-400" />
          Line-by-Line Diagnostics & Refactored Responsive Code
        </h3>
        <span className="text-xs text-purple-400 font-mono">
          {defaultDiagnostics.length} Actionable Items
        </span>
      </div>

      <div className="space-y-3">
        {defaultDiagnostics.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#121428] border border-purple-900/30 hover:border-purple-500/40 transition-all space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <span className={`p-1.5 rounded-lg flex-shrink-0 ${
                  item.severity === 'high' ? 'bg-rose-950/60 text-rose-400 border border-rose-800/40' :
                  item.severity === 'medium' ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40' :
                  'bg-blue-950/60 text-blue-400 border border-blue-800/40'
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{item.title}</h4>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#1b1e3f] text-slate-300">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                </div>
              </div>
            </div>

            {item.snippet && (
              <div className="p-3 rounded-xl bg-[#090b16] border border-slate-800 font-mono text-xs text-rose-300">
                <div className="text-[10px] text-slate-500 mb-1">Current Implementation:</div>
                <code>{item.snippet}</code>
              </div>
            )}

            {item.aiSuggestedFix && (
              <div className="p-3 rounded-xl bg-[#0d1226] border border-purple-900/40 font-mono text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-purple-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    Dinesh AI Refactored Code Fix:
                  </span>
                  <button
                    onClick={() => handleCopyCode(item.id, item.aiSuggestedFix || '')}
                    className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors"
                  >
                    {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="text-emerald-300 overflow-x-auto">
                  <code>{item.aiSuggestedFix}</code>
                </pre>
              </div>
            )}

            <div className="text-xs text-slate-400 pt-1 flex items-center gap-1.5">
              <strong className="text-slate-300">Remediation:</strong>
              <span>{item.remediation}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
