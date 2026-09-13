import React, { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Code2,
  DollarSign,
  Layers,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sliders,
  Sparkles,
  Table,
  Zap,
} from 'lucide-react';
import { CurrencyCode, Transaction } from '../types';
import { computeCashFlowGraph, formatCurrency, formatDate } from '../utils';

export interface VisualCashFlowCanvasProps {
  transactions: Transaction[];
  monthlyIncome: number;
  monthlyExpense: number;
  currency: CurrencyCode;
  onOpenAddModal: () => void;
  onTriggerSimulatedExpense: () => void;
}

export const VisualCashFlowCanvas: React.FC<VisualCashFlowCanvasProps> = ({
  transactions,
  monthlyIncome,
  monthlyExpense,
  currency,
  onOpenAddModal,
  onTriggerSimulatedExpense,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-hub');
  const [inspectorTab, setInspectorTab] = useState<'preview' | 'params' | 'json'>('preview');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const { nodes, links } = useMemo(() => {
    return computeCashFlowGraph(transactions, monthlyIncome, monthlyExpense);
  }, [transactions, monthlyIncome, monthlyExpense]);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  // Transactions routed to the selected node
  const nodeTransactions = useMemo(() => {
    if (!selectedNode) return [];
    if (selectedNode.type === 'hub') return transactions.slice(0, 8);
    if (selectedNode.category) {
      return transactions.filter((t) => t.category === selectedNode.category);
    }
    if (selectedNode.id === 'node-env-needs') {
      return transactions.filter((t) => ['Housing', 'Groceries', 'Transport', 'Utilities'].includes(t.category));
    }
    if (selectedNode.id === 'node-env-wants') {
      return transactions.filter((t) =>
        ['Dining & Drinks', 'Subscriptions & Tech', 'Entertainment', 'Shopping', 'Health & Fitness'].includes(
          t.category
        )
      );
    }
    return transactions.slice(0, 5);
  }, [selectedNode, transactions]);

  // SVG Spline link path generator
  const getLinkPath = (fromId: string, toId: string) => {
    const sourceNode = nodes.find((n) => n.id === fromId);
    const targetNode = nodes.find((n) => n.id === toId);
    if (!sourceNode || !targetNode) return '';

    const startX = sourceNode.x + 200;
    const startY = sourceNode.y + 40;
    const endX = targetNode.x;
    const endY = targetNode.y + 40;

    const dx = endX - startX;
    const cx1 = startX + dx * 0.5;
    const cy1 = startY;
    const cx2 = startX + dx * 0.5;
    const cy2 = endY;

    return `M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-62px)] bg-[#070b14] overflow-hidden select-none">
      {/* Visual Canvas Sub-Header & Controls */}
      <div className="bg-[#0b111f] border-b border-slate-800/80 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500/20 text-amber-400">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Interactive Cash Flow Pipeline
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400 border-l border-slate-800 pl-3">
            <span>Inflow: <strong className="text-emerald-400">+{formatCurrency(monthlyIncome, currency)}</strong></span>
            <span>•</span>
            <span>Outflow: <strong className="text-rose-400">-{formatCurrency(monthlyExpense, currency)}</strong></span>
            <span>•</span>
            <span>Net: <strong className="text-amber-400">{formatCurrency(monthlyIncome - monthlyExpense, currency)}</strong></span>
          </div>
        </div>

        {/* Action Controls & Canvas Navigation */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-md px-1 text-slate-300">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.1))}
              className="p-1.5 hover:text-white transition"
              title="Zoom Out"
            >
              <Minimize2 className="w-3 h-3" />
            </button>
            <span className="text-[11px] font-mono px-2 text-slate-400">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 hover:text-white transition"
              title="Zoom In"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-slate-500 hover:text-slate-300 border-l border-slate-800"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={onTriggerSimulatedExpense}
            className="px-2.5 py-1 rounded bg-slate-900 text-amber-300 border border-amber-500/30 hover:bg-amber-950/40 text-xs font-medium flex items-center gap-1 transition"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Flow</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="px-3 py-1 rounded bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-bold flex items-center gap-1 shadow hover:brightness-110 active:scale-95 transition"
          >
            <span>+ Inject Node</span>
          </button>
        </div>
      </div>

      {/* Main Studio Body: Split Left (Library) | Middle (Canvas) | Right (Inspector) */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Left: Flow Nodes Library & Overview */}
        <div className="hidden lg:flex w-64 bg-[#090e1a] border-r border-slate-800/80 flex-col z-20">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-slate-300 uppercase tracking-wider">
              PIPELINE ENTITIES
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
              {nodes.length} Nodes
            </span>
          </div>

          {/* Search nodes */}
          <div className="p-2 border-b border-slate-800/60">
            <input
              type="text"
              placeholder="Search node..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Node Categories List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
            {nodes
              .filter((n) => n.title.toLowerCase().includes(searchFilter.toLowerCase()))
              .map((node) => {
                const isSelected = node.id === selectedNodeId;
                let dotColor = 'bg-emerald-400';
                if (node.type === 'sink') dotColor = 'bg-rose-400';
                if (node.type === 'allocation') dotColor = 'bg-purple-400';
                if (node.type === 'hub') dotColor = 'bg-blue-400';

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full p-2 rounded-lg flex items-center justify-between text-left transition ${
                      isSelected
                        ? 'bg-slate-800/90 text-white border border-amber-500/50 shadow'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor}`}></span>
                      <div className="truncate">
                        <span className="block font-medium truncate text-white">{node.title}</span>
                        <span className="text-[10px] text-slate-500 block truncate">{node.type}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[11px] shrink-0 font-semibold text-slate-300">
                      {formatCurrency(node.amount, currency, true)}
                    </span>
                  </button>
                );
              })}
          </div>

          {/* Flow Health Status */}
          <div className="p-3 border-t border-slate-800 bg-[#070b13] text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Pipeline State:</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Synchronized
            </span>
          </div>
        </div>

        {/* Center Canvas Viewport */}
        <div className="flex-1 relative overflow-auto bg-[#070b14] flex items-center justify-center p-8">
          {/* Dot Grid Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Interactive Flow Stage Container */}
          <div
            className="relative transition-transform duration-200 ease-out origin-center"
            style={{
              width: '1100px',
              height: '580px',
              transform: `scale(${zoomLevel})`,
            }}
          >
            {/* SVG Connecting Flow Splines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
              <defs>
                <linearGradient id="flow-gradient-active" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
                </linearGradient>
                <linearGradient id="flow-gradient-dim" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#334155" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#475569" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Render Spline Links */}
              {links.map((link) => {
                const isSelected = selectedNode && (link.from === selectedNode.id || link.to === selectedNode.id);
                const pathData = getLinkPath(link.from, link.to);

                return (
                  <g key={link.id}>
                    {/* Background link stroke */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isSelected ? '#38bdf8' : '#1e293b'}
                      strokeWidth={isSelected ? 3.5 : 2}
                      strokeOpacity={isSelected ? 0.9 : 0.6}
                      className="transition-all duration-300"
                    />

                    {/* Animated flow dash line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={isSelected ? 'url(#flow-gradient-active)' : '#0ea5e9'}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      strokeDasharray="6, 8"
                      className="animate-[dash_1.5s_linear_infinite]"
                      strokeOpacity={isSelected ? 1 : 0.4}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Render Visual Flow Nodes */}
            {nodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              let borderAccent = 'border-slate-800';

              if (node.type === 'source') {
                borderAccent = isSelected
                  ? 'border-emerald-400 shadow-emerald-500/20'
                  : 'border-emerald-600/50 hover:border-emerald-400';
              } else if (node.type === 'hub') {
                borderAccent = isSelected
                  ? 'border-blue-400 shadow-blue-500/20'
                  : 'border-blue-600/60 hover:border-blue-400';
              } else if (node.type === 'allocation') {
                borderAccent = isSelected
                  ? 'border-purple-400 shadow-purple-500/20'
                  : 'border-purple-600/50 hover:border-purple-400';
              } else {
                borderAccent = isSelected
                  ? 'border-amber-400 shadow-amber-500/20'
                  : 'border-amber-600/50 hover:border-amber-400';
              }

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  style={{ left: `${node.x}px`, top: `${node.y}px` }}
                  className={`absolute w-52 p-3 rounded-lg bg-[#0d1322] border ${borderAccent} shadow-xl cursor-pointer transition-all duration-150 z-10 ${
                    isSelected ? 'ring-2 ring-amber-400/40 shadow-2xl -translate-y-0.5' : 'hover:-translate-y-0.5'
                  }`}
                >
                  {/* Top Node Header */}
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded border text-slate-300">
                      {node.type}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Active</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h4 className="text-xs font-bold text-white truncate">{node.title}</h4>
                  <p className="text-[10px] text-slate-400 truncate mb-2">{node.subtitle}</p>

                  {/* Amount / Metric */}
                  <div className="flex items-baseline justify-between pt-1.5 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-500">Flow:</span>
                    <span className="text-xs font-bold font-mono text-white">
                      {formatCurrency(node.amount, currency)}
                    </span>
                  </div>

                  {node.percentage && (
                    <div className="mt-1.5 w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full"
                        style={{ width: `${node.percentage}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Node Inspector Panel */}
        <div className="w-80 lg:w-96 bg-[#090e1a] border-l border-slate-800/80 flex flex-col z-20 shadow-2xl">
          {/* Inspector Header */}
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-slate-800 text-amber-400">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">NODE INSPECTOR</span>
                <span className="text-[10px] text-slate-400 font-mono">{selectedNode.title}</span>
              </div>
            </div>
          </div>

          {/* Inspector Tabs (Data Preview | Parameters | JSON Schema) */}
          <div className="flex border-b border-slate-800 bg-[#070b13] px-2 text-xs">
            <button
              onClick={() => setInspectorTab('preview')}
              className={`px-3 py-2 border-b-2 font-medium flex items-center gap-1.5 transition ${
                inspectorTab === 'preview'
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-amber-400" />
              Data Preview
            </button>
            <button
              onClick={() => setInspectorTab('params')}
              className={`px-3 py-2 border-b-2 font-medium flex items-center gap-1.5 transition ${
                inspectorTab === 'params'
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              Parameters
            </button>
            <button
              onClick={() => setInspectorTab('json')}
              className={`px-3 py-2 border-b-2 font-medium flex items-center gap-1.5 transition ${
                inspectorTab === 'json'
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              Code
            </button>
          </div>

          {/* Inspector Tab Content */}
          <div className="flex-1 overflow-y-auto p-3.5 text-xs">
            {inspectorTab === 'preview' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-1">
                  <span>Transactions routed: <strong className="text-white">{nodeTransactions.length}</strong></span>
                  <span className="text-emerald-400">Live Cleared</span>
                </div>

                {nodeTransactions.length === 0 ? (
                  <div className="p-6 text-center text-slate-500 rounded bg-slate-900/50 border border-slate-800">
                    No individual expense entries assigned directly to this node yet.
                  </div>
                ) : (
                  <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/60">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-900/80 border-b border-slate-800 text-[10px] font-mono text-slate-400">
                          <th className="p-2">Merchant</th>
                          <th className="p-2">Date</th>
                          <th className="p-2 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                        {nodeTransactions.slice(0, 7).map((tx) => (
                          <tr key={tx.id} className="hover:bg-slate-900/50">
                            <td className="p-2 text-slate-200 truncate max-w-[120px] font-sans">
                              {tx.merchant}
                            </td>
                            <td className="p-2 text-slate-400">{formatDate(tx.date)}</td>
                            <td
                              className={`p-2 text-right font-bold ${
                                tx.type === 'income' ? 'text-emerald-400' : 'text-slate-200'
                              }`}
                            >
                              {tx.type === 'income' ? '+' : '-'}
                              {formatCurrency(tx.amount, currency)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {inspectorTab === 'params' && (
              <div className="space-y-4 text-slate-300">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Node Identifier</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedNode.id}
                    className="w-full p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Monthly Flow Cap</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      defaultValue={selectedNode.amount}
                      className="flex-1 p-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                    />
                    <span className="text-slate-500 font-mono">{currency}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Alert Threshold</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="50"
                      max="100"
                      defaultValue="85"
                      className="w-full accent-amber-500"
                    />
                    <span className="text-xs font-mono text-amber-400">85%</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Triggers alert when node flow reaches 85% of capacity.</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Execution Mode:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
                    Continuous
                  </span>
                </div>
              </div>
            )}

            {inspectorTab === 'json' && (
              <pre className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-300 overflow-x-auto whitespace-pre">
                {JSON.stringify(
                  {
                    id: selectedNode.id,
                    title: selectedNode.title,
                    type: selectedNode.type,
                    amount: selectedNode.amount,
                    currency,
                    status: selectedNode.status,
                    connections: links
                      .filter((l) => l.from === selectedNode.id || l.to === selectedNode.id)
                      .map((l) => l.id),
                  },
                  null,
                  2
                )}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
