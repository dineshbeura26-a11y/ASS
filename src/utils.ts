import { CashFlowLink, CashFlowNode, CurrencyCode, CURRENCY_SYMBOLS, Transaction } from './types';

// Formatting Utilities
export function formatCurrency(amount: number, currency: CurrencyCode = 'USD', compact = false): string {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  if (compact && absAmount >= 1000) {
    if (absAmount >= 1000000) {
      return `${isNegative ? '-' : ''}${symbol}${(absAmount / 1000000).toFixed(1)}M`;
    }
    return `${isNegative ? '-' : ''}${symbol}${(absAmount / 1000).toFixed(1)}k`;
  }

  const formattedNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(absAmount);

  return `${isNegative ? '-' : ''}${symbol}${formattedNumber}`;
}

export function formatDate(dateString: string): string {
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return dateString;
  }
}

export function getRelativeTime(timestamp: string): string {
  const now = new Date().getTime();
  const date = new Date(timestamp).getTime();
  const diffMs = now - date;

  if (isNaN(diffMs)) return 'just now';
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return `${Math.max(1, diffSec)}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function exportTransactionsToCSV(transactions: Transaction[]): void {
  const headers = ['ID', 'Date', 'Time', 'Merchant', 'Category', 'Type', 'Amount', 'Account', 'Status', 'Note'];
  const rows = transactions.map((t) => [
    t.id,
    t.date,
    t.time || '',
    `"${(t.merchant || '').replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.amount,
    t.accountId,
    t.status,
    `"${(t.note || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `FinanceFlow_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Synthesized Web Audio Feedback
let audioCtx: AudioContext | null = null;

export function playTransactionSound(type: 'expense' | 'income' | 'alert' = 'expense'): void {
  try {
    if (typeof window === 'undefined') return;
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'income') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'alert') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(330, now + 0.08);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    }
  } catch {
    // Audio Context not permitted or muted, safely ignore
  }
}

// Cash Flow Graph Computation
export function computeCashFlowGraph(
  transactions: Transaction[],
  monthlyIncome: number,
  monthlyExpense: number
): {
  nodes: CashFlowNode[];
  links: CashFlowLink[];
} {
  const categorySpends: Record<string, number> = {};
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((tx) => {
    if (tx.type === 'expense') {
      categorySpends[tx.category] = (categorySpends[tx.category] || 0) + tx.amount;
      totalExpense += tx.amount;
    } else if (tx.type === 'income') {
      totalIncome += tx.amount;
    }
  });

  const salaryIncome =
    transactions.filter((t) => t.category === 'Salary').reduce((acc, t) => acc + t.amount, 0) || 5400;

  const freelanceIncome =
    transactions
      .filter((t) => t.category === 'Freelance' || t.category === 'Gifts & Bonus')
      .reduce((acc, t) => acc + t.amount, 0) || 1250;

  const investmentIncome = 240;

  const housingSpend = categorySpends['Housing'] || 1650;
  const grocerySpend = categorySpends['Groceries'] || 258.2;
  const diningSpend = categorySpends['Dining & Drinks'] || 111.55;
  const transportSpend = categorySpends['Transport'] || 93.0;
  const techSpend = categorySpends['Subscriptions & Tech'] || 56.99;
  const healthSpend = categorySpends['Health & Fitness'] || 79.99;

  const nodes: CashFlowNode[] = [
    {
      id: 'node-salary',
      title: 'Primary Salary',
      subtitle: 'Bi-Weekly Direct Deposit',
      type: 'source',
      amount: salaryIncome,
      status: 'active',
      x: 40,
      y: 80,
      category: 'Salary',
    },
    {
      id: 'node-freelance',
      title: 'Freelance & Consult',
      subtitle: 'Client Invoices & Stripe',
      type: 'source',
      amount: freelanceIncome,
      status: 'active',
      x: 40,
      y: 220,
      category: 'Freelance',
    },
    {
      id: 'node-yield',
      title: 'Passive Yield & Divs',
      subtitle: 'Brokerage & HYSA Interest',
      type: 'source',
      amount: investmentIncome,
      status: 'optimal',
      x: 40,
      y: 360,
      category: 'Investment',
    },
    {
      id: 'node-hub',
      title: 'Central Checking Pool',
      subtitle: 'Chase Liquidity Engine',
      type: 'hub',
      amount: totalIncome > 0 ? totalIncome : 6890,
      status: 'active',
      x: 290,
      y: 200,
      accountId: 'acc-1',
    },
    {
      id: 'node-env-needs',
      title: 'Fixed Essentials (50%)',
      subtitle: 'Housing, Groceries, Utilities',
      type: 'allocation',
      amount: housingSpend + grocerySpend + transportSpend,
      percentage: 50,
      status: 'optimal',
      x: 540,
      y: 100,
    },
    {
      id: 'node-env-wants',
      title: 'Flexible Lifestyle (30%)',
      subtitle: 'Dining, Subscriptions, Fun',
      type: 'allocation',
      amount: diningSpend + techSpend + healthSpend,
      percentage: 30,
      status: 'active',
      x: 540,
      y: 240,
    },
    {
      id: 'node-env-savings',
      title: 'Wealth & Savings (20%)',
      subtitle: 'HYSA Reserve & Portfolios',
      type: 'allocation',
      amount: 1200,
      percentage: 20,
      status: 'optimal',
      x: 540,
      y: 380,
    },
    {
      id: 'node-sink-housing',
      title: 'Housing & Rent',
      subtitle: 'Avalon Bay Lease',
      type: 'sink',
      amount: housingSpend,
      status: 'active',
      x: 800,
      y: 40,
      category: 'Housing',
    },
    {
      id: 'node-sink-food',
      title: 'Food & Groceries',
      subtitle: 'Whole Foods, Trader Joes',
      type: 'sink',
      amount: grocerySpend,
      status: 'active',
      x: 800,
      y: 150,
      category: 'Groceries',
    },
    {
      id: 'node-sink-dining',
      title: 'Dining & Cafes',
      subtitle: 'Restaurants & Coffee',
      type: 'sink',
      amount: diningSpend,
      status: diningSpend > 300 ? 'warning' : 'active',
      x: 800,
      y: 250,
      category: 'Dining & Drinks',
    },
    {
      id: 'node-sink-tech',
      title: 'Cloud & Subscriptions',
      subtitle: 'Netflix, Cursor, Equinox',
      type: 'sink',
      amount: techSpend + healthSpend,
      status: 'active',
      x: 800,
      y: 350,
      category: 'Subscriptions & Tech',
    },
    {
      id: 'node-sink-invest',
      title: 'HYSA Compound Vault',
      subtitle: 'Marcus Goldman 4.75%',
      type: 'sink',
      amount: 1200,
      status: 'optimal',
      x: 800,
      y: 450,
      category: 'Investment',
    },
  ];

  const links: CashFlowLink[] = [
    { id: 'l1', from: 'node-salary', to: 'node-hub', flowRate: salaryIncome, isActive: true },
    { id: 'l2', from: 'node-freelance', to: 'node-hub', flowRate: freelanceIncome, isActive: true },
    { id: 'l3', from: 'node-yield', to: 'node-hub', flowRate: investmentIncome, isActive: true },

    { id: 'l4', from: 'node-hub', to: 'node-env-needs', flowRate: 2000, isActive: true },
    { id: 'l5', from: 'node-hub', to: 'node-env-wants', flowRate: 800, isActive: true },
    { id: 'l6', from: 'node-hub', to: 'node-env-savings', flowRate: 1200, isActive: true },

    { id: 'l7', from: 'node-env-needs', to: 'node-sink-housing', flowRate: housingSpend, isActive: true },
    { id: 'l8', from: 'node-env-needs', to: 'node-sink-food', flowRate: grocerySpend, isActive: true },
    { id: 'l9', from: 'node-env-wants', to: 'node-sink-dining', flowRate: diningSpend, isActive: true },
    { id: 'l10', from: 'node-env-wants', to: 'node-sink-tech', flowRate: techSpend + healthSpend, isActive: true },
    { id: 'l11', from: 'node-env-savings', to: 'node-sink-invest', flowRate: 1200, isActive: true },
  ];

  return { nodes, links };
}
