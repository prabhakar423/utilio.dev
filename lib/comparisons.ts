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
  utilioPoints: string[]
  competitorPoints: string[]
  verdict: string
}

export const comparisons: Record<string, Comparison> = {
  'utilio-vs-json-formatter': {
    slug: 'utilio-vs-json-formatter',
    title: 'Utilio vs JSONFormatter.org — Which JSON Formatter Is Better?',
    description: `Compare ${siteConfig.name} and JSONFormatter.org for formatting JSON online. Privacy, speed, and features compared.`,
    competitor: 'JSONFormatter.org',
    toolId: 'json-formatter',
    publishedAt: '2026-04-02',
    keywords: [
      'utilio vs jsonformatter',
      'json formatter online comparison',
      'private json formatter',
      'json formatter no upload',
    ],
    intro:
      'Both tools format and validate JSON in the browser. The difference is privacy guarantees, extra features, and whether your data ever touches a server.',
    utilioPoints: [
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
      'If you are formatting API responses, config files, or anything with sensitive keys, use a tool that processes data locally. Utilio runs entirely in your browser — paste, format, copy, done.',
  },
  'utilio-vs-base64-encode': {
    slug: 'utilio-vs-base64-encode',
    title: 'Utilio vs Base64Encode.org — Private Base64 Encoding',
    description: `Compare ${siteConfig.name} with typical online Base64 encoders. Learn why browser-only processing matters for tokens and credentials.`,
    competitor: 'Typical online Base64 encoder',
    toolId: 'base64-encoder',
    publishedAt: '2026-04-02',
    keywords: [
      'base64 encoder comparison',
      'private base64 encode',
      'base64 no upload',
      'utilio vs base64 encoder',
    ],
    intro:
      'Base64 encoding is reversible — anyone can decode it. That makes it fine for data URIs but risky for secrets if your input is sent to a third-party server.',
    utilioPoints: [
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
      'Never paste JWT tokens, API keys, or passwords into a server-side encoder. Utilio processes Base64 in JavaScript — your input never leaves the tab.',
  },
  'utilio-vs-cron-tools': {
    slug: 'utilio-vs-cron-tools',
    title: 'Utilio vs Online Cron Generators — Build Schedules Privately',
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
    utilioPoints: [
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
      'Cron expressions themselves are rarely secret, but combined with job names they can expose infrastructure details. Utilio keeps everything local.',
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
    utilioPoints: [
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
      'Rule of thumb: if you would not paste it in a public Slack channel, do not paste it into a server-side tool. Use browser-based alternatives like Utilio for developer data.',
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
