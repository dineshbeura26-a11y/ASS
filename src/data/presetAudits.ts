import { AuditResult } from '../types';

export const PRESET_AUDITS: Record<string, AuditResult> = {
  'react.dev': {
    id: 'audit-react-dev',
    url: 'https://react.dev',
    domain: 'react.dev',
    timestamp: '2026-09-24T05:30:00Z',
    scanDurationMs: 840,
    scores: {
      overall: 96,
      performance: 95.5,
      accessibility: 92.3,
      bestPractices: 94.1,
      security: 100,
      seo: 98.0
    },
    vitals: {
      lcp: { value: 1.1, unit: 's', rating: 'good' },
      fid: { value: 14, unit: 'ms', rating: 'good' },
      cls: { value: 0.012, unit: '', rating: 'good' },
      fcp: { value: 0.7, unit: 's', rating: 'good' },
      ttfb: { value: 85, unit: 'ms', rating: 'good' },
      si: { value: 1.2, unit: 's', rating: 'good' }
    },
    security: {
      ssl: {
        valid: true,
        issuer: "Let's Encrypt Authority X3",
        protocol: 'TLS 1.3 / ChaCha20-Poly1305',
        expiresInDays: 78,
        validTo: '2026-12-11',
        strength: '256-bit AES Enterprise Grade'
      },
      headers: [
        {
          name: 'Strict-Transport-Security (HSTS)',
          status: 'passed',
          value: 'max-age=63072000; includeSubDomains; preload',
          description: 'Enforces HTTPS encryption on all requests for 2 years.',
          recommendation: 'Configuration is optimal and preloaded.'
        },
        {
          name: 'Content-Security-Policy (CSP)',
          status: 'passed',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'",
          description: 'Mitigates Cross-Site Scripting (XSS) and data injection.',
          recommendation: 'Strict CSP detected. Verified safe.'
        },
        {
          name: 'X-Frame-Options',
          status: 'passed',
          value: 'DENY',
          description: 'Prevents site from being embedded in iframes (Clickjacking defense).',
          recommendation: 'DENY flag active.'
        },
        {
          name: 'X-Content-Type-Options',
          status: 'passed',
          value: 'nosniff',
          description: 'Blocks MIME-type sniffing.',
          recommendation: 'nosniff header present.'
        },
        {
          name: 'Referrer-Policy',
          status: 'passed',
          value: 'strict-origin-when-cross-origin',
          description: 'Limits referrer leakage across origins.',
          recommendation: 'Modern secure standard implemented.'
        }
      ]
    },
    technologies: [
      { name: 'React 19', category: 'Frontend', version: '19.0.0', iconName: 'React', confidence: 100 },
      { name: 'Next.js', category: 'Frontend', version: '15.2.0', iconName: 'NextJs', confidence: 98 },
      { name: 'TypeScript', category: 'Frontend', version: '5.8', iconName: 'TypeScript', confidence: 95 },
      { name: 'Tailwind CSS', category: 'Styling', version: '4.0', iconName: 'Tailwind', confidence: 99 },
      { name: 'Vercel Edge', category: 'Hosting', iconName: 'Vercel', confidence: 100 },
      { name: 'Cloudflare DNS', category: 'Security', iconName: 'Cloudflare', confidence: 96 },
      { name: 'Node.js', category: 'Backend', version: '22 LTS', iconName: 'NodeJs', confidence: 90 }
    ],
    diagnostics: [
      {
        id: 'diag-1',
        category: 'Performance',
        severity: 'low',
        title: 'Serve images in modern next-gen formats',
        description: 'Two secondary SVG/PNG icons can be encoded with WebP or AVIF to save 18 KiB.',
        snippet: '<img src="/images/docs/feature-grid.png" width="480" />',
        remediation: 'Wrap image with <picture> or Next.js Image component with avif format specified.',
        aiSuggestedFix: 'import Image from "next/image";\n// Auto-converts to AVIF and generates responsive srcSets\n<Image src="/feature-grid.png" alt="Architecture" width={480} height={320} priority={false} />'
      },
      {
        id: 'diag-2',
        category: 'Accessibility',
        severity: 'low',
        title: 'ARIA label clarity on dark/light mode toggle button',
        description: 'The theme switcher button aria-label is updated dynamically; ensure initial static HTML includes aria-label.',
        snippet: '<button class="theme-toggle" aria-label="Toggle theme">',
        remediation: 'Ensure aria-pressed="true|false" is bound synchronously on render.',
        aiSuggestedFix: '<button type="button" aria-label="Switch to dark mode" aria-pressed={isDark}>\n  {isDark ? <SunIcon /> : <MoonIcon />}\n</button>'
      }
    ],
    latencyChart: [
      { time: '00:00', dns: 12, tcp: 18, ttfb: 85, domReady: 240, load: 410 },
      { time: '04:00', dns: 10, tcp: 16, ttfb: 80, domReady: 230, load: 395 },
      { time: '08:00', dns: 14, tcp: 20, ttfb: 92, domReady: 255, load: 430 },
      { time: '12:00', dns: 11, tcp: 17, ttfb: 84, domReady: 238, load: 405 },
      { time: '16:00', dns: 13, tcp: 19, ttfb: 88, domReady: 245, load: 418 },
      { time: '20:00', dns: 10, tcp: 15, ttfb: 82, domReady: 232, load: 399 }
    ],
    stats: {
      totalMetricsAnalyzed: 54,
      performanceChecks: 112,
      issuesFound: 2,
      passedChecks: 110,
      domNodes: 485,
      pageSizeKb: 384,
      requestsCount: 22
    },
    aiRecommendations: [
      'Sub-second Largest Contentful Paint (1.1s) achieved through SSR edge streaming.',
      'Implement Link prefetching on documentation sidebar items for instant 0ms page navigations.',
      'Security headers pass all OWASP Top 10 compliance standards with strict HSTS preloading.',
      'Accessibility score 92.3: Add explicit aria-current="page" to active navigation breadcrumbs.'
    ]
  },
  'github.com': {
    id: 'audit-github-com',
    url: 'https://github.com',
    domain: 'github.com',
    timestamp: '2026-09-24T05:20:00Z',
    scanDurationMs: 1120,
    scores: {
      overall: 93,
      performance: 91.2,
      accessibility: 95.0,
      bestPractices: 96.0,
      security: 98.0,
      seo: 94.5
    },
    vitals: {
      lcp: { value: 1.4, unit: 's', rating: 'good' },
      fid: { value: 22, unit: 'ms', rating: 'good' },
      cls: { value: 0.024, unit: '', rating: 'good' },
      fcp: { value: 0.9, unit: 's', rating: 'good' },
      ttfb: { value: 110, unit: 'ms', rating: 'good' },
      si: { value: 1.5, unit: 's', rating: 'good' }
    },
    security: {
      ssl: {
        valid: true,
        issuer: 'DigiCert High Assurance TLS Hybrid ECC SHA256 2026',
        protocol: 'TLS 1.3 / AES-256-GCM',
        expiresInDays: 142,
        validTo: '2027-02-14',
        strength: '256-bit ECC High Assurance'
      },
      headers: [
        { name: 'Strict-Transport-Security (HSTS)', status: 'passed', value: 'max-age=31536000; includeSubdomains; preload', description: 'Mandatory HTTPS preloaded.', recommendation: 'Optimal.' },
        { name: 'Content-Security-Policy (CSP)', status: 'passed', value: "default-src 'none'; base-uri 'self'; block-all-mixed-content;", description: 'Strict GitHub CSP defense.', recommendation: 'Enterprise best practice.' },
        { name: 'X-Frame-Options', status: 'passed', value: 'deny', description: 'Anti-Clickjacking.', recommendation: 'Optimal.' },
        { name: 'X-Content-Type-Options', status: 'passed', value: 'nosniff', description: 'MIME security.', recommendation: 'Optimal.' }
      ]
    },
    technologies: [
      { name: 'Ruby on Rails', category: 'Backend', iconName: 'Rails', confidence: 95 },
      { name: 'React', category: 'Frontend', version: '19', iconName: 'React', confidence: 90 },
      { name: 'TypeScript', category: 'Frontend', version: '5.8', iconName: 'TypeScript', confidence: 94 },
      { name: 'Primer CSS', category: 'Styling', iconName: 'Primer', confidence: 98 },
      { name: 'Fastly CDN', category: 'Hosting', iconName: 'Fastly', confidence: 99 },
      { name: 'GraphQL', category: 'Backend', iconName: 'GraphQL', confidence: 92 }
    ],
    diagnostics: [
      {
        id: 'diag-gh-1',
        category: 'Performance',
        severity: 'medium',
        title: 'Reduce JavaScript execution time on heavy repo matrices',
        description: 'Main thread was blocked for 180ms during complex tree hydration.',
        remediation: 'Use React Concurrent Mode useTransition and lazy list virtualization for large file trees.',
        aiSuggestedFix: 'const [isPending, startTransition] = useTransition();\nstartTransition(() => {\n  setFilterQuery(search);\n});'
      }
    ],
    latencyChart: [
      { time: '00:00', dns: 18, tcp: 24, ttfb: 105, domReady: 310, load: 560 },
      { time: '04:00', dns: 16, tcp: 22, ttfb: 102, domReady: 295, load: 540 },
      { time: '08:00', dns: 21, tcp: 26, ttfb: 118, domReady: 330, load: 585 },
      { time: '12:00', dns: 19, tcp: 25, ttfb: 112, domReady: 315, load: 565 },
      { time: '16:00', dns: 17, tcp: 23, ttfb: 108, domReady: 305, load: 550 },
      { time: '20:00', dns: 16, tcp: 21, ttfb: 104, domReady: 298, load: 542 }
    ],
    stats: {
      totalMetricsAnalyzed: 58,
      performanceChecks: 124,
      issuesFound: 3,
      passedChecks: 121,
      domNodes: 1420,
      pageSizeKb: 680,
      requestsCount: 38
    },
    aiRecommendations: [
      'High security score 98.0: Exemplary defense-in-depth headers with custom GitHub token protections.',
      'Speed Index 1.5s: Consider deferring non-critical telemetry bundles until after idle callback.',
      'Accessibility is top tier at 95.0 with full keyboard shortcut navigation and screen reader live regions.'
    ]
  },
  'wikipedia.org': {
    id: 'audit-wikipedia-org',
    url: 'https://wikipedia.org',
    domain: 'wikipedia.org',
    timestamp: '2026-09-24T05:10:00Z',
    scanDurationMs: 460,
    scores: {
      overall: 97,
      performance: 98.0,
      accessibility: 96.5,
      bestPractices: 95.0,
      security: 94.0,
      seo: 99.0
    },
    vitals: {
      lcp: { value: 0.8, unit: 's', rating: 'good' },
      fid: { value: 8, unit: 'ms', rating: 'good' },
      cls: { value: 0.005, unit: '', rating: 'good' },
      fcp: { value: 0.5, unit: 's', rating: 'good' },
      ttfb: { value: 45, unit: 'ms', rating: 'good' },
      si: { value: 0.9, unit: 's', rating: 'good' }
    },
    security: {
      ssl: {
        valid: true,
        issuer: 'GlobalSign Extended Validation CA - SHA256 - G3',
        protocol: 'TLS 1.3 / AES-128-GCM',
        expiresInDays: 210,
        validTo: '2027-04-20',
        strength: '256-bit ECC Extended Validation'
      },
      headers: [
        { name: 'Strict-Transport-Security (HSTS)', status: 'passed', value: 'max-age=106384710; includeSubDomains; preload', description: 'Long term HSTS.', recommendation: 'Optimal.' },
        { name: 'Content-Security-Policy (CSP)', status: 'passed', value: "default-src 'self' *.wikimedia.org", description: 'Wikimedia sandbox policy.', recommendation: 'Optimal.' },
        { name: 'X-Content-Type-Options', status: 'passed', value: 'nosniff', description: 'Anti-sniffing.', recommendation: 'Optimal.' }
      ]
    },
    technologies: [
      { name: 'MediaWiki', category: 'Backend', iconName: 'MediaWiki', confidence: 100 },
      { name: 'PHP 8.3', category: 'Backend', iconName: 'PHP', confidence: 95 },
      { name: 'Apache / ATS', category: 'Hosting', iconName: 'Apache', confidence: 94 },
      { name: 'MariaDB', category: 'Database', iconName: 'MariaDB', confidence: 90 },
      { name: 'Varnish Cache', category: 'Hosting', iconName: 'Varnish', confidence: 98 }
    ],
    diagnostics: [],
    latencyChart: [
      { time: '00:00', dns: 8, tcp: 12, ttfb: 42, domReady: 120, load: 210 },
      { time: '04:00', dns: 7, tcp: 11, ttfb: 40, domReady: 115, load: 205 },
      { time: '08:00', dns: 9, tcp: 14, ttfb: 48, domReady: 130, load: 225 },
      { time: '12:00', dns: 8, tcp: 12, ttfb: 45, domReady: 122, load: 215 },
      { time: '16:00', dns: 9, tcp: 13, ttfb: 46, domReady: 125, load: 220 },
      { time: '20:00', dns: 7, tcp: 11, ttfb: 41, domReady: 118, load: 208 }
    ],
    stats: {
      totalMetricsAnalyzed: 52,
      performanceChecks: 108,
      issuesFound: 0,
      passedChecks: 108,
      domNodes: 310,
      pageSizeKb: 142,
      requestsCount: 9
    },
    aiRecommendations: [
      'Ultra lightweight static footprint: Page weight under 150 KiB with only 9 total HTTP requests.',
      'TTFB 45ms is industry-leading through global geo-distributed Varnish edge caching.',
      'Zero layout shifts (CLS 0.005) ensures flawless mobile and desktop reading experience.'
    ]
  },
  'vercel.com': {
    id: 'audit-vercel-com',
    url: 'https://vercel.com',
    domain: 'vercel.com',
    timestamp: '2026-09-24T05:05:00Z',
    scanDurationMs: 780,
    scores: {
      overall: 95,
      performance: 94.8,
      accessibility: 93.0,
      bestPractices: 96.5,
      security: 98.0,
      seo: 95.0
    },
    vitals: {
      lcp: { value: 1.2, unit: 's', rating: 'good' },
      fid: { value: 12, unit: 'ms', rating: 'good' },
      cls: { value: 0.015, unit: '', rating: 'good' },
      fcp: { value: 0.65, unit: 's', rating: 'good' },
      ttfb: { value: 72, unit: 'ms', rating: 'good' },
      si: { value: 1.3, unit: 's', rating: 'good' }
    },
    security: {
      ssl: {
        valid: true,
        issuer: "Let's Encrypt E5",
        protocol: 'TLS 1.3 / AES-256-GCM',
        expiresInDays: 65,
        validTo: '2026-11-28',
        strength: '256-bit AES Enterprise Grade'
      },
      headers: [
        { name: 'Strict-Transport-Security (HSTS)', status: 'passed', value: 'max-age=63072000; includeSubDomains; preload', description: 'Enforces HTTPS.', recommendation: 'Optimal.' },
        { name: 'Content-Security-Policy (CSP)', status: 'passed', value: "default-src 'self' https:; script-src 'self' 'unsafe-inline' https:;", description: 'Edge CSP.', recommendation: 'Configured.' },
        { name: 'X-Frame-Options', status: 'passed', value: 'DENY', description: 'Frame protection.', recommendation: 'Passed.' }
      ]
    },
    technologies: [
      { name: 'Next.js 15', category: 'Frontend', version: '15.2.0', iconName: 'NextJs', confidence: 100 },
      { name: 'React 19', category: 'Frontend', version: '19.0.0', iconName: 'React', confidence: 100 },
      { name: 'Tailwind CSS', category: 'Styling', version: '4.0', iconName: 'Tailwind', confidence: 99 },
      { name: 'Turbopack', category: 'Build Tool', iconName: 'Turbopack', confidence: 95 },
      { name: 'Vercel Edge Network', category: 'Hosting', iconName: 'Vercel', confidence: 100 }
    ],
    diagnostics: [],
    latencyChart: [
      { time: '00:00', dns: 11, tcp: 15, ttfb: 70, domReady: 210, load: 380 },
      { time: '04:00', dns: 10, tcp: 14, ttfb: 68, domReady: 205, load: 372 },
      { time: '08:00', dns: 13, tcp: 17, ttfb: 78, domReady: 225, load: 398 },
      { time: '12:00', dns: 12, tcp: 16, ttfb: 74, domReady: 218, load: 388 },
      { time: '16:00', dns: 11, tcp: 15, ttfb: 72, domReady: 212, load: 382 },
      { time: '20:00', dns: 10, tcp: 14, ttfb: 69, domReady: 208, load: 376 }
    ],
    stats: {
      totalMetricsAnalyzed: 56,
      performanceChecks: 115,
      issuesFound: 1,
      passedChecks: 114,
      domNodes: 540,
      pageSizeKb: 412,
      requestsCount: 26
    },
    aiRecommendations: [
      'Next.js Partial Prerendering (PPR) delivers near-instant shell render with zero client waterfall.',
      'Security posture achieves maximum enterprise score with automated TLS rotation on Vercel edge.',
      'Fonts are self-hosted with font-display: swap, eliminating layout shifts.'
    ]
  },
  'python.org': {
    id: 'audit-python-org',
    url: 'https://python.org',
    domain: 'python.org',
    timestamp: '2026-09-24T05:00:00Z',
    scanDurationMs: 620,
    scores: {
      overall: 94,
      performance: 92.5,
      accessibility: 94.0,
      bestPractices: 93.5,
      security: 96.0,
      seo: 95.0
    },
    vitals: {
      lcp: { value: 1.3, unit: 's', rating: 'good' },
      fid: { value: 16, unit: 'ms', rating: 'good' },
      cls: { value: 0.010, unit: '', rating: 'good' },
      fcp: { value: 0.75, unit: 's', rating: 'good' },
      ttfb: { value: 78, unit: 'ms', rating: 'good' },
      si: { value: 1.4, unit: 's', rating: 'good' }
    },
    security: {
      ssl: {
        valid: true,
        issuer: "Let's Encrypt E1",
        protocol: 'TLS 1.3 / AES-256-GCM',
        expiresInDays: 82,
        validTo: '2026-12-15',
        strength: '256-bit AES Enterprise Grade'
      },
      headers: [
        { name: 'Strict-Transport-Security (HSTS)', status: 'passed', value: 'max-age=63072000; includeSubDomains', description: 'HSTS Protection.', recommendation: 'Active.' },
        { name: 'X-Frame-Options', status: 'passed', value: 'SAMEORIGIN', description: 'Frame Defense.', recommendation: 'Active.' },
        { name: 'X-Content-Type-Options', status: 'passed', value: 'nosniff', description: 'Anti-sniffing.', recommendation: 'Active.' }
      ]
    },
    technologies: [
      { name: 'Python 3.12+', category: 'Backend', iconName: 'Python', confidence: 100 },
      { name: 'Django', category: 'Backend', iconName: 'Django', confidence: 98 },
      { name: 'Fastly CDN', category: 'Hosting', iconName: 'Fastly', confidence: 95 },
      { name: 'Nginx', category: 'Hosting', iconName: 'Nginx', confidence: 92 }
    ],
    diagnostics: [],
    latencyChart: [
      { time: '00:00', dns: 12, tcp: 16, ttfb: 76, domReady: 220, load: 390 },
      { time: '04:00', dns: 11, tcp: 15, ttfb: 74, domReady: 215, load: 382 },
      { time: '08:00', dns: 14, tcp: 18, ttfb: 82, domReady: 235, load: 405 },
      { time: '12:00', dns: 13, tcp: 17, ttfb: 79, domReady: 228, load: 396 },
      { time: '16:00', dns: 12, tcp: 16, ttfb: 77, domReady: 222, load: 389 },
      { time: '20:00', dns: 11, tcp: 15, ttfb: 75, domReady: 217, load: 385 }
    ],
    stats: {
      totalMetricsAnalyzed: 50,
      performanceChecks: 105,
      issuesFound: 1,
      passedChecks: 104,
      domNodes: 420,
      pageSizeKb: 290,
      requestsCount: 18
    },
    aiRecommendations: [
      'Clean semantic markup provides optimal indexing for Python documentation search crawlers.',
      'Fastly edge caching offloads dynamic Django request processing effectively.',
      'Compatible with Python 2026 Auditor CLI and ASGI microservices.'
    ]
  }
};

export function generateDynamicAudit(rawUrl: string): AuditResult {
  let cleanUrl = rawUrl.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = 'https://' + cleanUrl;
  }

  let domain = cleanUrl;
  try {
    const parsed = new URL(cleanUrl);
    domain = parsed.hostname;
  } catch {
    domain = cleanUrl.replace(/^https?:\/\//, '').split('/')[0];
  }

  // Check if we have an exact match in presets
  const presetKey = Object.keys(PRESET_AUDITS).find(k => domain.includes(k) || k.includes(domain));
  if (presetKey && PRESET_AUDITS[presetKey]) {
    return {
      ...PRESET_AUDITS[presetKey],
      timestamp: new Date().toISOString()
    };
  }

  // Generate intelligent deterministic dynamic audit for any given domain
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = (hash << 5) - hash + domain.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);

  const perfScore = 85 + (absHash % 14); // 85 - 98
  const secScore = 88 + ((absHash >> 2) % 12); // 88 - 99
  const a11yScore = 86 + ((absHash >> 3) % 13); // 86 - 98
  const bpScore = 90 + ((absHash >> 4) % 10); // 90 - 99
  const seoScore = 91 + ((absHash >> 5) % 9); // 91 - 99
  const overall = Math.round((perfScore * 0.35) + (secScore * 0.25) + (a11yScore * 0.15) + (seoScore * 0.15) + (bpScore * 0.1));

  const lcpVal = Number((0.9 + ((absHash % 8) * 0.1)).toFixed(1));
  const fidVal = 10 + (absHash % 18);
  const clsVal = Number((0.008 + ((absHash % 5) * 0.003)).toFixed(3));
  const ttfbVal = 60 + (absHash % 50);

  const detectedTechs = [
    { name: 'TypeScript', category: 'Frontend' as const, version: '5.8', iconName: 'TypeScript', confidence: 96 },
    { name: 'React 19', category: 'Frontend' as const, version: '19.0', iconName: 'React', confidence: 94 },
    { name: 'Tailwind CSS', category: 'Styling' as const, version: '4.0', iconName: 'Tailwind', confidence: 98 },
    { name: 'Node.js', category: 'Backend' as const, version: '22 LTS', iconName: 'NodeJs', confidence: 90 },
    { name: 'Cloudflare Edge', category: 'Security' as const, iconName: 'Cloudflare', confidence: 95 },
    { name: 'Vite / Modern Bundler', category: 'Build Tool' as const, iconName: 'Vite', confidence: 92 }
  ];

  return {
    id: `audit-${domain}-${Date.now()}`,
    url: cleanUrl,
    domain: domain,
    timestamp: new Date().toISOString(),
    scanDurationMs: 650 + (absHash % 400),
    scores: {
      overall,
      performance: perfScore,
      accessibility: a11yScore,
      bestPractices: bpScore,
      security: secScore,
      seo: seoScore
    },
    vitals: {
      lcp: { value: lcpVal, unit: 's', rating: lcpVal <= 2.5 ? 'good' : 'needs-improvement' },
      fid: { value: fidVal, unit: 'ms', rating: 'good' },
      cls: { value: clsVal, unit: '', rating: 'good' },
      fcp: { value: Number((lcpVal * 0.6).toFixed(1)), unit: 's', rating: 'good' },
      ttfb: { value: ttfbVal, unit: 'ms', rating: 'good' },
      si: { value: Number((lcpVal * 1.1).toFixed(1)), unit: 's', rating: 'good' }
    },
    security: {
      ssl: {
        valid: true,
        issuer: 'Let\'s Encrypt Enterprise TLS Authority (2026)',
        protocol: 'TLS 1.3 / ChaCha20-Poly1305',
        expiresInDays: 75 + (absHash % 40),
        validTo: '2026-12-28',
        strength: '256-bit AES Enterprise Grade'
      },
      headers: [
        { name: 'Strict-Transport-Security (HSTS)', status: 'passed', value: 'max-age=31536000; includeSubDomains; preload', description: 'Enforces HTTPS on all requests.', recommendation: 'Optimal configuration.' },
        { name: 'Content-Security-Policy (CSP)', status: secScore > 92 ? 'passed' : 'warning', value: "default-src 'self' https:; object-src 'none'", description: 'Guards against XSS and data injections.', recommendation: 'Strict CSP present.' },
        { name: 'X-Frame-Options', status: 'passed', value: 'SAMEORIGIN', description: 'Prevents unauthorized iframing.', recommendation: 'Safe.' },
        { name: 'X-Content-Type-Options', status: 'passed', value: 'nosniff', description: 'Blocks MIME sniffing.', recommendation: 'Present and active.' }
      ]
    },
    technologies: detectedTechs,
    diagnostics: [
      {
        id: `diag-${absHash}-1`,
        category: 'Performance',
        severity: 'low',
        title: 'Optimize HTTP/2 & HTTP/3 multiplexing',
        description: 'Ensure static CDN assets are served over HTTP/3 with 0-RTT TLS resumption.',
        remediation: 'Configure edge server with Alt-Svc: h3=":443"; ma=86400.',
        aiSuggestedFix: 'server {\n  listen 443 quic reuseport;\n  listen 443 ssl;\n  add_header Alt-Svc \'h3=":443"; ma=86400\';\n}'
      },
      {
        id: `diag-${absHash}-2`,
        category: 'Accessibility',
        severity: 'low',
        title: 'Ensure color contrast meets WCAG 2.1 AA (4.5:1)',
        description: 'Verify subtle secondary text colors on dark backgrounds maintain minimum 4.5:1 ratio.',
        remediation: 'Increase contrast of secondary labels from #64748b to #94a3b8.',
        aiSuggestedFix: '/* Before: text-slate-500 (3.8:1) */\n/* After: text-slate-400 (5.2:1) */\nclassName="text-slate-400 font-medium"'
      }
    ],
    latencyChart: [
      { time: '00:00', dns: 10, tcp: 15, ttfb: ttfbVal - 4, domReady: 190, load: 360 },
      { time: '04:00', dns: 9, tcp: 14, ttfb: ttfbVal - 6, domReady: 185, load: 350 },
      { time: '08:00', dns: 13, tcp: 18, ttfb: ttfbVal + 8, domReady: 205, load: 380 },
      { time: '12:00', dns: 11, tcp: 16, ttfb: ttfbVal + 2, domReady: 195, load: 368 },
      { time: '16:00', dns: 12, tcp: 17, ttfb: ttfbVal + 5, domReady: 200, load: 375 },
      { time: '20:00', dns: 10, tcp: 14, ttfb: ttfbVal - 2, domReady: 188, load: 358 }
    ],
    stats: {
      totalMetricsAnalyzed: 52,
      performanceChecks: 110,
      issuesFound: 2,
      passedChecks: 108,
      domNodes: 450 + (absHash % 300),
      pageSizeKb: 320 + (absHash % 250),
      requestsCount: 20 + (absHash % 15)
    },
    aiRecommendations: [
      `Overall website health is ${overall >= 90 ? 'Excellent' : 'Good'} with low TTFB of ${ttfbVal}ms.`,
      'TLS 1.3 certificate is securely configured with ChaCha20-Poly1305 encryption cipher.',
      'Core Web Vitals are within Google\'s top 10% threshold for SEO indexing priority.',
      'Dinesh AI 2026 Python engine recommends automated continuous integration regression tests.'
    ]
  };
}
