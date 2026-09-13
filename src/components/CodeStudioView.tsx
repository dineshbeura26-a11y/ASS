import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  Terminal,
  FileCode,
  FileJson,
  Upload,
  Sparkles,
  Zap,
  RefreshCw,
} from 'lucide-react';
import {
  Account,
  Budget,
  CurrencyCode,
  FinancialGoal,
  Transaction,
} from '../types';
import { formatCurrency } from '../utils';

interface CodeStudioViewProps {
  transactions: Transaction[];
  accounts: Account[];
  budgets: Budget[];
  goals: FinancialGoal[];
  currency: CurrencyCode;
  onImportTransactions: (imported: Transaction[]) => void;
}

export const CodeStudioView: React.FC<CodeStudioViewProps> = ({
  transactions,
  accounts,
  budgets,
  goals,
  currency,
  onImportTransactions,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'python' | 'html_css' | 'api' | 'json_export'>('python');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const handleDownloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate dynamic Python code reflecting current active dataset
  const dynamicPythonCode = `#!/usr/bin/env python3
"""
FinanceFlow - Python Financial Engine & Pacing Analyzer
Exported from FinanceFlow Studio on $(date)
"""
from dataclasses import dataclass
from typing import List, Dict

@dataclass
class Transaction:
    id: str
    merchant: str
    amount: float
    category: str
    tx_type: str  # 'income', 'expense', or 'transfer'
    date: str

class FinanceFlowEngine:
    def __init__(self):
        self.currency = "${currency}"
        self.transactions: List[Transaction] = [
${transactions.slice(0, 12).map(t => `            Transaction("${t.id}", "${t.merchant}", ${t.amount}, "${t.category}", "${t.type}", "${t.date}"),`).join('\n')}
        ]
        
        self.budgets: Dict[str, float] = {
${budgets.map(b => `            "${b.category}": ${b.monthlyLimit},`).join('\n')}
        }

    def add_transaction(self, merchant: str, amount: float, category: str, tx_type: str, date: str = "2026-09-12"):
        new_tx = Transaction(f"tx-py-{len(self.transactions) + 1}", merchant, amount, category, tx_type, date)
        self.transactions.append(new_tx)
        print(f" [+] Recorded {tx_type.upper()}: {merchant} ($ {amount:,.2f})")

    def run_analytics(self):
        total_income = sum(t.amount for t in self.transactions if t.tx_type == 'income')
        total_expense = sum(t.amount for t in self.transactions if t.tx_type == 'expense')
        net_savings = total_income - total_expense
        savings_rate = (net_savings / total_income * 100) if total_income > 0 else 0.0

        print("=" * 60)
        print("          FINANCEFLOW STUDIO - FINANCIAL REPORT")
        print("=" * 60)
        print(f" Inflow (Income):   +${'{'}total_income:,.2f{'}'}")
        print(f" Outflow (Expense): -${'{'}total_expense:,.2f{'}'}")
        print(f" Net Cash Balance:   ${'{'}net_savings:,.2f{'}'}  (Savings Rate: {savings_rate:.1f}%)")
        print("-" * 60)
        print(" [ CATEGORY BUDGET PACING ]")
        
        for category, limit in self.budgets.items():
            spent = sum(t.amount for t in self.transactions if t.category == category and t.tx_type == 'expense')
            pct = (spent / limit * 100) if limit > 0 else 0.0
            status = "⚠️ OVER" if spent > limit else "✅ HEALTHY"
            bar_len = min(20, int(pct / 5))
            bar = "█" * bar_len + "░" * (20 - bar_len)
            print(f"  {category:<14} [{bar}] {pct:>5.1f}% (\${spent:,.2f} / \${limit:,.2f}) {status}")
            
        print("-" * 60)
        print(" [ RECENT LEDGER ENTRIES ]")
        for tx in self.transactions[-5:]:
            sign = "+" if tx.tx_type == "income" else "-"
            print(f"  {tx.date} | {tx.merchant:<22} | {tx.category:<12} | {sign}\${tx.amount:,.2f}")
        print("=" * 60)

if __name__ == "__main__":
    engine = FinanceFlowEngine()
    engine.run_analytics()
`;

  // Generate dynamic Standalone HTML / CSS code
  const dynamicHtmlCssCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinanceFlow Standalone - Live Budget & Ledger</title>
  <style>
    :root {
      --bg: #070b14;
      --card-bg: #0f172a;
      --border: #1e293b;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #f59e0b;
      --income: #10b981;
      --expense: #ef4444;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 2.5rem 1rem;
      display: flex;
      justify-content: center;
    }
    .app-container {
      width: 100%;
      max-width: 860px;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border);
      padding-bottom: 1.25rem;
    }
    .brand { display: flex; align-items: center; gap: 0.75rem; }
    .badge {
      background: rgba(245, 158, 11, 0.15);
      color: var(--accent);
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
    }
    .metric-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.25rem;
    }
    .metric-card h4 {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
    }
    .amount { font-size: 1.75rem; font-weight: 700; font-family: monospace; }
    .amount.income { color: var(--income); }
    .amount.expense { color: var(--expense); }
    form {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr auto;
      gap: 0.75rem;
      background: var(--card-bg);
      border: 1px solid var(--border);
      padding: 1rem;
      border-radius: 12px;
    }
    input, select, button {
      background: #090d16;
      border: 1px solid var(--border);
      color: var(--text);
      padding: 0.65rem 0.85rem;
      border-radius: 8px;
      font-size: 0.875rem;
    }
    button {
      background: var(--accent);
      color: #000;
      font-weight: 700;
      border: none;
      cursor: pointer;
      padding: 0.65rem 1.25rem;
    }
    button:hover { opacity: 0.9; }
    .ledger-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }
    .ledger-table th, .ledger-table td {
      padding: 0.85rem 1rem;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }
    .ledger-table th { color: var(--text-muted); font-size: 0.75rem; font-weight: 600; }
    .num-col { text-align: right; font-family: monospace; font-weight: 600; }
  </style>
</head>
<body>
  <div class="app-container">
    <header>
      <div class="brand">
        <h2 style="font-family: monospace; font-size: 1.35rem;">finance-flow</h2>
        <span class="badge">Standalone Web Edition</span>
      </div>
      <div style="font-size: 0.85rem; color: var(--text-muted);">Active Currency: ${currency}</div>
    </header>

    <div class="metrics-grid">
      <div class="metric-card">
        <h4>Monthly Inflow</h4>
        <div class="amount income" id="income-val">$0.00</div>
      </div>
      <div class="metric-card">
        <h4>Monthly Outflow</h4>
        <div class="amount expense" id="expense-val">$0.00</div>
      </div>
      <div class="metric-card">
        <h4>Net Flow</h4>
        <div class="amount" id="net-val">$0.00</div>
      </div>
    </div>

    <!-- Quick Entry -->
    <form id="tx-form">
      <input type="text" id="desc-input" placeholder="Merchant or Payor (e.g. Blue Bottle, Stripe)" required />
      <input type="number" id="amt-input" placeholder="Amount" step="0.01" min="0.01" required />
      <select id="type-input">
        <option value="expense">Expense (-)</option>
        <option value="income">Income (+)</option>
      </select>
      <button type="submit">Log Entry</button>
    </form>

    <!-- Table -->
    <div style="background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; overflow: hidden;">
      <table class="ledger-table">
        <thead>
          <tr>
            <th>Merchant / Payor</th>
            <th>Type</th>
            <th class="num-col">Amount</th>
          </tr>
        </thead>
        <tbody id="tx-rows"></tbody>
      </table>
    </div>
  </div>

  <script>
    const dataset = ${JSON.stringify(transactions.slice(0, 10), null, 2)};

    function render() {
      const tbody = document.getElementById('tx-rows');
      tbody.innerHTML = '';
      let income = 0;
      let expense = 0;

      dataset.forEach(tx => {
        if (tx.type === 'income') income += tx.amount;
        if (tx.type === 'expense') expense += tx.amount;

        const row = document.createElement('tr');
        row.innerHTML = \`
          <td><strong>\${tx.merchant}</strong> <span style="color:var(--text-muted); font-size:0.75rem;">(\${tx.category})</span></td>
          <td style="color:\${tx.type === 'income' ? 'var(--income)' : 'var(--expense)'}; font-weight:600;">\${tx.type.toUpperCase()}</td>
          <td class="num-col" style="color:\${tx.type === 'income' ? 'var(--income)' : 'var(--text)'};">
            \${tx.type === 'income' ? '+' : '-'}\$\${tx.amount.toFixed(2)}
          </td>
        \`;
        tbody.prepend(row);
      });

      document.getElementById('income-val').textContent = '+$' + income.toLocaleString('en-US', { minimumFractionDigits: 2 });
      document.getElementById('expense-val').textContent = '-$' + expense.toLocaleString('en-US', { minimumFractionDigits: 2 });
      const net = income - expense;
      const netElem = document.getElementById('net-val');
      netElem.textContent = (net >= 0 ? '+' : '-') + '$' + Math.abs(net).toLocaleString('en-US', { minimumFractionDigits: 2 });
      netElem.style.color = net >= 0 ? 'var(--income)' : 'var(--expense)';
    }

    document.getElementById('tx-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const desc = document.getElementById('desc-input').value;
      const amt = parseFloat(document.getElementById('amt-input').value);
      const type = document.getElementById('type-input').value;

      dataset.push({ id: 'tx-' + Date.now(), merchant: desc, amount: amt, type, category: 'General' });
      render();
      e.target.reset();
    });

    render();
  </script>
</body>
</html>
`;

  // Full Project JSON Backup
  const projectJsonState = JSON.stringify(
    {
      app: 'FinanceFlow Studio',
      exportedAt: new Date().toISOString(),
      currency,
      accounts,
      budgets,
      goals,
      transactions,
    },
    null,
    2
  );

  // cURL & REST API Documentation
  const apiCurlSnippet = `# 1. Ingest an expense via REST API
curl -X POST https://api.financeflow.studio/v1/transactions \\
  -H "Authorization: Bearer ff_live_secret_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant": "OpenAI Subscription",
    "amount": 20.00,
    "category": "Tech & Software",
    "type": "expense",
    "accountId": "acc-1",
    "status": "cleared"
  }'

# 2. Query budget health status
curl -X GET https://api.financeflow.studio/v1/budgets \\
  -H "Authorization: Bearer ff_live_secret_key"
`;

  return (
    <div className="max-w-[1600px] mx-auto p-4 lg:p-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-slate-900 via-[#0b1324] to-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Code2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white">
              Code & Developer Studio
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Live Synchronized
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-2xl">
            Export runnable code artifacts generated directly from your live active finances.
            Download standalone Python analyzers, single-file HTML/CSS web applications, or backup full project JSON state.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => handleDownloadFile('finance_flow_engine.py', dynamicPythonCode, 'text/x-python')}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            Download Python Script
          </button>
          <button
            onClick={() => handleDownloadFile('finance_tracker.html', dynamicHtmlCssCode, 'text/html')}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            Download HTML/CSS App
          </button>
          <button
            onClick={() => handleDownloadFile('finance_flow_backup.json', projectJsonState, 'application/json')}
            className="flex items-center gap-2 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-all shadow-md shadow-amber-500/20"
          >
            <FileJson className="w-3.5 h-3.5" />
            Export Full Project JSON
          </button>
        </div>
      </div>

      {/* Sub Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveSubTab('python')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeSubTab === 'python'
              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <Terminal className="w-4 h-4 text-blue-400" />
          Python CLI & Analytics
        </button>

        <button
          onClick={() => setActiveSubTab('html_css')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeSubTab === 'html_css'
              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <FileCode className="w-4 h-4 text-amber-400" />
          Standalone HTML / CSS / JS
        </button>

        <button
          onClick={() => setActiveSubTab('api')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeSubTab === 'api'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-400" />
          API & cURL Webhook
        </button>

        <button
          onClick={() => setActiveSubTab('json_export')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeSubTab === 'json_export'
              ? 'bg-purple-500/15 text-purple-400 border border-purple-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <FileJson className="w-4 h-4 text-purple-400" />
          Project JSON State & Restore
        </button>
      </div>

      {/* Content Panels */}
      {activeSubTab === 'python' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900/80 px-4 py-3 rounded-t-xl border border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-xs font-mono text-slate-400">finance_flow_engine.py</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(dynamicPythonCode, 'py_code')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all"
              >
                {copiedKey === 'py_code' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    Copy Code
                  </>
                )}
              </button>
              <button
                onClick={() => handleDownloadFile('finance_flow_engine.py', dynamicPythonCode, 'text/x-python')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-medium transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Download .py
              </button>
            </div>
          </div>
          <div className="bg-[#050811] rounded-b-xl border-x border-b border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[600px] leading-relaxed select-text scrollbar-thin">
            <pre><code>{dynamicPythonCode}</code></pre>
          </div>
        </div>
      )}

      {activeSubTab === 'html_css' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-slate-900/80 px-4 py-3 rounded-t-xl border border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <span className="text-xs font-mono text-slate-400">finance_tracker.html (Single-File Standalone)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(dynamicHtmlCssCode, 'html_code')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all"
              >
                {copiedKey === 'html_code' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    Copy Code
                  </>
                )}
              </button>
              <button
                onClick={() => handleDownloadFile('finance_tracker.html', dynamicHtmlCssCode, 'text/html')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-xs text-slate-950 font-bold transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Download .html
              </button>
            </div>
          </div>
          <div className="bg-[#050811] rounded-b-xl border-x border-b border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[600px] leading-relaxed select-text scrollbar-thin">
            <pre><code>{dynamicHtmlCssCode}</code></pre>
          </div>
        </div>
      )}

      {activeSubTab === 'api' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">cURL & REST Webhook Automation</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automate transactions into FinanceFlow from your own scripts, Stripe webhooks, or cron jobs.
                </p>
              </div>
              <button
                onClick={() => handleCopy(apiCurlSnippet, 'curl_code')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
              >
                {copiedKey === 'curl_code' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    Copy cURL
                  </>
                )}
              </button>
            </div>
            <div className="bg-[#050811] rounded-xl border border-slate-800 p-4 font-mono text-xs text-emerald-400 overflow-x-auto">
              <pre><code>{apiCurlSnippet}</code></pre>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'json_export' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/80 px-4 py-3 rounded-t-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <FileJson className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-mono text-slate-300">
                Full Database State ({transactions.length} tx, {accounts.length} vaults, {budgets.length} envelopes)
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleCopy(projectJsonState, 'json_code')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-all"
              >
                {copiedKey === 'json_code' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    Copy JSON
                  </>
                )}
              </button>
              <button
                onClick={() => handleDownloadFile('finance_flow_backup.json', projectJsonState, 'application/json')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-xs text-white font-medium transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                Download Backup .json
              </button>
            </div>
          </div>
          <div className="bg-[#050811] rounded-b-xl border-x border-b border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[550px] leading-relaxed select-text scrollbar-thin">
            <pre><code>{projectJsonState}</code></pre>
          </div>
        </div>
      )}
    </div>
  );
};
