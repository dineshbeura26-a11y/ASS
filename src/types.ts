export type TransactionType = 'expense' | 'income' | 'transfer';

export type TransactionCategory =
  | 'Housing'
  | 'Groceries'
  | 'Dining & Drinks'
  | 'Transport'
  | 'Utilities'
  | 'Subscriptions & Tech'
  | 'Entertainment'
  | 'Health & Fitness'
  | 'Shopping'
  | 'Education'
  | 'Investment'
  | 'Salary'
  | 'Freelance'
  | 'Gifts & Bonus'
  | 'Other';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  accountId: string;
  toAccountId?: string;
  merchant: string;
  date: string;
  time: string;
  note?: string;
  tags?: string[];
  isRecurring?: boolean;
  status: 'cleared' | 'pending';
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'cash';
  balance: number;
  accountNumberMask: string;
  color: string;
  institution: string;
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  monthlyLimit: number;
  period: 'monthly' | 'weekly';
  alertThreshold: number;
}

export interface CashFlowNode {
  id: string;
  title: string;
  subtitle: string;
  type: 'source' | 'hub' | 'allocation' | 'sink';
  amount: number;
  percentage?: number;
  status: 'active' | 'optimal' | 'warning' | 'critical';
  x: number;
  y: number;
  category?: TransactionCategory;
  accountId?: string;
}

export interface CashFlowLink {
  id: string;
  from: string;
  to: string;
  label?: string;
  flowRate: number;
  isActive: boolean;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  color: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' | 'CAD';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹',
  CAD: 'CA$',
};

export const CATEGORY_METADATA: Record<
  TransactionCategory,
  { color: string; bg: string; defaultType: 'expense' | 'income' }
> = {
  Housing: { color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)', defaultType: 'expense' },
  Groceries: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', defaultType: 'expense' },
  'Dining & Drinks': { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', defaultType: 'expense' },
  Transport: { color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)', defaultType: 'expense' },
  Utilities: { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)', defaultType: 'expense' },
  'Subscriptions & Tech': { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)', defaultType: 'expense' },
  Entertainment: { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', defaultType: 'expense' },
  'Health & Fitness': { color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.15)', defaultType: 'expense' },
  Shopping: { color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.15)', defaultType: 'expense' },
  Education: { color: '#a855f7', bg: 'rgba(168, 85, 247, 0.15)', defaultType: 'expense' },
  Investment: { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)', defaultType: 'expense' },
  Salary: { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', defaultType: 'income' },
  Freelance: { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', defaultType: 'income' },
  'Gifts & Bonus': { color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)', defaultType: 'income' },
  Other: { color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.15)', defaultType: 'expense' },
};

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'acc-1',
    name: 'Main Checking',
    type: 'checking',
    balance: 4850.75,
    accountNumberMask: '•••• 4912',
    color: '#3b82f6',
    institution: 'Chase Bank',
  },
  {
    id: 'acc-2',
    name: 'High-Yield Savings (4.75%)',
    type: 'savings',
    balance: 21400.0,
    accountNumberMask: '•••• 8821',
    color: '#10b981',
    institution: 'Marcus by Goldman',
  },
  {
    id: 'acc-3',
    name: 'Sapphire Reserve Card',
    type: 'credit',
    balance: -842.3,
    accountNumberMask: '•••• 3190',
    color: '#8b5cf6',
    institution: 'Chase Credit',
  },
  {
    id: 'acc-4',
    name: 'Index Funds & Equity',
    type: 'investment',
    balance: 38290.5,
    accountNumberMask: '•••• 5022',
    color: '#f59e0b',
    institution: 'Vanguard Brokerage',
  },
  {
    id: 'acc-5',
    name: 'Physical Cash Wallet',
    type: 'cash',
    balance: 180.0,
    accountNumberMask: 'Cash',
    color: '#14b8a6',
    institution: 'Physical Wallet',
  },
];

export const INITIAL_BUDGETS: Budget[] = [
  { id: 'b-1', category: 'Housing', monthlyLimit: 1750, period: 'monthly', alertThreshold: 0.9 },
  { id: 'b-2', category: 'Groceries', monthlyLimit: 550, period: 'monthly', alertThreshold: 0.85 },
  { id: 'b-3', category: 'Dining & Drinks', monthlyLimit: 400, period: 'monthly', alertThreshold: 0.8 },
  { id: 'b-4', category: 'Transport', monthlyLimit: 250, period: 'monthly', alertThreshold: 0.85 },
  { id: 'b-5', category: 'Utilities', monthlyLimit: 220, period: 'monthly', alertThreshold: 0.9 },
  { id: 'b-6', category: 'Subscriptions & Tech', monthlyLimit: 140, period: 'monthly', alertThreshold: 0.95 },
  { id: 'b-7', category: 'Shopping', monthlyLimit: 300, period: 'monthly', alertThreshold: 0.8 },
  { id: 'b-8', category: 'Health & Fitness', monthlyLimit: 120, period: 'monthly', alertThreshold: 0.85 },
];

export const INITIAL_GOALS: FinancialGoal[] = [
  {
    id: 'g-1',
    title: 'Emergency Reserve (6 Months)',
    targetAmount: 25000,
    currentAmount: 21400,
    deadline: '2026-12-31',
    category: 'Security',
    color: '#10b981',
  },
  {
    id: 'g-2',
    title: 'Tokyo Spring Vacation',
    targetAmount: 4500,
    currentAmount: 3100,
    deadline: '2027-04-15',
    category: 'Travel',
    color: '#3b82f6',
  },
  {
    id: 'g-3',
    title: 'Annual Tech Hardware Refresh',
    targetAmount: 2800,
    currentAmount: 1950,
    deadline: '2026-11-20',
    category: 'Gear',
    color: '#f59e0b',
  },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    amount: 5400.0,
    type: 'income',
    category: 'Salary',
    accountId: 'acc-1',
    merchant: 'Anthropic Labs Inc.',
    date: '2026-09-01',
    time: '09:00',
    note: 'Bi-weekly Direct Deposit payroll',
    status: 'cleared',
    isRecurring: true,
  },
  {
    id: 'tx-2',
    amount: 1650.0,
    type: 'expense',
    category: 'Housing',
    accountId: 'acc-1',
    merchant: 'Avalon Bay Community Rent',
    date: '2026-09-02',
    time: '10:15',
    note: 'September Apartment Lease Rent',
    status: 'cleared',
    isRecurring: true,
  },
  {
    id: 'tx-3',
    amount: 1250.0,
    type: 'income',
    category: 'Freelance',
    accountId: 'acc-1',
    merchant: 'Nexus AI Architecture Client',
    date: '2026-09-03',
    time: '14:30',
    note: 'Completed Milestone 2 Deliverable',
    status: 'cleared',
  },
  {
    id: 'tx-4',
    amount: 142.8,
    type: 'expense',
    category: 'Groceries',
    accountId: 'acc-3',
    merchant: 'Whole Foods Market',
    date: '2026-09-04',
    time: '18:42',
    note: 'Organic produce, berries, olive oil, salmon',
    status: 'cleared',
  },
  {
    id: 'tx-5',
    amount: 32.5,
    type: 'expense',
    category: 'Dining & Drinks',
    accountId: 'acc-3',
    merchant: 'Blue Bottle Coffee & Bakery',
    date: '2026-09-05',
    time: '08:35',
    note: 'Single origin pour-over + pastries with team',
    status: 'cleared',
  },
  {
    id: 'tx-6',
    amount: 500.0,
    type: 'transfer',
    category: 'Other',
    accountId: 'acc-1',
    toAccountId: 'acc-2',
    merchant: 'Internal Savings Auto-Transfer',
    date: '2026-09-05',
    time: '11:00',
    note: 'Pay Yourself First automated rule',
    status: 'cleared',
    isRecurring: true,
  },
  {
    id: 'tx-7',
    amount: 48.0,
    type: 'expense',
    category: 'Transport',
    accountId: 'acc-3',
    merchant: 'Uber Technologies',
    date: '2026-09-06',
    time: '21:10',
    note: 'Ride home from airport terminal',
    status: 'cleared',
  },
  {
    id: 'tx-8',
    amount: 79.99,
    type: 'expense',
    category: 'Health & Fitness',
    accountId: 'acc-3',
    merchant: 'Equinox Fitness Club',
    date: '2026-09-06',
    time: '07:00',
    note: 'Monthly Gym & Recovery pass',
    status: 'cleared',
    isRecurring: true,
  },
  {
    id: 'tx-9',
    amount: 21.99,
    type: 'expense',
    category: 'Subscriptions & Tech',
    accountId: 'acc-3',
    merchant: 'Netflix 4K Premium',
    date: '2026-09-07',
    time: '04:12',
    note: 'Monthly stream subscription',
    status: 'cleared',
    isRecurring: true,
  },
  {
    id: 'tx-10',
    amount: 64.3,
    type: 'expense',
    category: 'Dining & Drinks',
    accountId: 'acc-3',
    merchant: 'Ramen Tatsu-Ya',
    date: '2026-09-07',
    time: '20:15',
    note: 'Dinner with friends',
    status: 'cleared',
  },
  {
    id: 'tx-11',
    amount: 88.5,
    type: 'expense',
    category: 'Utilities',
    accountId: 'acc-1',
    merchant: 'Pacific Gas & Electric',
    date: '2026-09-08',
    time: '11:20',
    note: 'Electric and Gas statement',
    status: 'cleared',
  },
  {
    id: 'tx-12',
    amount: 115.4,
    type: 'expense',
    category: 'Groceries',
    accountId: 'acc-3',
    merchant: "Trader Joe's",
    date: '2026-09-08',
    time: '17:30',
    note: 'Pantry staples and snacks',
    status: 'cleared',
  },
  {
    id: 'tx-13',
    amount: 45.0,
    type: 'expense',
    category: 'Transport',
    accountId: 'acc-3',
    merchant: 'Chevron Gas Station',
    date: '2026-09-09',
    time: '08:50',
    note: 'Vehicle fuel refill',
    status: 'cleared',
  },
  {
    id: 'tx-14',
    amount: 35.0,
    type: 'expense',
    category: 'Subscriptions & Tech',
    accountId: 'acc-3',
    merchant: 'Cursor Pro AI Editor',
    date: '2026-09-09',
    time: '10:00',
    note: 'Monthly development suite',
    status: 'cleared',
    isRecurring: true,
  },
  {
    id: 'tx-15',
    amount: 14.75,
    type: 'expense',
    category: 'Dining & Drinks',
    accountId: 'acc-5',
    merchant: 'Chipotle Mexican Grill',
    date: '2026-09-09',
    time: '12:30',
    note: 'Quick lunch bowl (Cash)',
    status: 'cleared',
  },
];

export const REALTIME_EVENT_TEMPLATES = [
  { merchant: 'Starbucks Reserve', category: 'Dining & Drinks', min: 4.5, max: 9.8, accountId: 'acc-3', note: 'Iced Oat Latte & Cookie' },
  { merchant: 'Target Express', category: 'Shopping', min: 14.0, max: 48.0, accountId: 'acc-3', note: 'Household supplies' },
  { merchant: 'Uber Eats', category: 'Dining & Drinks', min: 22.0, max: 42.0, accountId: 'acc-3', note: 'Dinner order delivered' },
  { merchant: 'Lyft Express', category: 'Transport', min: 12.5, max: 28.0, accountId: 'acc-3', note: 'Downtown transit ride' },
  { merchant: 'Amazon Marketplace', category: 'Shopping', min: 19.99, max: 85.0, accountId: 'acc-3', note: 'Prime 1-day delivery' },
  { merchant: 'Shell Gasoline', category: 'Transport', min: 35.0, max: 55.0, accountId: 'acc-3', note: 'Gas pump 4' },
  { merchant: 'Spotify Family', category: 'Subscriptions & Tech', min: 16.99, max: 16.99, accountId: 'acc-3', note: 'Recurring audio subscription' },
  { merchant: 'Local Pharmacy', category: 'Health & Fitness', min: 11.2, max: 32.5, accountId: 'acc-3', note: 'Supplements and vitamins' },
  { merchant: 'Fresh Market Grocer', category: 'Groceries', min: 28.0, max: 74.0, accountId: 'acc-1', note: 'Fresh greens & bakery' },
  { merchant: 'Steam Digital Games', category: 'Entertainment', min: 14.99, max: 59.99, accountId: 'acc-3', note: 'Indie game download' },
  { merchant: 'Side Gig Consulting Payout', category: 'Freelance', min: 250.0, max: 600.0, accountId: 'acc-1', note: 'Instant Stripe payment received', isIncome: true },
];
