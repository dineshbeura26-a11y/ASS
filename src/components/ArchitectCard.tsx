import React from 'react';
import { ShieldCheck, MapPin, Code, Cpu, ExternalLink, Terminal, Sparkles, Send } from 'lucide-react';

interface ArchitectCardProps {
  onOpenPython: () => void;
}

export const ArchitectCard: React.FC<ArchitectCardProps> = ({ onOpenPython }) => {
  const techStack = [
    { name: 'React 19', color: 'bg-cyan-950/60 text-cyan-300 border-cyan-800/40' },
    { name: 'TypeScript', color: 'bg-blue-950/60 text-blue-300 border-blue-800/40' },
    { name: 'Python 3.12+', color: 'bg-amber-950/60 text-amber-300 border-amber-800/40' },
    { name: 'FastAPI', color: 'bg-teal-950/60 text-teal-300 border-teal-800/40' },
    { name: 'Node.js', color: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40' },
    { name: 'Express.js', color: 'bg-slate-800/60 text-slate-300 border-slate-700/40' },
    { name: 'Tailwind CSS', color: 'bg-sky-950/60 text-sky-300 border-sky-800/40' },
    { name: 'Vite', color: 'bg-purple-950/60 text-purple-300 border-purple-800/40' },
    { name: 'MongoDB', color: 'bg-green-950/60 text-green-300 border-green-800/40' },
    { name: 'JWT Auth', color: 'bg-pink-950/60 text-pink-300 border-pink-800/40' },
    { name: 'Vercel', color: 'bg-neutral-900 text-slate-200 border-neutral-700' },
    { name: 'Lighthouse API', color: 'bg-orange-950/60 text-orange-300 border-orange-800/40' }
  ];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#101225] border border-purple-900/40 shadow-2xl relative overflow-hidden">
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-purple-950/60">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-[2px] shadow-lg shadow-purple-600/30">
              <div className="w-full h-full bg-[#0d0f20] rounded-2xl flex items-center justify-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
                  DA
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#101225] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Dinesh Kumar Beura
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/80 text-purple-300 border border-purple-800/50">
                FOUNDER & ARCHITECT
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-purple-400 font-semibold mt-0.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              Platform Owner & Chief Architect • Dinesh AI (2026)
            </p>

            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              Bhubaneswar, Odisha, India • Full Stack & GenAI Systems
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPython}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            <span>Open Python 2026 Engine</span>
          </button>
        </div>
      </div>

      {/* Tech Stack Bar matching Screenshot 1 bottom */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            Core Technology Stack (MERN + Python 2026 Engine)
          </span>
          <span className="text-[11px] text-slate-500 font-mono">12 Verified Components</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${tech.color} shadow-sm transition-all hover:scale-105 cursor-default`}
            >
              {tech.name}
            </span>
          ))}
        </div>
      </div>

      {/* Mission description */}
      <div className="mt-6 p-4 rounded-2xl bg-[#14172f] border border-purple-950/40 text-xs text-slate-300 leading-relaxed">
        <p>
          <strong className="text-white">Dinesh AI Enterprise Node:</strong> Engineered for high-throughput automated audit pipelines.
          Integrates sub-millisecond network diagnostics, cryptographic SSL inspection, AST-level DOM validation,
          and WCAG 2.1 accessibility heuristics. Designed with modern React 19, TypeScript, and a high-performance Python 3.12+ ASGI engine.
        </p>
      </div>

    </div>
  );
};
