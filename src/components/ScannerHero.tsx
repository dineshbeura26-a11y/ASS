import React, { useState } from 'react';
import { Search, Sparkles, Globe, ArrowRight, CheckCircle2, Shield, Zap, RefreshCw } from 'lucide-react';

interface ScannerHeroProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  loadingStep: string;
  initialUrl?: string;
}

export const ScannerHero: React.FC<ScannerHeroProps> = ({
  onAnalyze,
  isLoading,
  loadingStep,
  initialUrl = 'https://react.dev',
}) => {
  const [inputUrl, setInputUrl] = useState(initialUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim() && !isLoading) {
      onAnalyze(inputUrl.trim());
    }
  };

  const handlePreset = (preset: string) => {
    setInputUrl(preset);
    onAnalyze(preset);
  };

  return (
    <div className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-20 text-center">
      {/* Ambient background glow & radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-700/20 via-indigo-600/20 to-pink-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Top Tag Pill matching Screenshot 2 */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-medium mb-6 shadow-[0_0_20px_rgba(168,85,247,0.15)] animate-fade-in">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Fully Integrated AI Crawler (2026 Engine)</span>
        </div>

        {/* Main Heading matching Screenshot 1 & 2 */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Enterprise-grade <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400">
            Website Auditor
          </span>
        </h1>

        {/* Subtitle matching Screenshot 2 */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Scan any public URL. Generate absolute performance metrics, line-by-line validation diagnostics, and refactored responsive viewport code blocks.
        </p>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
          <div className="relative flex flex-col sm:flex-row items-center p-2 rounded-2xl sm:rounded-full bg-[#131528] border border-purple-600/30 shadow-[0_0_35px_rgba(147,51,234,0.15)] focus-within:border-purple-400/80 focus-within:shadow-[0_0_40px_rgba(147,51,234,0.3)] transition-all">
            
            <div className="flex items-center w-full px-3 py-2 sm:py-0">
              <Globe className="w-5 h-5 text-purple-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://example.com"
                disabled={isLoading}
                className="w-full bg-transparent text-white placeholder-slate-500 text-sm sm:text-base focus:outline-none font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto mt-2 sm:mt-0 flex-shrink-0 px-7 py-3.5 rounded-xl sm:rounded-full text-sm font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                isLoading
                  ? 'bg-purple-800 text-purple-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-300" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <span>Analyze URL</span>
                  <Sparkles className="w-4 h-4 text-purple-200" />
                </>
              )}
            </button>
          </div>

          {/* Loading status text feedback */}
          {isLoading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-purple-300 bg-purple-950/40 py-2 px-4 rounded-lg border border-purple-800/40 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <span>{loadingStep || 'Dinesh AI Engine resolving target...'}</span>
            </div>
          )}
        </form>

        {/* Presets matching Screenshot 2 */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-400 mb-12">
          <span className="font-semibold tracking-wider uppercase text-slate-500">TRY PRESET:</span>
          {[
            'react.dev',
            'github.com',
            'wikipedia.org',
            'vercel.com',
            'python.org'
          ].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePreset(`https://${preset}`)}
              disabled={isLoading}
              className="px-3 py-1 rounded-full bg-[#181a30] hover:bg-purple-900/30 text-slate-300 hover:text-white border border-purple-900/40 hover:border-purple-500/50 transition-all font-mono"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Trust Badges matching Screenshot 2 bottom bar */}
        <div className="pt-6 border-t border-purple-950/50 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-slate-500">
          <span className="hover:text-slate-400 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
            GOOGLE LIGHTHOUSE
          </span>
          <span className="text-purple-900">•</span>
          <span className="hover:text-slate-400 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            PAGESPEED INSIGHTS
          </span>
          <span className="text-purple-900">•</span>
          <span className="hover:text-slate-400 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            W3C VALIDATOR
          </span>
          <span className="text-purple-900">•</span>
          <span className="hover:text-slate-400 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            SSL CHECKER
          </span>
          <span className="text-purple-900">•</span>
          <span className="hover:text-slate-400 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            PYTHON 2026 ENGINE
          </span>
        </div>

      </div>
    </div>
  );
};
