export interface AuditScore {
  overall: number;
  performance: number;
  accessibility: number;
  bestPractices: number;
  security: number;
  seo: number;
}

export interface CoreWebVitals {
  lcp: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // Largest Contentful Paint
  fid: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // First Input Delay / INP
  cls: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // Cumulative Layout Shift
  fcp: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // First Contentful Paint
  ttfb: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // Time to First Byte
  si: { value: number; unit: string; rating: 'good' | 'needs-improvement' | 'poor' }; // Speed Index
}

export interface SecurityHeaderCheck {
  name: string;
  status: 'passed' | 'warning' | 'failed';
  value?: string;
  description: string;
  recommendation: string;
}

export interface SSLInfo {
  valid: boolean;
  issuer: string;
  protocol: string;
  expiresInDays: number;
  validTo: string;
  strength: string;
}

export interface DetectedTechnology {
  name: string;
  category: 'Frontend' | 'Backend' | 'Styling' | 'Build Tool' | 'Database' | 'Hosting' | 'Auth' | 'Analytics' | 'Security';
  version?: string;
  iconName: string;
  confidence: number;
}

export interface DiagnosticIssue {
  id: string;
  category: 'Performance' | 'Security' | 'SEO' | 'Accessibility' | 'Code Quality' | 'Responsive';
  severity: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  location?: string;
  snippet?: string;
  remediation: string;
  aiSuggestedFix?: string;
}

export interface PerformanceLatencyPoint {
  time: string;
  dns: number;
  tcp: number;
  ttfb: number;
  domReady: number;
  load: number;
}

export interface AuditResult {
  id: string;
  url: string;
  domain: string;
  timestamp: string;
  scanDurationMs: number;
  scores: AuditScore;
  vitals: CoreWebVitals;
  security: {
    ssl: SSLInfo;
    headers: SecurityHeaderCheck[];
  };
  technologies: DetectedTechnology[];
  diagnostics: DiagnosticIssue[];
  latencyChart: PerformanceLatencyPoint[];
  stats: {
    totalMetricsAnalyzed: number;
    performanceChecks: number;
    issuesFound: number;
    passedChecks: number;
    domNodes: number;
    pageSizeKb: number;
    requestsCount: number;
  };
  aiRecommendations: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Chief Architect' | 'Lead Security Auditor' | 'DevOps Engineer' | 'Guest';
  avatar?: string;
  company?: string;
  location?: string;
  isLoggedIn: boolean;
  token?: string;
  tier: 'Enterprise 2026' | 'Pro' | 'Free';
}

export interface VoiceMessage {
  id: string;
  sender: 'user' | 'dinesh-ai';
  text: string;
  timestamp: string;
  actionTriggered?: string;
}
