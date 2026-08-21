import { siteConfig } from '@/lib/site'
import { categories, type CategoryDefinition } from '@/lib/categories'

export type ToolType = 'static' | 'api' | 'ai' | 'reference'

export interface ToolFaq {
  question: string
  answer: string
}

export interface ToolDefinition {
  id: string
  title: string
  description: string
  longDescription?: string
  /** Search-optimized `<title>` — falls back to `${title} — Free Online Tool | Utiliio` */
  seoTitle?: string
  /** Search-optimized meta description — falls back to longDescription + privacy suffix */
  seoDescription?: string
  /** Keyword-rich H1 — falls back to title */
  seoH1?: string
  /** Extra keyword-rich intro shown under the H1 — falls back to longDescription */
  seoIntro?: string
  /** Primary SEO guide slug — surfaced first in related guides */
  seoGuideSlug?: string
  /** Compare page slugs to cross-link (in addition to matches on toolId) */
  relatedComparisonSlugs?: string[]
  category: string
  icon: string
  keywords: string[]
  type: ToolType
  addedAt: string
  relatedTools?: string[]
  faq?: ToolFaq[]
  component: () => Promise<{ default: React.ComponentType }>
}

export type { CategoryDefinition }
export { categories }

const defaultFaq: ToolFaq[] = [
  {
    question: 'Is this tool free?',
    answer: `Yes. Every ${siteConfig.name} utility is free with no sign-up, usage limits, or paywalls.`,
  },
  {
    question: 'Do you store my data?',
    answer: 'No. Processing happens entirely in your browser. Your input never leaves your device.',
  },
  {
    question: 'Can I use this tool offline?',
    answer: 'Yes. Once the page loads, most tools continue working without an internet connection.',
  },
]

export const tools: Record<string, ToolDefinition> = {
  'json-formatter': {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate, and minify JSON with live error locations',
    longDescription:
      'Free online JSON formatter and validator. Pretty-print with live output, pinpoint syntax errors by line and column, preview structure, and minify for production.',
    seoTitle: 'JSON Formatter Online Free — Pretty Print & Validate | Utiliio',
    seoDescription:
      'Format and validate JSON online with live error locations. Pretty-print, minify, structure preview, and shareable links — free, no upload.',
    seoH1: 'JSON Formatter Online Free',
    seoIntro:
      'Paste raw JSON and get formatted output instantly with live syntax validation. See exact line and column errors, preview object structure, minify for production, and share the same payload via link — all in your browser.',
    seoGuideSlug: 'json-formatter-pretty-print-online-free',
    relatedComparisonSlugs: ['utiliio-vs-json-formatter', 'browser-tools-vs-server-upload'],
    category: 'text',
    icon: 'braces',
    keywords: [
      'json formatter online free',
      'pretty print json',
      'format json online',
      'json validator',
      'minify json',
      'json beautifier',
      'json error line',
    ],
    type: 'static',
    addedAt: '2026-01-15',
    relatedTools: ['json-to-csv', 'yaml-to-json', 'jwt-decoder'],
    faq: [
      {
        question: 'How do I format JSON online for free?',
        answer: 'Paste your JSON into the input box — output updates live in Format mode with readable indentation. No sign-up or upload required.',
      },
      {
        question: 'How do I format JSON online?',
        answer: 'Paste your JSON into the input box — output updates live in Format mode with readable indentation.',
      },
      {
        question: 'Is it safe to paste API JSON into an online formatter?',
        answer: 'With Utiliio, yes — processing happens entirely in your browser. Your JSON never leaves your device, unlike server-side formatters.',
      },
      {
        question: 'Does this show where JSON syntax errors are?',
        answer: 'Yes. Invalid JSON shows the parse error with line and column numbers so you can fix issues quickly.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/json-formatter').then((mod) => ({ default: mod.JsonFormatter })),
  },
  'base64-encoder': {
    id: 'base64-encoder',
    title: 'Base64 Encoder',
    description: 'Encode and decode Base64 in one workbench',
    longDescription:
      'Convert text to Base64 and back — standard or URL-safe — with live output. One workbench for encode and decode, no page switching.',
    seoTitle: 'Base64 Encoder Online Free — Encode & Decode | Utiliio',
    seoDescription:
      'Encode and decode Base64 online with standard and URL-safe modes. Live round-trip, shareable links — free, no upload.',
    seoH1: 'Base64 Encoder Online Free',
    seoIntro:
      'Convert text to Base64 or decode Base64 strings instantly — standard (+/) or URL-safe (-_) modes for JWTs and query strings. Encode and decode tabs share one page with live output and shareable state.',
    seoGuideSlug: 'base64-encode-decode-online-free',
    relatedComparisonSlugs: ['utiliio-vs-base64-encode', 'browser-tools-vs-server-upload'],
    category: 'encoding',
    icon: 'binary',
    keywords: [
      'base64 encoder online free',
      'base64 encode decode online',
      'encode base64',
      'decode base64',
      'url-safe base64',
      'base64 converter',
    ],
    type: 'static',
    addedAt: '2026-01-18',
    relatedTools: ['base64-decoder', 'jwt-decoder', 'url-encoder'],
    faq: [
      {
        question: 'How do I encode Base64 online for free?',
        answer: 'Paste text into the Encode tab — Base64 output updates live. Toggle URL-safe mode for JWT-style encoding. No upload required.',
      },
      {
        question: 'What is URL-safe Base64?',
        answer: 'URL-safe Base64 replaces + with - and / with _ and omits padding. Use it in JWTs, query strings, and filenames where standard Base64 characters cause issues.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/base64-encoder').then((mod) => ({ default: mod.Base64Encoder })),
  },
  'base64-decoder': {
    id: 'base64-decoder',
    title: 'Base64 Decoder',
    description: 'Decode and encode Base64 in one workbench',
    longDescription:
      'Decode Base64 strings to readable text or encode plain text — standard or URL-safe — with live output in a unified Base64 workbench.',
    category: 'encoding',
    icon: 'binary',
    keywords: ['base64', 'decode', 'encode', 'text', 'converter', 'base64url'],
    type: 'static',
    addedAt: '2026-01-18',
    relatedTools: ['base64-encoder', 'url-decoder', 'jwt-decoder'],
    faq: [
      {
        question: 'Can I decode URL-safe Base64?',
        answer: 'Yes. Switch to the Decode tab and select URL-safe mode. Padding is added automatically if missing.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/base64-decoder').then((mod) => ({ default: mod.Base64Decoder })),
  },
  'url-encoder': {
    id: 'url-encoder',
    title: 'URL Encoder',
    description: 'Percent-encode and decode URLs in one workbench',
    longDescription:
      'Encode and decode URLs with live output, or parse them into components. Choose component encoding for query values, full URL mode, or form encoding with + for spaces.',
    category: 'encoding',
    icon: 'link',
    keywords: ['url', 'encode', 'decode', 'percent encoding', 'uri', 'urlencode'],
    type: 'static',
    addedAt: '2026-01-20',
    relatedTools: ['url-decoder', 'url-parser', 'base64-encoder'],
    faq: [
      {
        question: 'What is the difference between component and full URL encoding?',
        answer: 'Component encoding (encodeURIComponent) escapes every special character — use for query parameter values. Full URL encoding (encodeURI) preserves :// ? # and is meant for complete URLs.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/url-encoder').then((mod) => ({ default: mod.UrlEncoder })),
  },
  'url-decoder': {
    id: 'url-decoder',
    title: 'URL Decoder',
    description: 'Decode and encode percent-encoded URLs',
    longDescription:
      'Decode percent-encoded strings back to readable text, or encode in the same URL workbench. Supports component, full URL, and form (+) encoding modes.',
    category: 'encoding',
    icon: 'link-2',
    keywords: ['url', 'decode', 'encode', 'percent encoding', 'uri', 'urldecode'],
    type: 'static',
    addedAt: '2026-01-20',
    relatedTools: ['url-encoder', 'url-parser', 'base64-decoder'],
    faq: [
      {
        question: 'Why does decoding fail with an error?',
        answer: 'Malformed percent-encoding (like a trailing %) causes decode errors. Check the string was encoded correctly and matches the selected encoding mode.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/url-decoder').then((mod) => ({ default: mod.UrlDecoder })),
  },
  'uuid-generator': {
    id: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate RFC 4122 UUID v4 identifiers',
    longDescription:
      'Create cryptographically random UUID v4 values for databases, APIs, and distributed systems. Copy single or bulk UUIDs in one click.',
    seoTitle: 'UUID Generator Online Free — Generate UUID v4 Instantly | Utiliio',
    seoDescription:
      'Generate UUID v4 identifiers online instantly. Cryptographically random, bulk copy, runs in your browser — free, no upload.',
    seoH1: 'UUID Generator Online Free',
    seoIntro:
      'Create RFC 4122 UUID v4 values for databases, API keys, and test fixtures. Generate one or many at once, copy with one click, and keep everything local — no server round-trip.',
    seoGuideSlug: 'uuid-generator-v4-online-free',
    relatedComparisonSlugs: ['browser-tools-vs-server-upload'],
    category: 'generators',
    icon: 'fingerprint',
    keywords: [
      'uuid generator online free',
      'uuid v4 generator',
      'generate uuid',
      'guid generator',
      'unique identifier generator',
      'random uuid',
    ],
    type: 'static',
    addedAt: '2026-01-22',
    relatedTools: ['uuid-validator', 'password-generator', 'jwt-decoder'],
    faq: [
      {
        question: 'How do I generate a UUID online for free?',
        answer: 'Click Generate to create a cryptographically random UUID v4 instantly. Copy one UUID or generate multiple at once — all in your browser.',
      },
      {
        question: 'What UUID version does this generate?',
        answer: 'UUID v4 — random 128-bit values per RFC 4122, suitable for most database primary keys and API identifiers.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/uuid-generator').then((mod) => ({ default: mod.UuidGenerator })),
  },
  'password-generator': {
    id: 'password-generator',
    title: 'Password Generator',
    description: 'Create strong, customizable passwords',
    longDescription:
      'Generate secure random passwords with configurable length and character sets. All generation happens locally in your browser.',
    category: 'generators',
    icon: 'key-round',
    keywords: ['password', 'generate', 'secure', 'random', 'strong password'],
    type: 'static',
    addedAt: '2026-01-22',
    relatedTools: ['uuid-generator', 'base64-encoder', 'json-formatter'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/password-generator').then((mod) => ({
        default: mod.PasswordGenerator,
      })),
  },
  'word-counter': {
    id: 'word-counter',
    title: 'Word Counter',
    description: 'Count words, characters, sentences, and lines',
    longDescription:
      'Analyze text with live word, character, sentence, and line counts. Ideal for essays, social posts, SEO copy, and content limits.',
    category: 'text',
    icon: 'type',
    keywords: ['word count', 'character count', 'text analysis', 'line count'],
    type: 'static',
    addedAt: '2026-01-25',
    relatedTools: ['json-formatter', 'url-encoder', 'password-generator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/word-counter').then((mod) => ({ default: mod.WordCounter })),
  },
  'age-calculator': {
    id: 'age-calculator',
    title: 'Age Calculator',
    description: 'Calculate exact age from a birthdate',
    longDescription:
      'Find your precise age in years, months, and days from any birthdate. Includes next birthday countdown and zodiac sign.',
    category: 'calculators',
    icon: 'cake',
    keywords: ['age calculator', 'birthdate', 'how old am i', 'date'],
    type: 'static',
    addedAt: '2026-02-01',
    relatedTools: ['emi-calculator', 'word-counter', 'uuid-generator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/age-calculator').then((mod) => ({ default: mod.AgeCalculator })),
  },
  'emi-calculator': {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    description: 'Calculate loan EMI, interest, and total payable',
    longDescription:
      'Compute monthly EMI for home, car, and personal loans. Adjust principal, interest rate, and tenure to compare repayment scenarios.',
    category: 'calculators',
    icon: 'calculator',
    keywords: ['emi calculator', 'loan', 'interest', 'finance', 'mortgage'],
    type: 'static',
    addedAt: '2026-02-05',
    relatedTools: ['age-calculator', 'word-counter', 'password-generator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/emi-calculator').then((mod) => ({ default: mod.EmiCalculator })),
  },
  'hash-generator': {
    id: 'hash-generator',
    title: 'Hash Generator',
    description: 'Generate SHA-256, SHA-384, and SHA-512 hashes',
    longDescription:
      'Compute cryptographic hashes and HMAC signatures in one workbench. SHA-256, SHA-384, and SHA-512 via Web Crypto — switch between Hash and HMAC tabs without leaving the page.',
    seoTitle: 'SHA-256 Hash Generator Online Free — Hash & HMAC | Utiliio',
    seoDescription:
      'Generate SHA-256, SHA-384, and SHA-512 hashes online. HMAC tab for webhook signatures — free, private, Web Crypto API.',
    seoH1: 'Hash Generator Online Free',
    seoIntro:
      'Compute SHA-256, SHA-384, and SHA-512 digests as you type — or switch to the HMAC tab for keyed signatures with a secret. Ideal for checksums, webhook verification, and debugging API auth flows, all locally in your browser.',
    seoGuideSlug: 'hash-generator-sha256-online-free',
    relatedComparisonSlugs: ['utiliio-vs-hash-tools', 'browser-tools-vs-server-upload'],
    category: 'security',
    icon: 'shield-check',
    keywords: [
      'hash generator online free',
      'sha256 hash generator online',
      'sha256 online',
      'hmac generator',
      'sha512 hash',
      'cryptographic hash browser',
    ],
    type: 'static',
    addedAt: '2026-02-10',
    relatedTools: ['hmac-generator', 'jwt-decoder', 'base64-encoder'],
    faq: [
      {
        question: 'How do I generate a SHA-256 hash online for free?',
        answer: 'Paste your text into the Hash tab — SHA-256 output updates live. Switch algorithms to SHA-384 or SHA-512. Processing uses the browser Web Crypto API.',
      },
      {
        question: 'What hash algorithms are supported?',
        answer: 'SHA-256, SHA-384, and SHA-512 via the browser Web Crypto API. MD5 is not included because it is cryptographically broken.',
      },
      {
        question: 'Can I generate HMAC signatures here?',
        answer: 'Yes. Switch to the HMAC tab to sign a message with a secret key — used for webhooks, API auth, and JWT HS256 verification.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/hash-generator').then((mod) => ({ default: mod.HashGenerator })),
  },
  'case-converter': {
    id: 'case-converter',
    title: 'Case Converter',
    description: 'Convert text to uppercase, lowercase, title, snake, and camel case',
    longDescription:
      'Transform text between common casing formats: UPPERCASE, lowercase, Title Case, snake_case, and camelCase. Ideal for variable naming, headings, and data cleanup.',
    category: 'text',
    icon: 'case-sensitive',
    keywords: ['case converter', 'uppercase', 'lowercase', 'camelcase', 'snake case', 'title case'],
    type: 'static',
    addedAt: '2026-02-10',
    relatedTools: ['word-counter', 'json-formatter', 'html-encoder'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/case-converter').then((mod) => ({ default: mod.CaseConverter })),
  },
  'jwt-decoder': {
    id: 'jwt-decoder',
    title: 'JWT Decoder',
    description: 'Decode, inspect, and verify JSON Web Tokens',
    longDescription:
      'Paste a JWT to decode its header and payload, inspect standard claims, check expiry, and verify HMAC signatures (HS256/384/512) — all in your browser. One workbench for decode, verify, and sign.',
    seoTitle: 'JWT Decoder Online Free — Decode & Verify Tokens | Utiliio',
    seoDescription:
      'Decode and verify JWT tokens online. HS256 and RS256 signature check, expiry badges, claims table — free, private, no upload.',
    seoH1: 'JWT Decoder Online Free',
    seoIntro:
      'Paste a JSON Web Token to inspect header and payload claims, check expiration at a glance, and verify HMAC or RSA signatures — decode, verify, and sign test tokens in one workbench without sending tokens to a server.',
    seoGuideSlug: 'jwt-decoder-online-free',
    relatedComparisonSlugs: ['utiliio-vs-jwt-io'],
    category: 'developer',
    icon: 'key',
    keywords: [
      'jwt decoder online free',
      'decode jwt online',
      'jwt verify online',
      'json web token decoder',
      'jwt payload',
      'auth token inspector',
      'rs256 jwt verify',
    ],
    type: 'static',
    addedAt: '2026-02-11',
    relatedTools: ['jwt-generator', 'json-formatter', 'base64-encoder'],
    faq: [
      {
        question: 'How do I decode a JWT online for free?',
        answer: 'Paste the token into the Decode tab — header and payload appear as formatted JSON instantly with a claims table and expiry badge.',
      },
      {
        question: 'Can this tool verify JWT signatures?',
        answer: 'Yes. Open the Verify tab. For HS256/384/512, paste the HMAC secret. For RS256/384/512, paste the PEM public key (SPKI format). Verification runs locally via Web Crypto.',
      },
      {
        question: 'Does this tool sign JWTs?',
        answer: 'Yes. Use the Sign tab to build and sign test tokens with HS256, HS384, or HS512. For production auth, always sign tokens on your server.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/jwt-decoder').then((mod) => ({ default: mod.JwtDecoder })),
  },
  'unix-timestamp-converter': {
    id: 'unix-timestamp-converter',
    title: 'Unix Timestamp Converter',
    description: 'Convert Unix timestamps to dates and vice versa',
    longDescription:
      'Convert between Unix epoch timestamps and human-readable dates with relative time ("3 days ago", "in 2 hours"). Auto-detects seconds vs milliseconds. One workbench for both directions.',
    category: 'datetime',
    icon: 'clock',
    keywords: ['unix timestamp', 'epoch converter', 'timestamp to date', 'date to timestamp', 'relative time'],
    type: 'static',
    addedAt: '2026-02-11',
    relatedTools: ['timezone-converter', 'jwt-decoder', 'cron-parser'],
    faq: [
      {
        question: 'Does it show relative time?',
        answer: 'Yes. When converting a timestamp to a date, the workbench shows relative time like "5 minutes ago" or "in 2 days" alongside local, ISO, and UTC formats.',
      },
      {
        question: 'Seconds or milliseconds?',
        answer: 'Both. Values with 13+ digits are treated as milliseconds; 10-digit values are seconds. The detected unit is shown in the result.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/unix-timestamp-converter').then((mod) => ({
        default: mod.UnixTimestampConverter,
      })),
  },
  'percentage-calculator': {
    id: 'percentage-calculator',
    title: 'Percentage Calculator',
    description: 'Calculate percentages, increases, decreases, and ratios',
    longDescription:
      'Find what percentage one number is of another, calculate percentage increase or decrease, and solve everyday percentage problems instantly.',
    category: 'math',
    icon: 'percent',
    keywords: ['percentage calculator', 'percent increase', 'percent of', 'ratio calculator'],
    type: 'static',
    addedAt: '2026-02-12',
    relatedTools: ['emi-calculator', 'age-calculator', 'random-number-generator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/percentage-calculator').then((mod) => ({
        default: mod.PercentageCalculator,
      })),
  },
  'html-encoder': {
    id: 'html-encoder',
    title: 'HTML Encoder',
    description: 'Encode special characters to HTML entities',
    longDescription:
      'Encode and decode HTML entities on one page — escape &lt;, &gt;, &amp;, and quotes for safe display, or reverse entities back to characters.',
    seoTitle: 'HTML Encoder Online Free — Escape & Encode Entities | Utiliio',
    seoDescription:
      'Encode HTML entities online instantly. Escape special characters for safe display — free, private, runs in your browser with decode tab.',
    seoH1: 'HTML Encoder Online Free',
    seoIntro:
      'Escape angle brackets, ampersands, and quotes into HTML entities for safe rendering in pages and templates. Switch to the Decode tab on the same page to reverse entities back to plain text.',
    seoGuideSlug: 'html-encoder-online-free',
    relatedComparisonSlugs: ['utiliio-vs-cyberchef', 'browser-tools-vs-server-upload'],
    category: 'encoding',
    icon: 'code',
    keywords: [
      'html encode',
      'html encoder online free',
      'html entities',
      'escape html',
      'html encode online',
      'html decode',
    ],
    type: 'static',
    addedAt: '2026-02-12',
    relatedTools: ['html-decoder', 'url-encoder', 'json-formatter'],
    faq: [
      {
        question: 'How do I encode HTML online for free?',
        answer: 'Paste your text into the Encode tab — special characters convert to HTML entities instantly with live output. No upload required.',
      },
      {
        question: 'Can I decode HTML entities here?',
        answer: 'Yes. Switch to the Decode tab in the same HTML workbench — encode and decode share one page with shareable links.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/html-encoder').then((mod) => ({ default: mod.HtmlEncoder })),
  },
  'html-decoder': {
    id: 'html-decoder',
    title: 'HTML Decoder',
    description: 'Decode HTML entities back to plain text',
    longDescription:
      'Convert HTML entities like &amp;lt; and &amp;amp; back to readable characters. Same workbench as the HTML Encoder — switch tabs without leaving the page.',
    category: 'encoding',
    icon: 'code',
    keywords: ['html decoder', 'decode html entities', 'unescape html', 'html entity decoder'],
    type: 'static',
    addedAt: '2026-07-26',
    relatedTools: ['html-encoder', 'url-decoder', 'strip-html-tags'],
    faq: [
      {
        question: 'Can I encode HTML here?',
        answer: 'Yes. Use the Encode tab in the same HTML workbench to escape special characters for safe HTML output.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/html-decoder').then((mod) => ({ default: mod.HtmlDecoder })),
  },
  'hex-encoder': {
    id: 'hex-encoder',
    title: 'Hex Encoder',
    description: 'Convert text to hexadecimal and hex back to text',
    longDescription:
      'Encode plain text to hex or decode hex strings to readable text in one workbench. Round-trip with a single click — useful for debugging binary data and color values.',
    category: 'encoding',
    icon: 'hash',
    keywords: ['hex encoder', 'hexadecimal', 'text to hex', 'hex decode', 'hex decoder'],
    type: 'static',
    addedAt: '2026-02-13',
    relatedTools: ['hex-decoder', 'base64-encoder', 'hash-generator'],
    faq: [
      {
        question: 'Can I decode hex back to text?',
        answer: 'Yes. Switch to the Hex → Text tab or use “Decode output →” after encoding. Both directions live on one page.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/hex-encoder').then((mod) => ({ default: mod.HexEncoder })),
  },
  'hex-decoder': {
    id: 'hex-decoder',
    title: 'Hex Decoder',
    description: 'Convert hexadecimal strings back to plain text',
    longDescription:
      'Decode hex strings (e.g. 48656c6c6f) to readable text. Same workbench as the Hex Encoder — whitespace in input is ignored automatically.',
    category: 'encoding',
    icon: 'hash',
    keywords: ['hex decoder', 'hexadecimal decode', 'hex to text', 'decode hex string'],
    type: 'static',
    addedAt: '2026-07-26',
    relatedTools: ['hex-encoder', 'binary-converter', 'ascii-converter'],
    faq: [
      {
        question: 'Can I encode text to hex here?',
        answer: 'Yes. Switch to the Text → Hex tab in the same workbench to encode plain text to hexadecimal.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/hex-decoder').then((mod) => ({ default: mod.HexDecoder })),
  },
  'lorem-ipsum-generator': {
    id: 'lorem-ipsum-generator',
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder paragraphs, sentences, and words',
    longDescription:
      'Create Lorem Ipsum placeholder text for mockups, design comps, and layout testing. Choose paragraphs, sentences, or words with one click.',
    category: 'generators',
    icon: 'file-text',
    keywords: ['lorem ipsum', 'placeholder text', 'dummy text generator', 'lipsum'],
    type: 'static',
    addedAt: '2026-02-13',
    relatedTools: ['word-counter', 'case-converter', 'password-generator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/lorem-ipsum-generator').then((mod) => ({
        default: mod.LoremIpsumGenerator,
      })),
  },
  'random-number-generator': {
    id: 'random-number-generator',
    title: 'Random Number Generator',
    description: 'Generate random numbers within any range',
    longDescription:
      'Pick random integers between a minimum and maximum value. Generate single numbers or bulk lists for raffles, testing, and simulations.',
    category: 'generators',
    icon: 'dice-5',
    keywords: ['random number', 'number generator', 'random integer', 'pick a number'],
    type: 'static',
    addedAt: '2026-02-14',
    relatedTools: ['uuid-generator', 'password-generator', 'percentage-calculator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/random-number-generator').then((mod) => ({
        default: mod.RandomNumberGenerator,
      })),
  },
  'regex-tester': {
    id: 'regex-tester',
    title: 'Regex Tester',
    description: 'Test regular expressions with live match highlighting',
    longDescription:
      'Test JavaScript regular expressions against sample text with live results. Supports flags (global, case-insensitive, multiline, dotall) and shows all matches.',
    category: 'developer',
    icon: 'regex',
    keywords: ['regex tester', 'regular expression', 'regex match', 'pattern tester'],
    type: 'static',
    addedAt: '2026-02-14',
    relatedTools: ['json-formatter', 'case-converter', 'word-counter'],
    faq: [
      {
        question: 'Which regex flavor is used?',
        answer: 'JavaScript regular expressions (ECMAScript). Syntax matches what you use in Node.js and browser JavaScript.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/regex-tester').then((mod) => ({ default: mod.RegexTester })),
  },
  'tip-calculator': {
    id: 'tip-calculator',
    title: 'Tip Calculator',
    description: 'Calculate tip amount and split bills between people',
    longDescription:
      'Quickly calculate tip amounts, total bill, and per-person share. Adjust tip percentage and split between any number of people.',
    category: 'calculators',
    icon: 'receipt',
    keywords: ['tip calculator', 'gratuity', 'split bill', 'restaurant tip'],
    type: 'static',
    addedAt: '2026-02-15',
    relatedTools: ['percentage-calculator', 'emi-calculator', 'bmi-calculator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/tip-calculator').then((mod) => ({ default: mod.TipCalculator })),
  },
  'bmi-calculator': {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'Calculate Body Mass Index from height and weight',
    longDescription:
      'Compute your BMI using metric (kg/cm) or imperial (lbs/inches) units. Includes weight category classification based on WHO standards.',
    category: 'calculators',
    icon: 'activity',
    keywords: ['bmi calculator', 'body mass index', 'weight calculator', 'health'],
    type: 'static',
    addedAt: '2026-02-15',
    relatedTools: ['tip-calculator', 'percentage-calculator', 'age-calculator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/bmi-calculator').then((mod) => ({ default: mod.BmiCalculator })),
  },
  'color-converter': {
    id: 'color-converter',
    title: 'Color Converter',
    description: 'Convert colors between HEX, RGB, and HSL',
    longDescription:
      'Convert hex color codes to RGB and HSL values with a live color preview. Essential for web design, CSS, and UI development.',
    category: 'encoding',
    icon: 'palette',
    keywords: ['color converter', 'hex to rgb', 'rgb to hsl', 'color picker'],
    type: 'static',
    addedAt: '2026-02-16',
    relatedTools: ['html-encoder', 'hex-encoder', 'json-formatter'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/color-converter').then((mod) => ({ default: mod.ColorConverter })),
  },
  'cron-parser': {
    id: 'cron-parser',
    title: 'Cron Expression Parser',
    description: 'Parse cron schedules and preview next run times',
    longDescription:
      'Parse standard 5-field cron expressions into plain English, see field-by-field breakdown, and preview the next 5 run times — all in one cron workbench.',
    category: 'developer',
    icon: 'clock',
    keywords: ['cron parser', 'cron expression', 'crontab', 'schedule parser', 'next cron run'],
    type: 'static',
    addedAt: '2026-02-16',
    relatedTools: ['cron-generator', 'unix-timestamp-converter', 'timezone-converter'],
    faq: [
      {
        question: 'Does this show when a cron job will run next?',
        answer: 'Yes. The workbench calculates the next 5 matching run times in your local timezone.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/cron-parser').then((mod) => ({ default: mod.CronParser })),
  },
  'sql-formatter': {
    id: 'sql-formatter',
    title: 'SQL Formatter',
    description: 'Format and beautify SQL queries',
    longDescription:
      'Clean up SQL queries with proper keyword casing and line breaks. Makes complex SELECT, JOIN, and INSERT statements readable for review and debugging.',
    category: 'developer',
    icon: 'database',
    keywords: ['sql formatter', 'format sql', 'sql beautifier', 'pretty print sql'],
    type: 'static',
    addedAt: '2026-02-17',
    relatedTools: ['json-formatter', 'regex-tester', 'cron-parser'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/sql-formatter').then((mod) => ({ default: mod.SqlFormatter })),
  },
  'markdown-to-html': {
    id: 'markdown-to-html',
    title: 'Markdown to HTML',
    description: 'Convert Markdown syntax to HTML instantly',
    longDescription:
      'Transform Markdown to HTML with live preview — same workbench as Markdown Preview and HTML → Markdown for full round-trip editing.',
    category: 'text',
    icon: 'file-code',
    keywords: ['markdown to html', 'md converter', 'markdown converter', 'html generator'],
    type: 'static',
    addedAt: '2026-02-17',
    relatedTools: ['markdown-preview', 'html-to-markdown', 'html-beautifier'],
    faq: [
      {
        question: 'Is there a live preview?',
        answer: 'Yes. Use the Live preview tab for side-by-side editing, or the Markdown → HTML tab to copy HTML source.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/markdown-to-html').then((mod) => ({ default: mod.MarkdownToHtml })),
  },
  'remove-line-breaks': {
    id: 'remove-line-breaks',
    title: 'Remove Line Breaks',
    description: 'Remove or replace line breaks in text',
    longDescription:
      'Clean up text copied from PDFs, emails, or documents by removing unwanted line breaks. Replace with spaces or join lines entirely.',
    category: 'text',
    icon: 'wrap-text',
    keywords: ['remove line breaks', 'delete newlines', 'text cleaner', 'join lines'],
    type: 'static',
    addedAt: '2026-02-18',
    relatedTools: ['word-counter', 'case-converter', 'strip-html-tags'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/remove-line-breaks').then((mod) => ({
        default: mod.RemoveLineBreaks,
      })),
  },
  'text-diff': {
    id: 'text-diff',
    title: 'Text Diff',
    description: 'Compare two texts and highlight differences',
    longDescription:
      'Side-by-side text comparison with added and removed line highlighting. Useful for comparing document versions, config changes, and code snippets.',
    category: 'text',
    icon: 'git-compare',
    keywords: ['text diff', 'compare text', 'diff checker', 'text comparison'],
    type: 'static',
    addedAt: '2026-02-18',
    relatedTools: ['word-counter', 'json-formatter', 'remove-line-breaks'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/text-diff').then((mod) => ({ default: mod.TextDiff })),
  },
  'slug-generator': {
    id: 'slug-generator',
    title: 'Slug Generator',
    description: 'Convert titles to URL-friendly slugs',
    longDescription:
      'Generate clean, SEO-friendly URL slugs from any title or text. Removes special characters, converts spaces to hyphens, and lowercases automatically.',
    category: 'text',
    icon: 'link',
    keywords: ['slug generator', 'url slug', 'seo slug', 'permalink generator'],
    type: 'static',
    addedAt: '2026-02-19',
    relatedTools: ['case-converter', 'word-counter', 'url-encoder'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/slug-generator').then((mod) => ({ default: mod.SlugGenerator })),
  },
  'compound-interest-calculator': {
    id: 'compound-interest-calculator',
    title: 'Compound Interest Calculator',
    description: 'Calculate compound interest and final investment value',
    longDescription:
      'Compute how much your investment grows with compound interest. Adjust principal, annual rate, compounding frequency, and time period.',
    category: 'calculators',
    icon: 'trending-up',
    keywords: ['compound interest', 'investment calculator', 'interest calculator', 'savings'],
    type: 'static',
    addedAt: '2026-02-19',
    relatedTools: ['emi-calculator', 'percentage-calculator', 'tip-calculator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/compound-interest-calculator').then((mod) => ({
        default: mod.CompoundInterestCalculator,
      })),
  },
  'line-sorter': {
    id: 'line-sorter',
    title: 'Line Sorter',
    description: 'Sort, reverse, or shuffle lines of text',
    longDescription:
      'Alphabetically sort lines A–Z or Z–A, reverse order, or randomly shuffle. Handy for lists, names, keywords, and data cleanup.',
    category: 'text',
    icon: 'arrow-down-narrow-wide',
    keywords: ['sort lines', 'alphabetical sort', 'line sorter', 'shuffle lines'],
    type: 'static',
    addedAt: '2026-02-20',
    relatedTools: ['remove-line-breaks', 'word-counter', 'case-converter'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/line-sorter').then((mod) => ({ default: mod.LineSorter })),
  },
  'strip-html-tags': {
    id: 'strip-html-tags',
    title: 'Strip HTML Tags',
    description: 'Extract plain text from HTML',
    longDescription:
      'Remove all HTML tags and extract clean plain text. Useful for cleaning scraped content, email HTML, and rich text paste.',
    category: 'text',
    icon: 'eraser',
    keywords: ['strip html', 'remove html tags', 'html to text', 'extract text'],
    type: 'static',
    addedAt: '2026-02-20',
    relatedTools: ['html-encoder', 'markdown-to-html', 'word-counter'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/strip-html-tags').then((mod) => ({
        default: mod.StripHtmlTags,
      })),
  },
  'sip-calculator': {
    id: 'sip-calculator',
    title: 'SIP Calculator',
    description: 'Calculate SIP maturity value and estimated returns',
    longDescription:
      'Compute Systematic Investment Plan returns for mutual funds. Enter monthly investment, expected rate, and duration to see total invested, returns, and maturity value.',
    category: 'calculators',
    icon: 'chart-line',
    keywords: ['sip calculator', 'mutual fund sip', 'sip returns', 'investment calculator india'],
    type: 'static',
    addedAt: '2026-02-21',
    relatedTools: ['emi-calculator', 'compound-interest-calculator', 'gst-calculator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/sip-calculator').then((mod) => ({ default: mod.SipCalculator })),
  },
  'gst-calculator': {
    id: 'gst-calculator',
    title: 'GST Calculator',
    description: 'Calculate GST amount for inclusive or exclusive prices',
    longDescription:
      'Calculate Goods and Services Tax at 5%, 12%, 18%, or 28% rates. Works for both GST-exclusive (add tax) and GST-inclusive (extract tax) amounts.',
    category: 'calculators',
    icon: 'indian-rupee',
    keywords: ['gst calculator', 'gst inclusive', 'gst exclusive', 'india gst'],
    type: 'static',
    addedAt: '2026-02-21',
    relatedTools: ['sip-calculator', 'emi-calculator', 'percentage-calculator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/gst-calculator').then((mod) => ({ default: mod.GstCalculator })),
  },
  'timezone-converter': {
    id: 'timezone-converter',
    title: 'Timezone Converter',
    description: 'Convert date and time between world timezones',
    longDescription:
      'Convert any date and time between major world timezones including UTC, US, Europe, and Asia. Uses the browser Intl API for accurate daylight saving handling.',
    category: 'datetime',
    icon: 'globe',
    keywords: ['timezone converter', 'time zone', 'utc converter', 'world clock'],
    type: 'static',
    addedAt: '2026-02-22',
    relatedTools: ['unix-timestamp-converter', 'date-difference-calculator', 'cron-parser'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/timezone-converter').then((mod) => ({
        default: mod.TimezoneConverter,
      })),
  },
  'date-difference-calculator': {
    id: 'date-difference-calculator',
    title: 'Date Difference Calculator',
    description: 'Calculate days, hours, and minutes between two dates',
    longDescription:
      'Find the exact difference between any two dates in days, hours, and minutes. Useful for project timelines, event countdowns, and age calculations.',
    category: 'datetime',
    icon: 'calendar-range',
    keywords: ['date difference', 'days between dates', 'date calculator', 'time between dates'],
    type: 'static',
    addedAt: '2026-02-22',
    relatedTools: ['age-calculator', 'timezone-converter', 'unix-timestamp-converter'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/date-difference-calculator').then((mod) => ({
        default: mod.DateDifferenceCalculator,
      })),
  },
  'csv-to-json': {
    id: 'csv-to-json',
    title: 'CSV to JSON',
    description: 'Convert CSV data to JSON format',
    longDescription:
      'Transform comma-separated values into a JSON array of objects — switch to JSON → CSV on the same page for round-trip conversion with live output.',
    seoTitle: 'CSV to JSON Converter Online Free — Parse Spreadsheets | Utiliio',
    seoDescription:
      'Convert CSV to JSON arrays online with live row counts. Round-trip to JSON → CSV — free, private, runs in your browser.',
    seoH1: 'CSV to JSON Converter Online Free',
    seoIntro:
      'Paste CSV with a header row and get a JSON array of objects instantly. Row count badge confirms records converted — swap to JSON → CSV tab to verify round-trip without uploading spreadsheet data.',
    seoGuideSlug: 'csv-to-json-converter-online-free',
    relatedComparisonSlugs: ['browser-tools-vs-server-upload'],
    category: 'developer',
    icon: 'table',
    keywords: [
      'csv to json',
      'csv to json converter online free',
      'convert csv to json',
      'csv json converter',
      'csv parser online',
      'spreadsheet to json',
    ],
    type: 'static',
    addedAt: '2026-02-23',
    relatedTools: ['json-to-csv', 'json-formatter', 'csv-formatter'],
    faq: [
      {
        question: 'How do I convert CSV to JSON online for free?',
        answer: 'Paste CSV with column headers in the first row — JSON array output updates live. Quoted fields with commas are handled correctly.',
      },
      {
        question: 'Can I convert JSON back to CSV?',
        answer: 'Yes. Use the JSON → CSV tab in the same workbench — input and tab are shareable via link.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/csv-to-json').then((mod) => ({ default: mod.CsvToJson })),
  },
  'json-to-csv': {
    id: 'json-to-csv',
    title: 'JSON to CSV',
    description: 'Convert JSON arrays to CSV format',
    longDescription:
      'Export JSON array data to CSV for spreadsheets — same workbench as CSV → JSON with row count and round-trip support.',
    seoTitle: 'JSON to CSV Converter Online Free — Export Arrays to CSV | Utiliio',
    seoDescription:
      'Convert JSON arrays to CSV online instantly. Live row counts, round-trip to JSON, shareable links — free, private, no upload.',
    seoH1: 'JSON to CSV Converter Online Free',
    seoIntro:
      'Paste a JSON array of objects and get spreadsheet-ready CSV with column headers derived from keys. See row counts as you type, copy output in one click, and switch to CSV → JSON for round-trip verification — all locally in your browser.',
    seoGuideSlug: 'json-to-csv-converter-online-free',
    relatedComparisonSlugs: ['browser-tools-vs-server-upload'],
    category: 'developer',
    icon: 'sheet',
    keywords: [
      'json to csv',
      'json to csv converter online free',
      'convert json csv',
      'export json to csv',
      'json csv converter',
      'json array to csv',
    ],
    type: 'static',
    addedAt: '2026-02-23',
    relatedTools: ['csv-to-json', 'json-formatter', 'csv-formatter'],
    faq: [
      {
        question: 'How do I convert JSON to CSV online for free?',
        answer: 'Paste a JSON array of objects into the input — CSV output updates live with headers from object keys. No upload or sign-up required.',
      },
      {
        question: 'Can I convert CSV back to JSON?',
        answer: 'Yes. Switch to the CSV → JSON tab on the same page — both directions share one workbench.',
      },
      {
        question: 'Is it safe to convert sensitive JSON to CSV online?',
        answer: 'With Utiliio, conversion runs entirely in your browser. Your data never leaves your device.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/json-to-csv').then((mod) => ({ default: mod.JsonToCsv })),
  },
  'xml-formatter': {
    id: 'xml-formatter',
    title: 'XML Formatter',
    description: 'Format and beautify XML documents',
    longDescription:
      'Validate and pretty-print XML in the Web Formatter workbench — switch to HTML, CSS, or JS tabs without leaving the page.',
    category: 'developer',
    icon: 'code-xml',
    keywords: ['xml formatter', 'format xml', 'xml beautifier', 'pretty print xml'],
    type: 'static',
    addedAt: '2026-02-24',
    relatedTools: ['html-beautifier', 'json-formatter', 'css-minifier'],
    faq: [
      {
        question: 'Does it catch invalid XML?',
        answer: 'Yes. Invalid XML shows a parse error. Valid XML is indented for readability.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/xml-formatter').then((mod) => ({ default: mod.XmlFormatter })),
  },
  'password-strength-checker': {
    id: 'password-strength-checker',
    title: 'Password Strength Checker',
    description: 'Check password strength and get improvement tips',
    longDescription:
      'Analyze password strength with a visual score meter and actionable feedback. Checks length, character diversity, and common patterns — all locally in your browser.',
    category: 'security',
    icon: 'shield-alert',
    keywords: ['password strength', 'password checker', 'strong password test', 'password meter'],
    type: 'static',
    addedAt: '2026-02-24',
    relatedTools: ['password-generator', 'hash-generator', 'jwt-generator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/password-strength-checker').then((mod) => ({
        default: mod.PasswordStrengthChecker,
      })),
  },
  'credit-card-validator': {
    id: 'credit-card-validator',
    title: 'Credit Card Validator',
    description: 'Validate card numbers with the Luhn algorithm',
    longDescription:
      'Check if a credit or debit card number is structurally valid using the Luhn checksum. Detects Visa, Mastercard, Amex, and Discover card types.',
    category: 'security',
    icon: 'credit-card',
    keywords: ['credit card validator', 'luhn check', 'card number validator', 'bin checker'],
    type: 'static',
    addedAt: '2026-02-25',
    relatedTools: ['password-strength-checker', 'hash-generator', 'random-string-generator'],
    faq: [
      {
        question: 'Does this verify if a card is active?',
        answer: 'No. This only checks the number format using the Luhn algorithm. It cannot verify balance, expiry, or whether the card is active.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/credit-card-validator').then((mod) => ({
        default: mod.CreditCardValidator,
      })),
  },
  'binary-converter': {
    id: 'binary-converter',
    title: 'Binary Converter',
    description: 'Convert text to binary and binary back to text',
    longDescription:
      'Encode text to 8-bit binary groups or decode binary back to readable text in one workbench — with byte count, examples, and round-trip support.',
    category: 'encoding',
    icon: 'binary',
    keywords: ['binary converter', 'text to binary', 'binary to text', 'binary encoder', 'binary decoder'],
    type: 'static',
    addedAt: '2026-02-25',
    relatedTools: ['binary-decoder', 'hex-encoder', 'ascii-converter'],
    faq: [
      {
        question: 'How is text encoded to binary?',
        answer: 'Each UTF-8 byte is shown as an 8-bit binary group separated by spaces. "Hi" becomes 01001000 01101001.',
      },
      {
        question: 'Can I decode binary here?',
        answer: 'Yes. Switch to the Binary → Text tab or use “Decode output →” after encoding.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/binary-converter').then((mod) => ({ default: mod.BinaryConverter })),
  },
  'binary-decoder': {
    id: 'binary-decoder',
    title: 'Binary Decoder',
    description: 'Decode binary strings back to plain text',
    longDescription:
      'Convert space-separated 8-bit binary groups to readable text. Same workbench as the Binary Converter — switch tabs without leaving the page.',
    category: 'encoding',
    icon: 'binary',
    keywords: ['binary decoder', 'binary to text', 'decode binary string', 'binary translator'],
    type: 'static',
    addedAt: '2026-07-26',
    relatedTools: ['binary-converter', 'hex-decoder', 'ascii-decoder'],
    faq: [
      {
        question: 'Can I encode text to binary here?',
        answer: 'Yes. Use the Text → Binary tab in the same workbench to encode plain text.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/binary-decoder').then((mod) => ({ default: mod.BinaryDecoder })),
  },
  'morse-code-translator': {
    id: 'morse-code-translator',
    title: 'Morse Code Translator',
    description: 'Translate text to Morse code and decode Morse to text',
    longDescription:
      'Convert between plain text and International Morse Code with a built-in reference chart. Encode, decode, and round-trip in one shareable workbench.',
    category: 'encoding',
    icon: 'radio',
    keywords: ['morse code', 'morse translator', 'text to morse', 'morse decoder'],
    type: 'static',
    addedAt: '2026-02-26',
    relatedTools: ['morse-decoder', 'binary-converter', 'rot13-encoder'],
    faq: [
      {
        question: 'Is there a Morse code chart?',
        answer: 'Yes. Expand the reference section on the tool page for A–Z and 0–9 codes. Use / between words when encoding.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/morse-code-translator').then((mod) => ({
        default: mod.MorseCodeTranslator,
      })),
  },
  'morse-decoder': {
    id: 'morse-decoder',
    title: 'Morse Code Decoder',
    description: 'Decode Morse code dots and dashes to plain text',
    longDescription:
      'Convert Morse code (... --- ...) back to readable text. Same workbench as the Morse translator — includes encode tab and reference chart.',
    category: 'encoding',
    icon: 'radio',
    keywords: ['morse decoder', 'decode morse code', 'morse to text', 'morse code translator'],
    type: 'static',
    addedAt: '2026-07-26',
    relatedTools: ['morse-code-translator', 'binary-decoder', 'ascii-decoder'],
    faq: [
      {
        question: 'Can I encode text to Morse here?',
        answer: 'Yes. Switch to the Text → Morse tab in the same workbench.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/morse-decoder').then((mod) => ({ default: mod.MorseDecoder })),
  },
  'rot13-encoder': {
    id: 'rot13-encoder',
    title: 'ROT13 Encoder',
    description: 'Encode and decode text with ROT13 cipher',
    longDescription:
      'Apply ROT13 letter substitution with live output. Symmetric cipher — encoding and decoding use the same operation. Shareable links included.',
    category: 'encoding',
    icon: 'lock',
    keywords: ['rot13', 'rot13 encoder', 'caesar cipher', 'text cipher', 'rot13 decoder'],
    type: 'static',
    addedAt: '2026-02-26',
    relatedTools: ['rot13-decoder', 'morse-code-translator', 'base64-encoder'],
    faq: [
      {
        question: 'Is ROT13 the same as decoding?',
        answer: 'Yes. ROT13 is symmetric — applying it twice returns the original text.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/rot13-encoder').then((mod) => ({ default: mod.Rot13Encoder })),
  },
  'rot13-decoder': {
    id: 'rot13-decoder',
    title: 'ROT13 Decoder',
    description: 'Decode ROT13 cipher text back to plain text',
    longDescription:
      'Decode ROT13-encoded text instantly. Same workbench as the ROT13 encoder — the operation is identical because ROT13 is symmetric.',
    category: 'encoding',
    icon: 'lock',
    keywords: ['rot13 decoder', 'decode rot13', 'rot13 decrypt', 'caesar cipher decoder'],
    type: 'static',
    addedAt: '2026-07-26',
    relatedTools: ['rot13-encoder', 'morse-decoder', 'hash-generator'],
    faq: [
      {
        question: 'How is decoding different from encoding?',
        answer: 'It is not — ROT13 uses the same transform for both. This page opens the same workbench for users searching for a decoder.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/rot13-decoder').then((mod) => ({ default: mod.Rot13Decoder })),
  },
  'duplicate-line-remover': {
    id: 'duplicate-line-remover',
    title: 'Duplicate Line Remover',
    description: 'Remove duplicate lines from text while preserving order',
    longDescription:
      'Clean up lists, logs, and data by removing duplicate lines. Optionally match case-sensitively and keep the first occurrence of each unique line.',
    category: 'text',
    icon: 'list-minus',
    keywords: ['remove duplicates', 'deduplicate lines', 'unique lines', 'duplicate remover'],
    type: 'static',
    addedAt: '2026-02-27',
    relatedTools: ['line-sorter', 'remove-line-breaks', 'word-counter'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/duplicate-line-remover').then((mod) => ({
        default: mod.DuplicateLineRemover,
      })),
  },
  'random-string-generator': {
    id: 'random-string-generator',
    title: 'Random String Generator',
    description: 'Generate random alphanumeric strings and tokens',
    longDescription:
      'Create cryptographically random strings for API keys, test data, and unique identifiers. Choose length, count, and character set including hex and symbols.',
    category: 'generators',
    icon: 'shuffle',
    keywords: ['random string', 'string generator', 'api key generator', 'random token'],
    type: 'static',
    addedAt: '2026-02-27',
    relatedTools: ['uuid-generator', 'password-generator', 'hash-generator'],
    faq: defaultFaq,
    component: () =>
      import('@/components/tools/random-string-generator').then((mod) => ({
        default: mod.RandomStringGenerator,
      })),
  },
  'jwt-generator': {
    id: 'jwt-generator',
    title: 'JWT Generator',
    description: 'Sign and generate JWT tokens for testing',
    longDescription:
      'Build JSON Web Token headers and payloads, then sign them with HMAC (HS256/384/512) for development and testing. Same workbench as the JWT Decoder — switch tabs to decode, verify, or sign.',
    category: 'developer',
    icon: 'key-round',
    keywords: ['jwt generator', 'create jwt', 'json web token generator', 'jwt builder', 'sign jwt'],
    type: 'static',
    addedAt: '2026-02-28',
    relatedTools: ['jwt-decoder', 'json-formatter', 'hmac-generator'],
    faq: [
      {
        question: 'Is the generated JWT signed?',
        answer: 'Yes, when you provide a secret on the Sign tab. The token is signed with the algorithm in the header (HS256, HS384, or HS512). Use the Verify tab to confirm the signature.',
      },
      {
        question: 'Is it safe for production tokens?',
        answer: 'This tool is for debugging and learning. Production tokens should always be signed on your server with secrets that never leave your backend.',
      },
      ...defaultFaq,
    ],
    component: () =>
      import('@/components/tools/jwt-generator').then((mod) => ({ default: mod.JwtGenerator })),
  },
  'qr-code-generator': {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    description: 'Generate QR codes from text or URLs',
    longDescription: 'Create scannable QR codes for URLs, WiFi credentials, contact info, and plain text. Download as PNG instantly — all generated in your browser.',
    category: 'generators',
    icon: 'qr-code',
    keywords: ['qr code generator', 'create qr code', 'qr code maker', 'qr code online'],
    type: 'static',
    addedAt: '2026-03-01',
    relatedTools: ['url-encoder', 'uuid-generator', 'random-string-generator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/qr-code-generator').then((mod) => ({ default: mod.QrCodeGenerator })),
  },
  'unit-converter': {
    id: 'unit-converter',
    title: 'Unit Converter',
    description: 'Convert length, weight, and temperature units',
    longDescription: 'Convert between metric and imperial units for length, weight, and temperature. Supports meters, feet, kilograms, pounds, Celsius, Fahrenheit, and Kelvin.',
    category: 'math',
    icon: 'ruler',
    keywords: ['unit converter', 'length converter', 'weight converter', 'temperature converter'],
    type: 'static',
    addedAt: '2026-03-01',
    relatedTools: ['percentage-calculator', 'bmi-calculator', 'color-converter'],
    faq: defaultFaq,
    component: () => import('@/components/tools/unit-converter').then((mod) => ({ default: mod.UnitConverter })),
  },
  'markdown-preview': {
    id: 'markdown-preview',
    title: 'Markdown Preview',
    description: 'Write Markdown with live HTML preview',
    longDescription:
      'Real-time Markdown editor with side-by-side preview. Export HTML, convert HTML back to Markdown — all in one shareable workbench.',
    category: 'text',
    icon: 'eye',
    keywords: ['markdown preview', 'markdown editor', 'live markdown', 'md preview'],
    type: 'static',
    addedAt: '2026-03-02',
    relatedTools: ['markdown-to-html', 'html-to-markdown', 'word-counter'],
    faq: [
      {
        question: 'Can I copy the HTML output?',
        answer: 'Yes. Switch to the Markdown → HTML tab to view and copy HTML source, or use Copy HTML from the preview tab.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/markdown-preview').then((mod) => ({ default: mod.MarkdownPreview })),
  },
  'http-status-codes': {
    id: 'http-status-codes',
    title: 'HTTP Status Codes',
    description: 'Lookup and search HTTP status codes',
    longDescription: 'Interactive reference for common HTTP status codes from 100 to 504. Search by code number or name — essential for API development and debugging.',
    category: 'network',
    icon: 'server',
    keywords: ['http status codes', 'status code list', '404 500', 'http response codes'],
    type: 'reference',
    addedAt: '2026-03-02',
    relatedTools: ['url-parser', 'json-formatter', 'jwt-decoder'],
    faq: defaultFaq,
    component: () => import('@/components/tools/http-status-codes').then((mod) => ({ default: mod.HttpStatusCodes })),
  },
  'cidr-calculator': {
    id: 'cidr-calculator',
    title: 'CIDR Calculator',
    description: 'Calculate subnet details from CIDR notation',
    longDescription: 'Parse CIDR notation to get network address, broadcast address, subnet mask, and usable host range. Essential for network planning and DevOps.',
    category: 'network',
    icon: 'network',
    keywords: ['cidr calculator', 'subnet calculator', 'ip subnet', 'network calculator'],
    type: 'static',
    addedAt: '2026-03-03',
    relatedTools: ['http-status-codes', 'url-parser', 'cron-parser'],
    faq: defaultFaq,
    component: () => import('@/components/tools/cidr-calculator').then((mod) => ({ default: mod.CidrCalculator })),
  },
  'roman-numeral-converter': {
    id: 'roman-numeral-converter',
    title: 'Roman Numeral Converter',
    description: 'Convert numbers to Roman numerals and back',
    longDescription: 'Convert Arabic numbers (1–3999) to Roman numerals and decode Roman numerals back to numbers. Useful for outlines, clocks, and historical dates.',
    category: 'math',
    icon: 'languages',
    keywords: ['roman numerals', 'roman numeral converter', 'number to roman', 'roman to number'],
    type: 'static',
    addedAt: '2026-03-03',
    relatedTools: ['number-to-words', 'percentage-calculator', 'unit-converter'],
    faq: defaultFaq,
    component: () => import('@/components/tools/roman-numeral-converter').then((mod) => ({ default: mod.RomanNumeralConverter })),
  },
  'number-to-words': {
    id: 'number-to-words',
    title: 'Number to Words',
    description: 'Convert numbers to English words',
    longDescription: 'Transform numeric values into written English words. Supports numbers up to 999 million — useful for checks, invoices, and legal documents.',
    category: 'text',
    icon: 'letter-text',
    keywords: ['number to words', 'number in words', 'spell number', 'convert number to text'],
    type: 'static',
    addedAt: '2026-03-04',
    relatedTools: ['roman-numeral-converter', 'word-counter', 'case-converter'],
    faq: defaultFaq,
    component: () => import('@/components/tools/number-to-words').then((mod) => ({ default: mod.NumberToWords })),
  },
  'reverse-text': {
    id: 'reverse-text',
    title: 'Reverse Text',
    description: 'Reverse characters, words, or lines in text',
    longDescription: 'Reverse text by character, word, or line. Useful for puzzles, string manipulation, and data transformation tasks.',
    category: 'text',
    icon: 'arrow-left-right',
    keywords: ['reverse text', 'flip text', 'backwards text', 'reverse string'],
    type: 'static',
    addedAt: '2026-03-04',
    relatedTools: ['case-converter', 'word-counter', 'palindrome-checker'],
    faq: defaultFaq,
    component: () => import('@/components/tools/reverse-text').then((mod) => ({ default: mod.ReverseText })),
  },
  'email-validator': {
    id: 'email-validator',
    title: 'Email Validator',
    description: 'Validate email address format',
    longDescription: 'Check if an email address has valid format including @ symbol, domain, and TLD. Runs locally — no email is sent or stored.',
    category: 'security',
    icon: 'mail-check',
    keywords: ['email validator', 'validate email', 'email format check', 'email regex'],
    type: 'static',
    addedAt: '2026-03-05',
    relatedTools: ['password-strength-checker', 'url-parser', 'hash-generator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/email-validator').then((mod) => ({ default: mod.EmailValidator })),
  },
  'url-parser': {
    id: 'url-parser',
    title: 'URL Parser',
    description: 'Parse URLs into components, params, and more',
    longDescription:
      'Break down any URL into protocol, hostname, port, path, query parameters, and hash — in the same URL workbench as encode and decode.',
    category: 'developer',
    icon: 'link',
    keywords: ['url parser', 'parse url', 'url components', 'query string parser', 'url breakdown'],
    type: 'static',
    addedAt: '2026-03-05',
    relatedTools: ['url-encoder', 'url-decoder', 'http-status-codes'],
    faq: [
      {
        question: 'Can I encode or decode in the same tool?',
        answer: 'Yes. The URL workbench has Encode, Decode, and Parse tabs — switch without leaving the page.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/url-parser').then((mod) => ({ default: mod.UrlParser })),
  },
  'css-minifier': {
    id: 'css-minifier',
    title: 'CSS Minifier',
    description: 'Minify CSS by removing whitespace and comments',
    longDescription:
      'Compress CSS for production in the Web Formatter workbench — switch to HTML beautify, JS minify, or XML format without changing pages.',
    category: 'developer',
    icon: 'minimize-2',
    keywords: ['css minifier', 'minify css', 'compress css', 'css optimizer'],
    type: 'static',
    addedAt: '2026-03-06',
    relatedTools: ['html-beautifier', 'javascript-minifier', 'xml-formatter'],
    faq: [
      {
        question: 'Can I format HTML on the same page?',
        answer: 'Yes. Use the HTML tab in the same Web Formatter workbench to pretty-print HTML.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/css-minifier').then((mod) => ({ default: mod.CssMinifier })),
  },
  'html-beautifier': {
    id: 'html-beautifier',
    title: 'HTML Beautifier',
    description: 'Format and indent HTML code',
    longDescription:
      'Pretty-print HTML with proper indentation — part of the Web Formatter workbench alongside CSS minify, JS minify, and XML format.',
    seoTitle: 'HTML Beautifier Online Free — Web Formatter Workbench | Utiliio',
    seoDescription:
      'Beautify HTML online with readable indentation. CSS/JS minify and XML format on the same page — free, private, no upload.',
    seoH1: 'HTML Beautifier Online Free',
    seoIntro:
      'Pretty-print minified or messy HTML with consistent indentation to spot unclosed tags and nested structure issues. Part of the Web Formatter workbench — switch to CSS minify, JS minify, or XML format without leaving the page.',
    seoGuideSlug: 'web-formatter-online-free',
    relatedComparisonSlugs: ['browser-tools-vs-server-upload'],
    category: 'developer',
    icon: 'code',
    keywords: [
      'html beautifier online free',
      'webformatter',
      'format html online',
      'pretty print html',
      'html formatter',
      'web formatter online',
    ],
    type: 'static',
    addedAt: '2026-03-06',
    relatedTools: ['css-minifier', 'javascript-minifier', 'xml-formatter'],
    faq: [
      {
        question: 'How do I beautify HTML online for free?',
        answer: 'Paste HTML into the HTML tab — indented output updates live. Switch tabs for CSS minify, JS minify, or XML format on the same page.',
      },
      {
        question: 'Does it validate HTML?',
        answer: 'It pretty-prints structure with indentation. For XML validation and formatting, use the XML tab in the same workbench.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/html-beautifier').then((mod) => ({ default: mod.HtmlBeautifier })),
  },
  'yaml-to-json': {
    id: 'yaml-to-json',
    title: 'YAML to JSON',
    description: 'Convert YAML data to JSON format',
    longDescription:
      'Parse YAML and convert to formatted JSON in one workbench — switch to JSON → YAML without changing pages. Ideal for Kubernetes configs, Docker Compose, and GitHub Actions.',
    category: 'developer',
    icon: 'arrow-right-left',
    keywords: ['yaml to json', 'convert yaml', 'yaml json converter', 'yaml parser'],
    type: 'static',
    addedAt: '2026-03-07',
    relatedTools: ['json-to-yaml', 'json-formatter', 'csv-to-json'],
    faq: [
      {
        question: 'Can I convert JSON back to YAML?',
        answer: 'Yes. Use the JSON → YAML tab in the same workbench — your input and tab selection are shareable via link.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/yaml-to-json').then((mod) => ({ default: mod.YamlToJson })),
  },
  'json-to-yaml': {
    id: 'json-to-yaml',
    title: 'JSON to YAML',
    description: 'Convert JSON data to YAML format',
    longDescription:
      'Transform JSON into clean YAML output in the same workbench as YAML → JSON. Round-trip configs, copy results, and share links with preserved input.',
    category: 'developer',
    icon: 'arrow-left-right',
    keywords: ['json to yaml', 'convert json yaml', 'json yaml converter'],
    type: 'static',
    addedAt: '2026-03-07',
    relatedTools: ['yaml-to-json', 'json-formatter', 'csv-to-json'],
    faq: [
      {
        question: 'Can I convert YAML back to JSON?',
        answer: 'Yes. Switch to the YAML → JSON tab on the same page — both directions share one workbench.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/json-to-yaml').then((mod) => ({ default: mod.JsonToYaml })),
  },
  'character-frequency-counter': {
    id: 'character-frequency-counter',
    title: 'Character Frequency Counter',
    description: 'Count how often each character appears in text',
    longDescription: 'Analyze character frequency distribution in any text. Shows count and percentage for each unique character — useful for cryptography and text analysis.',
    category: 'text',
    icon: 'bar-chart-3',
    keywords: ['character frequency', 'letter frequency', 'char count', 'frequency analysis'],
    type: 'static',
    addedAt: '2026-03-08',
    relatedTools: ['word-counter', 'hash-generator', 'reverse-text'],
    faq: defaultFaq,
    component: () => import('@/components/tools/character-frequency-counter').then((mod) => ({ default: mod.CharacterFrequencyCounter })),
  },
  'text-repeater': {
    id: 'text-repeater',
    title: 'Text Repeater',
    description: 'Repeat text multiple times with custom separators',
    longDescription: 'Generate repeated text strings with configurable count and separator. Useful for test data, patterns, and bulk text generation.',
    category: 'text',
    icon: 'repeat',
    keywords: ['text repeater', 'repeat text', 'duplicate text', 'string repeater'],
    type: 'static',
    addedAt: '2026-03-08',
    relatedTools: ['lorem-ipsum-generator', 'find-and-replace', 'word-counter'],
    faq: defaultFaq,
    component: () => import('@/components/tools/text-repeater').then((mod) => ({ default: mod.TextRepeater })),
  },
  'find-and-replace': {
    id: 'find-and-replace',
    title: 'Find and Replace',
    description: 'Find and replace text with optional regex support',
    longDescription: 'Bulk find and replace in text with case sensitivity and regex options. Shows replacement count and supports complex pattern matching.',
    category: 'text',
    icon: 'replace',
    keywords: ['find and replace', 'search replace', 'text replace', 'bulk replace'],
    type: 'static',
    addedAt: '2026-03-09',
    relatedTools: ['regex-tester', 'case-converter', 'remove-line-breaks'],
    faq: defaultFaq,
    component: () => import('@/components/tools/find-and-replace').then((mod) => ({ default: mod.FindAndReplace })),
  },
  'palindrome-checker': {
    id: 'palindrome-checker',
    title: 'Palindrome Checker',
    description: 'Check if text reads the same forwards and backwards',
    longDescription: 'Detect palindromes in words, phrases, and sentences. Optionally ignore case and spaces for flexible matching.',
    category: 'text',
    icon: 'flip-horizontal',
    keywords: ['palindrome checker', 'is palindrome', 'palindrome test', 'reverse word'],
    type: 'static',
    addedAt: '2026-03-09',
    relatedTools: ['reverse-text', 'word-counter', 'case-converter'],
    faq: defaultFaq,
    component: () => import('@/components/tools/palindrome-checker').then((mod) => ({ default: mod.PalindromeChecker })),
  },
  'discount-calculator': {
    id: 'discount-calculator',
    title: 'Discount Calculator',
    description: 'Calculate sale price and savings from a discount percentage',
    longDescription: 'Find the final price after applying a percentage discount. See exactly how much you save on sales, coupons, and promotional offers.',
    category: 'calculators',
    icon: 'badge-percent',
    keywords: ['discount calculator', 'sale price', 'percent off', 'coupon calculator'],
    type: 'static',
    addedAt: '2026-03-10',
    relatedTools: ['tip-calculator', 'gst-calculator', 'percentage-calculator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/discount-calculator').then((mod) => ({ default: mod.DiscountCalculator })),
  },
  'simple-interest-calculator': {
    id: 'simple-interest-calculator',
    title: 'Simple Interest Calculator',
    description: 'Calculate simple interest on loans and deposits',
    longDescription: 'Compute simple interest using principal, annual rate, and time period. Shows total interest earned or owed and final amount.',
    category: 'calculators',
    icon: 'trending-up',
    keywords: ['simple interest', 'interest calculator', 'loan interest', 'SI calculator'],
    type: 'static',
    addedAt: '2026-03-10',
    relatedTools: ['compound-interest-calculator', 'emi-calculator', 'sip-calculator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/simple-interest-calculator').then((mod) => ({ default: mod.SimpleInterestCalculator })),
  },
  'fraction-calculator': {
    id: 'fraction-calculator',
    title: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions',
    longDescription: 'Perform arithmetic on fractions and get simplified results. Supports proper fractions, improper fractions, and whole numbers.',
    category: 'math',
    icon: 'divide',
    keywords: ['fraction calculator', 'add fractions', 'simplify fraction', 'math fractions'],
    type: 'static',
    addedAt: '2026-03-11',
    relatedTools: ['percentage-calculator', 'binary-converter', 'roman-numeral-converter'],
    faq: defaultFaq,
    component: () => import('@/components/tools/fraction-calculator').then((mod) => ({ default: mod.FractionCalculator })),
  },
  'reading-time-calculator': {
    id: 'reading-time-calculator',
    title: 'Reading Time Calculator',
    description: 'Estimate how long it takes to read your text',
    longDescription: 'Calculate reading time for articles, blog posts, and documents based on average reading speed of 200 words per minute.',
    category: 'text',
    icon: 'book-open',
    keywords: ['reading time', 'read time calculator', 'blog reading time', 'words per minute'],
    type: 'static',
    addedAt: '2026-03-11',
    relatedTools: ['word-counter', 'word-frequency-counter', 'slug-generator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/reading-time-calculator').then((mod) => ({ default: mod.ReadingTimeCalculator })),
  },
  'word-frequency-counter': {
    id: 'word-frequency-counter',
    title: 'Word Frequency Counter',
    description: 'Count how often each word appears in text',
    longDescription: 'Analyze word frequency distribution with counts and percentages. Useful for SEO keyword analysis, writing, and text mining.',
    category: 'text',
    icon: 'bar-chart-2',
    keywords: ['word frequency', 'word count analysis', 'keyword frequency', 'text analysis'],
    type: 'static',
    addedAt: '2026-03-12',
    relatedTools: ['word-counter', 'character-frequency-counter', 'reading-time-calculator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/word-frequency-counter').then((mod) => ({ default: mod.WordFrequencyCounter })),
  },
  'list-randomizer': {
    id: 'list-randomizer',
    title: 'List Randomizer',
    description: 'Randomly shuffle a list of items',
    longDescription: 'Shuffle lines or list items in random order using Fisher-Yates algorithm. Perfect for raffles, random selection, and test data.',
    category: 'text',
    icon: 'shuffle',
    keywords: ['list randomizer', 'shuffle list', 'random order', 'randomize names'],
    type: 'static',
    addedAt: '2026-03-12',
    relatedTools: ['random-number-generator', 'line-sorter', 'duplicate-line-remover'],
    faq: defaultFaq,
    component: () => import('@/components/tools/list-randomizer').then((mod) => ({ default: mod.ListRandomizer })),
  },
  'whitespace-normalizer': {
    id: 'whitespace-normalizer',
    title: 'Whitespace Normalizer',
    description: 'Clean up extra spaces, tabs, and blank lines',
    longDescription: 'Normalize messy text by collapsing multiple spaces, trimming lines, and removing excessive blank lines. Cleans copy-pasted content fast.',
    category: 'text',
    icon: 'space',
    keywords: ['whitespace normalizer', 'remove extra spaces', 'clean text', 'trim whitespace'],
    type: 'static',
    addedAt: '2026-03-13',
    relatedTools: ['remove-line-breaks', 'find-and-replace', 'strip-html-tags'],
    faq: defaultFaq,
    component: () => import('@/components/tools/whitespace-normalizer').then((mod) => ({ default: mod.WhitespaceNormalizer })),
  },
  'javascript-minifier': {
    id: 'javascript-minifier',
    title: 'JavaScript Minifier',
    description: 'Minify JavaScript by removing comments and whitespace',
    longDescription:
      'Compress JavaScript in the Web Formatter workbench — shows byte savings and shares state with HTML, CSS, and XML tabs.',
    category: 'developer',
    icon: 'file-code',
    keywords: ['javascript minifier', 'minify js', 'compress javascript', 'js optimizer'],
    type: 'static',
    addedAt: '2026-03-13',
    relatedTools: ['css-minifier', 'html-beautifier', 'json-formatter'],
    faq: [
      {
        question: 'Is this safe for all JavaScript?',
        answer: 'It is a basic whitespace and comment stripper — always test minified code before deploying to production.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/javascript-minifier').then((mod) => ({ default: mod.JavascriptMinifier })),
  },
  'html-to-markdown': {
    id: 'html-to-markdown',
    title: 'HTML to Markdown',
    description: 'Convert HTML markup to Markdown format',
    longDescription:
      'Transform HTML into clean Markdown syntax in the same workbench as Markdown Preview — round-trip content without switching tools.',
    category: 'developer',
    icon: 'file-text',
    keywords: ['html to markdown', 'convert html markdown', 'html markdown converter'],
    type: 'static',
    addedAt: '2026-03-14',
    relatedTools: ['markdown-to-html', 'markdown-preview', 'strip-html-tags'],
    faq: [
      {
        question: 'Can I preview the Markdown after conversion?',
        answer: 'Yes. Click “Preview Markdown →” to send the output to the Live preview tab.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/html-to-markdown').then((mod) => ({ default: mod.HtmlToMarkdown })),
  },
  'ip-converter': {
    id: 'ip-converter',
    title: 'IP Address Converter',
    description: 'Convert IPv4 addresses to decimal and hex',
    longDescription:
      'Convert between IPv4 dotted notation, 32-bit decimal, and hexadecimal — all three formats update live as you type. Copy all formats with one click.',
    category: 'network',
    icon: 'globe',
    keywords: ['ip converter', 'ipv4 to decimal', 'ip to long', 'ip address converter', 'ipv4 to hex'],
    type: 'static',
    addedAt: '2026-03-14',
    relatedTools: ['cidr-calculator', 'url-parser', 'hex-encoder'],
    faq: [
      {
        question: 'Do all three formats update live?',
        answer: 'Yes. Edit IPv4, decimal, or hex — the other two fields update automatically when the value is valid.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/ip-converter').then((mod) => ({ default: mod.IpConverter })),
  },
  'mac-address-generator': {
    id: 'mac-address-generator',
    title: 'MAC Address Generator',
    description: 'Generate random MAC addresses for testing',
    longDescription: 'Create random locally administered MAC addresses with colon, dash, or no separator. Ideal for virtualization, networking labs, and test environments.',
    category: 'network',
    icon: 'cable',
    keywords: ['mac address generator', 'random mac', 'fake mac address', 'network testing'],
    type: 'static',
    addedAt: '2026-03-15',
    relatedTools: ['ip-converter', 'cidr-calculator', 'uuid-generator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/mac-address-generator').then((mod) => ({ default: mod.MacAddressGenerator })),
  },
  'hmac-generator': {
    id: 'hmac-generator',
    title: 'HMAC Generator',
    description: 'Generate HMAC signatures with SHA-256, SHA-384, or SHA-512',
    longDescription:
      'Compute HMAC signatures with a secret key and message — same workbench as the Hash Generator. Used for API webhooks, JWT HS256, and request signing.',
    category: 'security',
    icon: 'key-round',
    keywords: ['hmac generator', 'hmac sha256', 'message authentication', 'api signature', 'webhook signature'],
    type: 'static',
    addedAt: '2026-03-15',
    relatedTools: ['hash-generator', 'jwt-decoder', 'jwt-generator'],
    faq: [
      {
        question: 'Can I compute plain SHA-256 hashes here?',
        answer: 'Yes. Switch to the Hash tab in the same workbench for SHA-256, SHA-384, or SHA-512 without a secret key.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/hmac-generator').then((mod) => ({ default: mod.HmacGenerator })),
  },
  'chmod-calculator': {
    id: 'chmod-calculator',
    title: 'Chmod Calculator',
    description: 'Convert between octal and symbolic file permissions',
    longDescription: 'Translate Unix file permissions between octal (755) and symbolic (rwxr-xr-x) notation. See owner, group, and others breakdown instantly.',
    category: 'developer',
    icon: 'terminal',
    keywords: ['chmod calculator', 'file permissions', 'octal to symbolic', 'unix permissions'],
    type: 'static',
    addedAt: '2026-03-16',
    relatedTools: ['binary-converter', 'hex-encoder', 'hash-generator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/chmod-calculator').then((mod) => ({ default: mod.ChmodCalculator })),
  },
  'aspect-ratio-calculator': {
    id: 'aspect-ratio-calculator',
    title: 'Aspect Ratio Calculator',
    description: 'Calculate width or height from aspect ratio',
    longDescription: 'Compute missing dimensions for 16:9, 4:3, 1:1, and custom aspect ratios. Essential for responsive design, video, and image sizing.',
    category: 'developer',
    icon: 'ratio',
    keywords: ['aspect ratio calculator', '16:9 calculator', 'image dimensions', 'responsive design'],
    type: 'static',
    addedAt: '2026-03-16',
    relatedTools: ['color-converter', 'unit-converter', 'qr-code-generator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/aspect-ratio-calculator').then((mod) => ({ default: mod.AspectRatioCalculator })),
  },
  'vat-calculator': {
    id: 'vat-calculator',
    title: 'VAT Calculator',
    description: 'Calculate VAT inclusive and exclusive amounts',
    longDescription: 'Compute Value Added Tax for EU and international invoices. Supports common VAT rates with exclusive and inclusive calculation modes.',
    category: 'calculators',
    icon: 'receipt',
    keywords: ['vat calculator', 'value added tax', 'vat inclusive', 'vat exclusive'],
    type: 'static',
    addedAt: '2026-03-17',
    relatedTools: ['gst-calculator', 'discount-calculator', 'tip-calculator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/vat-calculator').then((mod) => ({ default: mod.VatCalculator })),
  },
  'salary-calculator': {
    id: 'salary-calculator',
    title: 'Salary Calculator',
    description: 'Convert between hourly rate and annual salary',
    longDescription: 'Calculate annual, monthly, and hourly pay from any starting point. Adjust hours per week for full-time, part-time, or contract work.',
    category: 'calculators',
    icon: 'banknote',
    keywords: ['salary calculator', 'hourly to annual', 'annual to hourly', 'wage calculator'],
    type: 'static',
    addedAt: '2026-03-17',
    relatedTools: ['tip-calculator', 'emi-calculator', 'sip-calculator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/salary-calculator').then((mod) => ({ default: mod.SalaryCalculator })),
  },
  'ratio-calculator': {
    id: 'ratio-calculator',
    title: 'Ratio Calculator',
    description: 'Solve proportions and find missing values',
    longDescription: 'Calculate missing values in proportions (a:b = c:x). Useful for recipes, scaling, maps, and any ratio-based math problem.',
    category: 'math',
    icon: 'scale',
    keywords: ['ratio calculator', 'proportion calculator', 'solve proportion', 'cross multiply'],
    type: 'static',
    addedAt: '2026-03-18',
    relatedTools: ['fraction-calculator', 'percentage-calculator', 'unit-converter'],
    faq: defaultFaq,
    component: () => import('@/components/tools/ratio-calculator').then((mod) => ({ default: mod.RatioCalculator })),
  },
  'scientific-notation-converter': {
    id: 'scientific-notation-converter',
    title: 'Scientific Notation Converter',
    description: 'Convert numbers to and from scientific notation',
    longDescription: 'Transform large and small numbers into scientific notation and back. Useful for science, engineering, and programming applications.',
    category: 'math',
    icon: 'superscript',
    keywords: ['scientific notation', 'e notation', 'convert scientific notation', 'standard form'],
    type: 'static',
    addedAt: '2026-03-18',
    relatedTools: ['binary-converter', 'fraction-calculator', 'percentage-calculator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/scientific-notation-converter').then((mod) => ({ default: mod.ScientificNotationConverter })),
  },
  'sentence-counter': {
    id: 'sentence-counter',
    title: 'Sentence Counter',
    description: 'Count sentences and average words per sentence',
    longDescription: 'Analyze text structure by counting sentences, words, and average sentence length. Helpful for writing clarity and readability checks.',
    category: 'text',
    icon: 'text-quote',
    keywords: ['sentence counter', 'count sentences', 'words per sentence', 'text analysis'],
    type: 'static',
    addedAt: '2026-03-19',
    relatedTools: ['word-counter', 'paragraph-counter', 'reading-time-calculator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/sentence-counter').then((mod) => ({ default: mod.SentenceCounter })),
  },
  'paragraph-counter': {
    id: 'paragraph-counter',
    title: 'Paragraph Counter',
    description: 'Count paragraphs, words, and characters in text',
    longDescription: 'Count paragraphs separated by blank lines along with total words and characters. Useful for essays, articles, and content editing.',
    category: 'text',
    icon: 'align-left',
    keywords: ['paragraph counter', 'count paragraphs', 'text structure', 'writing analysis'],
    type: 'static',
    addedAt: '2026-03-19',
    relatedTools: ['sentence-counter', 'word-counter', 'reading-time-calculator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/paragraph-counter').then((mod) => ({ default: mod.ParagraphCounter })),
  },
  'ascii-converter': {
    id: 'ascii-converter',
    title: 'ASCII Converter',
    description: 'Convert characters to ASCII codes and back',
    longDescription:
      'Look up ASCII/Unicode code points in a character table, or convert decimal and hex codes back to text — one shareable workbench.',
    category: 'encoding',
    icon: 'hash',
    keywords: ['ascii converter', 'char to ascii', 'ascii code', 'character code', 'ascii table'],
    type: 'static',
    addedAt: '2026-03-20',
    relatedTools: ['ascii-decoder', 'hex-encoder', 'binary-converter'],
    faq: [
      {
        question: 'Does it show a character code table?',
        answer: 'Yes. In Char → Code mode, each character is listed with decimal and hex values in a table below the output.',
      },
      {
        question: 'Can I convert codes back to text?',
        answer: 'Yes. Switch to Code → Char and paste decimal (72 101) or hex (0x48 0x65) codes.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/ascii-converter').then((mod) => ({ default: mod.AsciiConverter })),
  },
  'ascii-decoder': {
    id: 'ascii-decoder',
    title: 'ASCII Decoder',
    description: 'Convert ASCII/Unicode codes back to characters',
    longDescription:
      'Paste decimal or hex character codes and get readable text. Same workbench as the ASCII Converter — supports space or comma-separated codes.',
    seoTitle: 'ASCII Decoder Online Free — Convert Codes to Text | Utiliio',
    seoDescription:
      'Decode ASCII and Unicode character codes to text online. Decimal or hex input, live output — free, private, runs in your browser.',
    seoH1: 'ASCII Decoder Online Free',
    seoIntro:
      'Paste decimal (72 101 108) or hex (0x48 0x65 0x6C) character codes and get readable text instantly. Same workbench as ASCII Converter — round-trip encode and decode with shareable links.',
    seoGuideSlug: 'ascii-decoder-online-free',
    relatedComparisonSlugs: ['utiliio-vs-cyberchef', 'browser-tools-vs-server-upload'],
    category: 'encoding',
    icon: 'hash',
    keywords: [
      'ascii decoder',
      'ascii decoder online free',
      'code to char',
      'ascii to text',
      'character code decoder',
      'decode ascii',
    ],
    type: 'static',
    addedAt: '2026-07-26',
    relatedTools: ['ascii-converter', 'hex-decoder', 'binary-decoder'],
    faq: [
      {
        question: 'How do I decode ASCII codes online for free?',
        answer: 'Paste decimal or hex codes separated by spaces or commas — text output updates live. Processing happens entirely in your browser.',
      },
      {
        question: 'What code formats are supported?',
        answer: 'Decimal (72 101 108) and hex (0x48 0x65 0x6C) codes, separated by spaces or commas.',
      },
      {
        question: 'Can I encode text to ASCII codes here?',
        answer: 'Yes. Switch to the Char → Code tab in the same ASCII workbench to encode plain text to decimal and hex values.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/ascii-decoder').then((mod) => ({ default: mod.AsciiDecoder })),
  },
  'csv-formatter': {
    id: 'csv-formatter',
    title: 'CSV Formatter',
    description: 'Format and align CSV data for readability',
    longDescription: 'Parse CSV data and display it in aligned columns for easy reading and debugging. Handles quoted fields and commas correctly.',
    category: 'developer',
    icon: 'table',
    keywords: ['csv formatter', 'format csv', 'align csv', 'csv viewer'],
    type: 'static',
    addedAt: '2026-03-20',
    relatedTools: ['csv-to-json', 'json-to-csv', 'json-formatter'],
    faq: defaultFaq,
    component: () => import('@/components/tools/csv-formatter').then((mod) => ({ default: mod.CsvFormatter })),
  },
  'json-string-escaper': {
    id: 'json-string-escaper',
    title: 'JSON String Escaper',
    description: 'Escape and unescape strings for JSON',
    longDescription: 'Escape special characters in strings for safe JSON embedding, or unescape JSON string values back to plain text.',
    category: 'developer',
    icon: 'quote',
    keywords: ['json escape', 'escape string json', 'json unescape', 'string escaper'],
    type: 'static',
    addedAt: '2026-03-21',
    relatedTools: ['json-formatter', 'html-encoder', 'url-encoder'],
    faq: defaultFaq,
    component: () => import('@/components/tools/json-string-escaper').then((mod) => ({ default: mod.JsonStringEscaper })),
  },
  'user-agent-parser': {
    id: 'user-agent-parser',
    title: 'User-Agent Parser',
    description: 'Parse browser, OS, and device from User-Agent strings',
    longDescription: 'Extract browser name, operating system, and device type from HTTP User-Agent headers. Useful for web debugging and analytics.',
    category: 'developer',
    icon: 'monitor-smartphone',
    keywords: ['user agent parser', 'parse user agent', 'browser detection', 'ua string'],
    type: 'static',
    addedAt: '2026-03-21',
    relatedTools: ['url-parser', 'http-status-codes', 'email-validator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/user-agent-parser').then((mod) => ({ default: mod.UserAgentParser })),
  },
  'tab-to-spaces': {
    id: 'tab-to-spaces',
    title: 'Tab to Spaces',
    description: 'Convert tabs to spaces in code and text',
    longDescription: 'Replace tab characters with configurable spaces (2–8). Standardize indentation in code pasted from different editors.',
    category: 'developer',
    icon: 'indent-increase',
    keywords: ['tab to spaces', 'convert tabs', 'indentation converter', 'spaces tabs'],
    type: 'static',
    addedAt: '2026-03-22',
    relatedTools: ['line-sorter', 'whitespace-normalizer', 'json-formatter'],
    faq: defaultFaq,
    component: () => import('@/components/tools/tab-to-spaces').then((mod) => ({ default: mod.TabToSpaces })),
  },
  'cron-generator': {
    id: 'cron-generator',
    title: 'Cron Expression Generator',
    description: 'Build cron schedules with presets and live preview',
    longDescription:
      'Generate cron expressions visually with presets or custom fields, then parse them and preview upcoming run times in the same cron workbench.',
    category: 'developer',
    icon: 'calendar-clock',
    keywords: ['cron generator', 'create cron expression', 'cron builder', 'schedule generator', 'crontab generator'],
    type: 'static',
    addedAt: '2026-03-22',
    relatedTools: ['cron-parser', 'timezone-converter', 'unix-timestamp-converter'],
    faq: [
      {
        question: 'What cron format does this use?',
        answer: 'Standard 5-field cron: minute hour day-of-month month day-of-week. Example: 0 9 * * 1-5 runs at 9:00 AM on weekdays.',
      },
      ...defaultFaq,
    ],
    component: () => import('@/components/tools/cron-generator').then((mod) => ({ default: mod.CronGenerator })),
  },
  'levenshtein-calculator': {
    id: 'levenshtein-calculator',
    title: 'Levenshtein Distance Calculator',
    description: 'Measure string similarity with edit distance',
    longDescription: 'Calculate the Levenshtein edit distance between two strings and show similarity percentage. Used in spell checkers, fuzzy search, and DNA analysis.',
    category: 'text',
    icon: 'git-compare',
    keywords: ['levenshtein distance', 'edit distance', 'string similarity', 'fuzzy match'],
    type: 'static',
    addedAt: '2026-03-23',
    relatedTools: ['text-diff', 'palindrome-checker', 'find-and-replace'],
    faq: defaultFaq,
    component: () => import('@/components/tools/levenshtein-calculator').then((mod) => ({ default: mod.LevenshteinCalculator })),
  },
  'markdown-table-generator': {
    id: 'markdown-table-generator',
    title: 'Markdown Table Generator',
    description: 'Create Markdown tables from CSV or tab-separated data',
    longDescription: 'Convert comma, tab, or pipe-separated data into formatted Markdown tables. Perfect for README files, documentation, and GitHub wikis.',
    category: 'developer',
    icon: 'table-2',
    keywords: ['markdown table generator', 'csv to markdown table', 'create markdown table'],
    type: 'static',
    addedAt: '2026-03-24',
    relatedTools: ['markdown-to-html', 'markdown-preview', 'csv-to-json'],
    faq: defaultFaq,
    component: () => import('@/components/tools/markdown-table-generator').then((mod) => ({ default: mod.MarkdownTableGenerator })),
  },
  'uuid-validator': {
    id: 'uuid-validator',
    title: 'UUID Validator',
    description: 'Validate UUID format and identify version',
    longDescription: 'Check if a string is a valid RFC 4122 UUID and identify its version (v1–v8) and variant. Useful for API debugging and data validation.',
    category: 'developer',
    icon: 'badge-check',
    keywords: ['uuid validator', 'validate uuid', 'uuid version', 'check uuid'],
    type: 'static',
    addedAt: '2026-03-24',
    relatedTools: ['uuid-generator', 'jwt-decoder', 'hash-generator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/uuid-validator').then((mod) => ({ default: mod.UuidValidator })),
  },
  'margin-calculator': {
    id: 'margin-calculator',
    title: 'Profit Margin Calculator',
    description: 'Calculate profit margin and markup from cost and price',
    longDescription: 'Compute profit, profit margin percentage, and markup percentage from cost price and selling price. Essential for pricing and retail decisions.',
    category: 'calculators',
    icon: 'chart-line',
    keywords: ['profit margin calculator', 'markup calculator', 'margin vs markup', 'pricing calculator'],
    type: 'static',
    addedAt: '2026-03-25',
    relatedTools: ['discount-calculator', 'gst-calculator', 'vat-calculator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/margin-calculator').then((mod) => ({ default: mod.MarginCalculator })),
  },
  'css-gradient-generator': {
    id: 'css-gradient-generator',
    title: 'CSS Gradient Generator',
    description: 'Create linear CSS gradients with live preview',
    longDescription: 'Build linear CSS gradients visually with color pickers and angle control. Copy production-ready background CSS instantly.',
    category: 'developer',
    icon: 'paintbrush',
    keywords: ['css gradient generator', 'linear gradient css', 'gradient maker', 'background gradient'],
    type: 'static',
    addedAt: '2026-03-25',
    relatedTools: ['color-converter', 'css-minifier', 'random-color-generator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/css-gradient-generator').then((mod) => ({ default: mod.CssGradientGenerator })),
  },
  'meta-tag-generator': {
    id: 'meta-tag-generator',
    title: 'Meta Tag Generator',
    description: 'Generate SEO and Open Graph meta tags',
    longDescription: 'Create HTML meta tags for SEO, Open Graph, and Twitter Cards. Copy ready-to-paste tags for your website head section.',
    category: 'developer',
    icon: 'tags',
    keywords: ['meta tag generator', 'og tags', 'seo meta tags', 'open graph generator'],
    type: 'static',
    addedAt: '2026-03-26',
    relatedTools: ['slug-generator', 'markdown-preview', 'html-beautifier'],
    faq: defaultFaq,
    component: () => import('@/components/tools/meta-tag-generator').then((mod) => ({ default: mod.MetaTagGenerator })),
  },
  'add-line-numbers': {
    id: 'add-line-numbers',
    title: 'Add Line Numbers',
    description: 'Add line numbers to text and code',
    longDescription: 'Number every line in text or code with configurable starting number. Useful for references, documentation, and code snippets.',
    category: 'text',
    icon: 'list-ordered',
    keywords: ['add line numbers', 'number lines', 'line numbering', 'code line numbers'],
    type: 'static',
    addedAt: '2026-03-26',
    relatedTools: ['line-sorter', 'text-diff', 'remove-line-breaks'],
    faq: defaultFaq,
    component: () => import('@/components/tools/add-line-numbers').then((mod) => ({ default: mod.AddLineNumbers })),
  },
  'extract-urls': {
    id: 'extract-urls',
    title: 'Extract URLs',
    description: 'Extract all URLs from text',
    longDescription: 'Find and extract every unique HTTP and HTTPS URL from any block of text. Useful for link auditing, scraping prep, and content analysis.',
    category: 'text',
    icon: 'link-2',
    keywords: ['extract urls', 'find urls in text', 'url extractor', 'parse links'],
    type: 'static',
    addedAt: '2026-03-27',
    relatedTools: ['url-parser', 'extract-emails', 'strip-html-tags'],
    faq: defaultFaq,
    component: () => import('@/components/tools/extract-urls').then((mod) => ({ default: mod.ExtractUrls })),
  },
  'extract-emails': {
    id: 'extract-emails',
    title: 'Extract Emails',
    description: 'Extract all email addresses from text',
    longDescription: 'Find and extract every unique email address from any block of text. Useful for contact list building, data cleaning, and content analysis.',
    category: 'text',
    icon: 'mail',
    keywords: ['extract emails', 'find emails in text', 'email extractor', 'parse emails'],
    type: 'static',
    addedAt: '2026-03-27',
    relatedTools: ['email-validator', 'extract-urls', 'find-and-replace'],
    faq: defaultFaq,
    component: () => import('@/components/tools/extract-emails').then((mod) => ({ default: mod.ExtractEmails })),
  },
  'random-color-generator': {
    id: 'random-color-generator',
    title: 'Random Color Generator',
    description: 'Generate random colors with HEX, RGB, and HSL values',
    longDescription: 'Generate random colors for design mockups, testing, and inspiration. Shows HEX, RGB, and HSL values with one-click copy.',
    category: 'generators',
    icon: 'palette',
    keywords: ['random color generator', 'random hex color', 'color picker random', 'generate color'],
    type: 'static',
    addedAt: '2026-03-28',
    relatedTools: ['color-converter', 'css-gradient-generator', 'qr-code-generator'],
    faq: defaultFaq,
    component: () => import('@/components/tools/random-color-generator').then((mod) => ({ default: mod.RandomColorGenerator })),
  },
  'naming-convention-converter': {
    id: 'naming-convention-converter',
    title: 'Naming Convention Converter',
    description: 'Convert between camelCase, snake_case, kebab-case, and more',
    longDescription: 'Transform identifiers between camelCase, PascalCase, snake_case, SCREAMING_SNAKE, kebab-case, and dot.case. Essential for refactoring code.',
    category: 'developer',
    icon: 'case-sensitive',
    keywords: ['naming convention', 'camelCase to snake_case', 'kebab case converter', 'variable naming'],
    type: 'static',
    addedAt: '2026-03-28',
    relatedTools: ['case-converter', 'slug-generator', 'find-and-replace'],
    faq: defaultFaq,
    component: () => import('@/components/tools/naming-convention-converter').then((mod) => ({ default: mod.NamingConventionConverter })),
  },
}

export function getAllTools(): ToolDefinition[] {
  return Object.values(tools)
}

export function getToolCount(): number {
  return getAllTools().length
}

export function getCategoryById(categoryId: string): CategoryDefinition | undefined {
  return categories.find((category) => category.id === categoryId)
}

export function getCategoryName(categoryId: string): string {
  return getCategoryById(categoryId)?.name ?? categoryId
}

export function getToolsByCategory(categoryId: string): ToolDefinition[] {
  return getAllTools().filter((tool) => tool.category === categoryId)
}

export function searchTools(query: string): ToolDefinition[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return []

  return getAllTools().filter((tool) => {
    const categoryName = getCategoryName(tool.category).toLowerCase()
    return (
      tool.title.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      categoryName.includes(lowerQuery) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery))
    )
  })
}

/** GSC-validated high-intent tools — used for homepage converter section and internal linking. */
export const CLICK_PRIORITY_TOOL_IDS = [
  'json-to-csv',
  'json-formatter',
  'ascii-decoder',
  'html-encoder',
  'uuid-generator',
  'jwt-decoder',
] as const

export const CLICK_PRIORITY_TIER2_TOOL_IDS = [
  'base64-encoder',
  'hash-generator',
  'csv-to-json',
  'html-beautifier',
] as const

export function getClickPriorityTools(): ToolDefinition[] {
  return CLICK_PRIORITY_TOOL_IDS.map((id) => tools[id]).filter(Boolean)
}

export function getClickPriorityTier2Tools(): ToolDefinition[] {
  return CLICK_PRIORITY_TIER2_TOOL_IDS.map((id) => tools[id]).filter(Boolean)
}

export function getTrendingTools(): ToolDefinition[] {
  return [
    'json-formatter',
    'json-to-csv',
    'jwt-decoder',
    'ascii-decoder',
    'html-encoder',
    'uuid-generator',
  ]
    .map((id) => tools[id])
    .filter(Boolean)
}

export function getRecentlyAddedTools(limit = 4): ToolDefinition[] {
  return getAllTools()
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, limit)
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return (tool.relatedTools ?? [])
    .map((id) => tools[id])
    .filter(Boolean)
    .slice(0, 4)
}

export function getToolIds(): string[] {
  return Object.keys(tools)
}
