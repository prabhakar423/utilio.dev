export type GuideBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'tool-cta'; toolId: string; label: string }
  | { type: 'compare-cta'; slug: string; label: string }

export interface Guide {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  keywords: string[]
  relatedTools: string[]
  blocks: GuideBlock[]
}

export const WORKBENCH_GUIDE_SLUGS = [
  'hash-generator-sha256-online-free',
  'markdown-preview-online-free',
  'csv-to-json-converter-online-free',
  'hex-encoder-decoder-online-free',
  'binary-converter-online-free',
  'web-formatter-online-free',
] as const

export const FEATURED_GUIDE_SLUGS = [
  'jwt-decoder-online-free',
  'json-formatter-pretty-print-online-free',
  'base64-encode-decode-online-free',
  'url-encode-decode-online-free',
  'cron-expression-generator-online',
] as const

export const guides: Record<string, Guide> = {
  'what-is-base64': {
    slug: 'what-is-base64',
    title: 'What Is Base64 Encoding?',
    description:
      'Learn what Base64 encoding is, why developers use it, and how to encode or decode Base64 strings online — including URL-safe mode.',
    publishedAt: '2026-02-10',
    updatedAt: '2026-07-26',
    keywords: ['base64', 'encoding', 'what is base64', 'base64 explained', 'url-safe base64'],
    relatedTools: ['base64-encoder', 'base64-decoder', 'url-encoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Base64 is a binary-to-text encoding scheme that represents binary data using 64 printable ASCII characters. Developers use it to safely transmit data through systems that only handle text — like JSON payloads, email attachments, and data URIs.',
      },
      { type: 'heading', text: 'Why use Base64?' },
      {
        type: 'list',
        items: [
          'Embed small images directly in HTML or CSS using data URIs',
          'Send binary data inside JSON or XML without corruption',
          'Encode credentials for HTTP Basic Authentication headers',
          'Store binary blobs in text-only databases or logs',
        ],
      },
      { type: 'heading', text: 'How Base64 encoding works' },
      {
        type: 'paragraph',
        text: 'Base64 takes every 3 bytes of input (24 bits) and splits them into 4 groups of 6 bits. Each group maps to one of 64 characters: A–Z, a–z, 0–9, plus, and slash. Padding with = is added when input length is not divisible by 3.',
      },
      { type: 'heading', text: 'Standard vs URL-safe Base64' },
      {
        type: 'paragraph',
        text: 'Standard Base64 uses + and / which break in URLs. URL-safe Base64 replaces them with - and _ and often omits padding — the format JWTs use. Utillio\'s Base64 workbench supports both modes with live encode/decode on one page.',
      },
      { type: 'heading', text: 'Example' },
      {
        type: 'paragraph',
        text: 'The string "Hello World" encodes to "SGVsbG8gV29ybGQ=". You can verify this instantly using the free Base64 workbench — no data leaves your browser.',
      },
      { type: 'tool-cta', toolId: 'base64-encoder', label: 'Open Base64 workbench' },
      { type: 'heading', text: 'Base64 vs other encodings' },
      {
        type: 'paragraph',
        text: 'Base64 is not encryption — it is encoding. Anyone can decode it. For URL query strings, use percent-encoding. For cryptographic hashing, use a hash generator. Base64 is specifically for representing binary data as ASCII text.',
      },
      { type: 'tool-cta', toolId: 'hash-generator', label: 'Try the Hash Generator' },
    ],
  },
  'how-to-format-json': {
    slug: 'how-to-format-json',
    title: 'How to Format JSON Online',
    description:
      'Step-by-step guide to formatting, validating, and minifying JSON with live output, error locations, and structure preview.',
    publishedAt: '2026-02-12',
    updatedAt: '2026-07-26',
    keywords: ['format json', 'json formatter', 'pretty print json', 'validate json', 'json syntax error'],
    relatedTools: ['json-formatter', 'jwt-decoder', 'json-to-yaml'],
    blocks: [
      {
        type: 'paragraph',
        text: 'JSON (JavaScript Object Notation) is the standard data format for APIs, config files, and data exchange. Raw JSON from APIs is often minified — all on one line, hard to read. Formatting adds indentation so you can inspect structure, find errors, and debug faster.',
      },
      { type: 'heading', text: 'When to format JSON' },
      {
        type: 'list',
        items: [
          'Debugging API responses from REST or GraphQL endpoints',
          'Reviewing configuration files before deployment',
          'Validating JSON syntax before sending to a production API',
          'Comparing two JSON payloads side by side',
        ],
      },
      { type: 'heading', text: 'How to format JSON in Utillio' },
      {
        type: 'list',
        items: [
          'Copy your raw JSON — from an API response, log file, or config',
          'Paste it into the JSON Formatter — output updates live as you type',
          'Switch between Format, Minify, and Validate modes with one click',
          'Use Copy to grab the result, or Share to send a link with input preserved',
        ],
      },
      { type: 'tool-cta', toolId: 'json-formatter', label: 'Open JSON Formatter' },
      { type: 'heading', text: 'Live features that speed up debugging' },
      {
        type: 'list',
        items: [
          'Structure preview — see object/array counts and max depth at a glance',
          'Parse errors show line and column so you can jump to the mistake',
          'Stats panel — character count, key count, and nesting depth',
          'Shareable links encode input in the URL for team handoffs',
        ],
      },
      { type: 'heading', text: 'Format vs minify vs validate' },
      {
        type: 'paragraph',
        text: 'Format (pretty-print) adds readable 2-space indentation. Minify removes all whitespace for smaller payloads — useful before sending JSON to an API. Validate checks syntax without changing the output — ideal for CI checks or quick error detection.',
      },
      { type: 'heading', text: 'Common JSON errors' },
      {
        type: 'list',
        items: [
          'Trailing commas after the last item in an array or object',
          'Single quotes instead of double quotes for strings',
          'Unescaped special characters inside string values',
          'Missing closing brackets or braces',
        ],
      },
      {
        type: 'paragraph',
        text: 'The Utillio JSON Formatter shows the exact parse error with line and column context, making it easy to locate and fix syntax issues quickly.',
      },
      { type: 'compare-cta', slug: 'utillio-vs-json-formatter', label: 'Compare Utillio vs JSONFormatter.org' },
      { type: 'tool-cta', toolId: 'jwt-decoder', label: 'Decode JWT tokens' },
    ],
  },
  'what-is-jwt': {
    slug: 'what-is-jwt',
    title: 'What Is a JWT (JSON Web Token)?',
    description:
      'Understand JSON Web Tokens — structure, decode, verify, and sign — with Utillio\'s free browser-based JWT workbench.',
    publishedAt: '2026-02-15',
    updatedAt: '2026-07-26',
    keywords: ['jwt', 'json web token', 'what is jwt', 'jwt authentication', 'jwt verify', 'jwt sign'],
    relatedTools: ['jwt-decoder', 'jwt-generator', 'json-formatter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'A JSON Web Token (JWT) is a compact, URL-safe token format used for authentication and authorization in web applications and APIs. Instead of storing session data on the server, JWTs carry user identity and permissions inside the token itself.',
      },
      { type: 'heading', text: 'JWT structure' },
      {
        type: 'paragraph',
        text: 'Every JWT has three parts separated by dots: Header.Payload.Signature. The header describes the token type and signing algorithm (HS256, RS256, etc.). The payload contains claims (user ID, roles, expiration). The signature verifies the token has not been tampered with.',
      },
      { type: 'heading', text: 'Decode vs verify vs sign' },
      {
        type: 'list',
        items: [
          'Decode — read header and payload claims (does not prove authenticity)',
          'Verify — check the signature with a secret (HMAC) or public key (RSA)',
          'Sign — create a new token with custom claims and a shared secret',
        ],
      },
      { type: 'tool-cta', toolId: 'jwt-decoder', label: 'Open JWT workbench' },
      { type: 'heading', text: 'When to use JWTs' },
      {
        type: 'list',
        items: [
          'Stateless API authentication (REST, GraphQL)',
          'Single sign-on (SSO) between services',
          'Mobile app authentication',
          'Microservices identity propagation',
        ],
      },
      { type: 'heading', text: 'Important security notes' },
      {
        type: 'list',
        items: [
          'JWTs are encoded, not encrypted — anyone can decode the payload',
          'Never store sensitive data (passwords, credit cards) in JWT payloads',
          'Always verify signatures on the server before trusting claims',
          'Set short expiration times and use refresh tokens for long sessions',
        ],
      },
      { type: 'compare-cta', slug: 'utillio-vs-jwt-io', label: 'Compare Utillio vs jwt.io' },
      { type: 'tool-cta', toolId: 'jwt-generator', label: 'Sign a JWT' },
    ],
  },
  'sha256-hash-explained': {
    slug: 'sha256-hash-explained',
    title: 'SHA-256 Hash Explained',
    description:
      'Learn what SHA-256 hashing is, how it works, and when to use cryptographic hash functions.',
    publishedAt: '2026-02-16',
    keywords: ['sha256', 'hash function', 'cryptographic hash', 'sha-256 explained'],
    relatedTools: ['hash-generator', 'base64-encoder', 'jwt-decoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'SHA-256 is a cryptographic hash function that produces a fixed 256-bit (64 hex character) output from any input. The same input always produces the same hash, but even a tiny change in input produces a completely different hash.',
      },
      { type: 'heading', text: 'Common uses' },
      {
        type: 'list',
        items: [
          'Verifying file integrity (checksums)',
          'Password storage (with salt and key stretching)',
          'Blockchain and cryptocurrency',
          'Digital signatures and certificates',
          'Detecting duplicate content',
        ],
      },
      { type: 'heading', text: 'Hash vs encryption' },
      {
        type: 'paragraph',
        text: 'Hashing is one-way — you cannot reverse a hash to get the original input. Encryption is two-way — you can decrypt with the right key. Use hashing when you need to verify data without storing the original.',
      },
      { type: 'tool-cta', toolId: 'hash-generator', label: 'Generate SHA-256 hash' },
    ],
  },
  'unix-timestamp-guide': {
    slug: 'unix-timestamp-guide',
    title: 'Unix Timestamp Guide',
    description:
      'Understand Unix epoch timestamps — conversion, relative time, and seconds vs milliseconds.',
    publishedAt: '2026-02-17',
    updatedAt: '2026-07-26',
    keywords: ['unix timestamp', 'epoch time', 'timestamp converter', 'unix time', 'relative time'],
    relatedTools: ['unix-timestamp-converter', 'jwt-decoder', 'cron-parser'],
    blocks: [
      {
        type: 'paragraph',
        text: 'A Unix timestamp counts the number of seconds since January 1, 1970 00:00:00 UTC (the "Unix epoch"). It is the standard way programming languages and databases store time internally.',
      },
      { type: 'heading', text: 'Seconds vs milliseconds' },
      {
        type: 'paragraph',
        text: 'Most systems use seconds (10 digits, e.g. 1700000000). JavaScript and some APIs use milliseconds (13 digits). Utillio auto-detects the format and shows which was used.',
      },
      { type: 'heading', text: 'Timestamp workbench features' },
      {
        type: 'list',
        items: [
          'Relative time badge — "3 days ago" or "in 2 hours"',
          'Local, ISO 8601, and UTC output formats',
          'Timestamp → Date and Date → Timestamp tabs',
          'Use current time with one click',
        ],
      },
      { type: 'heading', text: 'Common use cases' },
      {
        type: 'list',
        items: [
          'Debugging API responses and JWT exp claims',
          'Database query filters by date range',
          'Cache expiration and TTL values',
          'Log file timestamp interpretation',
        ],
      },
      { type: 'tool-cta', toolId: 'unix-timestamp-converter', label: 'Open Timestamp workbench' },
    ],
  },
  'regex-basics': {
    slug: 'regex-basics',
    title: 'Regular Expressions (Regex) Basics',
    description:
      'A beginner-friendly guide to regular expressions — patterns, flags, and common use cases.',
    publishedAt: '2026-02-18',
    keywords: ['regex', 'regular expressions', 'regex tutorial', 'pattern matching'],
    relatedTools: ['regex-tester', 'json-formatter', 'case-converter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Regular expressions (regex) are patterns used to match and manipulate text. They appear in JavaScript, Python, SQL, grep, and most programming languages. Mastering regex saves hours of string parsing code.',
      },
      { type: 'heading', text: 'Essential patterns' },
      {
        type: 'list',
        items: [
          '. — any single character',
          '\\d — any digit (0-9)',
          '\\w — word character (letter, digit, underscore)',
          '\\s — whitespace',
          '+ — one or more of the preceding',
          '* — zero or more of the preceding',
          '{n,m} — between n and m occurrences',
          '^ — start of string, $ — end of string',
        ],
      },
      { type: 'heading', text: 'Common flags' },
      {
        type: 'list',
        items: [
          'g — global (find all matches, not just first)',
          'i — case insensitive',
          'm — multiline (^ and $ match line boundaries)',
        ],
      },
      { type: 'tool-cta', toolId: 'regex-tester', label: 'Test regex patterns live' },
    ],
  },
  'html-encoding-explained': {
    slug: 'html-encoding-explained',
    title: 'HTML Encoding Explained',
    description:
      'Learn why HTML encoding matters, common entities, and how to encode special characters safely.',
    publishedAt: '2026-02-19',
    keywords: ['html encoding', 'html entities', 'escape html', 'xss prevention'],
    relatedTools: ['html-encoder', 'strip-html-tags', 'markdown-to-html'],
    blocks: [
      {
        type: 'paragraph',
        text: 'HTML encoding converts special characters into HTML entities so they display as text instead of being interpreted as markup. This prevents broken layouts and is essential for XSS (cross-site scripting) prevention.',
      },
      { type: 'heading', text: 'Characters that must be encoded' },
      {
        type: 'list',
        items: [
          '< becomes &lt; (prevents opening tags)',
          '> becomes &gt; (prevents closing tags)',
          '& becomes &amp; (prevents entity injection)',
          '" becomes &quot; (safe inside attributes)',
          "' becomes &#39; (safe inside single-quoted attributes)",
        ],
      },
      { type: 'heading', text: 'When to encode' },
      {
        type: 'list',
        items: [
          'Displaying user-generated content on web pages',
          'Inserting dynamic values into HTML templates',
          'Embedding JSON or code snippets in HTML',
          'Building email templates with dynamic data',
        ],
      },
      { type: 'tool-cta', toolId: 'html-encoder', label: 'Encode HTML online' },
      { type: 'tool-cta', toolId: 'strip-html-tags', label: 'Strip HTML to plain text' },
    ],
  },
  'markdown-guide': {
    slug: 'markdown-guide',
    title: 'Markdown Syntax Guide for Developers',
    description: 'Learn Markdown formatting — headings, links, lists, code blocks, and how to convert Markdown to HTML.',
    publishedAt: '2026-02-21',
    keywords: ['markdown guide', 'markdown syntax', 'markdown tutorial', 'markdown cheat sheet'],
    relatedTools: ['markdown-to-html', 'json-formatter', 'slug-generator'],
    blocks: [
      { type: 'paragraph', text: 'Markdown is a lightweight markup language used in README files, documentation, GitHub issues, Notion exports, and static site generators. It converts easily to HTML while staying readable as plain text.' },
      { type: 'heading', text: 'Essential syntax' },
      { type: 'list', items: ['# Heading 1, ## Heading 2, ### Heading 3', '**bold** and *italic* text', '[link text](https://url.com) for hyperlinks', '- item for unordered lists', '`inline code` for code snippets', '```code block``` for multi-line code'] },
      { type: 'tool-cta', toolId: 'markdown-to-html', label: 'Convert Markdown to HTML' },
      { type: 'heading', text: 'When to use Markdown' },
      { type: 'list', items: ['GitHub README and wiki pages', 'Static site generators (Hugo, Jekyll, Astro)', 'API and project documentation', 'Blog posts and technical writing'] },
      { type: 'tool-cta', toolId: 'slug-generator', label: 'Generate URL slugs for posts' },
    ],
  },
  'sql-basics-guide': {
    slug: 'sql-basics-guide',
    title: 'SQL Formatting Best Practices',
    description: 'Why SQL formatting matters and how to write readable, maintainable database queries.',
    publishedAt: '2026-02-22',
    keywords: ['sql formatting', 'sql best practices', 'format sql', 'sql style guide'],
    relatedTools: ['sql-formatter', 'json-formatter', 'csv-to-json'],
    blocks: [
      { type: 'paragraph', text: 'Well-formatted SQL is easier to review, debug, and maintain. Complex JOINs and subqueries become readable when keywords are capitalized and clauses are on separate lines.' },
      { type: 'heading', text: 'Formatting rules' },
      { type: 'list', items: ['Capitalize SQL keywords (SELECT, FROM, WHERE, JOIN)', 'Put each major clause on its own line', 'Indent nested subqueries and JOIN conditions', 'Align column lists vertically in SELECT statements', 'Add comments for complex business logic'] },
      { type: 'tool-cta', toolId: 'sql-formatter', label: 'Format SQL online' },
      { type: 'heading', text: 'Common query patterns' },
      { type: 'list', items: ['SELECT with multiple JOINs — one JOIN per line', 'INSERT with many columns — align VALUES', 'UPDATE with WHERE — always include WHERE clause', 'GROUP BY with HAVING — separate aggregation filters'] },
    ],
  },
  'cron-scheduling-guide': {
    slug: 'cron-scheduling-guide',
    title: 'Cron Scheduling Guide',
    description: 'Master cron expressions for Linux crontab, Kubernetes, GitHub Actions, and CI pipelines — with live next-run preview.',
    publishedAt: '2026-02-23',
    updatedAt: '2026-07-26',
    keywords: ['cron guide', 'cron expression', 'crontab tutorial', 'cron schedule', 'cron next run'],
    relatedTools: ['cron-parser', 'cron-generator', 'unix-timestamp-converter'],
    blocks: [
      { type: 'paragraph', text: 'Cron expressions define recurring job schedules using 5 fields: minute, hour, day of month, month, and day of week. They power Linux crontab, Kubernetes CronJobs, AWS EventBridge, and GitHub Actions schedules.' },
      { type: 'heading', text: 'Common cron patterns' },
      { type: 'list', items: ['0 * * * * — every hour at minute 0', '0 9 * * 1-5 — 9 AM weekdays', '*/15 * * * * — every 15 minutes', '0 0 1 * * — first day of every month at midnight', '0 0 * * 0 — every Sunday at midnight'] },
      { type: 'heading', text: 'Validate with next-run preview' },
      { type: 'paragraph', text: 'The Utillio Cron workbench parses any expression and shows the next 5 scheduled runs with a field-by-field breakdown. Paste an existing cron from crontab or build one visually with presets — both tabs share the same page.' },
      { type: 'tool-cta', toolId: 'cron-parser', label: 'Open Cron workbench' },
      { type: 'heading', text: 'Special characters' },
      { type: 'list', items: ['* — any value', '*/n — every n units', 'n-m — range from n to m', 'n,m — list of values n and m'] },
      { type: 'tool-cta', toolId: 'timezone-converter', label: 'Convert timezones' },
    ],
  },
  'seo-url-slugs-guide': {
    slug: 'seo-url-slugs-guide',
    title: 'SEO URL Slugs: Best Practices',
    description: 'How to create SEO-friendly URL slugs that rank better and improve user experience.',
    publishedAt: '2026-02-24',
    keywords: ['url slug', 'seo slug', 'permalink best practices', 'seo urls'],
    relatedTools: ['slug-generator', 'case-converter', 'word-counter'],
    blocks: [
      { type: 'paragraph', text: 'URL slugs are the human-readable part of a URL after the domain. A good slug helps search engines understand page content and gives users confidence before clicking.' },
      { type: 'heading', text: 'Slug best practices' },
      { type: 'list', items: ['Use lowercase letters only', 'Separate words with hyphens, not underscores', 'Keep slugs short (3-5 words ideal)', 'Include primary keyword naturally', 'Remove stop words (a, the, and) when possible', 'Never change slugs after publishing without redirects'] },
      { type: 'tool-cta', toolId: 'slug-generator', label: 'Generate SEO slugs' },
      { type: 'heading', text: 'Examples' },
      { type: 'list', items: ['Good: /guides/how-to-format-json', 'Bad: /page?id=12345', 'Good: /tools/json-formatter', 'Bad: /tools/JSON_Formatter_Tool_v2'] },
    ],
  },
  'csv-json-data-guide': {
    slug: 'csv-json-data-guide',
    title: 'CSV vs JSON: When to Use Each Format',
    description: 'Understand the differences between CSV and JSON data formats and when to convert between them.',
    publishedAt: '2026-02-25',
    keywords: ['csv vs json', 'convert csv json', 'data format', 'csv json guide'],
    relatedTools: ['csv-to-json', 'json-to-csv', 'json-formatter'],
    blocks: [
      { type: 'paragraph', text: 'CSV and JSON are the two most common data interchange formats. CSV is flat and spreadsheet-friendly. JSON is hierarchical and API-friendly. Choosing the right format saves time and prevents data loss.' },
      { type: 'heading', text: 'When to use CSV' },
      { type: 'list', items: ['Exporting data to Excel or Google Sheets', 'Simple tabular data with consistent columns', 'Large datasets where file size matters', 'Importing into databases or CRM systems'] },
      { type: 'heading', text: 'When to use JSON' },
      { type: 'list', items: ['API requests and responses', 'Nested or hierarchical data structures', 'Configuration files', 'JavaScript and web application data'] },
      { type: 'tool-cta', toolId: 'csv-to-json', label: 'Convert CSV to JSON' },
      { type: 'tool-cta', toolId: 'json-to-csv', label: 'Convert JSON to CSV' },
    ],
  },
  'http-status-codes-guide': {
    slug: 'http-status-codes-guide',
    title: 'HTTP Status Codes Explained',
    description: 'Complete guide to HTTP status codes — what 200, 404, 500 mean and when to use each.',
    publishedAt: '2026-03-01',
    keywords: ['http status codes', '404 meaning', '500 error', 'rest api status codes'],
    relatedTools: ['http-status-codes', 'url-parser', 'json-formatter'],
    blocks: [
      { type: 'paragraph', text: 'HTTP status codes tell clients whether a request succeeded, failed, or needs further action. Every API response includes a 3-digit status code in the first line of the HTTP response.' },
      { type: 'heading', text: 'Status code categories' },
      { type: 'list', items: ['1xx Informational — request received, processing continues', '2xx Success — request completed successfully', '3xx Redirection — client must take additional action', '4xx Client Error — problem with the request', '5xx Server Error — server failed to fulfill a valid request'] },
      { type: 'heading', text: 'Most common codes' },
      { type: 'list', items: ['200 OK — standard success response', '201 Created — new resource created', '301 Moved Permanently — permanent redirect', '400 Bad Request — malformed request syntax', '401 Unauthorized — authentication required', '403 Forbidden — authenticated but not allowed', '404 Not Found — resource does not exist', '429 Too Many Requests — rate limit hit', '500 Internal Server Error — unexpected server failure', '503 Service Unavailable — server temporarily down'] },
      { type: 'tool-cta', toolId: 'http-status-codes', label: 'Browse all status codes' },
    ],
  },
  'password-security-guide': {
    slug: 'password-security-guide',
    title: 'Password Security Best Practices',
    description: 'How to create, store, and manage strong passwords that protect your accounts.',
    publishedAt: '2026-03-02',
    keywords: ['password security', 'strong password', 'password best practices', 'password manager'],
    relatedTools: ['password-generator', 'password-strength-checker', 'hash-generator'],
    blocks: [
      { type: 'paragraph', text: 'Weak passwords are the leading cause of account breaches. A strong password strategy combines length, randomness, uniqueness, and secure storage.' },
      { type: 'heading', text: 'Rules for strong passwords' },
      { type: 'list', items: ['Use at least 16 characters', 'Mix uppercase, lowercase, numbers, and symbols', 'Never reuse passwords across sites', 'Avoid dictionary words and personal information', 'Use a password manager to store unique passwords', 'Enable two-factor authentication everywhere possible'] },
      { type: 'tool-cta', toolId: 'password-generator', label: 'Generate a strong password' },
      { type: 'tool-cta', toolId: 'password-strength-checker', label: 'Check password strength' },
    ],
  },
  'emi-vs-sip-guide': {
    slug: 'emi-vs-sip-guide',
    title: 'EMI vs SIP: Which Calculator Do You Need?',
    description: 'Understand the difference between EMI loans and SIP investments, and when to use each calculator.',
    publishedAt: '2026-03-03',
    keywords: ['emi vs sip', 'emi calculator', 'sip calculator', 'loan vs investment'],
    relatedTools: ['emi-calculator', 'sip-calculator', 'compound-interest-calculator'],
    blocks: [
      { type: 'paragraph', text: 'EMI and SIP are both financial planning tools, but they serve opposite purposes. EMI calculates what you owe on a loan. SIP calculates what you could earn through regular investing.' },
      { type: 'heading', text: 'When to use EMI Calculator' },
      { type: 'list', items: ['Planning a home, car, or personal loan', 'Comparing interest rates from different lenders', 'Understanding total interest payable over loan tenure', 'Deciding between loan tenures (12 vs 24 vs 36 months)'] },
      { type: 'tool-cta', toolId: 'emi-calculator', label: 'Calculate loan EMI' },
      { type: 'heading', text: 'When to use SIP Calculator' },
      { type: 'list', items: ['Planning mutual fund investments', 'Estimating retirement corpus from monthly savings', 'Comparing expected returns at different growth rates', 'Setting financial goals with a timeline'] },
      { type: 'tool-cta', toolId: 'sip-calculator', label: 'Calculate SIP returns' },
    ],
  },
  'css-hex-colors-guide': {
    slug: 'css-hex-colors-guide',
    title: 'CSS Hex Colors Guide for Developers',
    description: 'How hex color codes work in CSS and how to convert between HEX, RGB, and HSL.',
    publishedAt: '2026-03-04',
    keywords: ['hex color', 'css colors', 'hex to rgb', 'color codes web'],
    relatedTools: ['color-converter', 'css-minifier', 'html-beautifier'],
    blocks: [
      { type: 'paragraph', text: 'Hex colors are the most common way to specify colors in CSS and design tools. A hex code like #2563eb represents red, green, and blue values in hexadecimal.' },
      { type: 'heading', text: 'Hex color format' },
      { type: 'list', items: ['#RRGGBB — 6 digits for red, green, blue (e.g. #FF0000 = red)', '#RGB — 3-digit shorthand when pairs repeat (e.g. #F00 = #FF0000)', 'Values range from 00 (none) to FF (full intensity)', 'Case insensitive — #abc equals #ABC'] },
      { type: 'heading', text: 'When to use each format' },
      { type: 'list', items: ['HEX — CSS, design tools, quick copy-paste', 'RGB — when you need alpha transparency (rgba)', 'HSL — when adjusting hue, saturation, or lightness programmatically'] },
      { type: 'tool-cta', toolId: 'color-converter', label: 'Convert colors online' },
    ],
  },
  'json-vs-xml-guide': {
    slug: 'json-vs-xml-guide',
    title: 'JSON vs XML: When to Use Each Format',
    description: 'Compare JSON and XML data formats — strengths, weaknesses, and real-world use cases.',
    publishedAt: '2026-03-05',
    keywords: ['json vs xml', 'json or xml', 'data format comparison', 'xml json'],
    relatedTools: ['json-formatter', 'xml-formatter', 'yaml-to-json'],
    blocks: [
      { type: 'paragraph', text: 'JSON and XML are both structured data formats, but they serve different ecosystems. JSON dominates modern web APIs. XML remains strong in enterprise, document markup, and legacy systems.' },
      { type: 'heading', text: 'Choose JSON when' },
      { type: 'list', items: ['Building REST APIs or GraphQL services', 'Working with JavaScript, Python, or mobile apps', 'Data is relatively flat or moderately nested', 'File size and parsing speed matter', 'Human readability is important'] },
      { type: 'tool-cta', toolId: 'json-formatter', label: 'Format JSON' },
      { type: 'heading', text: 'Choose XML when' },
      { type: 'list', items: ['Working with SOAP web services', 'Processing RSS feeds or SVG graphics', 'Enterprise systems requiring schema validation (XSD)', 'Document markup with mixed content', 'Legacy system integration'] },
      { type: 'tool-cta', toolId: 'xml-formatter', label: 'Format XML' },
      { type: 'heading', text: 'YAML as an alternative' },
      { type: 'paragraph', text: 'YAML is increasingly popular for configuration files (Kubernetes, Docker, CI/CD) because it is more human-readable than JSON while supporting the same data structures.' },
      { type: 'tool-cta', toolId: 'yaml-to-json', label: 'Convert YAML to JSON' },
    ],
  },
  'hmac-vs-hash-guide': {
    slug: 'hmac-vs-hash-guide',
    title: 'HMAC vs Hash: What Is the Difference?',
    description: 'Understand when to use a plain hash versus HMAC — and how Utillio\'s Hash/HMAC workbench covers both.',
    publishedAt: '2026-03-10',
    updatedAt: '2026-07-26',
    keywords: ['hmac vs hash', 'hmac explained', 'message authentication', 'sha256 hmac', 'hash workbench'],
    relatedTools: ['hash-generator', 'hmac-generator', 'jwt-decoder'],
    blocks: [
      { type: 'paragraph', text: 'Both hashes and HMACs produce fixed-length digests, but they serve different security purposes. A hash verifies integrity. An HMAC verifies both integrity and authenticity.' },
      { type: 'heading', text: 'When to use a hash' },
      { type: 'list', items: ['Checking file integrity (checksums)', 'Comparing whether two strings produce the same digest', 'Deduplication and fingerprinting', 'Blockchain and Merkle trees — not for password storage (use bcrypt/argon2)'] },
      { type: 'heading', text: 'When to use HMAC' },
      { type: 'list', items: ['API request signing (Stripe, AWS, webhooks)', 'Verifying JWT HS256 signatures in the JWT workbench', 'Cookie signing in web frameworks', 'Any workflow needing a shared secret'] },
      { type: 'heading', text: 'One workbench, two tabs' },
      { type: 'paragraph', text: 'Utillio combines Hash and HMAC on one page with SHA-256, SHA-384, and SHA-512. Switch tabs without losing input — shareable links preserve algorithm and active tab.' },
      { type: 'tool-cta', toolId: 'hash-generator', label: 'Open Hash/HMAC workbench' },
      { type: 'compare-cta', slug: 'utillio-vs-hash-tools', label: 'Compare Utillio vs online hash tools' },
    ],
  },
  'reading-time-seo-guide': {
    slug: 'reading-time-seo-guide',
    title: 'Why Reading Time Matters for SEO and UX',
    description: 'How estimated reading time improves engagement, bounce rate, and content UX.',
    publishedAt: '2026-03-11',
    keywords: ['reading time seo', 'read time blog', 'content ux', 'estimated reading time'],
    relatedTools: ['reading-time-calculator', 'word-counter', 'word-frequency-counter'],
    blocks: [
      { type: 'paragraph', text: 'Showing estimated reading time sets reader expectations before they commit. It reduces bounce rate on long articles and increases completion rate on shorter ones.' },
      { type: 'heading', text: 'How reading time is calculated' },
      { type: 'list', items: ['Count total words in the article', 'Divide by average reading speed (200–250 wpm for adults)', 'Round up to the nearest minute', 'Add time for images (~12 seconds per image is common)'] },
      { type: 'tool-cta', toolId: 'reading-time-calculator', label: 'Calculate reading time' },
      { type: 'heading', text: 'SEO benefits' },
      { type: 'list', items: ['Lower bounce rate signals quality to search engines', 'Featured snippets may show reading time', 'Improves user experience metrics (dwell time)', 'Helps readers choose content that fits their available time'] },
    ],
  },
  'ip-address-basics-guide': {
    slug: 'ip-address-basics-guide',
    title: 'IPv4 Address Formats Explained',
    description: 'Learn dotted decimal, integer, and hex representations — with live conversion in Utillio\'s IP workbench.',
    publishedAt: '2026-03-12',
    updatedAt: '2026-07-26',
    keywords: ['ipv4 explained', 'ip address format', 'ip to decimal', 'ip to hex', 'network basics'],
    relatedTools: ['ip-converter', 'cidr-calculator', 'hex-encoder'],
    blocks: [
      { type: 'paragraph', text: 'An IPv4 address is a 32-bit number usually written as four octets separated by dots (e.g. 192.168.1.1). The same address can be expressed as a decimal integer or hexadecimal value — databases and APIs use different formats.' },
      { type: 'heading', text: 'Common formats' },
      { type: 'list', items: ['Dotted decimal — 192.168.1.1 (human readable)', 'Decimal/long — 3232235777 (MySQL INET_ATON, some APIs)', 'Hexadecimal — 0xC0A80101 (debug output, low-level networking)', 'CIDR notation — 192.168.1.0/24 (subnet ranges)'] },
      { type: 'heading', text: 'Live conversion in the IP workbench' },
      { type: 'paragraph', text: 'Edit any format and the others update instantly. Copy all three with one click — useful when debugging Cloudflare, AWS, or database IP storage.' },
      { type: 'tool-cta', toolId: 'ip-converter', label: 'Open IP workbench' },
      { type: 'tool-cta', toolId: 'cidr-calculator', label: 'Calculate CIDR ranges' },
    ],
  },
  'javascript-minification-guide': {
    slug: 'javascript-minification-guide',
    title: 'JavaScript Minification: What Gets Removed?',
    description: 'How JS minifiers reduce file size — use the Web Formatter workbench for HTML, CSS, JS, and XML.',
    publishedAt: '2026-03-13',
    updatedAt: '2026-07-26',
    keywords: ['javascript minification', 'minify js', 'js production build', 'reduce js size', 'web formatter'],
    relatedTools: ['javascript-minifier', 'css-minifier', 'html-beautifier'],
    blocks: [
      { type: 'paragraph', text: 'Minification removes unnecessary characters from JavaScript without changing functionality — comments, whitespace, and sometimes variable names (in advanced minifiers).' },
      { type: 'heading', text: 'What minifiers remove' },
      { type: 'list', items: ['Single-line comments (//)', 'Multi-line comments (/* */)', 'Extra whitespace and line breaks', 'In advanced tools: shorten variable names (mangling)'] },
      { type: 'heading', text: 'Web Formatter workbench' },
      { type: 'paragraph', text: 'Utillio combines HTML beautify, CSS minify, JS minify, and XML format on one page. Each tab shows byte savings for minifiers and preserves separate inputs when switching tabs.' },
      { type: 'tool-cta', toolId: 'javascript-minifier', label: 'Open Web Formatter' },
      { type: 'heading', text: 'Production best practices' },
      { type: 'list', items: ['Always test minified code before deployment', 'Use source maps for debugging production issues', 'Combine with gzip/brotli compression on the server', 'For large apps, use build tools like esbuild or Terser'] },
    ],
  },
  'markdown-html-conversion-guide': {
    slug: 'markdown-html-conversion-guide',
    title: 'Markdown ↔ HTML: When to Convert Each Way',
    description: 'Convert Markdown to HTML with live preview, export source, or reverse HTML to Markdown — one workbench.',
    publishedAt: '2026-03-14',
    updatedAt: '2026-07-26',
    keywords: ['markdown to html', 'html to markdown', 'convert markdown', 'documentation workflow', 'markdown preview'],
    relatedTools: ['markdown-preview', 'markdown-to-html', 'html-to-markdown'],
    blocks: [
      { type: 'paragraph', text: 'Markdown and HTML are the two dominant formats for web content. Markdown is easier to write. HTML gives full control over structure and styling.' },
      { type: 'heading', text: 'Markdown workbench tabs' },
      { type: 'list', items: ['Live preview — side-by-side editor and rendered HTML', 'Markdown → HTML — copy HTML source for CMS or email', 'HTML → Markdown — migrate legacy content to Git-friendly Markdown', 'Round-trip: convert HTML → Markdown → preview'] },
      { type: 'heading', text: 'Markdown → HTML use cases' },
      { type: 'list', items: ['Publishing README files to documentation sites', 'Converting blog drafts to CMS HTML', 'Static site generators (Hugo, Jekyll, Next.js MDX)', 'Email templates from Markdown source'] },
      { type: 'tool-cta', toolId: 'markdown-preview', label: 'Open Markdown workbench' },
      { type: 'heading', text: 'HTML → Markdown use cases' },
      { type: 'list', items: ['Migrating WordPress or CMS content to Markdown', 'Cleaning up exported HTML for GitHub docs', 'Creating editable source from legacy web pages'] },
      { type: 'tool-cta', toolId: 'html-to-markdown', label: 'Convert HTML to Markdown' },
    ],
  },
  'chmod-permissions-guide': {
    slug: 'chmod-permissions-guide',
    title: 'Unix File Permissions (chmod) Explained',
    description: 'Understand octal and symbolic notation for Unix file permissions.',
    publishedAt: '2026-03-16',
    keywords: ['chmod explained', 'file permissions', '755 meaning', 'rwx permissions'],
    relatedTools: ['chmod-calculator', 'binary-converter', 'hex-encoder'],
    blocks: [
      { type: 'paragraph', text: 'Unix file permissions control who can read, write, and execute files. Each permission set applies to three groups: owner, group, and others.' },
      { type: 'heading', text: 'Permission values' },
      { type: 'list', items: ['r (read) = 4', 'w (write) = 2', 'x (execute) = 1', '755 = rwxr-xr-x (owner full, others read+execute)', '644 = rw-r--r-- (owner read+write, others read only)'] },
      { type: 'tool-cta', toolId: 'chmod-calculator', label: 'Convert chmod notation' },
    ],
  },
  'vat-vs-gst-guide': {
    slug: 'vat-vs-gst-guide',
    title: 'VAT vs GST: What Is the Difference?',
    description: 'Compare Value Added Tax and Goods and Services Tax for invoicing.',
    publishedAt: '2026-03-17',
    keywords: ['vat vs gst', 'value added tax', 'goods and services tax', 'tax calculator'],
    relatedTools: ['vat-calculator', 'gst-calculator', 'discount-calculator'],
    blocks: [
      { type: 'paragraph', text: 'VAT and GST are both consumption taxes applied at each stage of the supply chain. GST is essentially a type of VAT used in countries like India, Australia, and Canada.' },
      { type: 'heading', text: 'Key differences' },
      { type: 'list', items: ['VAT — used in EU, UK, and many countries; multiple rate tiers common', 'GST — used in India, Australia, Canada; often a single unified system', 'Both support exclusive (tax added) and inclusive (tax included) pricing', 'Always verify current rates for your jurisdiction'] },
      { type: 'tool-cta', toolId: 'vat-calculator', label: 'Calculate VAT' },
      { type: 'tool-cta', toolId: 'gst-calculator', label: 'Calculate GST' },
    ],
  },
  'cron-builder-guide': {
    slug: 'cron-builder-guide',
    title: 'How to Build Cron Expressions',
    description: 'Step-by-step guide to creating cron schedules for jobs and automation — with visual builder and next-run preview.',
    publishedAt: '2026-03-18',
    updatedAt: '2026-07-26',
    keywords: ['cron expression guide', 'cron syntax', 'cron schedule', 'cron builder', 'cron generator'],
    relatedTools: ['cron-generator', 'cron-parser', 'unix-timestamp-converter'],
    blocks: [
      { type: 'paragraph', text: 'Cron expressions define when scheduled jobs run. Standard cron uses 5 fields: minute, hour, day of month, month, and day of week.' },
      { type: 'heading', text: 'Common patterns' },
      { type: 'list', items: ['* — every value', '*/5 — every 5 units', '1-5 — range (Mon–Fri for weekday)', '0 9 * * 1-5 — 9 AM on weekdays', '0 0 1 * * — midnight on the 1st of each month'] },
      { type: 'heading', text: 'Build tab in the Cron workbench' },
      { type: 'paragraph', text: 'Use presets (every minute, hourly, daily, weekly, monthly) or set each field manually. The expression updates live and the Parse tab shows the next 5 runs so you can confirm the schedule before deploying to Kubernetes or crontab.' },
      { type: 'tool-cta', toolId: 'cron-generator', label: 'Build a cron expression' },
      { type: 'tool-cta', toolId: 'cron-parser', label: 'Parse and preview runs' },
    ],
  },
  'ascii-encoding-guide': {
    slug: 'ascii-encoding-guide',
    title: 'ASCII and Character Encoding Basics',
    description: 'How ASCII codes work — with a character table, decimal/hex lookup, and code-to-text conversion.',
    publishedAt: '2026-03-19',
    updatedAt: '2026-07-26',
    keywords: ['ascii explained', 'character encoding', 'ascii code', 'utf-8 basics', 'ascii table'],
    relatedTools: ['ascii-converter', 'ascii-decoder', 'hex-encoder'],
    blocks: [
      { type: 'paragraph', text: 'ASCII assigns numeric codes to 128 characters (0–127). Extended ASCII and Unicode expanded this to support international characters. UTF-8 encodes Unicode using variable-length byte sequences.' },
      { type: 'heading', text: 'Common ASCII codes' },
      { type: 'list', items: ['A = 65, a = 97', '0 = 48', 'Space = 32', 'Newline (LF) = 10', 'Tab = 9'] },
      { type: 'heading', text: 'ASCII workbench features' },
      { type: 'list', items: ['Char → Code tab with decimal and hex table per character', 'Code → Char tab accepts decimal (72 101) or hex (0x48) codes', 'Copy decimal codes for scripts and debug output', 'Shareable links preserve input and active tab'] },
      { type: 'tool-cta', toolId: 'ascii-converter', label: 'Open ASCII workbench' },
    ],
  },
  'string-similarity-guide': {
    slug: 'string-similarity-guide',
    title: 'String Similarity and Edit Distance',
    description: 'How Levenshtein distance powers spell checkers, search, and fuzzy matching.',
    publishedAt: '2026-03-20',
    keywords: ['levenshtein distance', 'string similarity', 'edit distance', 'fuzzy search'],
    relatedTools: ['levenshtein-calculator', 'text-diff', 'find-and-replace'],
    blocks: [
      { type: 'paragraph', text: 'Edit distance measures how many single-character changes (insertions, deletions, substitutions) are needed to transform one string into another. Lower distance means higher similarity.' },
      { type: 'heading', text: 'Real-world uses' },
      { type: 'list', items: ['Spell checkers suggest closest dictionary words', 'Search engines handle typos with fuzzy matching', 'Record deduplication in databases', 'DNA sequence alignment in bioinformatics'] },
      { type: 'tool-cta', toolId: 'levenshtein-calculator', label: 'Calculate edit distance' },
    ],
  },
  'css-gradients-guide': {
    slug: 'css-gradients-guide',
    title: 'CSS Linear Gradients Explained',
    description: 'How linear gradients work in CSS and when to use them.',
    publishedAt: '2026-03-24',
    keywords: ['css gradient', 'linear gradient', 'background gradient css', 'gradient tutorial'],
    relatedTools: ['css-gradient-generator', 'color-converter', 'css-minifier'],
    blocks: [
      { type: 'paragraph', text: 'CSS linear gradients create smooth color transitions along a straight line. They are widely used for backgrounds, buttons, and hero sections without needing image files.' },
      { type: 'heading', text: 'Basic syntax' },
      { type: 'list', items: ['linear-gradient(angle, color1, color2) — angle in degrees (0 = up, 90 = right)', 'Use at least two color stops', 'Add more stops for multi-color gradients', 'Combine with background-size for repeating patterns'] },
      { type: 'tool-cta', toolId: 'css-gradient-generator', label: 'Generate a CSS gradient' },
    ],
  },
  'meta-tags-seo-guide': {
    slug: 'meta-tags-seo-guide',
    title: 'Essential Meta Tags for SEO and Social Sharing',
    description: 'Which meta tags every webpage needs for search engines and social previews.',
    publishedAt: '2026-03-25',
    keywords: ['meta tags seo', 'open graph tags', 'twitter cards', 'seo meta description'],
    relatedTools: ['meta-tag-generator', 'slug-generator', 'reading-time-calculator'],
    blocks: [
      { type: 'paragraph', text: 'Meta tags provide metadata about your page to search engines and social platforms. The most important ones control how your page appears in search results and when shared on social media.' },
      { type: 'heading', text: 'Must-have tags' },
      { type: 'list', items: ['title — page title shown in browser tab and search results', 'meta description — snippet shown in Google search results', 'og:title, og:description, og:image — Open Graph for Facebook, LinkedIn', 'twitter:card, twitter:title, twitter:image — Twitter/X previews'] },
      { type: 'tool-cta', toolId: 'meta-tag-generator', label: 'Generate meta tags' },
    ],
  },
  'uuid-versions-guide': {
    slug: 'uuid-versions-guide',
    title: 'UUID Versions Explained (v1–v7)',
    description: 'Understand the different UUID versions and when each is used.',
    publishedAt: '2026-03-26',
    keywords: ['uuid versions', 'uuid v4', 'uuid explained', 'rfc 4122'],
    relatedTools: ['uuid-validator', 'uuid-generator', 'jwt-decoder'],
    blocks: [
      { type: 'paragraph', text: 'UUIDs (Universally Unique Identifiers) are 128-bit values used to uniquely identify records, sessions, and resources. RFC 4122 defines several versions with different generation strategies.' },
      { type: 'heading', text: 'Common versions' },
      { type: 'list', items: ['v1 — time-based with MAC address (predictable, avoid for security)', 'v4 — random (most common for IDs and tokens)', 'v5 — SHA-1 hash of namespace + name (deterministic)', 'v7 — Unix timestamp + random (sortable, newer standard)'] },
      { type: 'tool-cta', toolId: 'uuid-generator', label: 'Generate UUID v4' },
      { type: 'tool-cta', toolId: 'uuid-validator', label: 'Validate a UUID' },
    ],
  },
  'profit-margin-guide': {
    slug: 'profit-margin-guide',
    title: 'Profit Margin vs Markup: What Is the Difference?',
    description: 'Learn how margin and markup differ and which to use when pricing products.',
    publishedAt: '2026-03-27',
    keywords: ['profit margin vs markup', 'margin calculator', 'pricing strategy', 'retail markup'],
    relatedTools: ['margin-calculator', 'discount-calculator', 'vat-calculator'],
    blocks: [
      { type: 'paragraph', text: 'Margin and markup both measure profit, but from different bases. Confusing them leads to underpricing or unrealistic revenue projections.' },
      { type: 'heading', text: 'The formulas' },
      { type: 'list', items: ['Profit = Selling price − Cost', 'Margin % = Profit ÷ Selling price × 100', 'Markup % = Profit ÷ Cost × 100', 'Example: Cost $60, Price $100 → 40% margin, 66.7% markup'] },
      { type: 'tool-cta', toolId: 'margin-calculator', label: 'Calculate margin and markup' },
    ],
  },
  'markdown-tables-guide': {
    slug: 'markdown-tables-guide',
    title: 'How to Create Markdown Tables',
    description: 'Syntax and tips for building tables in Markdown for GitHub, docs, and blogs.',
    publishedAt: '2026-03-28',
    keywords: ['markdown tables', 'markdown table syntax', 'github tables', 'readme table'],
    relatedTools: ['markdown-table-generator', 'markdown-to-html', 'csv-to-json'],
    blocks: [
      { type: 'paragraph', text: 'Markdown tables use pipes and dashes to define columns and rows. GitHub Flavored Markdown (GFM) supports alignment and is widely supported in README files and documentation sites.' },
      { type: 'heading', text: 'Basic syntax' },
      { type: 'list', items: ['Header row: | Column 1 | Column 2 |', 'Separator: | --- | --- | (required)', 'Data rows: | Value 1 | Value 2 |', 'Alignment: :--- (left), :---: (center), ---: (right)'] },
      { type: 'tool-cta', toolId: 'markdown-table-generator', label: 'Generate a Markdown table' },
    ],
  },
  'yaml-to-json-converter-online-free': {
    slug: 'yaml-to-json-converter-online-free',
    title: 'YAML to JSON Converter Online (Free)',
    description:
      'Convert YAML to JSON instantly in your browser. Free, private, and no upload — ideal for Kubernetes, Docker Compose, and CI configs.',
    publishedAt: '2026-03-29',
    keywords: [
      'yaml to json converter online free',
      'convert yaml to json',
      'yaml json converter',
      'yaml parser online',
    ],
    relatedTools: ['yaml-to-json', 'json-to-yaml', 'json-formatter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'YAML is the go-to format for Kubernetes manifests, Docker Compose files, GitHub Actions workflows, and Ansible playbooks. APIs and JavaScript apps often expect JSON instead. Converting between them by hand is error-prone — indentation matters in YAML, and a single misplaced space breaks parsing.',
      },
      { type: 'heading', text: 'When you need YAML → JSON' },
      {
        type: 'list',
        items: [
          'Feeding a Kubernetes manifest into a JSON-only API or validator',
          'Debugging CI/CD pipeline configs that output YAML',
          'Migrating legacy YAML configs to JSON-based tools',
          'Testing config changes before deploying to production',
        ],
      },
      { type: 'heading', text: 'Why use a browser converter?' },
      {
        type: 'paragraph',
        text: 'Server-side converters upload your config to a remote machine. For production secrets, internal hostnames, or API keys embedded in YAML, that is a security risk. Utillio converts YAML to JSON entirely in your browser — nothing is sent over the network.',
      },
      { type: 'tool-cta', toolId: 'yaml-to-json', label: 'Convert YAML to JSON now' },
    ],
  },
  'chmod-755-to-symbolic-calculator': {
    slug: 'chmod-755-to-symbolic-calculator',
    title: 'Chmod Calculator: Convert 755 to Symbolic (rwxr-xr-x)',
    description:
      'Convert chmod octal values like 755 to symbolic notation (rwxr-xr-x) and back. Free online calculator — runs locally, no upload.',
    publishedAt: '2026-03-29',
    keywords: [
      'chmod calculator 755 to symbolic',
      '755 to rwxr-xr-x',
      'octal to symbolic chmod',
      'file permissions calculator',
    ],
    relatedTools: ['chmod-calculator', 'binary-converter', 'hex-encoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Unix file permissions use either octal notation (755, 644, 600) or symbolic notation (rwxr-xr-x). Octal is compact; symbolic is readable. DevOps docs, deployment scripts, and chmod man pages mix both — a quick converter saves time.',
      },
      { type: 'heading', text: 'What does 755 mean?' },
      {
        type: 'list',
        items: [
          '7 (owner) = read + write + execute → rwx',
          '5 (group) = read + execute → r-x',
          '5 (others) = read + execute → r-x',
          '755 in symbolic form = rwxr-xr-x',
        ],
      },
      { type: 'heading', text: 'Common permission values' },
      {
        type: 'list',
        items: [
          '644 — rw-r--r-- (files: owner read/write, others read)',
          '600 — rw------- (private files, e.g. SSH keys)',
          '755 — rwxr-xr-x (executables and directories)',
          '777 — rwxrwxrwx (world-writable — avoid in production)',
        ],
      },
      { type: 'tool-cta', toolId: 'chmod-calculator', label: 'Open the chmod calculator' },
    ],
  },
  'levenshtein-distance-calculator-online': {
    slug: 'levenshtein-distance-calculator-online',
    title: 'Levenshtein Distance Calculator Online',
    description:
      'Calculate edit distance and string similarity between two texts. Free online tool — private, browser-based, no upload required.',
    publishedAt: '2026-03-29',
    keywords: [
      'levenshtein distance calculator online',
      'edit distance calculator',
      'string similarity online',
      'fuzzy match calculator',
    ],
    relatedTools: ['levenshtein-calculator', 'text-diff', 'find-and-replace'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Levenshtein distance counts the minimum number of single-character edits — insertions, deletions, or substitutions — needed to transform one string into another. It powers spell checkers, fuzzy search, deduplication, and plagiarism detection.',
      },
      { type: 'heading', text: 'Example: kitten → sitting' },
      {
        type: 'paragraph',
        text: 'The edit distance between "kitten" and "sitting" is 3: substitute k→s, substitute e→i, append g. A similarity percentage of ~57% reflects how close the two strings are relative to their length.',
      },
      { type: 'heading', text: 'When to use edit distance' },
      {
        type: 'list',
        items: [
          'Matching user input against a list despite typos',
          'Comparing product names or addresses for duplicates',
          'Evaluating OCR or transcription accuracy',
          'Building "did you mean?" search suggestions',
        ],
      },
      { type: 'tool-cta', toolId: 'levenshtein-calculator', label: 'Calculate edit distance' },
    ],
  },
  'base64-encode-decode-online-free': {
    slug: 'base64-encode-decode-online-free',
    title: 'Base64 Encode and Decode Online (Free, Private)',
    description:
      'Encode text to Base64 or decode Base64 strings online — standard and URL-safe modes on one page. Free, instant, and private.',
    publishedAt: '2026-03-30',
    updatedAt: '2026-07-26',
    keywords: [
      'base64 encode decode online free',
      'base64 encoder online',
      'decode base64 string',
      'base64 converter private',
      'url-safe base64',
    ],
    relatedTools: ['base64-encoder', 'base64-decoder', 'jwt-decoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Base64 encoding converts binary or text data into ASCII-safe characters. Developers use it for JWT payloads, data URIs, email attachments, and embedding small files in JSON. It is encoding, not encryption — anyone can decode it.',
      },
      { type: 'heading', text: 'One workbench, two directions' },
      {
        type: 'paragraph',
        text: 'Utillio combines encode and decode on a single page with live output. Switch between standard Base64 (+/ padding) and URL-safe Base64 (-_ no padding) — the mode JWTs use. Round-trip your input to confirm encoding is correct.',
      },
      { type: 'heading', text: 'Common use cases' },
      {
        type: 'list',
        items: [
          'Decode a JWT header or payload for debugging',
          'Encode credentials for HTTP Basic Auth',
          'Create data URIs for inline images in HTML/CSS',
          'Safely embed binary data in JSON APIs',
        ],
      },
      {
        type: 'paragraph',
        text: 'Many online Base64 tools send your input to a server. For tokens, passwords, or proprietary data, use a client-side encoder instead — Utillio processes everything in your browser.',
      },
      { type: 'tool-cta', toolId: 'base64-encoder', label: 'Open Base64 workbench' },
    ],
  },
  'cron-expression-generator-online': {
    slug: 'cron-expression-generator-online',
    title: 'Cron Expression Generator Online (Free)',
    description:
      'Build and validate cron schedules visually with next-run preview. Free online cron workbench — parse, build, and test in your browser.',
    publishedAt: '2026-03-30',
    updatedAt: '2026-07-26',
    keywords: [
      'cron expression generator online',
      'cron schedule builder',
      'crontab generator free',
      'cron syntax helper',
      'cron next run calculator',
    ],
    relatedTools: ['cron-generator', 'cron-parser', 'unix-timestamp-converter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Cron expressions schedule recurring jobs — backups, report generation, cache warming, and CI pipelines. The syntax is compact but easy to get wrong: off-by-one errors in day-of-week fields or mixing up minute and hour positions cause silent failures.',
      },
      { type: 'heading', text: 'Cron field order' },
      {
        type: 'list',
        items: [
          'minute (0–59)',
          'hour (0–23)',
          'day of month (1–31)',
          'month (1–12)',
          'day of week (0–7, 0 and 7 = Sunday)',
        ],
      },
      { type: 'heading', text: 'Parse tab — validate existing crons' },
      {
        type: 'paragraph',
        text: 'Paste any cron expression and see a field-by-field breakdown plus the next 5 scheduled runs. Catch mistakes before they hit production — especially day-of-week vs day-of-month confusion.',
      },
      { type: 'heading', text: 'Build tab — create from presets' },
      {
        type: 'paragraph',
        text: 'Start from presets (every minute, hourly, daily, weekly, monthly) or set each field manually. The expression string updates live and you can copy it straight into crontab, Kubernetes CronJob, or GitHub Actions.',
      },
      { type: 'heading', text: 'Examples' },
      {
        type: 'list',
        items: [
          '0 9 * * 1-5 — weekdays at 9:00 AM',
          '*/15 * * * * — every 15 minutes',
          '0 0 1 * * — first day of every month at midnight',
        ],
      },
      { type: 'tool-cta', toolId: 'cron-generator', label: 'Open Cron workbench' },
    ],
  },
  'qr-code-generator-no-upload': {
    slug: 'qr-code-generator-no-upload',
    title: 'QR Code Generator Online — No Upload Required',
    description:
      'Create QR codes for URLs, WiFi, and text in your browser. Free, instant download — nothing uploaded to a server.',
    publishedAt: '2026-03-31',
    keywords: [
      'qr code generator no upload',
      'qr code generator online free',
      'wifi qr code generator',
      'private qr code maker',
    ],
    relatedTools: ['qr-code-generator', 'url-encoder', 'slug-generator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'QR codes encode URLs, contact cards, WiFi credentials, and plain text into scannable images. Event check-in links, restaurant menus, and product packaging all use them. Generating a QR code should be instant — and for WiFi passwords or internal URLs, it should not require uploading data to a third party.',
      },
      { type: 'heading', text: 'What you can encode' },
      {
        type: 'list',
        items: [
          'Website URLs and deep links',
          'WiFi network name and password (WPA format)',
          'Plain text messages or promo codes',
          'Contact info (vCard format)',
        ],
      },
      { type: 'tool-cta', toolId: 'qr-code-generator', label: 'Generate a QR code' },
    ],
  },
  'hmac-sha256-generator-online': {
    slug: 'hmac-sha256-generator-online',
    title: 'HMAC SHA-256 Generator Online (Free, Private)',
    description:
      'Generate HMAC-SHA256 signatures in the Hash/HMAC workbench. SHA-384 and SHA-512 included — secrets never uploaded.',
    publishedAt: '2026-03-31',
    updatedAt: '2026-07-26',
    keywords: [
      'hmac sha256 generator online',
      'hmac generator free',
      'webhook signature generator',
      'hmac sha256 calculator',
      'hmac workbench',
    ],
    relatedTools: ['hmac-generator', 'hash-generator', 'jwt-decoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'HMAC (Hash-based Message Authentication Code) combines a secret key with a message to produce a signature. APIs like Stripe, Shopify, and GitHub webhooks use HMAC-SHA256 so receivers can verify requests were not tampered with.',
      },
      { type: 'heading', text: 'HMAC tab in the workbench' },
      {
        type: 'list',
        items: [
          'Enter secret key and message — output updates live',
          'Switch between HMAC-SHA256, SHA-384, and SHA-512',
          'Hash tab available on the same page for plain digests',
          'Link to JWT workbench for token verification',
        ],
      },
      { type: 'heading', text: 'Never upload your secret key' },
      {
        type: 'paragraph',
        text: 'Server-side HMAC tools receive your API secret on their servers. Utillio computes HMAC entirely in your browser using the Web Crypto API.',
      },
      { type: 'tool-cta', toolId: 'hmac-generator', label: 'Open Hash/HMAC workbench' },
      { type: 'compare-cta', slug: 'utillio-vs-hash-tools', label: 'Compare Utillio vs online hash tools' },
    ],
  },
  'uuid-generator-v4-online-free': {
    slug: 'uuid-generator-v4-online-free',
    title: 'UUID v4 Generator Online (Free)',
    description:
      'Generate random UUID v4 identifiers instantly. Free, private, and browser-based — no server round-trip.',
    publishedAt: '2026-04-01',
    keywords: [
      'uuid generator v4 online free',
      'uuid v4 generator',
      'random uuid generator',
      'generate uuid online',
    ],
    relatedTools: ['uuid-generator', 'uuid-validator', 'jwt-decoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'UUID v4 identifiers are 128-bit random values used as database primary keys, session IDs, correlation IDs, and file names. RFC 4122 specifies the format: 8-4-4-4-12 hexadecimal digits with version and variant bits set.',
      },
      { type: 'heading', text: 'UUID versions at a glance' },
      {
        type: 'list',
        items: [
          'v4 — random (most common for general-purpose IDs)',
          'v1 — time-based (predictable — avoid for security tokens)',
          'v5 — deterministic hash of namespace + name',
          'v7 — timestamp-ordered (sortable, newer standard)',
        ],
      },
      { type: 'tool-cta', toolId: 'uuid-generator', label: 'Generate UUID v4' },
      { type: 'tool-cta', toolId: 'uuid-validator', label: 'Validate a UUID' },
    ],
  },
  'json-formatter-pretty-print-online-free': {
    slug: 'json-formatter-pretty-print-online-free',
    title: 'JSON Formatter & Pretty Print Online (Free, Private)',
    description:
      'Pretty-print, minify, and validate JSON online with live output, error locations, and structure preview. Runs in your browser.',
    publishedAt: '2026-04-04',
    updatedAt: '2026-07-26',
    keywords: [
      'json formatter pretty print online free',
      'pretty print json online',
      'format json online private',
      'json beautifier free',
      'validate json online',
    ],
    relatedTools: ['json-formatter', 'json-to-yaml', 'csv-to-json'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Raw JSON from APIs is often minified — one long line that is hard to read and debug. Pretty-printing adds indentation so you can inspect nested objects, spot missing commas, and compare payloads before deployment.',
      },
      { type: 'heading', text: 'When to pretty-print JSON' },
      {
        type: 'list',
        items: [
          'Debugging REST or GraphQL API responses',
          'Reviewing config files before commit',
          'Validating JSON syntax before sending to production',
          'Sharing formatted output with teammates via shareable link',
        ],
      },
      { type: 'heading', text: 'What makes Utillio different' },
      {
        type: 'list',
        items: [
          'Live output — no button click required, results update as you paste',
          'Error line and column when JSON is invalid',
          'Structure preview with object/array counts and max depth',
          'Format, Minify, and Validate modes on one page',
          'Share button encodes input in the URL for team handoffs',
        ],
      },
      { type: 'tool-cta', toolId: 'json-formatter', label: 'Format JSON now' },
      { type: 'compare-cta', slug: 'utillio-vs-json-formatter', label: 'Compare Utillio vs JSONFormatter.org' },
    ],
  },
  'password-generator-strong-online-free': {
    slug: 'password-generator-strong-online-free',
    title: 'Strong Password Generator Online (Free, Private)',
    description:
      'Generate secure random passwords locally in your browser. Free, instant, and never uploaded to a server.',
    publishedAt: '2026-04-04',
    keywords: [
      'password generator strong online free',
      'secure password generator',
      'random password generator private',
      'strong password maker',
    ],
    relatedTools: ['password-generator', 'password-strength-checker', 'uuid-generator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Strong passwords use length and character diversity to resist brute-force and dictionary attacks. A good generator produces cryptographically random strings — not predictable patterns.',
      },
      { type: 'heading', text: 'What makes a strong password' },
      {
        type: 'list',
        items: [
          'At least 16 characters for important accounts',
          'Mix of uppercase, lowercase, numbers, and symbols',
          'Unique per site — never reuse passwords',
          'Generated randomly, not based on personal info',
        ],
      },
      { type: 'tool-cta', toolId: 'password-generator', label: 'Generate a password' },
    ],
  },
  'regex-tester-online-javascript-free': {
    slug: 'regex-tester-online-javascript-free',
    title: 'Regex Tester Online (JavaScript, Free)',
    description:
      'Test regular expressions online with live match highlighting. Free JavaScript regex tester — runs locally, no upload.',
    publishedAt: '2026-04-05',
    keywords: [
      'regex tester online javascript free',
      'test regular expression online',
      'javascript regex tester',
      'regex matcher online',
    ],
    relatedTools: ['regex-tester', 'find-and-replace', 'text-diff'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Regular expressions match patterns in text — emails, URLs, log lines, and validation rules. Testing interactively saves time compared to editing code and re-running scripts.',
      },
      { type: 'heading', text: 'Common regex use cases' },
      {
        type: 'list',
        items: [
          'Validate email or phone number formats',
          'Extract data from log files',
          'Find-and-replace with pattern matching',
          'Debug form validation rules before deployment',
        ],
      },
      { type: 'tool-cta', toolId: 'regex-tester', label: 'Test a regex pattern' },
    ],
  },
  'hash-generator-sha256-online-free': {
    slug: 'hash-generator-sha256-online-free',
    title: 'SHA-256 Hash Generator Online (Free, Private)',
    description:
      'Generate SHA-256, SHA-384, and SHA-512 hashes with live output — Hash and HMAC tabs on one page.',
    publishedAt: '2026-04-05',
    updatedAt: '2026-07-26',
    keywords: [
      'sha256 hash generator online free',
      'hash generator online',
      'sha256 calculator private',
      'generate hash browser',
      'hash workbench',
    ],
    relatedTools: ['hash-generator', 'hmac-generator', 'jwt-decoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Cryptographic hashes produce a fixed-length fingerprint of input data. SHA-256 is widely used for checksums and integrity verification — hashing is one-way, not encryption.',
      },
      { type: 'heading', text: 'Hash workbench features' },
      {
        type: 'list',
        items: [
          'Live SHA-256, SHA-384, and SHA-512 as you type',
          'HMAC tab for keyed signatures with a secret',
          'Shareable links with algorithm preserved',
          '100% client-side via Web Crypto API',
        ],
      },
      { type: 'heading', text: 'When to use SHA-256' },
      {
        type: 'list',
        items: [
          'Verify file integrity with checksums',
          'Compare whether two strings produce the same hash',
          'Debug API workflows — use HMAC tab when a secret is involved',
          'Generate deterministic fingerprints from content',
        ],
      },
      { type: 'tool-cta', toolId: 'hash-generator', label: 'Open Hash/HMAC workbench' },
      { type: 'compare-cta', slug: 'utillio-vs-hash-tools', label: 'Compare Utillio vs online hash tools' },
    ],
  },
  'jwt-decoder-online-free': {
    slug: 'jwt-decoder-online-free',
    title: 'JWT Decoder Online (Free, Private)',
    description:
      'Decode, verify, and inspect JSON Web Tokens online — HS256/RS256 support, expiry badges, and claims table. Nothing uploaded.',
    publishedAt: '2026-04-06',
    updatedAt: '2026-07-26',
    keywords: [
      'jwt decoder online free',
      'decode jwt token',
      'jwt parser online',
      'inspect jwt private',
      'jwt verify online',
      'rs256 jwt verify',
    ],
    relatedTools: ['jwt-decoder', 'jwt-generator', 'base64-decoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'JWTs are Base64URL-encoded JSON with three parts: header, payload, and signature. Decoding lets you inspect claims like exp, sub, and roles — essential for debugging auth flows.',
      },
      { type: 'heading', text: 'Decode tab — inspect claims' },
      {
        type: 'list',
        items: [
          'Paste any JWT and see header and payload as formatted JSON',
          'Claims table with standard fields (iss, sub, exp, iat, aud)',
          'Expiry badge — see at a glance if the token is expired or still valid',
          'Copy individual sections or the full decoded output',
        ],
      },
      { type: 'heading', text: 'Verify tab — check signatures' },
      {
        type: 'list',
        items: [
          'HMAC algorithms: HS256, HS384, HS512 with a shared secret',
          'RSA algorithms: RS256, RS384, RS512 with a PEM public key',
          'Instant valid/invalid result — no server round-trip',
        ],
      },
      { type: 'heading', text: 'Important security note' },
      {
        type: 'paragraph',
        text: 'Decoding alone does not verify the signature. Never paste production JWTs into server-side decoders — they may log tokens. Utillio processes everything in your browser.',
      },
      { type: 'tool-cta', toolId: 'jwt-decoder', label: 'Open JWT workbench' },
      { type: 'compare-cta', slug: 'utillio-vs-jwt-io', label: 'Compare Utillio vs jwt.io' },
    ],
  },
  'unix-timestamp-converter-online': {
    slug: 'unix-timestamp-converter-online',
    title: 'Unix Timestamp Converter Online (Free)',
    description:
      'Convert Unix timestamps with relative time ("3 days ago"), local/ISO/UTC formats — live in your browser.',
    publishedAt: '2026-04-06',
    updatedAt: '2026-07-26',
    keywords: [
      'unix timestamp converter online',
      'epoch converter online free',
      'timestamp to date online',
      'convert unix time',
      'relative timestamp',
    ],
    relatedTools: ['unix-timestamp-converter', 'jwt-decoder', 'timezone-converter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Unix timestamps count seconds (or milliseconds) since January 1, 1970 UTC. APIs, databases, and JWT exp claims use them — converting to human time makes debugging much easier.',
      },
      { type: 'heading', text: 'Timestamp workbench tabs' },
      {
        type: 'list',
        items: [
          'Timestamp → Date — relative badge plus local, ISO, and UTC',
          'Date → Timestamp — seconds and milliseconds output',
          'Auto-detect 10-digit seconds vs 13-digit milliseconds',
          'Use current time with one click',
        ],
      },
      { type: 'tool-cta', toolId: 'unix-timestamp-converter', label: 'Open Timestamp workbench' },
    ],
  },
  'markdown-to-html-converter-online-free': {
    slug: 'markdown-to-html-converter-online-free',
    title: 'Markdown to HTML Converter Online (Free)',
    description:
      'Convert Markdown to HTML with live preview — same workbench includes HTML → Markdown round-trip.',
    publishedAt: '2026-04-07',
    updatedAt: '2026-07-26',
    keywords: [
      'markdown to html converter online free',
      'convert markdown html',
      'markdown html generator',
      'md to html online',
      'markdown preview online',
    ],
    relatedTools: ['markdown-to-html', 'markdown-preview', 'html-to-markdown'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Markdown is the standard format for README files, documentation sites, and blog posts. Converting to HTML lets you preview output, embed in CMS systems, or paste into email templates.',
      },
      { type: 'heading', text: 'Markdown workbench tabs' },
      {
        type: 'list',
        items: [
          'Live preview — side-by-side Markdown and rendered HTML',
          'Markdown → HTML — copy raw HTML output',
          'HTML → Markdown — reverse conversion for CMS exports',
          'Round-trip buttons to send output to the other tab',
        ],
      },
      { type: 'tool-cta', toolId: 'markdown-to-html', label: 'Open Markdown workbench' },
    ],
  },
  'csv-to-json-converter-online-free': {
    slug: 'csv-to-json-converter-online-free',
    title: 'CSV to JSON Converter Online (Free, Private)',
    description:
      'Convert CSV to JSON arrays with row counts and round-trip — CSV ↔ JSON workbench, nothing uploaded.',
    publishedAt: '2026-04-07',
    updatedAt: '2026-07-26',
    keywords: [
      'csv to json converter online free',
      'convert csv json online',
      'csv json converter private',
      'spreadsheet to json',
      'csv json workbench',
    ],
    relatedTools: ['csv-to-json', 'json-to-csv', 'json-formatter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'CSV is universal for spreadsheets and exports; JSON is standard for APIs and JavaScript apps. Converting between them is a daily task for data engineers and frontend developers.',
      },
      { type: 'heading', text: 'CSV ↔ JSON workbench' },
      {
        type: 'list',
        items: [
          'CSV → JSON and JSON → CSV tabs on one page',
          'Live output with row count badge',
          'Swap output to the reverse tab for round-trip checks',
          'First row treated as column headers',
          'Shareable links — spreadsheet data stays in your browser',
        ],
      },
      { type: 'tool-cta', toolId: 'csv-to-json', label: 'Open CSV ↔ JSON workbench' },
    ],
  },
  'url-encode-decode-online-free': {
    slug: 'url-encode-decode-online-free',
    title: 'URL Encode, Decode & Parse Online (Free, Private)',
    description:
      'Encode and decode URL strings, parse query parameters, and inspect URL components — all on one page, nothing uploaded.',
    publishedAt: '2026-04-08',
    updatedAt: '2026-07-26',
    keywords: [
      'url encode decode online free',
      'url encoder online',
      'decode url online',
      'percent encoding online',
      'url parser online',
      'query string parser',
    ],
    relatedTools: ['url-encoder', 'url-decoder', 'url-parser'],
    blocks: [
      {
        type: 'paragraph',
        text: 'URL encoding (percent-encoding) converts special characters like spaces and ampersands into safe ASCII for query strings and path segments. Essential when building API requests or debugging broken links.',
      },
      { type: 'heading', text: 'Encode and Decode tabs' },
      {
        type: 'list',
        items: [
          'Component mode — encode/decode individual values (spaces → %20)',
          'Full URL mode — encode or decode an entire URL string',
          'Form mode — application/x-www-form-urlencoded (spaces → +)',
          'Live output updates as you type',
        ],
      },
      { type: 'heading', text: 'Parse tab — break down any URL' },
      {
        type: 'list',
        items: [
          'Protocol, host, port, pathname, hash extracted automatically',
          'Query parameters table with decoded name/value pairs',
          'Debug redirect chains and OAuth callback URLs',
        ],
      },
      { type: 'heading', text: 'Common encoded characters' },
      {
        type: 'list',
        items: ['Space → %20 (or + in form encoding)', 'Ampersand & → %26', 'Equals = → %3D', 'Plus + → %2B'],
      },
      { type: 'tool-cta', toolId: 'url-encoder', label: 'Open URL workbench' },
    ],
  },
  'text-diff-compare-online-free': {
    slug: 'text-diff-compare-online-free',
    title: 'Text Diff Compare Online (Free, Private)',
    description:
      'Compare two texts side-by-side and highlight differences. Free online diff tool — runs locally, no upload.',
    publishedAt: '2026-04-08',
    keywords: [
      'text diff compare online free',
      'compare text online',
      'text difference checker',
      'diff tool online private',
    ],
    relatedTools: ['text-diff', 'find-and-replace', 'levenshtein-calculator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Text diff tools highlight insertions, deletions, and changes between two versions of code, config, or prose. Faster than reading both files line by line.',
      },
      { type: 'heading', text: 'When to use a diff tool' },
      {
        type: 'list',
        items: [
          'Compare config file versions before deploy',
          'Review copy changes in documentation',
          'Debug unexpected API response differences',
          'Check plagiarism or duplicate content',
        ],
      },
      { type: 'tool-cta', toolId: 'text-diff', label: 'Compare two texts' },
    ],
  },
  'sql-formatter-pretty-print-online-free': {
    slug: 'sql-formatter-pretty-print-online-free',
    title: 'SQL Formatter & Pretty Print Online (Free, Private)',
    description:
      'Format and beautify SQL queries online for free. Runs in your browser — no upload, no sign-up.',
    publishedAt: '2026-04-09',
    keywords: [
      'sql formatter pretty print online free',
      'format sql online',
      'sql beautifier private',
      'pretty print sql query',
    ],
    relatedTools: ['sql-formatter', 'json-formatter', 'csv-to-json'],
    blocks: [
      {
        type: 'paragraph',
        text: 'SQL from ORMs, log dumps, and legacy scripts often arrives as one unreadable line. Pretty-printing adds indentation and line breaks so you can review joins, spot missing WHERE clauses, and share queries with teammates.',
      },
      { type: 'heading', text: 'When to format SQL' },
      {
        type: 'list',
        items: [
          'Reviewing queries before running on production',
          'Debugging ORM-generated SQL in development',
          'Documenting queries in README or wiki pages',
          'Comparing two query versions side by side',
        ],
      },
      { type: 'tool-cta', toolId: 'sql-formatter', label: 'Format SQL now' },
    ],
  },
  'qr-code-generator-no-upload-online': {
    slug: 'qr-code-generator-no-upload-online',
    title: 'QR Code Generator Online — No Upload Required',
    description:
      'Create QR codes for URLs, WiFi, and text in your browser. Free, instant, nothing sent to a server.',
    publishedAt: '2026-04-09',
    keywords: [
      'qr code generator no upload online',
      'qr code maker free private',
      'wifi qr code generator',
      'generate qr code browser',
    ],
    relatedTools: ['qr-code-generator', 'url-encoder', 'slug-generator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'QR codes turn URLs, WiFi credentials, and contact info into scannable images. For internal URLs or WiFi passwords, server-side generators are a privacy risk — your data passes through someone else\'s infrastructure.',
      },
      { type: 'heading', text: 'What you can encode' },
      {
        type: 'list',
        items: [
          'Website and app deep links',
          'WiFi SSID and password (WPA format)',
          'Plain text promo codes or event check-in links',
          'vCard contact details for business cards',
        ],
      },
      { type: 'tool-cta', toolId: 'qr-code-generator', label: 'Generate a QR code' },
    ],
  },
  'timezone-converter-online-free': {
    slug: 'timezone-converter-online-free',
    title: 'Timezone Converter Online (Free)',
    description:
      'Convert date and time between world timezones instantly. Free browser-based tool — no upload required.',
    publishedAt: '2026-04-10',
    keywords: [
      'timezone converter online free',
      'convert time zones online',
      'world clock converter',
      'utc time converter online',
    ],
    relatedTools: ['timezone-converter', 'unix-timestamp-converter', 'date-difference-calculator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Remote teams schedule meetings across UTC, US, Europe, and Asia. A timezone converter prevents the classic "is that 9 AM your time or mine?" mistake — especially around daylight saving transitions.',
      },
      { type: 'heading', text: 'Common use cases' },
      {
        type: 'list',
        items: [
          'Scheduling calls across distributed teams',
          'Converting log timestamps to local time',
          'Planning deployment windows in UTC vs local',
          'Checking market hours for global trading apps',
        ],
      },
      { type: 'tool-cta', toolId: 'timezone-converter', label: 'Convert a timezone' },
    ],
  },
  'gst-calculator-online-free-india': {
    slug: 'gst-calculator-online-free-india',
    title: 'GST Calculator Online Free (India)',
    description:
      'Calculate GST inclusive and exclusive amounts for invoicing. Free online calculator — runs locally in your browser.',
    publishedAt: '2026-04-10',
    keywords: [
      'gst calculator online free india',
      'calculate gst online',
      'gst inclusive exclusive calculator',
      'goods and services tax calculator',
    ],
    relatedTools: ['gst-calculator', 'vat-calculator', 'discount-calculator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'GST (Goods and Services Tax) in India applies at rates like 5%, 12%, 18%, and 28% depending on the product or service category. Invoices must show tax breakdown clearly for compliance.',
      },
      { type: 'heading', text: 'Inclusive vs exclusive GST' },
      {
        type: 'list',
        items: [
          'Exclusive: GST added on top of base price',
          'Inclusive: GST already embedded in the listed price',
          'Use exclusive when quoting B2B before tax',
          'Use inclusive for consumer-facing retail prices',
        ],
      },
      { type: 'tool-cta', toolId: 'gst-calculator', label: 'Calculate GST' },
    ],
  },
  'vat-calculator-online-free': {
    slug: 'vat-calculator-online-free',
    title: 'VAT Calculator Online (Free, Private)',
    description:
      'Calculate Value Added Tax for invoices and receipts. Free browser-based VAT calculator — no data uploaded.',
    publishedAt: '2026-04-11',
    keywords: [
      'vat calculator online free',
      'value added tax calculator',
      'vat inclusive calculator',
      'calculate vat online',
    ],
    relatedTools: ['vat-calculator', 'gst-calculator', 'margin-calculator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'VAT is used across the EU, UK, and many other regions for invoicing. Calculating net, tax, and gross amounts correctly prevents accounting errors and customer disputes.',
      },
      { type: 'heading', text: 'Typical VAT rates' },
      {
        type: 'list',
        items: ['Standard rates vary by country (e.g. 20% UK, 19% Germany)', 'Reduced rates apply to food, books, and essentials in some regions', 'Always verify current rate for your jurisdiction', 'B2B reverse charge rules may apply cross-border'],
      },
      { type: 'tool-cta', toolId: 'vat-calculator', label: 'Calculate VAT' },
    ],
  },
  'cidr-calculator-subnet-online-free': {
    slug: 'cidr-calculator-subnet-online-free',
    title: 'CIDR Calculator & Subnet Mask Online (Free)',
    description:
      'Calculate subnet ranges, network addresses, and host counts from CIDR notation. Free, browser-based networking tool.',
    publishedAt: '2026-04-11',
    keywords: [
      'cidr calculator subnet online free',
      'subnet calculator cidr',
      'ip subnet calculator online',
      'network cidr calculator',
    ],
    relatedTools: ['cidr-calculator', 'ip-converter', 'mac-address-generator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'CIDR notation (e.g. 192.168.1.0/24) defines IP address ranges for cloud VPCs, office networks, and Docker containers. A calculator saves manual binary math when planning subnets.',
      },
      { type: 'heading', text: 'What CIDR tells you' },
      {
        type: 'list',
        items: [
          'Network address and broadcast address',
          'First and last usable host IPs',
          'Total number of host addresses',
          'Subnet mask in dotted decimal form',
        ],
      },
      { type: 'tool-cta', toolId: 'cidr-calculator', label: 'Calculate a subnet' },
    ],
  },
  'meta-tag-generator-seo-online-free': {
    slug: 'meta-tag-generator-seo-online-free',
    title: 'Meta Tag Generator for SEO Online (Free)',
    description:
      'Generate title, description, Open Graph, and Twitter Card meta tags for your website. Free, private, browser-based.',
    publishedAt: '2026-04-12',
    keywords: [
      'meta tag generator seo online free',
      'open graph tag generator',
      'twitter card generator',
      'seo meta tags generator',
    ],
    relatedTools: ['meta-tag-generator', 'slug-generator', 'reading-time-calculator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Meta tags control how your page appears in Google search results and when shared on social media. Missing or duplicate tags hurt click-through rates and social previews.',
      },
      { type: 'heading', text: 'Essential tags to generate' },
      {
        type: 'list',
        items: ['title — shown in browser tab and search results', 'meta description — search snippet text', 'og:title, og:description, og:image — Facebook/LinkedIn previews', 'twitter:card and twitter:image — X/Twitter previews'],
      },
      { type: 'tool-cta', toolId: 'meta-tag-generator', label: 'Generate meta tags' },
    ],
  },
  'password-strength-checker-online-free': {
    slug: 'password-strength-checker-online-free',
    title: 'Password Strength Checker Online (Free, Private)',
    description:
      'Check password strength with a visual score and feedback. Runs locally — your password never leaves your browser.',
    publishedAt: '2026-04-12',
    keywords: [
      'password strength checker online free',
      'check password strength',
      'password meter online private',
      'how strong is my password',
    ],
    relatedTools: ['password-strength-checker', 'password-generator', 'hash-generator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Weak passwords are the top cause of account breaches. A strength checker evaluates length, character diversity, and common patterns — but only trust tools that process locally when testing real passwords.',
      },
      { type: 'heading', text: 'What makes a password strong' },
      {
        type: 'list',
        items: ['16+ characters for important accounts', 'Mix of upper, lower, numbers, and symbols', 'Not based on dictionary words or personal info', 'Unique per site — never reused'],
      },
      { type: 'tool-cta', toolId: 'password-strength-checker', label: 'Check password strength' },
    ],
  },
  'xml-formatter-pretty-print-online-free': {
    slug: 'xml-formatter-pretty-print-online-free',
    title: 'XML Formatter & Pretty Print Online (Free)',
    description:
      'Format XML with indentation in the Web Formatter workbench — HTML, CSS, JS, and XML on one page.',
    publishedAt: '2026-04-13',
    updatedAt: '2026-07-26',
    keywords: [
      'xml formatter pretty print online free',
      'format xml online',
      'xml beautifier private',
      'pretty print xml online',
      'web formatter workbench',
    ],
    relatedTools: ['xml-formatter', 'html-beautifier', 'css-minifier'],
    blocks: [
      {
        type: 'paragraph',
        text: 'XML remains common in enterprise APIs, SOAP services, Android layouts, and config files. Minified XML from logs is hard to read — formatting reveals structure and helps catch mismatched tags.',
      },
      { type: 'heading', text: 'XML tab in Web Formatter' },
      {
        type: 'list',
        items: [
          'Pretty-print with consistent indentation',
          'Same workbench includes HTML beautify, CSS minify, and JS minify',
          'Live output as you type',
          'Shareable links for team debugging',
        ],
      },
      { type: 'tool-cta', toolId: 'xml-formatter', label: 'Open Web Formatter workbench' },
    ],
  },
  'hex-encoder-decoder-online-free': {
    slug: 'hex-encoder-decoder-online-free',
    title: 'Hex Encoder & Decoder Online (Free, Private)',
    description:
      'Convert text to hex and back with round-trip — encode/decode tabs on one page, live output.',
    publishedAt: '2026-04-13',
    updatedAt: '2026-07-26',
    keywords: [
      'hex encoder decoder online free',
      'text to hex online',
      'hexadecimal converter private',
      'decode hex string online',
      'hex workbench',
    ],
    relatedTools: ['hex-encoder', 'hex-decoder', 'binary-converter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Hexadecimal encoding represents bytes as pairs of 0-9 and A-F characters. Developers use it for color codes, binary dumps, cryptographic keys, and debugging raw data streams.',
      },
      { type: 'heading', text: 'Hex workbench features' },
      {
        type: 'list',
        items: [
          'Text → Hex and Hex → Text tabs with live output',
          'Round-trip button to send output to the other tab',
          'Dedicated SEO URLs for encoder and decoder',
          '100% client-side — nothing uploaded',
        ],
      },
      { type: 'tool-cta', toolId: 'hex-encoder', label: 'Open Hex workbench' },
    ],
  },
  'jwt-generator-online-free': {
    slug: 'jwt-generator-online-free',
    title: 'JWT Generator Online (Free, Private)',
    description:
      'Create and sign JSON Web Tokens locally in your browser. HS256 signing with custom claims — secrets never uploaded.',
    publishedAt: '2026-04-14',
    updatedAt: '2026-07-26',
    keywords: [
      'jwt generator online free',
      'create jwt token online',
      'json web token generator private',
      'sign jwt browser',
      'hs256 jwt generator',
    ],
    relatedTools: ['jwt-generator', 'jwt-decoder', 'hmac-generator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'JWTs carry authenticated claims between services. Generating test tokens for local development requires setting header, payload, and signing secret — but production secrets must never go to server-side generators.',
      },
      { type: 'heading', text: 'Sign tab in the JWT workbench' },
      {
        type: 'list',
        items: [
          'Edit header JSON — set alg (HS256, HS384, HS512) and typ',
          'Edit payload JSON — add sub, exp, roles, and custom claims',
          'Enter a shared secret — processed locally via Web Crypto API',
          'Copy the signed token or switch to Decode/Verify to inspect it',
        ],
      },
      { type: 'heading', text: 'JWT structure' },
      {
        type: 'list',
        items: ['Header — algorithm and token type', 'Payload — claims like sub, exp, and roles', 'Signature — verifies integrity with a shared secret or key'],
      },
      { type: 'tool-cta', toolId: 'jwt-generator', label: 'Sign a JWT' },
      { type: 'tool-cta', toolId: 'jwt-decoder', label: 'Decode and verify tokens' },
      { type: 'compare-cta', slug: 'utillio-vs-jwt-io', label: 'Compare Utillio vs jwt.io' },
    ],
  },
  'compound-interest-calculator-online-free': {
    slug: 'compound-interest-calculator-online-free',
    title: 'Compound Interest Calculator Online (Free)',
    description:
      'Calculate compound interest and future value for savings and investments. Free, private, browser-based calculator.',
    publishedAt: '2026-04-14',
    keywords: [
      'compound interest calculator online free',
      'calculate compound interest',
      'investment calculator online',
      'future value calculator',
    ],
    relatedTools: ['compound-interest-calculator', 'sip-calculator', 'simple-interest-calculator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Compound interest earns returns on both principal and accumulated interest — the foundation of long-term investing. Understanding the formula helps compare savings accounts, FDs, and mutual fund projections.',
      },
      { type: 'heading', text: 'Key variables' },
      {
        type: 'list',
        items: ['Principal — initial amount invested', 'Rate — annual interest percentage', 'Time — number of years or months', 'Compounding frequency — monthly vs yearly makes a big difference'],
      },
      { type: 'tool-cta', toolId: 'compound-interest-calculator', label: 'Calculate compound interest' },
    ],
  },
  'css-minifier-online-free': {
    slug: 'css-minifier-online-free',
    title: 'CSS Minifier Online (Free, Private)',
    description:
      'Minify CSS by removing whitespace and comments online. Free browser-based minifier — your stylesheets never uploaded.',
    publishedAt: '2026-04-15',
    keywords: [
      'css minifier online free',
      'minify css online',
      'compress css private',
      'css minify tool browser',
    ],
    relatedTools: ['css-minifier', 'javascript-minifier', 'html-beautifier'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Minified CSS removes unnecessary whitespace and comments to reduce file size for production. Smaller stylesheets mean faster page loads — especially on mobile networks.',
      },
      { type: 'heading', text: 'When to minify CSS' },
      {
        type: 'list',
        items: ['Before deploying to production', 'Embedding critical CSS inline', 'Reducing bundle size for static sites', 'Pair with beautifier for development formatting'],
      },
      { type: 'tool-cta', toolId: 'css-minifier', label: 'Minify CSS now' },
    ],
  },
  'emi-calculator-home-loan-online-free': {
    slug: 'emi-calculator-home-loan-online-free',
    title: 'EMI Calculator for Home Loan Online (Free)',
    description:
      'Calculate monthly EMI for home, car, and personal loans. Free online calculator — runs locally, no data shared.',
    publishedAt: '2026-04-15',
    keywords: [
      'emi calculator home loan online free',
      'loan emi calculator online',
      'monthly emi calculator india',
      'calculate emi online private',
    ],
    relatedTools: ['emi-calculator', 'sip-calculator', 'compound-interest-calculator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'EMI (Equated Monthly Installment) is the fixed payment you make on a loan each month. It depends on principal, annual interest rate, and tenure — adjusting any variable changes your monthly burden significantly.',
      },
      { type: 'heading', text: 'What the calculator shows' },
      {
        type: 'list',
        items: ['Monthly EMI amount', 'Total interest payable over tenure', 'Total amount paid (principal + interest)', 'Compare tenures to find affordable monthly payments'],
      },
      { type: 'tool-cta', toolId: 'emi-calculator', label: 'Calculate EMI' },
    ],
  },
  'html-beautifier-online-free': {
    slug: 'html-beautifier-online-free',
    title: 'HTML Beautifier Online (Free, Private)',
    description:
      'Beautify HTML with indentation in the Web Formatter workbench — CSS/JS minify and XML format on one page.',
    publishedAt: '2026-04-16',
    updatedAt: '2026-07-26',
    keywords: [
      'html beautifier online free',
      'format html online',
      'pretty print html private',
      'html formatter browser',
      'web formatter workbench',
    ],
    relatedTools: ['html-beautifier', 'css-minifier', 'xml-formatter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Minified or messy HTML from templates, CMS exports, or email clients is hard to debug. Beautifying adds readable indentation so you can spot unclosed tags, nested structure issues, and accessibility problems before shipping.',
      },
      { type: 'heading', text: 'Web Formatter workbench tabs' },
      {
        type: 'list',
        items: [
          'HTML — beautify with consistent indentation',
          'CSS and JavaScript — minify with bytes-saved badge',
          'XML — pretty-print for SOAP, RSS, and config files',
          'Shareable state across all four tabs',
        ],
      },
      { type: 'tool-cta', toolId: 'html-beautifier', label: 'Open Web Formatter workbench' },
    ],
  },
  'lorem-ipsum-generator-online-free': {
    slug: 'lorem-ipsum-generator-online-free',
    title: 'Lorem Ipsum Generator Online (Free)',
    description:
      'Generate placeholder Lorem Ipsum text for mockups and prototypes. Free, instant, runs in your browser.',
    publishedAt: '2026-04-16',
    keywords: [
      'lorem ipsum generator online free',
      'placeholder text generator',
      'dummy text for design mockups',
      'lorem ipsum paragraphs online',
    ],
    relatedTools: ['lorem-ipsum-generator', 'markdown-preview', 'html-beautifier'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Lorem Ipsum is standard filler text for wireframes, landing page mockups, and design reviews. It looks like readable prose without distracting stakeholders with real copy before content is ready.',
      },
      { type: 'heading', text: 'How much placeholder text do you need?' },
      {
        type: 'list',
        items: [
          'A few words for button or nav labels',
          'One paragraph for card or hero sections',
          'Multiple paragraphs for blog or article layouts',
          'Adjust length to match your component grid',
        ],
      },
      { type: 'tool-cta', toolId: 'lorem-ipsum-generator', label: 'Generate Lorem Ipsum' },
    ],
  },
  'json-to-csv-converter-online-free': {
    slug: 'json-to-csv-converter-online-free',
    title: 'JSON to CSV Converter Online (Free, Private)',
    description:
      'Export JSON arrays to CSV with live row counts — same workbench handles CSV → JSON round-trip.',
    publishedAt: '2026-04-16',
    updatedAt: '2026-07-26',
    keywords: [
      'json to csv converter online free',
      'convert json array to csv',
      'json csv export private',
      'json spreadsheet converter browser',
      'csv json workbench',
    ],
    relatedTools: ['json-to-csv', 'csv-to-json', 'json-formatter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'API responses and database exports often arrive as JSON arrays of objects. Spreadsheets, BI tools, and finance teams expect CSV. Converting locally avoids uploading sensitive customer or financial data to third-party converters.',
      },
      { type: 'heading', text: 'JSON → CSV tab' },
      {
        type: 'list',
        items: [
          'Paste a JSON array of objects — headers derived from keys',
          'Row count shown after conversion',
          'Swap to CSV → JSON tab to verify round-trip',
          'Shareable state for team debugging',
        ],
      },
      { type: 'tool-cta', toolId: 'json-to-csv', label: 'Open CSV ↔ JSON workbench' },
    ],
  },
  'color-converter-hex-rgb-online-free': {
    slug: 'color-converter-hex-rgb-online-free',
    title: 'Color Converter: Hex to RGB Online (Free)',
    description:
      'Convert colors between HEX, RGB, and HSL online. Free color converter — instant results in your browser.',
    publishedAt: '2026-04-16',
    keywords: [
      'hex to rgb converter online free',
      'color converter hex rgb hsl',
      'convert hex color online',
      'css color converter private',
    ],
    relatedTools: ['color-converter', 'css-minifier', 'html-beautifier'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Designers work in HEX (#3B82F6) while some APIs and graphics libraries expect RGB or HSL. A quick converter saves manual math and prevents off-by-one channel errors in production CSS.',
      },
      { type: 'heading', text: 'Common color formats' },
      {
        type: 'list',
        items: [
          'HEX — six-digit web standard (#RRGGBB)',
          'RGB — red, green, blue channels (0–255)',
          'HSL — hue, saturation, lightness for theming',
          'Use the same format across your design system tokens',
        ],
      },
      { type: 'tool-cta', toolId: 'color-converter', label: 'Convert colors' },
    ],
  },
  'share-tool-links-guide': {
    slug: 'share-tool-links-guide',
    title: 'How to Share Utillio Tool Links With Preserved Input',
    description:
      'Share JSON, JWT, regex patterns, workbench state, and more via URL — input is encoded in the link and restored when opened. Nothing stored on our servers.',
    publishedAt: '2026-04-16',
    updatedAt: '2026-07-26',
    keywords: [
      'share json formatter link',
      'shareable tool url with input',
      'private online tools share state',
      'utillio share link',
      'share jwt decoder link',
    ],
    relatedTools: ['json-formatter', 'jwt-decoder', 'regex-tester', 'text-diff', 'base64-encoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Many Utillio tools encode your input in the URL query string so you can bookmark, Slack, or email a link that reopens with the same content. Processing still happens entirely in your browser — we never store shared input on a server.',
      },
      { type: 'heading', text: 'How sharing works' },
      {
        type: 'list',
        items: [
          'Click Share on any supported tool — the button activates once you have input',
          'The URL gets a ?q= parameter with compressed, URL-safe encoded state',
          'Opening the link restores input, tab selection, and settings',
          'Share is disabled on empty tools to avoid useless links',
        ],
      },
      { type: 'heading', text: 'Workbenches with shareable state' },
      {
        type: 'list',
        items: [
          'JWT — token, tab, secret/key, algorithm',
          'Base64 — input, direction, URL-safe mode',
          'URL — input, tab, encoding mode',
          'Cron — expression, tab, field values',
          'Hash/HMAC — input, tab, algorithm, secret',
          'YAML ↔ JSON — input, direction',
          'Timestamp — value, tab, format',
          'HTML, Hex, Binary, ASCII — input, tab',
          'CSV ↔ JSON — input, direction',
          'Markdown — tab, markdown/HTML input',
          'Morse, ROT13, IP, Web Formatter — full state preserved',
        ],
      },
      { type: 'heading', text: 'Other shareable tools' },
      {
        type: 'list',
        items: [
          'JSON Formatter, YAML↔JSON, CSV↔JSON, JSON string escaper',
          'Hash Generator, HMAC Generator, Regex Tester, Text Diff',
          'SQL/XML/HTML formatters, Hex/Binary/ASCII converters',
          'Unix timestamp, case converter, slug generator, and 40+ more',
        ],
      },
      { type: 'heading', text: 'Privacy note' },
      {
        type: 'paragraph',
        text: 'Shared links contain your input in the URL. Anyone with the link can read it. Do not share production secrets, API keys, or personal data — use test tokens and redacted samples instead.',
      },
      { type: 'tool-cta', toolId: 'json-formatter', label: 'Try shareable JSON Formatter' },
    ],
  },
  'jwt-verify-online-free': {
    slug: 'jwt-verify-online-free',
    title: 'JWT Verify Online (Free, Private) — HS256 & RS256',
    description:
      'Verify JWT signatures online with HMAC secrets or RSA public keys. Free browser-based verification — no token upload.',
    publishedAt: '2026-07-26',
    keywords: [
      'jwt verify online free',
      'verify jwt signature',
      'rs256 jwt verify online',
      'hs256 jwt verify',
      'jwt signature checker',
    ],
    relatedTools: ['jwt-decoder', 'jwt-generator', 'hmac-generator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Verifying a JWT proves the token was signed by someone who holds the secret or private key — not just that the payload looks valid. This is the step most decoders skip, and the one that matters for security.',
      },
      { type: 'heading', text: 'HMAC verification (HS256, HS384, HS512)' },
      {
        type: 'paragraph',
        text: 'Symmetric algorithms use a shared secret. Paste the JWT and enter the same secret your server uses. Utillio recomputes the signature locally and shows valid or invalid instantly.',
      },
      { type: 'heading', text: 'RSA verification (RS256, RS384, RS512)' },
      {
        type: 'paragraph',
        text: 'Asymmetric algorithms use a public key to verify tokens signed with a private key. Paste your PEM public key — the format Auth0, Firebase, and most OIDC providers publish in their JWKS endpoint.',
      },
      { type: 'heading', text: 'When to verify vs decode' },
      {
        type: 'list',
        items: [
          'Decode only — quick inspection of claims during development',
          'Verify — confirm a token is authentic before trusting its claims',
          'Always verify on your server in production — browser tools are for debugging',
        ],
      },
      { type: 'tool-cta', toolId: 'jwt-decoder', label: 'Verify a JWT now' },
      { type: 'compare-cta', slug: 'utillio-vs-jwt-io', label: 'Compare Utillio vs jwt.io' },
    ],
  },
  'url-parser-online-free': {
    slug: 'url-parser-online-free',
    title: 'URL Parser Online (Free) — Query Params & Components',
    description:
      'Parse any URL into protocol, host, path, hash, and query parameters. Free browser-based URL parser with decoded values.',
    publishedAt: '2026-07-26',
    keywords: [
      'url parser online free',
      'parse url query string',
      'url component breakdown',
      'query parameter decoder',
      'url inspector online',
    ],
    relatedTools: ['url-parser', 'url-encoder', 'url-decoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'URLs carry structure — protocol, host, port, path, query string, and fragment. Parsing them manually is error-prone, especially with encoded query parameters in OAuth callbacks, analytics tags, and API endpoints.',
      },
      { type: 'heading', text: 'What the Parse tab shows' },
      {
        type: 'list',
        items: [
          'Protocol (https), hostname, port, pathname, and hash fragment',
          'Query parameters table with decoded names and values',
          'Handles nested encoding (%2520 → space after double-decode)',
        ],
      },
      { type: 'heading', text: 'Common debugging scenarios' },
      {
        type: 'list',
        items: [
          'OAuth redirect URIs with state and code parameters',
          'UTM tracking links with multiple query params',
          'API endpoints with encoded filter values',
          'Broken links where encoding was applied twice',
        ],
      },
      { type: 'paragraph', text: 'The URL workbench also includes Encode and Decode tabs with component, full URL, and form encoding modes — all shareable via link.' },
      { type: 'tool-cta', toolId: 'url-parser', label: 'Parse a URL now' },
    ],
  },
  'markdown-preview-online-free': {
    slug: 'markdown-preview-online-free',
    title: 'Markdown Preview Online (Free, Private)',
    description:
      'Preview Markdown with live rendered HTML — convert to HTML or reverse from HTML on the same workbench.',
    publishedAt: '2026-07-26',
    updatedAt: '2026-07-26',
    keywords: [
      'markdown preview online free',
      'live markdown preview',
      'markdown renderer browser',
      'preview markdown private',
      'markdown workbench',
    ],
    relatedTools: ['markdown-preview', 'markdown-to-html', 'html-to-markdown'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Writing Markdown for READMEs, docs, or blog drafts is faster when you see rendered output instantly. A live preview catches formatting mistakes — broken links, missing code fences, heading hierarchy — before you commit or publish.',
      },
      { type: 'heading', text: 'Markdown workbench tabs' },
      {
        type: 'list',
        items: [
          'Live preview — side-by-side editor and rendered HTML',
          'Markdown → HTML — copy raw HTML for CMS or email',
          'HTML → Markdown — convert exported HTML back to Markdown',
          'Round-trip buttons between tabs',
          'Shareable links preserve tab and content',
        ],
      },
      { type: 'tool-cta', toolId: 'markdown-preview', label: 'Open Markdown workbench' },
    ],
  },
  'binary-converter-online-free': {
    slug: 'binary-converter-online-free',
    title: 'Binary Converter Online (Free, Private)',
    description:
      'Convert text to binary and back with byte/bit counts — encode/decode tabs with round-trip on one page.',
    publishedAt: '2026-07-26',
    updatedAt: '2026-07-26',
    keywords: [
      'binary converter online free',
      'text to binary online',
      'binary to text decoder',
      'binary encoder private',
      'binary workbench',
    ],
    relatedTools: ['binary-converter', 'binary-decoder', 'hex-encoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Binary representation shows each character as an 8-bit sequence of 0s and 1s. It is useful for learning encoding, debugging low-level protocols, and teaching how computers store text.',
      },
      { type: 'heading', text: 'Binary workbench features' },
      {
        type: 'list',
        items: [
          'Text → Binary and Binary → Text tabs',
          'Byte and bit count badge on output',
          'Space-separated 8-bit groups for readability',
          'Round-trip button to verify encode/decode',
          'Dedicated encoder and decoder SEO URLs',
        ],
      },
      { type: 'tool-cta', toolId: 'binary-converter', label: 'Open Binary workbench' },
    ],
  },
  'web-formatter-online-free': {
    slug: 'web-formatter-online-free',
    title: 'Web Formatter Online (Free) — HTML, CSS, JS & XML',
    description:
      'Beautify HTML, minify CSS/JS, and format XML on one workbench — live output with bytes saved.',
    publishedAt: '2026-07-26',
    updatedAt: '2026-07-26',
    keywords: [
      'web formatter online free',
      'html beautifier css minifier',
      'javascript minifier online private',
      'xml formatter workbench',
      'format html css js online',
    ],
    relatedTools: ['html-beautifier', 'css-minifier', 'javascript-minifier', 'xml-formatter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Frontend developers constantly switch between beautifying HTML for debugging and minifying CSS/JS for production. Utillio combines all four formatters on one page so you do not juggle separate tools.',
      },
      { type: 'heading', text: 'Four tabs, one workbench' },
      {
        type: 'list',
        items: [
          'HTML — beautify with readable indentation',
          'CSS — minify with bytes-saved percentage',
          'JavaScript — minify for production bundles',
          'XML — pretty-print SOAP, RSS, and config files',
          'Shareable links preserve tab and input',
        ],
      },
      { type: 'tool-cta', toolId: 'html-beautifier', label: 'Open Web Formatter workbench' },
    ],
  },
}

export function getWorkbenchGuides(): Guide[] {
  return WORKBENCH_GUIDE_SLUGS.map((slug) => guides[slug]).filter(Boolean)
}

export function getFeaturedGuides(): Guide[] {
  return FEATURED_GUIDE_SLUGS.map((slug) => guides[slug]).filter(Boolean)
}

export function getAllGuides(): Guide[] {
  return Object.values(guides)
}

export function getGuideSlugs(): string[] {
  return Object.keys(guides)
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides[slug]
}

export function getGuidesForTool(toolId: string, limit = 3): Guide[] {
  return getAllGuides()
    .filter((guide) => guide.relatedTools.includes(toolId))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}
