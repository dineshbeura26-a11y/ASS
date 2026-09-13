import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertCircle,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Download,
  Edit2,
  Layers,
  Plus,
  Search,
  Sliders,
  TrendingDown,
  TrendingUp,
  Trash2,
  Upload,
  Wallet,
  Zap,
} from 'lucide-react';
import {
  Account,
  Budget,
  CATEGORY_METADATA,
  CurrencyCode,
  FinancialGoal,
  Transaction,
  TransactionCategory,
} from '../types';
import { exportTransactionsToCSV, formatCurrency, formatDate } from '../utils';

/* ==========================================================================
   1. OVERVIEW DASHBOARD
   ========================================================================== */
export interface OverviewDashboardProps {
  transactions: Transaction[];
  accounts: Account[];
  budgets: Budget[];
  goals: FinancialGoal[];
  currency: CurrencyCode;
  onOpenAddModal: () => void;
  onTriggerSimulatedExpense: () => void;
  onNavigateToTab: (tab: 'overview' | 'canvas' | 'transactions' | 'budgets' | 'accounts' | 'analytics') => void;
  lastSimulatedTx?: Transaction | null;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  transactions,
  accounts,
  budgets,
  goals,
  currency,
  onOpenAddModal,
  onTriggerSimulatedExpense,
  onNavigateToTab,
  lastSimulatedTx,
}) => {
  const totalNetWorth = useMemo(() => {
    return accounts.reduce((sum, acc) => sum + acc.balance, 0);
  }, [accounts]);

  const monthlyIncome = useMemo(() => {
    return transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const monthlyExpense = useMemo(() => {
    return transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const categorySpends = useMemo(() => {
    const map: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return map;
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [transactions]);

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1750px] mx-auto">
      {/* Real-time Flash Notification Banner when a swipe occurs */}
      {lastSimulatedTx && (
        <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent border border-amber-500/40 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold">
              <Zap className="w-4 h-4 fill-slate-950" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Real-Time Cleared:</span>
                <span className="font-mono text-amber-300">{lastSimulatedTx.merchant}</span>
                <span className="font-mono font-bold text-rose-400">
                  -{formatCurrency(lastSimulatedTx.amount, currency)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Category: {lastSimulatedTx.category} • Ledger & Visual Cash Flow updated live.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab('transactions')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono"
          >
            Inspect Ledger <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top High-Contrast Developer Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Worth */}
        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800/90 shadow-xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span className="tracking-wider uppercase">AGGREGATE NET WORTH</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono tracking-tight text-white mb-1">
            {formatCurrency(totalNetWorth, currency)}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4.2% vs last month</span>
          </div>
        </div>

        {/* Monthly Inflow */}
        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800/90 shadow-xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span className="tracking-wider uppercase">MONTHLY INFLOW</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono tracking-tight text-emerald-400 mb-1">
            {formatCurrency(monthlyIncome, currency)}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Payroll direct deposit + consulting
          </div>
        </div>

        {/* Monthly Outflow */}
        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800/90 shadow-xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span className="tracking-wider uppercase">MONTHLY OUTFLOW</span>
            <ArrowDownRight className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono tracking-tight text-rose-400 mb-1">
            {formatCurrency(monthlyExpense, currency)}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            {Math.round((monthlyExpense / Math.max(1, monthlyIncome)) * 100)}% burn of total inflow
          </div>
        </div>

        {/* Budget Health */}
        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800/90 shadow-xl relative overflow-hidden group hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span className="tracking-wider uppercase">BUDGET HEALTH SCORE</span>
            <Activity className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl lg:text-3xl font-bold font-mono tracking-tight text-amber-300 mb-1">
            92<span className="text-sm font-normal text-slate-500">/100</span>
          </div>
          <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Optimal envelope pacing</span>
          </div>
        </div>
      </div>

      {/* Hero Visual Cash Flow Interactive Launch Teaser */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0b1220] to-[#121c33] border border-blue-900/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Interactive Engine
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Node graph computing 12 live channels
              </span>
            </div>
            <h3 className="text-lg lg:text-xl font-bold text-white tracking-tight">
              Visual Cash Flow Pipeline & Node Inspector
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore your complete financial topology. Watch paychecks stream into central checking, split
              automatically through fixed and flexible envelopes, and route into investments.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onTriggerSimulatedExpense}
              className="px-3.5 py-2 rounded-lg bg-slate-900/90 text-amber-300 border border-amber-500/30 hover:bg-amber-950/40 text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Real-Time Swipe</span>
            </button>
            <button
              onClick={() => onNavigateToTab('canvas')}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 flex items-center gap-1.5 transition active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>Open Visual Canvas</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Analytics Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Real-Time Live Feed + Envelopes */}
        <div className="lg:col-span-8 space-y-6">
          {/* Recent Live Transactions Stream */}
          <div className="rounded-xl bg-[#0c1220] border border-slate-800 shadow-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1 rounded bg-slate-800 text-emerald-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Real-Time Cleared Ledger
                  </h4>
                  <span className="text-[10px] text-slate-400">Streaming incoming expenses instantly</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onTriggerSimulatedExpense}
                  className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-800"
                >
                  <Zap className="w-3 h-3" />
                  <span>+ Test Swipe</span>
                </button>
                <button
                  onClick={() => onNavigateToTab('transactions')}
                  className="text-xs text-slate-400 hover:text-white font-mono flex items-center gap-1"
                >
                  <span>View All ({transactions.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                    <th className="py-2.5 px-4">Merchant / Payee</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Account</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {recentTransactions.map((tx) => {
                    const isIncome = tx.type === 'income';
                    const isTransfer = tx.type === 'transfer';
                    const meta = CATEGORY_METADATA[tx.category] || CATEGORY_METADATA['Other'];
                    const account = accounts.find((a) => a.id === tx.accountId);

                    return (
                      <tr key={tx.id} className="hover:bg-slate-800/40 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5 font-sans">
                            <span
                              className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                              style={{ backgroundColor: meta.bg, color: meta.color }}
                            >
                              <DollarSign className="w-3 h-3" />
                            </span>
                            <div>
                              <span className="font-semibold text-white block">{tx.merchant}</span>
                              {tx.note && <span className="text-[10px] text-slate-500 truncate block">{tx.note}</span>}
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[10px] font-medium font-sans"
                            style={{ backgroundColor: meta.bg, color: meta.color }}
                          >
                            {tx.category}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                          {account?.name || 'Main Checking'}
                        </td>

                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                          {formatDate(tx.date)}
                        </td>

                        <td className="py-3 px-4 text-right font-mono font-bold text-xs">
                          <span
                            className={
                              isIncome ? 'text-emerald-400' : isTransfer ? 'text-blue-400' : 'text-slate-200'
                            }
                          >
                            {isIncome ? '+' : isTransfer ? '⇄ ' : '-'}
                            {formatCurrency(tx.amount, currency)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Budget Envelopes Progress Row */}
          <div className="rounded-xl bg-[#0c1220] border border-slate-800 shadow-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-white">
                  Monthly Budget Envelopes Pacing
                </h4>
              </div>
              <button
                onClick={() => onNavigateToTab('budgets')}
                className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1"
              >
                <span>Manage Caps</span> <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {budgets.slice(0, 4).map((b) => {
                const spent = categorySpends[b.category] || 0;
                const pct = Math.min(100, Math.round((spent / b.monthlyLimit) * 100));
                const isOver = spent > b.monthlyLimit;

                return (
                  <div key={b.id} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white truncate">{b.category}</span>
                      <span className={`font-mono text-[11px] font-bold ${isOver ? 'text-rose-400' : 'text-slate-300'}`}>
                        {pct}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isOver ? 'bg-rose-500' : pct > 80 ? 'bg-amber-500' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>{formatCurrency(spent, currency)}</span>
                      <span>Cap: {formatCurrency(b.monthlyLimit, currency)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Category Breakdown & Financial Goals */}
        <div className="lg:col-span-4 space-y-6">
          {/* Category Expense Allocation */}
          <div className="rounded-xl bg-[#0c1220] border border-slate-800 shadow-xl p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider font-mono text-white">
                EXPENSE CONCENTRATION
              </span>
              <span className="text-[11px] font-mono text-slate-400">This Month</span>
            </div>

            <div className="space-y-3">
              {(Object.entries(categorySpends) as [string, number][])
                .sort((a, b) => b[1] - a[1])
                .slice(0, 6)
                .map(([cat, amount]) => {
                  const meta = CATEGORY_METADATA[cat as TransactionCategory] || CATEGORY_METADATA['Other'];
                  const pct = Math.round((amount / Math.max(1, monthlyExpense)) * 100);

                  return (
                    <div key={cat} className="space-y-1 text-xs">
                      <div className="flex items-center justify-between text-slate-300">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
                          <span>{cat}</span>
                        </div>
                        <span className="font-mono font-semibold text-white">
                          {formatCurrency(amount, currency)} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: meta.color }}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Connected Liquid Vaults */}
          <div className="rounded-xl bg-[#0c1220] border border-slate-800 shadow-xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider font-mono text-white">
                VAULTS & CARDS
              </span>
              <button
                onClick={() => onNavigateToTab('accounts')}
                className="text-[11px] text-amber-400 hover:text-amber-300 font-mono"
              >
                All Accounts →
              </button>
            </div>

            <div className="space-y-2">
              {accounts.map((acc) => (
                <div
                  key={acc.id}
                  className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs hover:border-slate-700 transition"
                >
                  <div>
                    <span className="font-semibold text-white block">{acc.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {acc.institution} • {acc.accountNumberMask}
                    </span>
                  </div>
                  <div
                    className={`font-mono font-bold ${
                      acc.balance < 0 ? 'text-rose-400' : 'text-slate-100'
                    }`}
                  >
                    {formatCurrency(acc.balance, currency)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   2. TRANSACTIONS VIEW (LIVE LEDGER)
   ========================================================================== */
export interface TransactionsViewProps {
  transactions: Transaction[];
  accounts: Account[];
  currency: CurrencyCode;
  onOpenAddModal: () => void;
  onDeleteTransaction: (id: string) => void;
  onImportTransactions: (imported: Transaction[]) => void;
  onTriggerSimulatedExpense: () => void;
}

export const TransactionsView: React.FC<TransactionsViewProps> = ({
  transactions,
  accounts,
  currency,
  onOpenAddModal,
  onDeleteTransaction,
  onImportTransactions,
  onTriggerSimulatedExpense,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc'>('date-desc');

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.note && t.note.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchType = selectedType === 'all' || t.type === selectedType;
      const matchCat = selectedCategory === 'all' || t.category === selectedCategory;
      const matchAcc = selectedAccount === 'all' || t.accountId === selectedAccount;

      return matchSearch && matchType && matchCat && matchAcc;
    }).sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'date-asc') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      if (sortBy === 'amount-asc') return a.amount - b.amount;
      return 0;
    });
  }, [transactions, searchTerm, selectedType, selectedCategory, selectedAccount, sortBy]);

  const filteredIncome = filtered
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const filteredExpense = filtered
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (Array.isArray(parsed)) {
          onImportTransactions(parsed);
        }
      } catch {
        // invalid json
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-[1750px] mx-auto">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-white">Live Ledger & Expense Tracking</h2>
          <p className="text-xs text-slate-400">
            Real-time feed of all cleared, pending, and recurring transactions across your accounts.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <label className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition">
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Import JSON</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>

          <button
            onClick={() => exportTransactionsToCSV(filtered)}
            className="px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Filtered ({filtered.length})</span>
          </button>

          <button
            onClick={onTriggerSimulatedExpense}
            className="px-3 py-1.5 rounded-md bg-slate-900 text-amber-300 border border-amber-500/30 hover:bg-amber-950/40 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Live Swipe</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-1.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>New Transaction</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3.5 rounded-xl bg-[#0c1220] border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by merchant or note..."
              className="w-full pl-8 pr-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
            />
          </div>

          {/* Type filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="expense">Expenses Only</option>
            <option value="income">Income Only</option>
            <option value="transfer">Transfers Only</option>
          </select>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none hidden sm:block"
          >
            <option value="all">All Categories</option>
            {Object.keys(CATEGORY_METADATA).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Account filter */}
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none hidden md:block"
          >
            <option value="all">All Accounts</option>
            {accounts.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-mono text-[11px]">SORT:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none"
          >
            <option value="date-desc">Newest Date First</option>
            <option value="date-asc">Oldest Date First</option>
            <option value="amount-desc">Highest Amount</option>
            <option value="amount-asc">Lowest Amount</option>
          </select>
        </div>
      </div>

      {/* Filtered Aggregates Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800/80 text-xs font-mono">
        <div className="text-slate-400">
          Showing <span className="text-white font-bold">{filtered.length}</span> of {transactions.length} entries
        </div>

        <div className="flex items-center gap-4">
          <div className="text-emerald-400">
            Inflow: <strong>+{formatCurrency(filteredIncome, currency)}</strong>
          </div>
          <div className="text-rose-400">
            Outflow: <strong>-{formatCurrency(filteredExpense, currency)}</strong>
          </div>
          <div className="text-slate-300">
            Net: <strong className={filteredIncome >= filteredExpense ? 'text-emerald-400' : 'text-rose-400'}>
              {formatCurrency(filteredIncome - filteredExpense, currency)}
            </strong>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="rounded-xl bg-[#0c1220] border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                <th className="py-3 px-4">Merchant / Payee</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Account</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Note / Details</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 font-mono">
                    No transactions match your active filters.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => {
                  const meta = CATEGORY_METADATA[tx.category] || CATEGORY_METADATA['Other'];
                  const isIncome = tx.type === 'income';
                  const isTransfer = tx.type === 'transfer';
                  const account = accounts.find((a) => a.id === tx.accountId);

                  return (
                    <tr key={tx.id} className="hover:bg-slate-800/40 transition group">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: meta.bg, color: meta.color }}
                          >
                            <DollarSign className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-semibold text-white block group-hover:text-amber-400 transition">
                              {tx.merchant}
                            </span>
                            {tx.isRecurring && (
                              <span className="text-[10px] text-amber-400 font-mono">↻ Recurring</span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className="inline-block px-2 py-0.5 rounded text-[11px] font-medium"
                          style={{ backgroundColor: meta.bg, color: meta.color }}
                        >
                          {tx.category}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-slate-300 font-mono text-[11px]">
                        {account?.name || 'Main Checking'}
                      </td>

                      <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                        <div>{formatDate(tx.date)}</div>
                        <div className="text-[10px] text-slate-500">{tx.time}</div>
                      </td>

                      <td className="py-3 px-3 text-slate-400 max-w-[200px] truncate text-[11px]">
                        {tx.note || '—'}
                      </td>

                      <td className="py-3 px-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Cleared
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right font-mono font-bold text-xs">
                        <span
                          className={
                            isIncome
                              ? 'text-emerald-400'
                              : isTransfer
                              ? 'text-blue-400'
                              : 'text-slate-100'
                          }
                        >
                          {isIncome ? '+' : isTransfer ? '⇄ ' : '-'}
                          {formatCurrency(tx.amount, currency)}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <button
                          onClick={() => onDeleteTransaction(tx.id)}
                          className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition"
                          title="Delete transaction"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   3. BUDGETS & LIMITS VIEW
   ========================================================================== */
export interface BudgetsViewProps {
  budgets: Budget[];
  transactions: Transaction[];
  currency: CurrencyCode;
  onUpdateBudgetLimit: (budgetId: string, newLimit: number) => void;
  onCreateBudget: (budget: Budget) => void;
}

export const BudgetsView: React.FC<BudgetsViewProps> = ({
  budgets,
  transactions,
  currency,
  onUpdateBudgetLimit,
  onCreateBudget,
}) => {
  const [editingBudgetId, setEditingBudgetId] = useState<string | null>(null);
  const [editLimit, setEditLimit] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<TransactionCategory>('Dining & Drinks');
  const [newLimit, setNewLimit] = useState<number>(300);

  const categorySpends = useMemo(() => {
    const map: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });
    return map;
  }, [transactions]);

  const totalBudgeted = budgets.reduce((sum, b) => sum + b.monthlyLimit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + (categorySpends[b.category] || 0), 0);
  const totalRemaining = Math.max(0, totalBudgeted - totalSpent);

  const daysInMonth = 30;
  const currentDay = 9;
  const daysRemaining = daysInMonth - currentDay;

  const handleSaveEdit = (budget: Budget) => {
    if (editLimit > 0) {
      onUpdateBudgetLimit(budget.id, editLimit);
    }
    setEditingBudgetId(null);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    const newB: Budget = {
      id: `b-${Date.now()}`,
      category: newCategory,
      monthlyLimit: newLimit,
      period: 'monthly',
      alertThreshold: 0.85,
    };
    onCreateBudget(newB);
    setShowAddForm(false);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1750px] mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-white">Budgets & Envelopes</h2>
          <p className="text-xs text-slate-400">
            Automated spending caps with proactive real-time threshold warnings and run-rate projections.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3.5 py-1.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:brightness-110 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>{showAddForm ? 'Close Form' : 'New Budget Category'}</span>
        </button>
      </div>

      {/* Add New Budget Category Inline Form */}
      {showAddForm && (
        <form
          onSubmit={handleCreateNew}
          className="p-4 rounded-xl bg-[#0c1220] border border-amber-500/40 shadow-xl space-y-3 animate-in fade-in"
        >
          <span className="text-xs font-bold text-amber-400 font-mono">CREATE BUDGET LIMIT</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as TransactionCategory)}
                className="w-full p-2 rounded bg-slate-900 border border-slate-800 text-slate-200"
              >
                {Object.keys(CATEGORY_METADATA).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Monthly Limit ({currency})</label>
              <input
                type="number"
                min="10"
                step="10"
                value={newLimit}
                onChange={(e) => setNewLimit(Number(e.target.value))}
                className="w-full p-2 rounded bg-slate-900 border border-slate-800 text-white font-mono"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition"
              >
                Save Budget
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Overall Budget Status Meter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">TOTAL MONTHLY CAP</span>
          <div className="text-2xl font-bold font-mono text-white">
            {formatCurrency(totalBudgeted, currency)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">{budgets.length} monitored envelopes</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">TOTAL SPENT TO DATE</span>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {formatCurrency(totalSpent, currency)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {Math.round((totalSpent / totalBudgeted) * 100)}% of monthly allocation used
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">AVAILABLE LIQUID RUNWAY</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {formatCurrency(totalRemaining, currency)}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {daysRemaining} days left ({formatCurrency(totalRemaining / Math.max(1, daysRemaining), currency)}/day safe burn)
          </span>
        </div>
      </div>

      {/* Budget Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map((b) => {
          const spent = categorySpends[b.category] || 0;
          const limit = b.monthlyLimit;
          const percent = Math.min(100, Math.round((spent / limit) * 100));
          const remaining = limit - spent;
          const isOver = spent > limit;
          const isWarning = percent >= b.alertThreshold * 100;
          const meta = CATEGORY_METADATA[b.category] || CATEGORY_METADATA['Other'];
          const isEditing = editingBudgetId === b.id;

          const projected = Math.round((spent / currentDay) * daysInMonth);

          return (
            <div
              key={b.id}
              className={`p-4 rounded-xl bg-[#0c1220] border transition-all ${
                isOver
                  ? 'border-rose-500/60 shadow-lg shadow-rose-950/30'
                  : isWarning
                  ? 'border-amber-500/50'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: meta.color }}
                  />
                  <span className="font-bold text-white text-sm">{b.category}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {isOver ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950/60 text-rose-400 border border-rose-500/30 font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Over Budget
                    </span>
                  ) : isWarning ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/60 text-amber-400 border border-amber-500/30 font-bold">
                      {percent}% Reached
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/40 text-emerald-400 border border-emerald-500/20">
                      On Track
                    </span>
                  )}

                  <button
                    onClick={() => {
                      if (isEditing) {
                        handleSaveEdit(b);
                      } else {
                        setEditingBudgetId(b.id);
                        setEditLimit(b.monthlyLimit);
                      }
                    }}
                    className="p-1 text-slate-500 hover:text-amber-400 rounded transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Limit & Spent */}
              <div className="flex items-baseline justify-between text-xs mb-1.5">
                <div className="text-slate-400">
                  Spent: <strong className="text-white font-mono">{formatCurrency(spent, currency)}</strong>
                </div>

                {isEditing ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={editLimit}
                      onChange={(e) => setEditLimit(Number(e.target.value))}
                      className="w-20 px-1 py-0.5 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-white"
                    />
                    <button
                      onClick={() => handleSaveEdit(b)}
                      className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[11px]"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="text-slate-400">
                    Cap: <strong className="text-slate-200 font-mono">{formatCurrency(limit, currency)}</strong>
                  </div>
                )}
              </div>

              {/* Progress Meter */}
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden mb-3 border border-slate-800">
                <div
                  className={`h-full rounded-full transition-all ${
                    isOver ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Remaining & Run-rate Projection */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                <span>
                  {isOver ? (
                    <span className="text-rose-400">Exceeded by {formatCurrency(spent - limit, currency)}</span>
                  ) : (
                    <span>Left: <strong className="text-emerald-400">{formatCurrency(remaining, currency)}</strong></span>
                  )}
                </span>
                <span className="text-slate-500">
                  Proj: ~{formatCurrency(projected, currency, true)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ==========================================================================
   4. ACCOUNTS & VAULTS VIEW
   ========================================================================== */
export interface AccountsViewProps {
  accounts: Account[];
  goals: FinancialGoal[];
  currency: CurrencyCode;
  onUpdateGoalProgress: (goalId: string, amount: number) => void;
  onCreateGoal: (goal: FinancialGoal) => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({
  accounts,
  goals,
  currency,
  onUpdateGoalProgress,
  onCreateGoal,
}) => {
  const [showGoalModal, setShowGoalModal] = useState<boolean>(false);
  const [goalTitle, setGoalTitle] = useState<string>('');
  const [goalTarget, setGoalTarget] = useState<number>(5000);
  const [goalDeadline, setGoalDeadline] = useState<string>('2026-12-31');

  const totalLiquid = accounts
    .filter((a) => a.type === 'checking' || a.type === 'savings' || a.type === 'cash')
    .reduce((sum, a) => sum + a.balance, 0);

  const totalInvested = accounts
    .filter((a) => a.type === 'investment')
    .reduce((sum, a) => sum + a.balance, 0);

  const totalLiabilities = accounts
    .filter((a) => a.type === 'credit')
    .reduce((sum, a) => sum + Math.abs(a.balance), 0);

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalTitle.trim()) return;

    const newG: FinancialGoal = {
      id: `g-${Date.now()}`,
      title: goalTitle.trim(),
      targetAmount: goalTarget,
      currentAmount: 0,
      deadline: goalDeadline,
      category: 'Savings',
      color: '#10b981',
    };

    onCreateGoal(newG);
    setShowGoalModal(false);
    setGoalTitle('');
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1750px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-mono text-white">Accounts & Financial Goals</h2>
          <p className="text-xs text-slate-400">
            Real-time balance status across liquid vaults, credit cards, and long-term milestones.
          </p>
        </div>

        <button
          onClick={() => setShowGoalModal(true)}
          className="px-3.5 py-1.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:brightness-110 transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Savings Goal</span>
        </button>
      </div>

      {/* High-Level Balance Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>LIQUID CASH & SAVINGS</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {formatCurrency(totalLiquid, currency)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Available immediate purchasing power</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>INVESTMENTS & EQUITY</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300">
            {formatCurrency(totalInvested, currency)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Vanguard index funds & portfolio</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
            <span>CURRENT CREDIT LIABILITIES</span>
            <CreditCard className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-300">
            {formatCurrency(totalLiabilities, currency)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Total statement balance due</p>
        </div>
      </div>

      {/* Account Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-wider">
          Connected Accounts & Cards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className="p-4 rounded-xl bg-gradient-to-br from-[#0e1627] to-[#090d16] border border-slate-800 hover:border-slate-700 transition relative overflow-hidden group shadow-xl"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: acc.color }}
              />

              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold text-white block">{acc.name}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{acc.institution}</span>
                </div>
                <div className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900 border border-slate-800 text-slate-300">
                  {acc.type}
                </div>
              </div>

              <div className="space-y-1 my-3">
                <span className="text-[10px] text-slate-500 font-mono">CURRENT BALANCE</span>
                <div
                  className={`text-xl font-bold font-mono ${
                    acc.balance < 0 ? 'text-rose-400' : 'text-white'
                  }`}
                >
                  {formatCurrency(acc.balance, currency)}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-800/80">
                <span>{acc.accountNumberMask}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active Synced
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Goals Tracker */}
      <div className="space-y-3 pt-4">
        <h3 className="text-sm font-bold font-mono text-slate-300 uppercase tracking-wider">
          Financial Target Goals
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goals.map((g) => {
            const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
            const remaining = g.targetAmount - g.currentAmount;

            return (
              <div key={g.id} className="p-4 rounded-xl bg-[#0c1220] border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{g.title}</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{pct}%</span>
                </div>

                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Saved: <strong className="text-white">{formatCurrency(g.currentAmount, currency)}</strong></span>
                  <span>Target: {formatCurrency(g.targetAmount, currency)}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                  <span className="text-slate-500 font-mono">Left: {formatCurrency(remaining, currency)}</span>
                  <button
                    onClick={() => onUpdateGoalProgress(g.id, 100)}
                    className="text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    + Add $100
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateGoal}
            className="w-full max-w-md p-5 rounded-2xl bg-[#0d1424] border border-slate-700 shadow-2xl space-y-4"
          >
            <h3 className="text-base font-bold text-white font-mono">Create Financial Milestone</h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Goal Name</label>
              <input
                type="text"
                required
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                placeholder="e.g. Down payment on vehicle"
                className="w-full p-2 rounded bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Target Amount ({currency})</label>
              <input
                type="number"
                required
                min="50"
                value={goalTarget}
                onChange={(e) => setGoalTarget(Number(e.target.value))}
                className="w-full p-2 rounded bg-slate-900 border border-slate-800 text-xs text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Target Date</label>
              <input
                type="date"
                value={goalDeadline}
                onChange={(e) => setGoalDeadline(e.target.value)}
                className="w-full p-2 rounded bg-slate-900 border border-slate-800 text-xs text-white font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowGoalModal(false)}
                className="px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                Save Goal
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

/* ==========================================================================
   5. ANALYTICS & VELOCITY VIEW
   ========================================================================== */
export interface AnalyticsViewProps {
  transactions: Transaction[];
  currency: CurrencyCode;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ transactions, currency }) => {
  const { totalIncome, totalExpenses, sortedCategories, dailySpend, topMerchants, daysList } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    const catMap: Record<string, number> = {};
    const dayMap: Record<string, number> = {};
    const merchantMap: Record<string, { amount: number; count: number; category: string }> = {};

    transactions.forEach((tx) => {
      if (tx.type === 'income') {
        income += tx.amount;
      } else if (tx.type === 'expense') {
        expenses += tx.amount;
        catMap[tx.category] = (catMap[tx.category] || 0) + tx.amount;
        dayMap[tx.date] = (dayMap[tx.date] || 0) + tx.amount;

        if (!merchantMap[tx.merchant]) {
          merchantMap[tx.merchant] = { amount: 0, count: 0, category: tx.category };
        }
        merchantMap[tx.merchant].amount += tx.amount;
        merchantMap[tx.merchant].count += 1;
      }
    });

    const sortedCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]);
    const sortedM = Object.entries(merchantMap)
      .sort((a, b) => b[1].amount - a[1].amount)
      .slice(0, 5);

    const days = [
      '2026-09-01',
      '2026-09-02',
      '2026-09-03',
      '2026-09-04',
      '2026-09-05',
      '2026-09-06',
      '2026-09-07',
      '2026-09-08',
      '2026-09-09',
    ];

    return {
      totalIncome: income,
      totalExpenses: expenses,
      sortedCategories: sortedCats,
      dailySpend: dayMap,
      topMerchants: sortedM,
      daysList: days,
    };
  }, [transactions]);

  const maxDaySpend = Math.max(...daysList.map((d) => dailySpend[d] || 0), 100);

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1750px] mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold font-mono text-white">Expense Analytics & Cash Flow Velocity</h2>
        <p className="text-xs text-slate-400">
          In-depth breakdown of spending habits, merchant concentration, and daily burn trends.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">AVERAGE DAILY BURN RATE</span>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {formatCurrency(totalExpenses / 9, currency)}/day
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Calculated across 9 elapsed days this month</p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">SAVINGS RATE (CASHFLOW)</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {totalIncome > 0 ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100) : 0}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Surplus saved: {formatCurrency(Math.max(0, totalIncome - totalExpenses), currency)}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#0c1220] border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 block mb-1">LARGEST EXPENSE CATEGORY</span>
          <div className="text-2xl font-bold font-mono text-white">
            {sortedCategories[0]?.[0] || 'Housing'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {formatCurrency(sortedCategories[0]?.[1] || 0, currency)} (
            {totalExpenses > 0 ? Math.round(((sortedCategories[0]?.[1] || 0) / totalExpenses) * 100) : 0}%)
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Spending Trend (8 cols) */}
        <div className="lg:col-span-8 p-4 rounded-xl bg-[#0c1220] border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider font-mono text-white">
                DAILY OUTFLOW VELOCITY (SEPTEMBER)
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Max: {formatCurrency(maxDaySpend, currency)}</span>
          </div>

          {/* SVG Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-2 pt-6 pb-2 px-2">
            {daysList.map((d) => {
              const amount = dailySpend[d] || 0;
              const heightPct = Math.max(8, Math.round((amount / maxDaySpend) * 100));
              const dayNum = d.split('-')[2];

              return (
                <div key={d} className="flex-1 flex flex-col items-center gap-2 group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-white whitespace-nowrap shadow-lg">
                    Sep {dayNum}: {formatCurrency(amount, currency)}
                  </div>

                  <div className="w-full bg-slate-900/60 rounded-t h-48 flex items-end justify-center p-1">
                    <div
                      className={`w-full max-w-[28px] rounded-t transition-all ${
                        amount > 500
                          ? 'bg-gradient-to-t from-orange-600 to-amber-400'
                          : amount > 100
                          ? 'bg-gradient-to-t from-blue-600 to-cyan-400'
                          : 'bg-gradient-to-t from-slate-700 to-slate-500'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-white">
                    09/{dayNum}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Merchants (4 cols) */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-[#0c1220] border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-white">
              TOP EXPENSE MERCHANTS
            </span>
            <span className="text-[10px] font-mono text-slate-400">Total Spend</span>
          </div>

          <div className="space-y-3">
            {topMerchants.map(([merchant, data]) => (
              <div key={merchant} className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/50 last:border-0 last:pb-0">
                <div>
                  <span className="font-semibold text-white block">{merchant}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {data.category} • {data.count} {data.count === 1 ? 'tx' : 'txs'}
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-200">
                  {formatCurrency(data.amount, currency)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
