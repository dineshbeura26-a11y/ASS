import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { ScannerHero } from './components/ScannerHero';
import { AuditDashboard } from './components/AuditDashboard';
import { FeaturePillars } from './components/FeaturePillars';
import { ArchitectCard } from './components/ArchitectCard';
import { PythonEngineModal } from './components/PythonEngineModal';
import { HistoryView } from './components/HistoryView';
import { MonitorView } from './components/MonitorView';
import { DiagnosticBreakdown } from './components/DiagnosticBreakdown';
import { LoginPage } from './components/LoginPage';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { PRESET_AUDITS, generateDynamicAudit } from './data/presetAudits';
import { AuditResult, UserProfile } from './types';
import { Mic, Radio, Sparkles } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<'scanner' | 'dashboard' | 'history' | 'monitor' | 'python' | 'architect' | 'auth'>('scanner');
  const [activeUrl, setActiveUrl] = useState<string>('https://react.dev');
  const [currentAudit, setCurrentAudit] = useState<AuditResult>(PRESET_AUDITS['react.dev']);
  const [history, setHistory] = useState<AuditResult[]>([
    PRESET_AUDITS['react.dev'],
    PRESET_AUDITS['github.com'],
    PRESET_AUDITS['wikipedia.org'],
    PRESET_AUDITS['vercel.com']
  ]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [isPythonModalOpen, setIsPythonModalOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  // Authenticated user state (Defaults to Dinesh Kumar Beura as Chief Architect)
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'user-dinesh-001',
    name: 'Dinesh Kumar Beura',
    email: 'dineshbeura26@gmail.com',
    role: 'Chief Architect',
    company: 'Dinesh AI Enterprise Labs',
    location: 'Bhubaneswar, Odisha, India',
    isLoggedIn: true,
    token: 'jwt_dinesh_ai_enterprise_2026_sec_99381',
    tier: 'Enterprise 2026'
  });

  const handleAnalyze = (url: string) => {
    setActiveUrl(url);
    setIsScanning(true);

    const steps = [
      'Resolving DNS & Initiating TLS 1.3 Handshake...',
      'Validating SSL Certificate & OWASP Security Headers...',
      'Measuring TTFB & Core Web Vitals (LCP, FID, CLS)...',
      'Detecting Frameworks, CDNs & Tech Stack Signatures...',
      'Executing WCAG 2.1 AA Accessibility Validation...',
      'Dinesh AI LLM generating optimization suggestions...'
    ];

    let currentStepIdx = 0;
    setLoadingStep(steps[0]);

    const stepInterval = setInterval(() => {
      currentStepIdx++;
      if (currentStepIdx < steps.length) {
        setLoadingStep(steps[currentStepIdx]);
      }
    }, 280);

    setTimeout(() => {
      clearInterval(stepInterval);
      const newAudit = generateDynamicAudit(url);
      setCurrentAudit(newAudit);
      setHistory(prev => [newAudit, ...prev.filter(h => h.domain !== newAudit.domain)]);
      setIsScanning(false);
      setCurrentTab('dashboard');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#a855f7', '#6366f1', '#10b981', '#f59e0b']
        });
      } catch (e) {
        // Safe fallback
      }
    }, 1800);
  };

  const handleSelectHistoryItem = (item: AuditResult) => {
    setCurrentAudit(item);
    setActiveUrl(item.url);
    setCurrentTab('dashboard');
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      role: 'Guest',
      isLoggedIn: false,
      tier: 'Free'
    });
  };

  return (
    <div className="min-h-screen bg-[#0b0c16] text-[#e2e8f0] flex flex-col selection:bg-purple-600 selection:text-white relative">
      
      {/* Top Navbar */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        currentUser={currentUser}
        activeUrl={activeUrl}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        
        {/* Scanner Tab (Matching Screenshot 2 & 1) */}
        {currentTab === 'scanner' && (
          <div className="space-y-14">
            <ScannerHero
              onAnalyze={handleAnalyze}
              isLoading={isScanning}
              loadingStep={loadingStep}
              initialUrl={activeUrl}
            />

            {/* Quick Preview of Current Live Audit */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Active Audit Node Snapshot
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live analysis result for <span className="text-purple-400 font-mono font-semibold">{currentAudit.domain}</span>
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 underline underline-offset-4 flex items-center gap-1 cursor-pointer"
                >
                  Open Full Dashboard →
                </button>
              </div>

              <AuditDashboard
                audit={currentAudit}
                onOpenPythonCode={() => setIsPythonModalOpen(true)}
                onRescan={() => handleAnalyze(currentAudit.url)}
              />
            </div>

            {/* 6 Core Pillars from Screenshot 1 */}
            <FeaturePillars />

            {/* Diagnostics breakdown with refactored code */}
            <DiagnosticBreakdown
              diagnostics={currentAudit.diagnostics}
              domain={currentAudit.domain}
            />

            {/* Architect Card matching Screenshot 1 */}
            <ArchitectCard onOpenPython={() => setCurrentTab('python')} />
          </div>
        )}

        {/* Full Dashboard Tab */}
        {currentTab === 'dashboard' && (
          <div className="space-y-10">
            <AuditDashboard
              audit={currentAudit}
              onOpenPythonCode={() => setIsPythonModalOpen(true)}
              onRescan={() => handleAnalyze(currentAudit.url)}
            />

            <DiagnosticBreakdown
              diagnostics={currentAudit.diagnostics}
              domain={currentAudit.domain}
            />

            <FeaturePillars />

            <ArchitectCard onOpenPython={() => setCurrentTab('python')} />
          </div>
        )}

        {/* History Tab */}
        {currentTab === 'history' && (
          <HistoryView
            history={history}
            onSelectAudit={handleSelectHistoryItem}
            onClearHistory={() => setHistory([])}
          />
        )}

        {/* 24/7 Monitor Tab */}
        {currentTab === 'monitor' && (
          <MonitorView />
        )}

        {/* Python Code Engine Tab */}
        {currentTab === 'python' && (
          <div className="space-y-6">
            <PythonEngineModal
              isOpen={true}
              isStandaloneTab={true}
              targetDomain={currentAudit.domain}
            />
          </div>
        )}

        {/* Architect Profile Tab */}
        {currentTab === 'architect' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <ArchitectCard onOpenPython={() => setCurrentTab('python')} />
            <FeaturePillars />
          </div>
        )}

        {/* Enterprise Login & Profile Management Tab */}
        {currentTab === 'auth' && (
          <div className="py-6">
            <LoginPage
              currentUser={currentUser}
              onLogin={handleLogin}
              onLogout={handleLogout}
              onClose={() => setCurrentTab('dashboard')}
            />
          </div>
        )}

      </main>

      {/* Floating Live Voice Assistant Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="relative group p-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white shadow-2xl shadow-purple-600/50 flex items-center gap-3 transition-all hover:scale-105 cursor-pointer border border-pink-400/40"
          title="Open Dinesh Voice AI Assistant"
        >
          {/* Animated pulsing sonar ring */}
          <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 opacity-60 blur-sm group-hover:opacity-100 animate-pulse pointer-events-none" />
          
          <div className="relative flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-black/30 flex items-center justify-center">
              <Mic className="w-4 h-4 text-white animate-pulse" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-black tracking-wide leading-none flex items-center gap-1.5">
                Dinesh Voice AI
                <Radio className="w-3 h-3 text-emerald-300 animate-pulse" />
              </div>
              <div className="text-[10px] text-pink-200/90 leading-none mt-1">
                Speak or Tap to Talk
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Global Voice Assistant Modal */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        currentAudit={currentAudit}
        onRunAudit={handleAnalyze}
        onNavigateTab={setCurrentTab}
      />

      {/* Global Python Code Studio Modal */}
      <PythonEngineModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
        targetDomain={currentAudit.domain}
      />

      {/* Footer */}
      <footer className="w-full border-t border-purple-950/40 py-8 bg-[#090a14] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-bold text-slate-300">Dinesh AI</span> • Enterprise Website Auditor 2026 Edition
            <span className="mx-2">•</span>
            <span>Architect: Dinesh Kumar Beura (Bhubaneswar, Odisha)</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setCurrentTab('scanner')} className="hover:text-purple-400 transition-colors">Scanner</button>
            <button onClick={() => setCurrentTab('dashboard')} className="hover:text-purple-400 transition-colors">Dashboard</button>
            <button onClick={() => setIsVoiceModalOpen(true)} className="hover:text-pink-400 text-pink-300 transition-colors flex items-center gap-1">
              <Mic className="w-3 h-3" /> Voice AI
            </button>
            <button onClick={() => setCurrentTab('python')} className="hover:text-purple-400 text-amber-400 transition-colors">Python Engine</button>
            <button onClick={() => setCurrentTab('auth')} className="hover:text-purple-400 transition-colors">
              {currentUser.isLoggedIn ? 'Account' : 'Sign In'}
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
