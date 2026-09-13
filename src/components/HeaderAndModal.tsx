import React, { useState } from 'react';
import {
  Activity,
  Bell,
  Code2,
  Coins,
  DollarSign,
  Layers,
  PieChart,
  Plus,
  Radio,
  Search,
  Sliders,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import {
  Account,
  CATEGORY_METADATA,
  CurrencyCode,
  NotificationItem,
  Transaction,
  TransactionCategory,
  TransactionType,
} from '../types';

export interface HeaderProps {
  activeTab: 'overview' | 'canvas' | 'transactions' | 'budgets' | 'accounts' | 'analytics' | 'code';
  setActiveTab: (tab: 'overview' | 'canvas' | 'transactions' | 'budgets' | 'accounts' | 'analytics' | 'code') => void;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  isRealtimeActive: boolean;
  setIsRealtimeActive: (active: boolean) => void;
  onOpenAddModal: () => void;
  onTriggerSimulatedExpense: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: NotificationItem[];
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  onClearNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currency,
  setCurrency,
  isRealtimeActive,
  setIsRealtimeActive,
  onOpenAddModal,
  onTriggerSimulatedExpense,
  searchQuery,
  setSearchQuery,
  notifications,
  showNotifications,
  setShowNotifications,
  onClearNotifications,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 py-2.5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 max-w-[1750px] mx-auto">
        {/* Brand & Studio Tabs */}
        <div className="flex items-center justify-between lg:justify-start gap-4 flex-wrap">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-400 p-0.5 shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#090d16] rounded-[7px] flex items-center justify-center">
                <Coins className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-base tracking-tight text-white font-mono">finance-flow</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                Studio
              </span>
            </div>
          </div>

          {/* Live Runtime Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-400 font-mono">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  isRealtimeActive ? 'bg-emerald-400' : 'bg-slate-500'
                } opacity-75`}
              ></span>
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isRealtimeActive ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              ></span>
            </span>
            <span>{isRealtimeActive ? 'Live Sync Active' : 'Live Sync Paused'}</span>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            <button
              id="tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Studio Overview
            </button>
            <button
              id="tab-canvas"
              onClick={() => setActiveTab('canvas')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'canvas'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Cash Flow Canvas
            </button>
            <button
              id="tab-transactions"
              onClick={() => setActiveTab('transactions')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'transactions'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              Live Ledger
            </button>
            <button
              id="tab-budgets"
              onClick={() => setActiveTab('budgets')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'budgets'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              Budgets & Limits
            </button>
            <button
              id="tab-accounts"
              onClick={() => setActiveTab('accounts')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'accounts'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-cyan-400" />
              Accounts & Vaults
            </button>
            <button
              id="tab-analytics"
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <PieChart className="w-3.5 h-3.5 text-rose-400" />
              Analytics
            </button>
            <button
              id="tab-code"
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'code'
                  ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-amber-400" />
              Code & Export
            </button>
          </nav>
        </div>

        {/* Controls & Quick Actions */}
        <div className="flex items-center gap-2.5 flex-wrap justify-end">
          {/* Global Search */}
          <div className="relative hidden md:block w-44 lg:w-52">
            <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-500" />
            <input
              id="global-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search expenses, merchants..."
              className="w-full pl-8 pr-2.5 py-1.5 rounded-md bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition"
            />
          </div>

          {/* Realtime Stream Toggle */}
          <button
            id="btn-toggle-realtime"
            onClick={() => setIsRealtimeActive(!isRealtimeActive)}
            title={isRealtimeActive ? 'Pause real-time incoming transactions' : 'Enable real-time expense streaming'}
            className={`px-2.5 py-1.5 rounded-md text-xs font-mono flex items-center gap-1.5 border transition ${
              isRealtimeActive
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/50'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isRealtimeActive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">Stream:</span>
            <span className="font-semibold">{isRealtimeActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Instant Simulated Swipe Button */}
          <button
            id="btn-simulate-expense"
            onClick={onTriggerSimulatedExpense}
            title="Simulate an instant real-time card swipe/expense"
            className="px-2.5 py-1.5 rounded-md text-xs font-medium bg-slate-900/90 text-amber-300 border border-amber-500/30 hover:bg-amber-950/30 hover:border-amber-500/60 transition flex items-center gap-1"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
            <span className="hidden xl:inline">Test Swipe</span>
          </button>

          {/* Currency Switcher */}
          <select
            id="currency-selector"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="px-2 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-slate-700 cursor-pointer"
          >
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
            <option value="JPY">¥ JPY</option>
            <option value="INR">₹ INR</option>
            <option value="CAD">CA$ CAD</option>
          </select>

          {/* Notification Bell */}
          <div className="relative">
            <button
              id="btn-notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition relative"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-lg bg-[#0d1424] border border-slate-700/80 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-semibold text-white">Live Activity Alerts</span>
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={onClearNotifications}
                      className="text-[11px] text-slate-400 hover:text-slate-200"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto mt-2 space-y-2">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-4">No recent notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-2 rounded bg-slate-900/60 border border-slate-800/80 text-xs hover:border-slate-700 transition"
                      >
                        <div className="flex items-center justify-between text-slate-300 font-medium">
                          <span>{notif.title}</span>
                          <span className="text-[10px] text-slate-500">{notif.timestamp}</span>
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            id="btn-add-transaction"
            onClick={onOpenAddModal}
            className="px-3 py-1.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-semibold text-xs transition shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (transaction: Transaction) => void;
  accounts: Account[];
  currency: CurrencyCode;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
  accounts,
}) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [merchant, setMerchant] = useState<string>('');
  const [category, setCategory] = useState<TransactionCategory>('Dining & Drinks');
  const [accountId, setAccountId] = useState<string>(accounts[0]?.id || 'acc-1');
  const [toAccountId, setToAccountId] = useState<string>(accounts[1]?.id || 'acc-2');
  const [date, setDate] = useState<string>('2026-09-09');
  const [time, setTime] = useState<string>('12:00');
  const [note, setNote] = useState<string>('');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickAmounts = [5, 12, 25, 50, 100, 250];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      amount: numAmount,
      type,
      category,
      accountId,
      toAccountId: type === 'transfer' ? toAccountId : undefined,
      merchant: merchant.trim() || (type === 'transfer' ? 'Account Transfer' : 'Expense Payee'),
      date,
      time,
      note: note.trim() || undefined,
      isRecurring,
      status: 'cleared',
    };

    onAddTransaction(newTx);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#0b101c] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold font-mono text-white">Log Real-Time Transaction</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Type selector tabs */}
        <div className="grid grid-cols-3 p-2 bg-[#080c16] border-b border-slate-800 gap-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setType('expense');
              setCategory('Dining & Drinks');
            }}
            className={`py-2 rounded-md transition ${
              type === 'expense'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Expense (-)
          </button>
          <button
            type="button"
            onClick={() => {
              setType('income');
              setCategory('Salary');
            }}
            className={`py-2 rounded-md transition ${
              type === 'income'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Income (+)
          </button>
          <button
            type="button"
            onClick={() => {
              setType('transfer');
              setCategory('Other');
            }}
            className={`py-2 rounded-md transition ${
              type === 'transfer'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Transfer (⇄)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          {/* Amount input */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Transaction Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-base font-bold font-mono text-slate-400">$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                autoFocus
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xl font-mono font-bold rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Quick amount chips */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto pb-1">
              {quickAmounts.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setAmount(q.toString())}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-[11px] font-mono text-slate-300 transition"
                >
                  +${q}
                </button>
              ))}
            </div>
          </div>

          {/* Payee / Merchant */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              {type === 'income' ? 'Client / Employer / Source' : 'Merchant / Payee Name'}
            </label>
            <input
              type="text"
              required
              placeholder={type === 'income' ? 'e.g. Acme Corp' : 'e.g. Trader Joe’s'}
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category & Account */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TransactionCategory)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              >
                {Object.keys(CATEGORY_METADATA).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">
                {type === 'transfer' ? 'From Account' : 'Account'}
              </label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* If transfer, Destination account */}
          {type === 'transfer' && (
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">To Destination Account</label>
              <select
                value={toAccountId}
                onChange={(e) => setToAccountId(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-500"
              >
                {accounts
                  .filter((a) => a.id !== accountId)
                  .map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-slate-400 mb-1">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono"
              />
            </div>
          </div>

          {/* Note / Memo */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">Note (Optional)</label>
            <input
              type="text"
              placeholder="Add details, receipt tags, or notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-600 focus:outline-none"
            />
          </div>

          {/* Recurring Toggle */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="recurring-check"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 accent-amber-500 cursor-pointer"
            />
            <label htmlFor="recurring-check" className="text-slate-300 text-xs cursor-pointer select-none">
              Mark as recurring monthly expense / subscription
            </label>
          </div>

          {/* Submit Action */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg text-slate-400 hover:text-white font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 active:scale-95 transition"
            >
              Submit & Reconcile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
