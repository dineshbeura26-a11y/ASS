import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  Sparkles, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  KeyRound, 
  Terminal, 
  Fingerprint, 
  Globe, 
  Building2, 
  LogOut,
  AlertCircle
} from 'lucide-react';

interface LoginPageProps {
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onClose?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  currentUser,
  onLogin,
  onLogout,
  onClose,
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'quick'>('quick');
  const [email, setEmail] = useState('dineshbeura26@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Dinesh Kumar Beura');
  const [role, setRole] = useState<'Chief Architect' | 'Lead Security Auditor' | 'DevOps Engineer' | 'Guest'>('Chief Architect');
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleQuickLogin = (presetRole: 'Chief Architect' | 'Lead Security Auditor' | 'DevOps Engineer' | 'Guest') => {
    setIsLoading(true);
    setErrorMsg('');
    
    setTimeout(() => {
      let profile: UserProfile;
      if (presetRole === 'Chief Architect') {
        profile = {
          id: 'user-dinesh-001',
          name: 'Dinesh Kumar Beura',
          email: 'dineshbeura26@gmail.com',
          role: 'Chief Architect',
          company: 'Dinesh AI Enterprise Labs',
          location: 'Bhubaneswar, Odisha, India',
          isLoggedIn: true,
          token: 'jwt_dinesh_ai_enterprise_2026_sec_99381',
          tier: 'Enterprise 2026'
        };
      } else if (presetRole === 'Lead Security Auditor') {
        profile = {
          id: 'user-sec-002',
          name: 'Senior Security Analyst',
          email: 'security@dinesh-ai.dev',
          role: 'Lead Security Auditor',
          company: 'CyberSec Operations',
          location: 'Global Edge',
          isLoggedIn: true,
          token: 'jwt_sec_auditor_token_8849',
          tier: 'Enterprise 2026'
        };
      } else if (presetRole === 'DevOps Engineer') {
        profile = {
          id: 'user-dev-003',
          name: 'Site Reliability Lead',
          email: 'devops@enterprise.internal',
          role: 'DevOps Engineer',
          company: 'Cloud Infrastructure',
          location: 'Asia-South Node',
          isLoggedIn: true,
          token: 'jwt_devops_token_3340',
          tier: 'Pro'
        };
      } else {
        profile = {
          id: 'user-guest-004',
          name: 'Guest Auditor',
          email: 'guest@dinesh-ai.demo',
          role: 'Guest',
          company: 'Public Preview Sandbox',
          location: 'Remote',
          isLoggedIn: true,
          token: 'jwt_guest_demo_token',
          tier: 'Free'
        };
      }

      onLogin(profile);
      setIsLoading(false);
      setAuthSuccessMsg(`Authenticated as ${profile.name} (${profile.role})`);
      if (onClose) {
        setTimeout(onClose, 600);
      }
    }, 450);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      const user: UserProfile = {
        id: `user-${Date.now().toString().slice(-4)}`,
        name: name || email.split('@')[0],
        email: email,
        role: role,
        company: 'Enterprise Client',
        location: 'Verified Node',
        isLoggedIn: true,
        token: `jwt_session_${Math.random().toString(36).substring(2, 10)}`,
        tier: role === 'Chief Architect' ? 'Enterprise 2026' : 'Pro'
      };
      onLogin(user);
      setIsLoading(false);
      setAuthSuccessMsg(`Welcome back, ${user.name}!`);
      if (onClose) {
        setTimeout(onClose, 600);
      }
    }, 500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* If already logged in, show profile management card */}
      {currentUser && currentUser.isLoggedIn ? (
        <div className="bg-[#121428] border border-purple-800/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-0.5 shadow-xl shadow-purple-600/30 flex items-center justify-center">
                <div className="w-full h-full bg-[#0d0f22] rounded-2xl flex items-center justify-center text-xl font-black text-purple-300">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-white">{currentUser.name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
                    ACTIVE SESSION
                  </span>
                </div>
                <p className="text-xs text-purple-300 font-mono mt-0.5">{currentUser.email}</p>
                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
                  <span className="text-amber-400 font-semibold">{currentUser.role}</span>
                  <span>•</span>
                  <span>{currentUser.company || 'Dinesh AI Enterprise'}</span>
                  {currentUser.location && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3 text-indigo-400" />
                        {currentUser.location}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 text-xs font-semibold transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          {/* Active Security Token Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#0a0c18] border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Access Tier</span>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                {currentUser.tier}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0a0c18] border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Authentication Protocol</span>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <Fingerprint className="w-3.5 h-3.5 text-indigo-400" />
                TLS 1.3 + Ed25519 Token
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0a0c18] border border-slate-800/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Privilege Clearance</span>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Root Audit Node Authority
              </div>
            </div>
          </div>

          {/* Quick Switch Profiles */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-400 mb-3">Quick Switch Audit Persona:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickLogin('Chief Architect')}
                className="px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 text-purple-300 border border-purple-700/50 text-xs font-medium"
              >
                👑 Dinesh Kumar Beura (Architect)
              </button>
              <button
                onClick={() => handleQuickLogin('Lead Security Auditor')}
                className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/80 text-indigo-300 border border-indigo-700/50 text-xs font-medium"
              >
                🛡️ Lead Security Auditor
              </button>
              <button
                onClick={() => handleQuickLogin('DevOps Engineer')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
              >
                ⚙️ DevOps Lead
              </button>
              <button
                onClick={() => handleQuickLogin('Guest')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs font-medium"
              >
                👤 Guest Sandbox
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Login / Register Form */
        <div className="bg-[#121428] border border-purple-900/40 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center max-w-md mx-auto space-y-2 mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 shadow-xl shadow-purple-600/30 mb-2">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dinesh <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">AI</span> Access Node
            </h2>
            <p className="text-xs text-slate-400">
              Sign in to unlock unlimited enterprise scans, Python 2026 CLI token access, 24/7 continuous domain telemetry, and voice assistant features.
            </p>
          </div>

          {/* Feedback messages */}
          {authSuccessMsg && (
            <div className="mb-6 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 max-w-md mx-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{authSuccessMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 max-w-md mx-auto">
              <AlertCircle className="w-4 h-4 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Mode Switch Tabs */}
          <div className="flex items-center justify-center gap-2 p-1 bg-[#090b16] rounded-xl border border-purple-950/60 max-w-md mx-auto mb-8">
            <button
              onClick={() => setAuthMode('quick')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'quick'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Quick 1-Click Access
            </button>
            <button
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signin'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              Email & Password
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'signup'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Register
            </button>
          </div>

          {/* Mode 1: Quick 1-Click Passwords / Preset Personas */}
          {authMode === 'quick' && (
            <div className="max-w-xl mx-auto space-y-4">
              <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider text-center mb-2">
                Select Enterprise Authorization Profile
              </div>

              {/* Dinesh Kumar Beura - Chief Architect Pass */}
              <button
                onClick={() => handleQuickLogin('Chief Architect')}
                disabled={isLoading}
                className="w-full text-left p-4 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#181a38] to-[#121428] border-2 border-purple-500/60 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-600/20 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-purple-300 font-black text-lg group-hover:scale-105 transition-transform">
                    DK
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white">Dinesh Kumar Beura</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Chief Architect (Owner)
                      </span>
                    </div>
                    <p className="text-xs text-purple-300 font-mono mt-0.5">dineshbeura26@gmail.com</p>
                    <p className="text-[11px] text-slate-400 mt-1">Full Root Permissions • Python 2026 Engine • AI Voice Control</p>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-purple-600 group-hover:bg-purple-500 text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Lead Security Auditor Pass */}
              <button
                onClick={() => handleQuickLogin('Lead Security Auditor')}
                disabled={isLoading}
                className="w-full text-left p-4 rounded-2xl bg-[#0f1124] border border-slate-800 hover:border-indigo-500/50 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">Lead Security Auditor</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                        Enterprise SecOps
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">security@dinesh-ai.dev</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </button>

              {/* Guest / Public Demo Pass */}
              <button
                onClick={() => handleQuickLogin('Guest')}
                disabled={isLoading}
                className="w-full text-left p-3.5 rounded-2xl bg-[#0a0c18] border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-300">Guest Sandbox Access</h4>
                    <p className="text-[11px] text-slate-500">Explore standard scans without credentials</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
              </button>
            </div>
          )}

          {/* Mode 2 & 3: Standard Email / Password Form */}
          {(authMode === 'signin' || authMode === 'signup') && (
            <form onSubmit={handleCustomSubmit} className="max-w-md mx-auto space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dinesh Kumar Beura"
                      className="w-full bg-[#0a0c18] border border-purple-900/50 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work / Enterprise Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dineshbeura26@gmail.com"
                    required
                    className="w-full bg-[#0a0c18] border border-purple-900/50 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  {authMode === 'signin' && (
                    <a href="#reset" onClick={(e) => { e.preventDefault(); alert("Password reset token dispatched to " + email); }} className="text-[11px] text-purple-400 hover:underline">
                      Forgot?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    className="w-full bg-[#0a0c18] border border-purple-900/50 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 font-mono"
                  />
                </div>
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Role Permission</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-[#0a0c18] border border-purple-900/50 rounded-xl py-2.5 px-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="Chief Architect">Chief Architect (Full Root)</option>
                    <option value="Lead Security Auditor">Lead Security Auditor</option>
                    <option value="DevOps Engineer">DevOps Engineer</option>
                    <option value="Guest">Guest Analyst</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Token & TLS Session...</span>
                  </>
                ) : (
                  <>
                    <span>{authMode === 'signin' ? 'Sign In to Dinesh AI' : 'Create Enterprise Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Social SSO Simulator */}
          <div className="max-w-md mx-auto mt-8 pt-6 border-t border-purple-950/60 text-center space-y-3">
            <p className="text-[11px] text-slate-500 font-medium">Or authenticate with Enterprise Single Sign-On</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleQuickLogin('Chief Architect')}
                className="py-2 px-3 rounded-xl bg-[#0d0f20] hover:bg-[#151833] border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Google Workspace
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('Lead Security Auditor')}
                className="py-2 px-3 rounded-xl bg-[#0d0f20] hover:bg-[#151833] border border-slate-800 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                GitHub Enterprise
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
