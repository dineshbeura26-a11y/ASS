import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  X, 
  Send, 
  Radio, 
  Bot, 
  User, 
  Zap, 
  Flame, 
  ShieldCheck, 
  Terminal,
  Activity
} from 'lucide-react';
import { AuditResult, VoiceMessage } from '../types';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAudit: AuditResult;
  onRunAudit: (url: string) => void;
  onNavigateTab: (tab: 'scanner' | 'dashboard' | 'history' | 'monitor' | 'python' | 'architect' | 'auth') => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  currentAudit,
  onRunAudit,
  onNavigateTab,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [liveMode, setLiveMode] = useState<'standard' | 'gemini-live'>('gemini-live');
  const [messages, setMessages] = useState<VoiceMessage[]>([
    {
      id: 'welcome-voice-1',
      sender: 'dinesh-ai',
      text: `Hello! I am Dinesh AI Voice Engine (2026 Edition). You can speak to me or type commands like "Audit react.dev", "Check security score", or "Show Core Web Vitals".`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const recognitionRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize Speech Recognition if supported in browser
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // If we got a final transcript, process it
        setTranscript((prev) => {
          if (prev.trim()) {
            handleProcessCommand(prev.trim());
          }
          return '';
        });
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentAudit]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isListening, isSpeaking]);

  // Voice TTS Output Function
  const speakText = (text: string) => {
    if (audioMuted) return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
          }
          recognitionRef.current.start();
        } catch (e) {
          console.warn('Failed to start recognition', e);
          setIsListening(true);
          // Simulate speech if browser permissions fail
          setTimeout(() => {
            const simulatedText = "Check overall score and security";
            setTranscript(simulatedText);
            setTimeout(() => {
              handleProcessCommand(simulatedText);
              setTranscript('');
              setIsListening(false);
            }, 1000);
          }, 1500);
        }
      } else {
        // Fallback simulation for unsupported browsers
        setIsListening(true);
        setTimeout(() => {
          const simulatedText = "Audit react.dev and check performance";
          setTranscript(simulatedText);
          setTimeout(() => {
            handleProcessCommand(simulatedText);
            setTranscript('');
            setIsListening(false);
          }, 1000);
        }, 1500);
      }
    }
  };

  const handleProcessCommand = (commandText: string) => {
    const userMsg: VoiceMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: commandText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);

    const lower = commandText.toLowerCase();
    let replyText = "";
    let actionTriggered = "";

    // 1. Voice command to audit domain
    const auditMatch = lower.match(/(?:audit|scan|analyze|test|check url)\s+([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (auditMatch && auditMatch[1]) {
      const targetDomain = auditMatch[1];
      const targetUrl = targetDomain.startsWith('http') ? targetDomain : `https://${targetDomain}`;
      replyText = `Initiating live enterprise audit on ${targetDomain} via Dinesh AI engine. Scanning TLS handshake, OWASP security headers, and Core Web Vitals...`;
      actionTriggered = `audit:${targetUrl}`;
      onRunAudit(targetUrl);
    } else if (lower.includes('performance') || lower.includes('speed') || lower.includes('fast')) {
      replyText = `Current performance score for ${currentAudit.domain} is ${currentAudit.scores.performance} out of 100. Time to First Byte is estimated at ${currentAudit.vitals.ttfb.value}${currentAudit.vitals.ttfb.unit}, and Largest Contentful Paint is ${currentAudit.vitals.lcp.value}${currentAudit.vitals.lcp.unit}.`;
      actionTriggered = 'view_performance';
    } else if (lower.includes('security') || lower.includes('ssl') || lower.includes('certificate')) {
      const ssl = currentAudit.security.ssl;
      replyText = `Security score is ${currentAudit.scores.security} out of 100. SSL certificate issued by ${ssl.issuer} is ${ssl.valid ? 'fully valid' : 'invalid'} using ${ssl.protocol}, expiring in ${ssl.expiresInDays} days.`;
      actionTriggered = 'view_security';
    } else if (lower.includes('vital') || lower.includes('lcp') || lower.includes('cls') || lower.includes('fid')) {
      replyText = `Core Web Vitals summary for ${currentAudit.domain}: LCP is ${currentAudit.vitals.lcp.value}s (${currentAudit.vitals.lcp.rating}), FID/INP is ${currentAudit.vitals.fid.value}ms, and Cumulative Layout Shift is ${currentAudit.vitals.cls.value}.`;
      actionTriggered = 'view_vitals';
    } else if (lower.includes('score') || lower.includes('overall') || lower.includes('grade')) {
      replyText = `The overall website health score for ${currentAudit.domain} is ${currentAudit.scores.overall} out of 100. Accessibility is ${currentAudit.scores.accessibility}, and SEO is ${currentAudit.scores.seo}.`;
      actionTriggered = 'view_scores';
    } else if (lower.includes('python') || lower.includes('code') || lower.includes('script') || lower.includes('cli')) {
      replyText = `Opening the Python 2026 Engine code studio. You can copy the complete standalone CLI auditor or FastAPI microservice engineered for Dinesh AI.`;
      actionTriggered = 'navigate_python';
      onNavigateTab('python');
    } else if (lower.includes('dinesh') || lower.includes('who built') || lower.includes('architect') || lower.includes('owner')) {
      replyText = `Dinesh AI Enterprise Auditor was engineered by Dinesh Kumar Beura, Chief Architect and Full Stack Engineer based in Bhubaneswar, Odisha, India.`;
      actionTriggered = 'view_architect';
    } else if (lower.includes('recommend') || lower.includes('fix') || lower.includes('issue')) {
      const firstRec = currentAudit.aiRecommendations[0] || 'Enable HTTP/3 and enforce HSTS security headers.';
      replyText = `Top recommendation: ${firstRec}. There are ${currentAudit.diagnostics.length} diagnostic items ready for automated remediation.`;
      actionTriggered = 'view_recommendations';
    } else {
      replyText = `I heard: "${commandText}". For ${currentAudit.domain}, overall health is ${currentAudit.scores.overall}/100. Say "Audit github.com" or "Check security" for targeted voice diagnostics.`;
    }

    const aiMsg: VoiceMessage = {
      id: `msg-${Date.now()}-ai`,
      sender: 'dinesh-ai',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionTriggered
    };

    setTimeout(() => {
      setMessages(prev => [...prev, aiMsg]);
      speakText(replyText);
    }, 350);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText.trim();
    setInputText('');
    handleProcessCommand(text);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#0f1124] border border-purple-800/50 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col h-[650px] max-h-[90vh] relative">
        
        {/* Glow ambient header effect */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-purple-600/20 via-indigo-600/10 to-transparent pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-purple-900/40 flex items-center justify-between z-10 bg-[#0e1022]/90 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg shadow-purple-600/30">
                <div className="w-full h-full bg-[#0a0c18] rounded-xl flex items-center justify-center">
                  <Bot className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">Dinesh Voice AI</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-700/50 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  Live Audio 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Active target: <span className="text-purple-300 font-mono font-semibold">{currentAudit.domain}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio output mute toggle */}
            <button
              onClick={() => {
                if (isSpeaking && !audioMuted) {
                  window.speechSynthesis?.cancel();
                  setIsSpeaking(false);
                }
                setAudioMuted(!audioMuted);
              }}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                audioMuted 
                  ? 'bg-rose-950/40 text-rose-300 border-rose-800/40' 
                  : 'bg-[#181a38] text-purple-300 border-purple-800/40 hover:bg-[#20234a]'
              }`}
              title={audioMuted ? "Unmute Voice" : "Mute Voice"}
            >
              {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#181a38] hover:bg-[#20234a] text-slate-400 hover:text-white border border-purple-900/40 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Audio Waveform & Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {/* Animated Waveform Visualizer Banner */}
          <div className="p-4 rounded-2xl bg-[#090b17] border border-purple-950/80 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="flex items-center gap-1.5 h-12">
              {[40, 65, 85, 30, 95, 55, 75, 45, 90, 60, 35, 80, 50, 70, 90, 40].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isListening
                      ? 'bg-gradient-to-t from-pink-500 to-purple-400 animate-pulse'
                      : isSpeaking
                      ? 'bg-gradient-to-t from-indigo-500 to-emerald-400 animate-pulse'
                      : 'bg-slate-800'
                  }`}
                  style={{
                    height: isListening || isSpeaking ? `${Math.max(12, (h * (isListening ? 1.1 : 0.85)) % 44 + 8)}px` : '6px',
                    animationDelay: `${i * 65}ms`
                  }}
                />
              ))}
            </div>

            <div className="mt-2 text-xs font-mono">
              {isListening ? (
                <span className="text-pink-400 flex items-center gap-1.5 animate-pulse">
                  <Mic className="w-3.5 h-3.5" />
                  Listening to your voice... Speak now
                </span>
              ) : isSpeaking ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 animate-bounce" />
                  Dinesh AI is speaking response...
                </span>
              ) : (
                <span className="text-slate-500">
                  Tap the microphone or say a command to begin
                </span>
              )}
            </div>

            {transcript && (
              <div className="mt-2 text-xs text-purple-200 bg-purple-950/60 px-3 py-1.5 rounded-xl border border-purple-700/40 font-mono">
                "{transcript}"
              </div>
            )}
          </div>

          {/* Quick Voice Prompt Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] text-slate-500 flex-shrink-0">Suggestions:</span>
            <button
              onClick={() => handleProcessCommand("What is my performance score?")}
              className="px-2.5 py-1 rounded-lg bg-[#151733] hover:bg-[#1d2047] text-purple-300 border border-purple-900/50 flex-shrink-0"
            >
              ⚡ "What is my performance score?"
            </button>
            <button
              onClick={() => handleProcessCommand("Check SSL certificate and security")}
              className="px-2.5 py-1 rounded-lg bg-[#151733] hover:bg-[#1d2047] text-indigo-300 border border-indigo-900/50 flex-shrink-0"
            >
              🔒 "Check SSL and security"
            </button>
            <button
              onClick={() => handleProcessCommand("Audit wikipedia.org")}
              className="px-2.5 py-1 rounded-lg bg-[#151733] hover:bg-[#1d2047] text-emerald-300 border border-emerald-900/50 flex-shrink-0"
            >
              🌐 "Audit wikipedia.org"
            </button>
            <button
              onClick={() => handleProcessCommand("Show me Python 2026 code")}
              className="px-2.5 py-1 rounded-lg bg-[#151733] hover:bg-[#1d2047] text-amber-300 border border-amber-900/50 flex-shrink-0"
            >
              🐍 "Show Python code"
            </button>
          </div>

          {/* Message Thread */}
          <div className="space-y-3 pt-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'dinesh-ai' && (
                  <div className="w-8 h-8 rounded-xl bg-purple-950 border border-purple-700/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs space-y-1 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none'
                      : 'bg-[#151730] border border-purple-900/40 text-slate-200 rounded-tl-none shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 text-[10px] opacity-70 mb-0.5">
                    <span className="font-bold">
                      {msg.sender === 'user' ? 'You' : 'Dinesh AI Auditor'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <p className="leading-relaxed">{msg.text}</p>

                  {/* If this message triggered an action */}
                  {msg.actionTriggered && (
                    <div className="pt-1.5 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-700/40">
                        ⚡ Executed: {msg.actionTriggered}
                      </span>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-indigo-400" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

        </div>

        {/* Bottom Voice Controls & Text Bar */}
        <div className="p-4 border-t border-purple-900/40 bg-[#0c0e1d] z-10 space-y-3">
          
          <div className="flex items-center gap-3">
            {/* Main Microphone Button */}
            <button
              onClick={toggleListening}
              className={`p-3.5 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-500 text-white ring-4 ring-rose-600/30 scale-105 animate-pulse'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30'
              }`}
              title={isListening ? "Stop listening" : "Click to speak voice command"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Input Field */}
            <form onSubmit={handleManualSubmit} className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Speak or type: 'Audit github.com' or 'Check score'..."
                className="flex-1 bg-[#121428] border border-purple-900/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Voice Engine 2026 • Powered by Web Speech & Dinesh AI AST</span>
            </div>
            <span className="font-mono text-purple-400 font-semibold">
              Bhubaneswar Node
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
