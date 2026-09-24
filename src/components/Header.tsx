import React from 'react';
import { 
  Sparkles, 
  Terminal, 
  Activity, 
  Clock, 
  ShieldCheck, 
  Code2, 
  Layers, 
  Mic, 
  LogIn, 
  User, 
  Radio
} from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentTab: 'scanner' | 'dashboard' | 'history' | 'monitor' | 'python' | 'architect' | 'auth';
  onSelectTab: (tab: 'scanner' | 'dashboard' | 'history' | 'monitor' | 'python' | 'architect' | 'auth') => void;
  onOpenPythonModal: () => void;
  onOpenVoiceModal: () => void;
  currentUser: UserProfile | null;
  activeUrl: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenPythonModal,
  onOpenVoiceModal,
  currentUser,
  activeUrl,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/30 bg-[#0b0c16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Node Info */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('scanner')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 p-[1px] shadow-lg shadow-purple-600/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#0d0e1c] rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  Dinesh <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">AI</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1.5"></span>
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Enterprise Audit Node v2.1 (2026)
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121426] p-1 rounded-xl border border-purple-950/60">
            <button
              onClick={() => onSelectTab('scanner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'scanner'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Scanner
            </button>
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'dashboard'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Dashboard
            </button>
            <button
              onClick={() => onSelectTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'history'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              History
            </button>
            <button
              onClick={() => onSelectTab('monitor')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'monitor'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Monitor
            </button>
            <button
              onClick={() => onSelectTab('python')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                currentTab === 'python'
                  ? 'bg-gradient-to-r from-amber-500 to-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                  : 'text-amber-300/90 hover:text-amber-200 hover:bg-amber-950/30'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              Python (2026)
            </button>
          </nav>

          {/* Action CTAs: Voice AI + Python Code + Login/Profile */}
          <div className="flex items-center gap-2">
            
            {/* Live Voice AI Button */}
            <button
              onClick={onOpenVoiceModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-indigo-600/20 hover:from-pink-600/30 hover:to-indigo-600/30 text-pink-300 border border-pink-500/40 text-xs font-bold transition-all shadow-sm group"
              title="Launch Dinesh AI Voice Assistant"
            >
              <div className="relative">
                <Mic className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-pink-500 rounded-full animate-ping" />
              </div>
              <span>Voice AI</span>
            </button>

            {/* Python Code Engine Modal trigger */}
            <button
              onClick={onOpenPythonModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#14162a] hover:bg-[#1a1d38] text-purple-300 border border-purple-500/30 text-xs font-medium transition-all shadow-sm"
              title="View Dinesh AI Python source code"
            >
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Python Code</span>
            </button>

            {/* Login / User Profile Avatar */}
            {currentUser && currentUser.isLoggedIn ? (
              <button
                onClick={() => onSelectTab('auth')}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                  currentTab === 'auth'
                    ? 'bg-purple-900/60 text-purple-200 border-purple-400'
                    : 'bg-[#151733] hover:bg-[#1c1f45] text-white border-purple-800/50'
                }`}
                title="Manage logged in account and permissions"
              >
                <div className="w-5 h-5 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 text-[10px] font-black flex items-center justify-center text-white">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="text-[11px] font-bold leading-none">{currentUser.name}</div>
                  <div className="text-[9px] text-amber-400 leading-none mt-0.5">{currentUser.role}</div>
                </div>
              </button>
            ) : (
              <button
                onClick={() => onSelectTab('auth')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  currentTab === 'auth'
                    ? 'bg-purple-600 text-white shadow-purple-600/30'
                    : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/20'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Architect shortcut */}
            <button
              onClick={() => onSelectTab('architect')}
              className={`hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                currentTab === 'architect'
                  ? 'bg-purple-900/40 text-purple-200 border-purple-500/50'
                  : 'bg-[#14162a] text-slate-300 border-purple-900/30 hover:border-purple-500/40'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span>Architect</span>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile sub-bar */}
      <div className="lg:hidden flex items-center justify-around py-2 px-2 bg-[#0e1022] border-t border-purple-950/40 text-xs">
        <button
          onClick={() => onSelectTab('scanner')}
          className={`px-2 py-1 rounded-md font-semibold ${currentTab === 'scanner' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
        >
          Scanner
        </button>
        <button
          onClick={() => onSelectTab('dashboard')}
          className={`px-2 py-1 rounded-md font-semibold ${currentTab === 'dashboard' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onSelectTab('history')}
          className={`px-2 py-1 rounded-md font-semibold ${currentTab === 'history' ? 'bg-purple-600 text-white' : 'text-slate-400'}`}
        >
          History
        </button>
        <button
          onClick={() => onSelectTab('python')}
          className={`px-2 py-1 rounded-md font-semibold ${currentTab === 'python' ? 'bg-amber-600 text-white' : 'text-amber-400'}`}
        >
          Python
        </button>
        <button
          onClick={() => onSelectTab('auth')}
          className={`px-2 py-1 rounded-md font-semibold ${currentTab === 'auth' ? 'bg-purple-600 text-white' : 'text-purple-300'}`}
        >
          {currentUser && currentUser.isLoggedIn ? 'Account' : 'Sign In'}
        </button>
      </div>
    </header>
  );
};
