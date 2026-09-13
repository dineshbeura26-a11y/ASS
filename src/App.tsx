import React, { useEffect, useMemo, useState } from 'react';
import { Header, AddTransactionModal } from './components/HeaderAndModal';
import { VisualCashFlowCanvas } from './components/CashFlowCanvas';
import {
  OverviewDashboard,
  TransactionsView,
  BudgetsView,
  AccountsView,
  AnalyticsView,
} from './components/Views';
import { CodeStudioView } from './components/CodeStudioView';
import {
  Account,
  Budget,
  CurrencyCode,
  FinancialGoal,
  INITIAL_ACCOUNTS,
  INITIAL_BUDGETS,
  INITIAL_GOALS,
  INITIAL_TRANSACTIONS,
  NotificationItem,
  REALTIME_EVENT_TEMPLATES,
  Transaction,
} from './types';
import { playTransactionSound } from './utils';

export function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'canvas' | 'transactions' | 'budgets' | 'accounts' | 'analytics' | 'code'
  >('overview');

  // Persistence: Currency
  const [currency, setCurrency] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('ff_currency');
    return (saved as CurrencyCode) || 'USD';
  });

  // Persistence: Transactions
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('ff_transactions');
      return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
    } catch {
      return INITIAL_TRANSACTIONS;
    }
  });

  // Persistence: Accounts
  const [accounts, setAccounts] = useState<Account[]>(() => {
    try {
      const saved = localStorage.getItem('ff_accounts');
      return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
    } catch {
      return INITIAL_ACCOUNTS;
    }
  });

  // Persistence: Budgets
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    try {
      const saved = localStorage.getItem('ff_budgets');
      return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
    } catch {
      return INITIAL_BUDGETS;
    }
  });

  // Persistence: Goals
  const [goals, setGoals] = useState<FinancialGoal[]>(() => {
    try {
      const saved = localStorage.getItem('ff_goals');
      return saved ? JSON.parse(saved) : INITIAL_GOALS;
    } catch {
      return INITIAL_GOALS;
    }
  });

  // Real-time Event Streaming Simulator State
  const [isRealtimeActive, setIsRealtimeActive] = useState<boolean>(true);
  const [lastSimulatedTx, setLastSimulatedTx] = useState<Transaction | null>(null);

  // Global UI Modals & Popovers
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      title: 'Direct Deposit Cleared',
      message: 'Anthropic Labs payroll +$5,400.00 posted to Main Checking.',
      type: 'success',
      timestamp: '2h ago',
      read: false,
    },
    {
      id: 'n-2',
      title: 'Recurring Subscription',
      message: 'Netflix 4K -$21.99 processed on Sapphire Reserve.',
      type: 'info',
      timestamp: '5h ago',
      read: false,
    },
  ]);

  // Sync to LocalStorage on changes
  useEffect(() => {
    localStorage.setItem('ff_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ff_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('ff_budgets', JSON.stringify(budgets));
  }, [budgets]);

  useEffect(() => {
    localStorage.setItem('ff_goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('ff_currency', currency);
  }, [currency]);

  // Monthly Aggregates
  const monthlyIncome = useMemo(() => {
    return transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  const monthlyExpense = useMemo(() => {
    return transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  // Action: Add new transaction & reconcile account balance
  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);

    // Update account balances
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) => {
        if (acc.id === newTx.accountId) {
          if (newTx.type === 'expense') {
            return {
              ...acc,
              balance: acc.type === 'credit' ? acc.balance - newTx.amount : acc.balance - newTx.amount,
            };
          } else if (newTx.type === 'income') {
            return { ...acc, balance: acc.balance + newTx.amount };
          } else if (newTx.type === 'transfer') {
            return { ...acc, balance: acc.balance - newTx.amount };
          }
        }
        if (newTx.type === 'transfer' && acc.id === newTx.toAccountId) {
          return { ...acc, balance: acc.balance + newTx.amount };
        }
        return acc;
      })
    );

    // Audio chime
    playTransactionSound(newTx.type === 'income' ? 'income' : 'expense');

    // Add alert notification
    setNotifications((prev) => [
      {
        id: `n-${Date.now()}`,
        title: `${newTx.type === 'income' ? 'Incoming Payment' : 'New Expense'} Cleared`,
        message: `${newTx.merchant} (${newTx.category}): $${newTx.amount.toFixed(2)}`,
        type: newTx.type === 'income' ? 'success' : 'info',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  // Action: Delete transaction & revert balance
  const handleDeleteTransaction = (id: string) => {
    const tx = transactions.find((t) => t.id === id);
    if (!tx) return;

    setTransactions((prev) => prev.filter((t) => t.id !== id));

    // Revert account balance
    setAccounts((prevAccounts) =>
      prevAccounts.map((acc) => {
        if (acc.id === tx.accountId) {
          if (tx.type === 'expense') {
            return { ...acc, balance: acc.balance + tx.amount };
          } else if (tx.type === 'income') {
            return { ...acc, balance: acc.balance - tx.amount };
          } else if (tx.type === 'transfer') {
            return { ...acc, balance: acc.balance + tx.amount };
          }
        }
        if (tx.type === 'transfer' && acc.id === tx.toAccountId) {
          return { ...acc, balance: acc.balance - tx.amount };
        }
        return acc;
      })
    );
  };

  // Action: Import transactions from JSON
  const handleImportTransactions = (imported: Transaction[]) => {
    setTransactions((prev) => [...imported, ...prev]);
    playTransactionSound('income');
  };

  // Action: Update budget limit
  const handleUpdateBudgetLimit = (budgetId: string, newLimit: number) => {
    setBudgets((prev) =>
      prev.map((b) => (b.id === budgetId ? { ...b, monthlyLimit: newLimit } : b))
    );
  };

  // Action: Create budget
  const handleCreateBudget = (budget: Budget) => {
    setBudgets((prev) => [...prev, budget]);
  };

  // Action: Update goal progress
  const handleUpdateGoalProgress = (goalId: string, delta: number) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId ? { ...g, currentAmount: Math.min(g.targetAmount, g.currentAmount + delta) } : g
      )
    );
  };

  // Action: Create goal
  const handleCreateGoal = (goal: FinancialGoal) => {
    setGoals((prev) => [...prev, goal]);
  };

  // Simulated live expense trigger (button or timer)
  const triggerSimulatedExpense = () => {
    const template =
      REALTIME_EVENT_TEMPLATES[Math.floor(Math.random() * REALTIME_EVENT_TEMPLATES.length)];
    const rawAmt = Math.random() * (template.max - template.min) + template.min;
    const amount = Math.round(rawAmt * 100) / 100;
    const isInc = (template as any).isIncome === true;

    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10);
    const timeStr = now.toTimeString().slice(0, 5);

    const newSimulatedTx: Transaction = {
      id: `tx-live-${Date.now()}`,
      amount,
      type: isInc ? 'income' : 'expense',
      category: template.category as any,
      accountId: template.accountId,
      merchant: template.merchant,
      date: dateStr,
      time: timeStr,
      note: template.note,
      status: 'cleared',
    };

    setLastSimulatedTx(newSimulatedTx);
    handleAddTransaction(newSimulatedTx);
  };

  // Real-time automatic background ticker
  useEffect(() => {
    if (!isRealtimeActive) return;

    const interval = setInterval(() => {
      triggerSimulatedExpense();
    }, 28000); // Trigger a realistic incoming real-time swipe every 28 seconds

    return () => clearInterval(interval);
  }, [isRealtimeActive]);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Application Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        setCurrency={setCurrency}
        isRealtimeActive={isRealtimeActive}
        setIsRealtimeActive={setIsRealtimeActive}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onTriggerSimulatedExpense={triggerSimulatedExpense}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        notifications={notifications}
        showNotifications={showNotifications}
        setShowNotifications={setShowNotifications}
        onClearNotifications={() => setNotifications([])}
      />

      {/* Main View Router */}
      <main className="transition-all duration-150">
        {activeTab === 'overview' && (
          <OverviewDashboard
            transactions={transactions}
            accounts={accounts}
            budgets={budgets}
            goals={goals}
            currency={currency}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onTriggerSimulatedExpense={triggerSimulatedExpense}
            onNavigateToTab={setActiveTab}
            lastSimulatedTx={lastSimulatedTx}
          />
        )}

        {activeTab === 'canvas' && (
          <VisualCashFlowCanvas
            transactions={transactions}
            monthlyIncome={monthlyIncome}
            monthlyExpense={monthlyExpense}
            currency={currency}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onTriggerSimulatedExpense={triggerSimulatedExpense}
          />
        )}

        {activeTab === 'transactions' && (
          <TransactionsView
            transactions={transactions}
            accounts={accounts}
            currency={currency}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onDeleteTransaction={handleDeleteTransaction}
            onImportTransactions={handleImportTransactions}
            onTriggerSimulatedExpense={triggerSimulatedExpense}
          />
        )}

        {activeTab === 'budgets' && (
          <BudgetsView
            budgets={budgets}
            transactions={transactions}
            currency={currency}
            onUpdateBudgetLimit={handleUpdateBudgetLimit}
            onCreateBudget={handleCreateBudget}
          />
        )}

        {activeTab === 'accounts' && (
          <AccountsView
            accounts={accounts}
            goals={goals}
            currency={currency}
            onUpdateGoalProgress={handleUpdateGoalProgress}
            onCreateGoal={handleCreateGoal}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView transactions={transactions} currency={currency} />
        )}

        {activeTab === 'code' && (
          <CodeStudioView
            transactions={transactions}
            accounts={accounts}
            budgets={budgets}
            goals={goals}
            currency={currency}
            onImportTransactions={handleImportTransactions}
          />
        )}
      </main>

      {/* Global Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        accounts={accounts}
        currency={currency}
      />
    </div>
  );
}

export default App;
