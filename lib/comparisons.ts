import { siteConfig } from '@/lib/site'

export interface Comparison {
  slug: string
  title: string
  description: string
  competitor: string
  competitorUrl?: string
  toolId: string
  publishedAt: string
  keywords: string[]
  intro: string
  utillioPoints: string[]
  competitorPoints: string[]
  verdict: string
}

export const comparisons: Record<string, Comparison> = {
  'utillio-vs-json-formatter': {
    slug: 'utillio-vs-json-formatter',
    title: 'Utillio vs JSONFormatter.org — Which JSON Formatter Is Better?',
    description: `Compare ${siteConfig.name} and JSONFormatter.org for formatting JSON online. Privacy, speed, and features compared.`,
    competitor: 'JSONFormatter.org',
    toolId: 'json-formatter',
    publishedAt: '2026-04-02',
    keywords: [
      'utillio vs jsonformatter',
      'json formatter online comparison',
      'private json formatter',
      'json formatter no upload',
    ],
    intro:
      'Both tools format and validate JSON in the browser. The difference is privacy guarantees, extra features, and whether your data ever touches a server.',
    utillioPoints: [
      '100% client-side — JSON never uploaded or logged',
      'Format, minify, and validate in one tool',
      'Shareable links with encoded input (?q= parameter)',
      'No ads covering the editor on most screens',
      'Part of 100+ free tools — no account required',
    ],
    competitorPoints: [
      'Well-known dedicated JSON formatter',
      'May upload or log input depending on their privacy policy',
      'Often ad-heavy layout',
      'Typically JSON-only — no integrated hash, Base64, or JWT tools',
    ],
    verdict:
      'If you are formatting API responses, config files, or anything with sensitive keys, use a tool that processes data locally. Utillio runs entirely in your browser — paste, format, copy, done.',
  },
  'utillio-vs-base64-encode': {
    slug: 'utillio-vs-base64-encode',
    title: 'Utillio vs Base64Encode.org — Private Base64 Encoding',
    description: `Compare ${siteConfig.name} with typical online Base64 encoders. Learn why browser-only processing matters for tokens and credentials.`,
    competitor: 'Typical online Base64 encoder',
    toolId: 'base64-encoder',
    publishedAt: '2026-04-02',
    keywords: [
      'base64 encoder comparison',
      'private base64 encode',
      'base64 no upload',
      'utillio vs base64 encoder',
    ],
    intro:
      'Base64 encoding is reversible — anyone can decode it. That makes it fine for data URIs but risky for secrets if your input is sent to a third-party server.',
    utillioPoints: [
      'Encode and decode locally — credentials stay on your device',
      'Works offline after the page loads',
      'Linked decoder tool for round-trip testing',
      'No sign-up, no rate limits',
    ],
    competitorPoints: [
      'Simple one-page encode/decode UI',
      'Server-side tools may store inputs in logs',
      'Separate sites needed for URL encoding, hashing, etc.',
    ],
    verdict:
      'Never paste JWT tokens, API keys, or passwords into a server-side encoder. Utillio processes Base64 in JavaScript — your input never leaves the tab.',
  },
  'utillio-vs-cron-tools': {
    slug: 'utillio-vs-cron-tools',
    title: 'Utillio vs Online Cron Generators — Build Schedules Privately',
    description: `Compare browser-based cron expression builders. Generate cron schedules without uploading job configs to a server.`,
    competitor: 'Typical online cron generator',
    toolId: 'cron-generator',
    publishedAt: '2026-04-03',
    keywords: [
      'cron generator comparison',
      'cron expression builder online',
      'private cron generator',
      'crontab generator free',
    ],
    intro:
      'Cron generators help you build schedule expressions for backups, CI pipelines, and Kubernetes CronJobs. Your expressions may reveal internal infrastructure names or job schedules.',
    utillioPoints: [
      'Visual cron builder runs entirely in-browser',
      'Companion cron parser to explain existing expressions',
      'No data sent to servers — safe for internal job names',
      'Free with no account',
    ],
    competitorPoints: [
      'Various free cron tools with similar UI',
      'Some require sign-up for saving expressions',
      'Unclear privacy policies on server-side generators',
    ],
    verdict:
      'Cron expressions themselves are rarely secret, but combined with job names they can expose infrastructure details. Utillio keeps everything local.',
  },
  'browser-tools-vs-server-upload': {
    slug: 'browser-tools-vs-server-upload',
    title: 'Browser Tools vs Server Upload — Why Local Processing Matters',
    description: `Understand the difference between client-side and server-side online tools, and when to choose private browser utilities like ${siteConfig.name}.`,
    competitor: 'Server-side online tools',
    toolId: 'json-formatter',
    publishedAt: '2026-04-03',
    keywords: [
      'browser tools vs server upload',
      'client side online tools',
      'private online utilities',
      'no upload developer tools',
    ],
    intro:
      'Most "free online tools" send your input to a remote server, process it, and return the result. That is fine for public data — but dangerous for tokens, PII, proprietary configs, and production secrets.',
    utillioPoints: [
      'Every tool runs in your browser using JavaScript',
      'Zero upload — data never touches our servers',
      'Works offline after initial page load',
      'No account, no tracking of tool inputs',
      '100+ utilities in one privacy-first platform',
    ],
    competitorPoints: [
      'Server processing can handle very large files',
      'May offer cloud save and collaboration features',
      'Input may be logged, cached, or used for analytics',
      'Requires trust in the operator\'s security practices',
    ],
    verdict:
      'Rule of thumb: if you would not paste it in a public Slack channel, do not paste it into a server-side tool. Use browser-based alternatives like Utillio for developer data.',
  },
  'utillio-vs-jwt-io': {
    slug: 'utillio-vs-jwt-io',
    title: 'Utillio vs JWT.io — Decode Tokens Privately',
    description: `Compare ${siteConfig.name} with JWT.io for decoding JSON Web Tokens. Keep auth tokens off third-party servers.`,
    competitor: 'JWT.io',
    toolId: 'jwt-decoder',
    publishedAt: '2026-04-09',
    keywords: ['utillio vs jwt.io', 'jwt decoder private', 'decode jwt no upload', 'jwt.io alternative'],
    intro:
      'JWT.io is the most popular JWT debugger. It is excellent for learning JWT structure — but pasting production tokens into any third-party site carries risk if inputs are logged.',
    utillioPoints: [
      'Decode JWT header and payload locally in browser',
      'Companion JWT generator for test tokens',
      'No token data sent to servers',
      'Works offline after page load',
    ],
    competitorPoints: [
      'Industry-standard JWT reference with documentation',
      'May process tokens server-side depending on feature',
      'Popular target — high traffic means higher exposure if logged',
      'Focused on JWT only',
    ],
    verdict:
      'For learning and public sample tokens, either tool works. For staging or production JWTs with real user claims, decode locally with Utillio.',
  },
  'utillio-vs-cyberchef': {
    slug: 'utillio-vs-cyberchef',
    title: 'Utillio vs CyberChef — Simple Encoding Without Complexity',
    description: `Compare ${siteConfig.name} with CyberChef for encoding and hashing tasks. When a focused private tool beats a kitchen sink.`,
    competitor: 'CyberChef',
    toolId: 'hash-generator',
    publishedAt: '2026-04-09',
    keywords: ['utillio vs cyberchef', 'cyberchef alternative', 'encoding tools private', 'base64 hash online'],
    intro:
      'CyberChef is a powerful multi-tool for encoding, encryption, and analysis — beloved by security researchers. For everyday Base64, hashing, and formatting, a simpler private tool is often faster.',
    utillioPoints: [
      'Focused tools — no recipe builder learning curve',
      'Each tool loads fast with minimal UI',
      '100% client-side processing',
      'No upload for hashes, Base64, or hex encoding',
    ],
    competitorPoints: [
      'Extremely powerful — chains dozens of operations',
      'Can run locally (GCHQ open source) but heavy UI',
      'Overkill for simple encode/decode tasks',
      'Steeper learning curve for casual users',
    ],
    verdict:
      'Use CyberChef for complex multi-step forensic analysis. Use Utillio for quick, private Base64, hash, and format tasks without building a recipe.',
  },
  'utillio-vs-crontab-guru': {
    slug: 'utillio-vs-crontab-guru',
    title: 'Utillio vs Crontab Guru — Private Cron Expression Builder',
    description: `Compare browser-based cron generators. Build and validate schedules without uploading job details.`,
    competitor: 'Crontab Guru',
    toolId: 'cron-generator',
    publishedAt: '2026-04-10',
    keywords: ['utillio vs crontab guru', 'cron generator private', 'crontab guru alternative', 'cron expression builder'],
    intro:
      'Crontab Guru is a popular cron expression explainer and generator. Utillio offers similar functionality with explicit browser-only processing for infrastructure-sensitive schedules.',
    utillioPoints: [
      'Visual cron builder + parser in one platform',
      'No job names or schedules uploaded',
      'Free, no account',
      'Integrated with 100+ other dev tools',
    ],
    competitorPoints: [
      'Clean UI focused on cron expressions',
      'Human-readable explanation of schedules',
      'Server-side processing possible depending on implementation',
    ],
    verdict:
      'For internal cron jobs with sensitive naming or timing, prefer a local generator. Utillio keeps expressions on your device.',
  },
  'utillio-vs-hash-tools': {
    slug: 'utillio-vs-hash-tools',
    title: 'Utillio vs Online Hash Generators — SHA-256 Without Upload',
    description: `Compare private browser hashing with typical online SHA-256 generators. Why input matters for hash tools.`,
    competitor: 'Typical online hash generator',
    toolId: 'hash-generator',
    publishedAt: '2026-04-10',
    keywords: ['hash generator comparison', 'sha256 online private', 'utillio vs hash generator', 'hash no upload'],
    intro:
      'Online hash generators are everywhere. Hashing passwords, API payloads, or proprietary strings on a remote server creates an unnecessary data trail — even though hashing is one-way.',
    utillioPoints: [
      'SHA-256, SHA-384, SHA-512 via Web Crypto API',
      'Input never leaves browser',
      'Companion HMAC tool for signed payloads',
      'No rate limits or sign-up',
    ],
    competitorPoints: [
      'Simple paste-and-hash interface',
      'May log inputs on server for analytics or abuse prevention',
      'Often MD5-focused (broken — avoid for security)',
    ],
    verdict:
      'Hashing sensitive strings locally avoids leaking inputs to server logs. Utillio uses the browser Web Crypto API — zero upload.',
  },
  'utillio-vs-yaml-converters': {
    slug: 'utillio-vs-yaml-converters',
    title: 'Utillio vs Online YAML Converters — Kubernetes Configs Stay Local',
    description: `Compare private YAML-to-JSON conversion with server-side converters. Critical for K8s and CI configs with secrets.`,
    competitor: 'Typical online YAML converter',
    toolId: 'yaml-to-json',
    publishedAt: '2026-04-11',
    keywords: ['yaml to json comparison', 'yaml converter private', 'kubernetes config converter', 'yaml no upload'],
    intro:
      'YAML configs for Kubernetes, Docker Compose, and GitHub Actions often contain internal hostnames, API keys, or database URLs. Server-side conversion exposes that data.',
    utillioPoints: [
      'YAML ↔ JSON both directions locally',
      'Handles typical K8s and Docker Compose structures',
      'No config data uploaded',
      'Linked JSON formatter for output cleanup',
    ],
    competitorPoints: [
      'Quick one-page YAML to JSON conversion',
      'May store or log pasted configs',
      'Separate tools needed for JSON to YAML reverse',
    ],
    verdict:
      'Never paste production Kubernetes secrets or CI configs into unknown servers. Utillio converts YAML in-browser — safe for internal infrastructure files.',
  },
  'utillio-vs-url-encoders': {
    slug: 'utillio-vs-url-encoders',
    title: 'Utillio vs Online URL Encoders — Encode Query Strings Privately',
    description: `Compare browser-based URL encoding with server-side percent-encoders. Keep tokens and PII out of server logs.`,
    competitor: 'Typical online URL encoder',
    toolId: 'url-encoder',
    publishedAt: '2026-04-11',
    keywords: ['url encoder comparison', 'url encode private', 'percent encoding online', 'utillio vs url encoder'],
    intro:
      'URL encoding converts special characters for safe use in query strings. Encoded URLs often contain session tokens, email addresses, and search terms — all sensitive in server logs.',
    utillioPoints: [
      'Encode and decode locally',
      'URL parser companion for breaking down query params',
      'No input logging',
      'Works offline',
    ],
    competitorPoints: [
      'Simple encode/decode forms',
      'Server may log full URLs including tokens',
      'No integrated URL parsing',
    ],
    verdict:
      'Encoding URLs with auth tokens or personal data? Do it locally. Utillio percent-encodes in JavaScript — nothing hits a server.',
  },
}

export function getAllComparisons(): Comparison[] {
  return Object.values(comparisons)
}

export function getComparisonSlugs(): string[] {
  return Object.keys(comparisons)
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons[slug]
}

export function getComparisonsForTool(toolId: string): Comparison[] {
  return getAllComparisons().filter((comparison) => comparison.toolId === toolId)
}
