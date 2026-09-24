import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Globe, Wifi, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const MonitorView: React.FC = () => {
  const [monitoredSites, setMonitoredSites] = useState([
    { domain: 'react.dev', status: 'ONLINE', latency: 84, uptime: '99.98%', sslDays: 78, location: 'Global Anycast' },
    { domain: 'github.com', status: 'ONLINE', latency: 110, uptime: '99.95%', sslDays: 142, location: 'Fastly CDN' },
    { domain: 'wikipedia.org', status: 'ONLINE', latency: 45, uptime: '99.99%', sslDays: 210, location: 'Cloudflare Edge' },
    { domain: 'vercel.com', status: 'ONLINE', latency: 72, uptime: '100%', sslDays: 65, location: 'Vercel Edge' },
    { domain: 'python.org', status: 'ONLINE', latency: 78, uptime: '99.96%', sslDays: 82, location: 'Fastly' },
  ]);

  const [isPinging, setIsPinging] = useState(false);

  const handleRefreshPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setMonitoredSites(prev =>
        prev.map(site => ({
          ...site,
          latency: Math.max(30, site.latency + Math.floor(Math.random() * 9) - 4)
        }))
      );
      setIsPinging(false);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              24/7 Enterprise Synthetic Monitor
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 animate-pulse">
              LIVE PING ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Dinesh AI Multi-Region Probe Node • Continuous Health & SSL Watchdog
          </p>
        </div>

        <button
          onClick={handleRefreshPing}
          disabled={isPinging}
          className="px-4 py-2 rounded-xl bg-[#1a1c38] hover:bg-purple-900/40 text-slate-200 text-xs font-semibold border border-purple-900/40 flex items-center gap-2 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin text-purple-400' : ''}`} />
          <span>Ping All Nodes</span>
        </button>
      </div>

      {/* Monitor Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {monitoredSites.map((site, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#121428] border border-purple-900/30 hover:border-purple-500/40 transition-all space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white text-sm">{site.domain}</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {site.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#171a36] border border-purple-950/40">
                <div className="text-[10px] text-slate-400 font-medium">RTT Latency</div>
                <div className="text-base font-extrabold text-white font-mono mt-0.5 flex items-center gap-1">
                  <span>{site.latency}ms</span>
                  <span className="text-[9px] text-emerald-400 font-normal">Optimal</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#171a36] border border-purple-950/40">
                <div className="text-[10px] text-slate-400 font-medium">30d Uptime</div>
                <div className="text-base font-extrabold text-white font-mono mt-0.5">{site.uptime}</div>
              </div>
            </div>

            <div className="pt-2 border-t border-purple-950/40 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                SSL: {site.sslDays}d left
              </span>
              <span className="text-purple-400">{site.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Synthetic monitor banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border border-purple-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Automate Monitoring with Dinesh AI Python Daemon</h4>
          <p className="text-xs text-slate-400 mt-1">
            Deploy the Python cron worker to trigger webhook alerts on Discord, Slack, or PagerDuty when latency exceeds 200ms.
          </p>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0c0e1e] border border-purple-950 text-amber-300">
          cron: */5 * * * * python auditor.py --monitor
        </div>
      </div>
    </div>
  );
};
