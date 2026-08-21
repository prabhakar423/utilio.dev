import { siteConfig } from '@/lib/site'
import { categories, type CategoryDefinition } from '@/lib/categories'
import { tools } from '@/lib/tools'

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
  utiliioPoints: string[]
  competitorPoints: string[]
  verdict: string
}

export const comparisons: Record<string, Comparison> = {
  'utiliio-vs-json-formatter': {
    slug: 'utiliio-vs-json-formatter',
    title: 'Utiliio vs JSONFormatter.org — Which JSON Formatter Is Better?',
    description: `Compare ${siteConfig.name} and JSONFormatter.org for formatting JSON online. Privacy, speed, and features compared.`,
    competitor: 'JSONFormatter.org',
    toolId: 'json-formatter',
    publishedAt: '2026-04-02',
    keywords: [
      'utiliio vs jsonformatter',
      'json formatter online comparison',
      'private json formatter',
      'json formatter no upload',
    ],
    intro:
      'JSONFormatter.org and Utiliio both format JSON in the browser. Utiliio goes further with live output, parse error locations, structure preview, and shareable links — all without uploading your data.',
    utiliioPoints: [
      'Live formatting — output updates as you paste, no button click',
      'Format, minify, and validate modes on one page',
      'Parse errors show line and column; structure preview with depth stats',
      'Shareable links encode input in the URL (?q= parameter)',
      '100% client-side — JSON never uploaded or logged',
      'Part of 100+ free tools — no account required',
    ],
    competitorPoints: [
      'Well-known dedicated JSON formatter',
      'Typically requires clicking Format to see output',
      'May upload or log input depending on their privacy policy',
      'Often ad-heavy layout',
      'Usually JSON-only — no integrated JWT, Base64, or hash workbenches',
    ],
    verdict:
      'If you are formatting API responses or configs with sensitive keys, choose a tool that processes data locally and shows errors instantly. Utiliio formats live in your browser — paste, inspect structure, copy, or share a link.',
  },
  'utiliio-vs-base64-encode': {
    slug: 'utiliio-vs-base64-encode',
    title: 'Utiliio vs Base64Encode.org — Private Base64 Encoding',
    description: `Compare ${siteConfig.name} with typical online Base64 encoders. Unified encode/decode workbench with URL-safe mode — tokens stay on your device.`,
    competitor: 'Typical online Base64 encoder',
    toolId: 'base64-encoder',
    publishedAt: '2026-04-02',
    keywords: [
      'base64 encoder comparison',
      'private base64 encode',
      'base64 no upload',
      'utiliio vs base64 encoder',
    ],
    intro:
      'Most Base64 sites split encode and decode across separate pages. Utiliio combines both in one workbench with standard and URL-safe modes — the format JWTs use — plus live round-trip testing, all in the browser.',
    utiliioPoints: [
      'Unified workbench — encode and decode on one page with live output',
      'Standard Base64 (+/) and URL-safe Base64 (-_) modes',
      'Round-trip your input to confirm encoding is correct',
      '100% client-side — credentials and JWT payloads stay on your device',
      'Shareable links preserve input, direction, and encoding mode',
      'Works offline after the page loads — no sign-up, no rate limits',
    ],
    competitorPoints: [
      'Simple one-page encode or decode UI — often on separate sites',
      'Rarely offers URL-safe mode alongside standard Base64',
      'Server-side tools may store inputs in logs',
      'Separate sites needed for JWT decode, URL encoding, hashing',
    ],
    verdict:
      'Never paste JWT tokens, API keys, or passwords into a server-side encoder. Utiliio\'s Base64 workbench processes everything in JavaScript — switch modes, round-trip, and share links without data leaving the tab.',
  },
  'utiliio-vs-cron-tools': {
    slug: 'utiliio-vs-cron-tools',
    title: 'Utiliio vs Online Cron Generators — Parse & Build With Next-Run Preview',
    description: `Compare browser-based cron workbenches. Parse expressions with next-run preview and build schedules visually — no upload.`,
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
      'Cron generators help you build and validate schedule expressions for backups, CI pipelines, and Kubernetes CronJobs. Utiliio\'s Cron workbench combines a visual builder with a parser that shows field breakdowns and the next 5 scheduled runs.',
    utiliioPoints: [
      'Parse tab — field-by-field breakdown plus next 5 run times',
      'Build tab — presets (hourly, daily, weekly) or manual field entry',
      'Catch day-of-week vs day-of-month mistakes before deploying',
      '100% in-browser — job names and schedules never uploaded',
      'Shareable links preserve expression and active tab',
      'Free with no account — integrated with 100+ dev tools',
    ],
    competitorPoints: [
      'Various free cron tools with similar basic UI',
      'Often parser-only or builder-only — not both on one page',
      'Next-run preview may require a separate tool or server call',
      'Some require sign-up for saving expressions',
    ],
    verdict:
      'Cron syntax errors fail silently in production. Utiliio lets you parse existing expressions, preview upcoming runs, and build new ones locally — paste into crontab, Kubernetes, or GitHub Actions with confidence.',
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
    utiliioPoints: [
      'Every tool runs in your browser using JavaScript',
      'Zero upload — data never touches our servers',
      'Multi-tab workbenches — JWT (decode/verify/sign), URL (encode/decode/parse), Base64, Cron',
      'Live output and shareable links (?q=) on 50+ tools',
      'Works offline after initial page load',
      '100+ utilities in one privacy-first platform',
    ],
    competitorPoints: [
      'Server processing can handle very large files',
      'May offer cloud save and collaboration features',
      'Input may be logged, cached, or used for analytics',
      'Requires trust in the operator\'s security practices',
    ],
    verdict:
      'Rule of thumb: if you would not paste it in a public Slack channel, do not paste it into a server-side tool. Use browser-based alternatives like Utiliio for developer data.',
  },
  'utiliio-vs-jwt-io': {
    slug: 'utiliio-vs-jwt-io',
    title: 'Utiliio vs JWT.io — Decode, Verify & Sign Tokens Privately',
    description: `Compare ${siteConfig.name} with JWT.io for decoding and verifying JSON Web Tokens. HS256 and RS256 verification in the browser — no token upload.`,
    competitor: 'JWT.io',
    toolId: 'jwt-decoder',
    publishedAt: '2026-04-09',
    keywords: [
      'utiliio vs jwt.io',
      'jwt decoder private',
      'decode jwt no upload',
      'jwt.io alternative',
      'jwt verify online rs256',
    ],
    intro:
      'JWT.io is the industry-standard JWT debugger — great for learning token structure. Utiliio matches the decode experience and adds signature verification (HS256 and RS256), expiry badges, and a sign tab — all without sending tokens to a server.',
    utiliioPoints: [
      'Decode tab — claims table, formatted header/payload, expiry badge',
      'Verify tab — HS256/384/512 with secret, RS256/384/512 with PEM public key',
      'Sign tab — create test tokens with custom claims and HMAC secrets',
      '100% client-side — production tokens never uploaded or logged',
      'Shareable links preserve token, tab, algorithm, and key state',
      'Works offline after page load — no account required',
    ],
    competitorPoints: [
      'Industry-standard JWT reference with extensive documentation',
      'Strong decode and sign experience for learning',
      'Verify with RSA may require server-side processing on some setups',
      'High-traffic site — higher exposure if inputs are logged',
      'Focused on JWT only — no integrated JSON, Base64, or hash tools',
    ],
    verdict:
      'For learning with public sample tokens, either tool works. For staging or production JWTs, Utiliio lets you decode claims, verify RS256 signatures with your public key, and sign test tokens — all locally in one workbench.',
  },
  'utiliio-vs-cyberchef': {
    slug: 'utiliio-vs-cyberchef',
    title: 'Utiliio vs CyberChef — Simple Encoding Without Complexity',
    description: `Compare ${siteConfig.name} with CyberChef for encoding and hashing tasks. When a focused private tool beats a kitchen sink.`,
    competitor: 'CyberChef',
    toolId: 'hash-generator',
    publishedAt: '2026-04-09',
    keywords: ['utiliio vs cyberchef', 'cyberchef alternative', 'encoding tools private', 'base64 hash online'],
    intro:
      'CyberChef is a powerful multi-tool for encoding, encryption, and analysis — beloved by security researchers. For everyday Base64, hashing, and formatting, a simpler private tool is often faster.',
    utiliioPoints: [
      'Focused tools and unified workbenches — no recipe builder learning curve',
      'JWT, Base64, URL, and Cron workbenches cover common encoding workflows',
      'Each tool loads fast with live output and minimal UI',
      '100% client-side processing — no upload for hashes, Base64, or tokens',
    ],
    competitorPoints: [
      'Extremely powerful — chains dozens of operations',
      'Can run locally (GCHQ open source) but heavy UI',
      'Overkill for simple encode/decode tasks',
      'Steeper learning curve for casual users',
    ],
    verdict:
      'Use CyberChef for complex multi-step forensic analysis. Use Utiliio for quick, private Base64, hash, and format tasks without building a recipe.',
  },
  'utiliio-vs-crontab-guru': {
    slug: 'utiliio-vs-crontab-guru',
    title: 'Utiliio vs Crontab Guru — Cron Workbench With Next-Run Preview',
    description: `Compare browser-based cron workbenches. Parse with next-run preview and build schedules visually — no upload.`,
    competitor: 'Crontab Guru',
    toolId: 'cron-generator',
    publishedAt: '2026-04-10',
    keywords: ['utiliio vs crontab guru', 'cron generator private', 'crontab guru alternative', 'cron expression builder'],
    intro:
      'Crontab Guru is a popular cron expression explainer with human-readable descriptions. Utiliio matches that with a Parse tab showing field breakdowns and the next 5 runs, plus a Build tab with presets — all processed locally in the browser.',
    utiliioPoints: [
      'Parse tab — field breakdown and next 5 scheduled run times',
      'Build tab — presets (hourly, daily, weekly) or manual field editing',
      'Unified Cron workbench — no switching between separate parser and builder sites',
      'No job names or schedules uploaded to servers',
      'Shareable links preserve expression and active tab',
      'Integrated with 100+ other dev tools — free, no account',
    ],
    competitorPoints: [
      'Clean UI focused on cron expression explanation',
      'Human-readable description of what a schedule means',
      'Typically parser-focused — separate tool needed to build expressions',
      'Server-side processing possible depending on implementation',
    ],
    verdict:
      'Crontab Guru excels at explaining cron syntax. Utiliio adds visual building, next-run preview, and shareable state — keeping infrastructure-sensitive schedules on your device.',
  },
  'utiliio-vs-hash-tools': {
    slug: 'utiliio-vs-hash-tools',
    title: 'Utiliio vs Online Hash Generators — SHA-256 Without Upload',
    description: `Compare private browser hashing with typical online SHA-256 generators. Why input matters for hash tools.`,
    competitor: 'Typical online hash generator',
    toolId: 'hash-generator',
    publishedAt: '2026-04-10',
    keywords: ['hash generator comparison', 'sha256 online private', 'utiliio vs hash generator', 'hash no upload'],
    intro:
      'Online hash generators are everywhere. Hashing passwords, API payloads, or proprietary strings on a remote server creates an unnecessary data trail — even though hashing is one-way.',
    utiliioPoints: [
      'Unified Hash/HMAC workbench — SHA-256, SHA-384, SHA-512 on one page',
      'HMAC tab for webhook signatures without a separate tool',
      'Input never leaves browser via Web Crypto API',
      'Shareable links with algorithm and tab preserved',
      'No rate limits or sign-up',
    ],
    competitorPoints: [
      'Simple paste-and-hash interface',
      'May log inputs on server for analytics or abuse prevention',
      'Often MD5-focused (broken — avoid for security)',
    ],
    verdict:
      'Hashing sensitive strings locally avoids leaking inputs to server logs. Utiliio uses the browser Web Crypto API — zero upload.',
  },
  'utiliio-vs-yaml-converters': {
    slug: 'utiliio-vs-yaml-converters',
    title: 'Utiliio vs Online YAML Converters — Kubernetes Configs Stay Local',
    description: `Compare private YAML-to-JSON conversion with server-side converters. Critical for K8s and CI configs with secrets.`,
    competitor: 'Typical online YAML converter',
    toolId: 'yaml-to-json',
    publishedAt: '2026-04-11',
    keywords: ['yaml to json comparison', 'yaml converter private', 'kubernetes config converter', 'yaml no upload'],
    intro:
      'YAML configs for Kubernetes, Docker Compose, and GitHub Actions often contain internal hostnames, API keys, or database URLs. Server-side conversion exposes that data.',
    utiliioPoints: [
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
      'Never paste production Kubernetes secrets or CI configs into unknown servers. Utiliio converts YAML in-browser — safe for internal infrastructure files.',
  },
  'utiliio-vs-url-encoders': {
    slug: 'utiliio-vs-url-encoders',
    title: 'Utiliio vs Online URL Encoders — Encode Query Strings Privately',
    description: `Compare ${siteConfig.name} with online URL encoders. Encode, decode, and parse URLs with query param tables — all in one browser workbench.`,
    competitor: 'Typical online URL encoder',
    toolId: 'url-encoder',
    publishedAt: '2026-04-11',
    keywords: ['url encoder comparison', 'url encode private', 'percent encoding online', 'utiliio vs url encoder'],
    intro:
      'URL encoding converts special characters for safe use in query strings. Most encoders only handle encode/decode — Utiliio adds a Parse tab that breaks down protocol, host, path, and query parameters, with three encoding modes on one page.',
    utiliioPoints: [
      'Encode tab — component, full URL, and form (application/x-www-form-urlencoded) modes',
      'Decode tab — reverse percent-encoding with live output',
      'Parse tab — protocol, host, pathname, hash, and query param table with decoded values',
      '100% client-side — OAuth callbacks and tokens never hit a server',
      'Shareable links preserve input, active tab, and encoding mode',
      'Works offline after page load',
    ],
    competitorPoints: [
      'Simple encode/decode forms — encode or decode only',
      'No integrated URL parser or query parameter breakdown',
      'Server may log full URLs including session tokens',
      'Separate tools needed for URL parsing vs encoding',
    ],
    verdict:
      'Debugging OAuth redirects or API URLs with encoded query params? Utiliio\'s URL workbench encodes, decodes, and parses in one place — nothing hits a server, and you can share the exact state via link.',
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

export function getComparisonsForTool(toolId: string, limit = 3): Comparison[] {
  const tool = tools[toolId]
  const seen = new Set<string>()
  const result: Comparison[] = []

  const add = (comparison: Comparison | undefined) => {
    if (!comparison || seen.has(comparison.slug)) return
    seen.add(comparison.slug)
    result.push(comparison)
  }

  for (const comparison of getAllComparisons()) {
    if (comparison.toolId === toolId) add(comparison)
  }
  for (const slug of tool?.relatedComparisonSlugs ?? []) {
    add(getComparisonBySlug(slug))
  }

  return result.slice(0, limit)
}
