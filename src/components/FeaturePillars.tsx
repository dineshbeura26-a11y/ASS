import React from 'react';
import { Gauge, ShieldCheck, Search, Users, Code, Smartphone, Check } from 'lucide-react';

export const FeaturePillars: React.FC = () => {
  const pillars = [
    {
      title: 'Performance Analysis',
      subtitle: 'Core Web Vitals & Speed Index',
      icon: Gauge,
      color: 'from-blue-500 to-indigo-500',
      borderColor: 'border-blue-500/20 hover:border-blue-500/50',
      badgeColor: 'bg-blue-950/60 text-blue-300',
      metrics: ['LCP & FCP benchmarks', 'TTFB under 100ms', 'Total Blocking Time (TBT)', 'Payload compression']
    },
    {
      title: 'Security & SSL Check',
      subtitle: 'OWASP Top 10 & TLS 1.3',
      icon: ShieldCheck,
      color: 'from-emerald-500 to-teal-500',
      borderColor: 'border-emerald-500/20 hover:border-emerald-500/50',
      badgeColor: 'bg-emerald-950/60 text-emerald-300',
      metrics: ['Strict-Transport-Security', 'Content-Security-Policy', 'X-Frame-Options (Clickjack)', 'Certificate validity days']
    },
    {
      title: 'SEO Audit',
      subtitle: 'Search Engine Indexability',
      icon: Search,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/20 hover:border-purple-500/50',
      badgeColor: 'bg-purple-950/60 text-purple-300',
      metrics: ['Meta titles & descriptions', 'OpenGraph social preview', 'Canonical URL consistency', 'Robots.txt & Sitemap validation']
    },
    {
      title: 'Accessibility (WCAG)',
      subtitle: 'WCAG 2.1 AA Compliance',
      icon: Users,
      color: 'from-amber-500 to-orange-500',
      borderColor: 'border-amber-500/20 hover:border-amber-500/50',
      badgeColor: 'bg-amber-950/60 text-amber-300',
      metrics: ['Color contrast (4.5:1 ratio)', 'Images missing alt attributes', 'ARIA landmark labels', 'Form control associations']
    },
    {
      title: 'Code Quality',
      subtitle: 'DOM Density & Bundle Health',
      icon: Code,
      color: 'from-cyan-500 to-blue-600',
      borderColor: 'border-cyan-500/20 hover:border-cyan-500/50',
      badgeColor: 'bg-cyan-950/60 text-cyan-300',
      metrics: ['DOM tree depth & node count', 'Unused CSS/JS detection', 'Minification & Tree-shaking', 'Console error sniffing']
    },
    {
      title: 'Responsive Validation',
      subtitle: 'Mobile-first Viewport Engine',
      icon: Smartphone,
      color: 'from-rose-500 to-purple-600',
      borderColor: 'border-rose-500/20 hover:border-rose-500/50',
      badgeColor: 'bg-rose-950/60 text-rose-300',
      metrics: ['Viewport meta tag config', 'Minimum touch target sizing', 'Cumulative Layout Shift (CLS)', 'Font readability on mobile']
    }
  ];

  return (
    <div className="py-12 border-t border-purple-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Six Enterprise Audit Pillars
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl mx-auto">
            Comprehensive multi-vector inspection running 100+ diagnostic tests in under 2 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`group p-5 rounded-2xl bg-[#111325] border ${pillar.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/20`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pillar.color} p-[1px] shadow-md flex items-center justify-center`}>
                    <div className="w-full h-full bg-[#0e1022] rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>

                <ul className="space-y-1.5 mt-3 pt-3 border-t border-purple-950/40 text-xs text-slate-400">
                  {pillar.metrics.map((m, mIdx) => (
                    <li key={mIdx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
