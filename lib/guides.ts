export type GuideBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'tool-cta'; toolId: string; label: string }

export interface Guide {
  slug: string
  title: string
  description: string
  publishedAt: string
  keywords: string[]
  relatedTools: string[]
  blocks: GuideBlock[]
}

export const guides: Record<string, Guide> = {
  'what-is-base64': {
    slug: 'what-is-base64',
    title: 'What Is Base64 Encoding?',
    description:
      'Learn what Base64 encoding is, why developers use it, and how to encode or decode Base64 strings online.',
    publishedAt: '2026-02-10',
    keywords: ['base64', 'encoding', 'what is base64', 'base64 explained'],
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
      { type: 'heading', text: 'Example' },
      {
        type: 'paragraph',
        text: 'The string "Hello World" encodes to "SGVsbG8gV29ybGQ=". You can verify this instantly using our free Base64 encoder — no data leaves your browser.',
      },
      { type: 'tool-cta', toolId: 'base64-encoder', label: 'Try the Base64 Encoder' },
      { type: 'heading', text: 'Base64 vs other encodings' },
      {
        type: 'paragraph',
        text: 'Base64 is not encryption — it is encoding. Anyone can decode it. For URL-safe contexts, use URL encoding instead. For cryptographic hashing, use a hash generator. Base64 is specifically for representing binary data as ASCII text.',
      },
      { type: 'tool-cta', toolId: 'hash-generator', label: 'Try the Hash Generator' },
    ],
  },
  'how-to-format-json': {
    slug: 'how-to-format-json',
    title: 'How to Format JSON Online',
    description:
      'Step-by-step guide to formatting, validating, and minifying JSON. Fix syntax errors and pretty-print JSON for readability.',
    publishedAt: '2026-02-12',
    keywords: ['format json', 'json formatter', 'pretty print json', 'validate json'],
    relatedTools: ['json-formatter', 'jwt-decoder', 'base64-encoder'],
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
      { type: 'heading', text: 'How to format JSON in 3 steps' },
      {
        type: 'list',
        items: [
          'Copy your raw JSON — from an API response, log file, or config',
          'Paste it into the JSON Formatter input box',
          'Click Format (or press Ctrl+Enter) to pretty-print with 2-space indentation',
        ],
      },
      { type: 'tool-cta', toolId: 'json-formatter', label: 'Open JSON Formatter' },
      { type: 'heading', text: 'Format vs minify vs validate' },
      {
        type: 'paragraph',
        text: 'Format (pretty-print) adds readable indentation. Minify removes all whitespace for smaller payloads — useful before sending JSON to an API. Validate checks syntax without changing the output — ideal for CI checks or quick error detection.',
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
        text: 'Our JSON Formatter shows the exact parse error message and line context, making it easy to locate and fix syntax issues quickly.',
      },
      { type: 'tool-cta', toolId: 'jwt-decoder', label: 'Decode JWT tokens' },
    ],
  },
  'what-is-jwt': {
    slug: 'what-is-jwt',
    title: 'What Is a JWT (JSON Web Token)?',
    description:
      'Understand JSON Web Tokens — how they work, their structure, and when to use them for authentication.',
    publishedAt: '2026-02-15',
    keywords: ['jwt', 'json web token', 'what is jwt', 'jwt authentication'],
    relatedTools: ['jwt-decoder', 'json-formatter', 'hash-generator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'A JSON Web Token (JWT) is a compact, URL-safe token format used for authentication and authorization in web applications and APIs. Instead of storing session data on the server, JWTs carry user identity and permissions inside the token itself.',
      },
      { type: 'heading', text: 'JWT structure' },
      {
        type: 'paragraph',
        text: 'Every JWT has three parts separated by dots: Header.Payload.Signature. The header describes the token type and signing algorithm. The payload contains claims (user ID, roles, expiration). The signature verifies the token has not been tampered with.',
      },
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
      { type: 'tool-cta', toolId: 'jwt-decoder', label: 'Decode a JWT token' },
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
      { type: 'tool-cta', toolId: 'hash-generator', label: 'Generate SHA-256 hashes' },
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
      'Understand Unix epoch timestamps — what they are, how to convert them, and common pitfalls.',
    publishedAt: '2026-02-17',
    keywords: ['unix timestamp', 'epoch time', 'timestamp converter', 'unix time'],
    relatedTools: ['unix-timestamp-converter', 'cron-parser', 'age-calculator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'A Unix timestamp counts the number of seconds since January 1, 1970 00:00:00 UTC (the "Unix epoch"). It is the standard way programming languages and databases store time internally.',
      },
      { type: 'heading', text: 'Seconds vs milliseconds' },
      {
        type: 'paragraph',
        text: 'Most systems use seconds (10 digits, e.g. 1700000000). JavaScript and some APIs use milliseconds (13 digits, e.g. 1700000000000). Always check which format your system expects.',
      },
      { type: 'heading', text: 'Common use cases' },
      {
        type: 'list',
        items: [
          'Debugging API responses and log files',
          'Database query filters by date range',
          'Cache expiration and TTL values',
          'JWT token expiration (exp claim)',
        ],
      },
      { type: 'tool-cta', toolId: 'unix-timestamp-converter', label: 'Convert timestamps' },
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
    description: 'Master cron expressions for Linux crontab, Kubernetes, GitHub Actions, and CI pipelines.',
    publishedAt: '2026-02-23',
    keywords: ['cron guide', 'cron expression', 'crontab tutorial', 'cron schedule'],
    relatedTools: ['cron-parser', 'unix-timestamp-converter', 'timezone-converter'],
    blocks: [
      { type: 'paragraph', text: 'Cron expressions define recurring job schedules using 5 fields: minute, hour, day of month, month, and day of week. They power Linux crontab, Kubernetes CronJobs, AWS EventBridge, and GitHub Actions schedules.' },
      { type: 'heading', text: 'Common cron patterns' },
      { type: 'list', items: ['0 * * * * — every hour at minute 0', '0 9 * * 1-5 — 9 AM weekdays', '*/15 * * * * — every 15 minutes', '0 0 1 * * — first day of every month at midnight', '0 0 * * 0 — every Sunday at midnight'] },
      { type: 'tool-cta', toolId: 'cron-parser', label: 'Parse cron expressions' },
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
    description: 'Understand when to use a plain hash versus HMAC for authentication and integrity.',
    publishedAt: '2026-03-10',
    keywords: ['hmac vs hash', 'hmac explained', 'message authentication', 'sha256 hmac'],
    relatedTools: ['hmac-generator', 'hash-generator', 'jwt-generator'],
    blocks: [
      { type: 'paragraph', text: 'Both hashes and HMACs produce fixed-length digests, but they serve different security purposes. A hash verifies integrity. An HMAC verifies both integrity and authenticity.' },
      { type: 'heading', text: 'When to use a hash' },
      { type: 'list', items: ['Checking file integrity (checksums)', 'Storing passwords (with bcrypt/argon2, not plain SHA)', 'Deduplication and fingerprinting', 'Blockchain and Merkle trees'] },
      { type: 'tool-cta', toolId: 'hash-generator', label: 'Generate SHA hash' },
      { type: 'heading', text: 'When to use HMAC' },
      { type: 'list', items: ['API request signing (Stripe, AWS, webhooks)', 'JWT token signing', 'Verifying message authenticity with a shared secret', 'Cookie signing in web frameworks'] },
      { type: 'tool-cta', toolId: 'hmac-generator', label: 'Generate HMAC signature' },
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
    description: 'Learn dotted decimal, integer, and hex representations of IP addresses.',
    publishedAt: '2026-03-12',
    keywords: ['ipv4 explained', 'ip address format', 'ip to decimal', 'network basics'],
    relatedTools: ['ip-converter', 'cidr-calculator', 'mac-address-generator'],
    blocks: [
      { type: 'paragraph', text: 'An IPv4 address is a 32-bit number usually written as four octets separated by dots (e.g. 192.168.1.1). The same address can be expressed as a decimal integer or hexadecimal value.' },
      { type: 'heading', text: 'Common formats' },
      { type: 'list', items: ['Dotted decimal — 192.168.1.1 (human readable)', 'Decimal/long — 3232235777 (database storage, some APIs)', 'Hexadecimal — 0xC0A80101 (low-level networking, debug output)', 'CIDR notation — 192.168.1.0/24 (subnet ranges)'] },
      { type: 'tool-cta', toolId: 'ip-converter', label: 'Convert IP addresses' },
      { type: 'tool-cta', toolId: 'cidr-calculator', label: 'Calculate CIDR ranges' },
    ],
  },
  'javascript-minification-guide': {
    slug: 'javascript-minification-guide',
    title: 'JavaScript Minification: What Gets Removed?',
    description: 'How JS minifiers reduce file size and what to watch out for before deploying.',
    publishedAt: '2026-03-13',
    keywords: ['javascript minification', 'minify js', 'js production build', 'reduce js size'],
    relatedTools: ['javascript-minifier', 'css-minifier', 'json-formatter'],
    blocks: [
      { type: 'paragraph', text: 'Minification removes unnecessary characters from JavaScript without changing functionality — comments, whitespace, and sometimes variable names (in advanced minifiers).' },
      { type: 'heading', text: 'What minifiers remove' },
      { type: 'list', items: ['Single-line comments (//)', 'Multi-line comments (/* */)', 'Extra whitespace and line breaks', 'In advanced tools: shorten variable names (mangling)'] },
      { type: 'tool-cta', toolId: 'javascript-minifier', label: 'Minify JavaScript online' },
      { type: 'heading', text: 'Production best practices' },
      { type: 'list', items: ['Always test minified code before deployment', 'Use source maps for debugging production issues', 'Combine with gzip/brotli compression on the server', 'For large apps, use build tools like esbuild or Terser'] },
    ],
  },
  'markdown-html-conversion-guide': {
    slug: 'markdown-html-conversion-guide',
    title: 'Markdown ↔ HTML: When to Convert Each Way',
    description: 'Guide to converting between Markdown and HTML for docs, blogs, and CMS workflows.',
    publishedAt: '2026-03-14',
    keywords: ['markdown to html', 'html to markdown', 'convert markdown', 'documentation workflow'],
    relatedTools: ['markdown-to-html', 'html-to-markdown', 'markdown-preview'],
    blocks: [
      { type: 'paragraph', text: 'Markdown and HTML are the two dominant formats for web content. Markdown is easier to write. HTML gives full control over structure and styling.' },
      { type: 'heading', text: 'Markdown → HTML' },
      { type: 'list', items: ['Publishing README files to documentation sites', 'Converting blog drafts to CMS HTML', 'Static site generators (Hugo, Jekyll, Next.js MDX)', 'Email templates from Markdown source'] },
      { type: 'tool-cta', toolId: 'markdown-to-html', label: 'Convert Markdown to HTML' },
      { type: 'heading', text: 'HTML → Markdown' },
      { type: 'list', items: ['Migrating WordPress or CMS content to Markdown', 'Cleaning up exported HTML for GitHub docs', 'Creating editable source from legacy web pages', 'Simplifying HTML-heavy content for version control'] },
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
    description: 'Step-by-step guide to creating cron schedules for jobs and automation.',
    publishedAt: '2026-03-18',
    keywords: ['cron expression guide', 'cron syntax', 'cron schedule', 'cron builder'],
    relatedTools: ['cron-generator', 'cron-parser', 'unix-timestamp-converter'],
    blocks: [
      { type: 'paragraph', text: 'Cron expressions define when scheduled jobs run. Standard cron uses 5 fields: minute, hour, day of month, month, and day of week.' },
      { type: 'heading', text: 'Common patterns' },
      { type: 'list', items: ['* — every value', '*/5 — every 5 units', '1-5 — range (Mon–Fri for weekday)', '0 9 * * 1-5 — 9 AM on weekdays', '0 0 1 * * — midnight on the 1st of each month'] },
      { type: 'tool-cta', toolId: 'cron-generator', label: 'Build a cron expression' },
      { type: 'tool-cta', toolId: 'cron-parser', label: 'Parse existing cron' },
    ],
  },
  'ascii-encoding-guide': {
    slug: 'ascii-encoding-guide',
    title: 'ASCII and Character Encoding Basics',
    description: 'How ASCII codes work and how they relate to Unicode and UTF-8.',
    publishedAt: '2026-03-19',
    keywords: ['ascii explained', 'character encoding', 'ascii code', 'utf-8 basics'],
    relatedTools: ['ascii-converter', 'binary-converter', 'hex-encoder'],
    blocks: [
      { type: 'paragraph', text: 'ASCII assigns numeric codes to 128 characters (0–127). Extended ASCII and Unicode expanded this to support international characters. UTF-8 encodes Unicode using variable-length byte sequences.' },
      { type: 'heading', text: 'Common ASCII codes' },
      { type: 'list', items: ['A = 65, a = 97', '0 = 48', 'Space = 32', 'Newline (LF) = 10', 'Tab = 9'] },
      { type: 'tool-cta', toolId: 'ascii-converter', label: 'Convert characters to ASCII' },
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
      'Encode text to Base64 or decode Base64 strings online. Free, instant, and private — your data never leaves your browser.',
    publishedAt: '2026-03-30',
    keywords: [
      'base64 encode decode online free',
      'base64 encoder online',
      'decode base64 string',
      'base64 converter private',
    ],
    relatedTools: ['base64-encoder', 'base64-decoder', 'url-encoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Base64 encoding converts binary or text data into ASCII-safe characters. Developers use it for JWT payloads, data URIs, email attachments, and embedding small files in JSON. It is encoding, not encryption — anyone can decode it.',
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
        text: 'Many online Base64 tools send your input to a server. For tokens, passwords, or proprietary data, use a client-side encoder instead.',
      },
      { type: 'tool-cta', toolId: 'base64-encoder', label: 'Encode to Base64' },
      { type: 'tool-cta', toolId: 'base64-decoder', label: 'Decode from Base64' },
    ],
  },
  'cron-expression-generator-online': {
    slug: 'cron-expression-generator-online',
    title: 'Cron Expression Generator Online (Free)',
    description:
      'Build and validate cron schedules visually. Free online cron generator — runs in your browser with no upload.',
    publishedAt: '2026-03-30',
    keywords: [
      'cron expression generator online',
      'cron schedule builder',
      'crontab generator free',
      'cron syntax helper',
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
      { type: 'heading', text: 'Examples' },
      {
        type: 'list',
        items: [
          '0 9 * * 1-5 — weekdays at 9:00 AM',
          '*/15 * * * * — every 15 minutes',
          '0 0 1 * * — first day of every month at midnight',
        ],
      },
      { type: 'tool-cta', toolId: 'cron-generator', label: 'Generate a cron expression' },
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
      'Generate HMAC-SHA256 signatures for API webhooks and authentication. Runs locally in your browser — secret keys never uploaded.',
    publishedAt: '2026-03-31',
    keywords: [
      'hmac sha256 generator online',
      'hmac generator free',
      'webhook signature generator',
      'hmac sha256 calculator',
    ],
    relatedTools: ['hmac-generator', 'hash-generator', 'jwt-decoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'HMAC (Hash-based Message Authentication Code) combines a secret key with a message to produce a signature. APIs like Stripe, Shopify, and GitHub webhooks use HMAC-SHA256 so receivers can verify requests were not tampered with.',
      },
      { type: 'heading', text: 'HMAC vs plain hash' },
      {
        type: 'paragraph',
        text: 'A plain SHA-256 hash of a message can be recomputed by anyone who knows the message. HMAC requires the secret key — only parties with the key can produce or verify the signature.',
      },
      { type: 'heading', text: 'Never upload your secret key' },
      {
        type: 'paragraph',
        text: 'Server-side HMAC tools receive your API secret on their servers. Utillio computes HMAC-SHA256 entirely in your browser using the Web Crypto API.',
      },
      { type: 'tool-cta', toolId: 'hmac-generator', label: 'Generate HMAC-SHA256' },
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
      'Pretty-print, minify, and validate JSON online for free. Runs in your browser — no upload, no sign-up.',
    publishedAt: '2026-04-04',
    keywords: [
      'json formatter pretty print online free',
      'pretty print json online',
      'format json online private',
      'json beautifier free',
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
      { type: 'tool-cta', toolId: 'json-formatter', label: 'Format JSON now' },
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
      'Generate SHA-256, SHA-384, and SHA-512 hashes from any text. Browser-based — your input never leaves your device.',
    publishedAt: '2026-04-05',
    keywords: [
      'sha256 hash generator online free',
      'hash generator online',
      'sha256 calculator private',
      'generate hash browser',
    ],
    relatedTools: ['hash-generator', 'hmac-generator', 'base64-encoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Cryptographic hashes produce a fixed-length fingerprint of input data. SHA-256 is widely used for checksums, integrity verification, and blockchain — but remember hashing is one-way, not encryption.',
      },
      { type: 'heading', text: 'When to use SHA-256' },
      {
        type: 'list',
        items: [
          'Verify file integrity with checksums',
          'Compare whether two strings produce the same hash',
          'Debug API signature workflows (with HMAC for secrets)',
          'Generate deterministic IDs from content',
        ],
      },
      { type: 'tool-cta', toolId: 'hash-generator', label: 'Generate a hash' },
    ],
  },
  'jwt-decoder-online-free': {
    slug: 'jwt-decoder-online-free',
    title: 'JWT Decoder Online (Free, Private)',
    description:
      'Decode JSON Web Tokens online without uploading them to a server. Inspect header and payload locally in your browser.',
    publishedAt: '2026-04-06',
    keywords: [
      'jwt decoder online free',
      'decode jwt token',
      'jwt parser online',
      'inspect jwt private',
    ],
    relatedTools: ['jwt-decoder', 'jwt-generator', 'base64-decoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'JWTs are Base64URL-encoded JSON with three parts: header, payload, and signature. Decoding lets you inspect claims like exp, sub, and roles — essential for debugging auth flows.',
      },
      { type: 'heading', text: 'Important security note' },
      {
        type: 'paragraph',
        text: 'Decoding does not verify the signature. Never paste production JWTs into server-side decoders — they may log tokens. Utillio decodes entirely in your browser.',
      },
      { type: 'tool-cta', toolId: 'jwt-decoder', label: 'Decode a JWT' },
    ],
  },
  'unix-timestamp-converter-online': {
    slug: 'unix-timestamp-converter-online',
    title: 'Unix Timestamp Converter Online (Free)',
    description:
      'Convert Unix timestamps to human-readable dates and back. Free online converter — runs locally in your browser.',
    publishedAt: '2026-04-06',
    keywords: [
      'unix timestamp converter online',
      'epoch converter online free',
      'timestamp to date online',
      'convert unix time',
    ],
    relatedTools: ['unix-timestamp-converter', 'timezone-converter', 'date-difference-calculator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Unix timestamps count seconds (or milliseconds) since January 1, 1970 UTC. APIs, databases, and logs often use them — converting to local time makes debugging much easier.',
      },
      { type: 'heading', text: 'Seconds vs milliseconds' },
      {
        type: 'list',
        items: [
          '10-digit values are usually seconds (e.g. 1710000000)',
          '13-digit values are usually milliseconds',
          'JavaScript Date.now() returns milliseconds',
          'Python time.time() returns seconds as a float',
        ],
      },
      { type: 'tool-cta', toolId: 'unix-timestamp-converter', label: 'Convert a timestamp' },
    ],
  },
  'markdown-to-html-converter-online-free': {
    slug: 'markdown-to-html-converter-online-free',
    title: 'Markdown to HTML Converter Online (Free)',
    description:
      'Convert Markdown to HTML instantly in your browser. Free, private, and no upload required.',
    publishedAt: '2026-04-07',
    keywords: [
      'markdown to html converter online free',
      'convert markdown html',
      'markdown html generator',
      'md to html online',
    ],
    relatedTools: ['markdown-to-html', 'markdown-preview', 'html-beautifier'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Markdown is the standard format for README files, documentation sites, and blog posts. Converting to HTML lets you preview output, embed in CMS systems, or paste into email templates.',
      },
      { type: 'heading', text: 'Supported Markdown features' },
      {
        type: 'list',
        items: ['Headings, bold, italic, and links', 'Code blocks and inline code', 'Ordered and unordered lists', 'Blockquotes and horizontal rules'],
      },
      { type: 'tool-cta', toolId: 'markdown-to-html', label: 'Convert Markdown to HTML' },
    ],
  },
  'csv-to-json-converter-online-free': {
    slug: 'csv-to-json-converter-online-free',
    title: 'CSV to JSON Converter Online (Free, Private)',
    description:
      'Convert CSV spreadsheets to JSON arrays online. Free browser-based converter — your data stays on your device.',
    publishedAt: '2026-04-07',
    keywords: [
      'csv to json converter online free',
      'convert csv json online',
      'csv json converter private',
      'spreadsheet to json',
    ],
    relatedTools: ['csv-to-json', 'json-to-csv', 'json-formatter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'CSV is universal for spreadsheets and exports; JSON is standard for APIs and JavaScript apps. Converting between them is a daily task for data engineers and frontend developers.',
      },
      { type: 'heading', text: 'Tips for clean conversion' },
      {
        type: 'list',
        items: [
          'Ensure the first row contains column headers',
          'Watch for commas inside quoted fields',
          'Large files may be slow — Utillio processes locally without upload',
          'Use JSON to CSV for the reverse transformation',
        ],
      },
      { type: 'tool-cta', toolId: 'csv-to-json', label: 'Convert CSV to JSON' },
    ],
  },
  'url-encode-decode-online-free': {
    slug: 'url-encode-decode-online-free',
    title: 'URL Encode and Decode Online (Free, Private)',
    description:
      'Encode and decode URL strings and query parameters online. Free, browser-based — nothing uploaded to a server.',
    publishedAt: '2026-04-08',
    keywords: [
      'url encode decode online free',
      'url encoder online',
      'decode url online',
      'percent encoding online',
    ],
    relatedTools: ['url-encoder', 'url-decoder', 'url-parser'],
    blocks: [
      {
        type: 'paragraph',
        text: 'URL encoding (percent-encoding) converts special characters like spaces and ampersands into safe ASCII for query strings and path segments. Essential when building API requests or debugging broken links.',
      },
      { type: 'heading', text: 'Common encoded characters' },
      {
        type: 'list',
        items: ['Space → %20', 'Ampersand & → %26', 'Equals = → %3D', 'Plus + → %2B'],
      },
      { type: 'tool-cta', toolId: 'url-encoder', label: 'Encode a URL' },
      { type: 'tool-cta', toolId: 'url-decoder', label: 'Decode a URL' },
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
      'Format and beautify XML documents online. Free, private XML formatter — runs in your browser, no upload.',
    publishedAt: '2026-04-13',
    keywords: [
      'xml formatter pretty print online free',
      'format xml online',
      'xml beautifier private',
      'pretty print xml online',
    ],
    relatedTools: ['xml-formatter', 'json-formatter', 'html-beautifier'],
    blocks: [
      {
        type: 'paragraph',
        text: 'XML remains common in enterprise APIs, SOAP services, Android layouts, and config files. Minified XML from logs is hard to read — formatting reveals structure and helps catch mismatched tags.',
      },
      { type: 'heading', text: 'When to format XML' },
      {
        type: 'list',
        items: ['Debugging SOAP or RSS feed responses', 'Reviewing Android layout or plist files', 'Validating config before deployment', 'Converting between XML and JSON workflows'],
      },
      { type: 'tool-cta', toolId: 'xml-formatter', label: 'Format XML now' },
    ],
  },
  'hex-encoder-decoder-online-free': {
    slug: 'hex-encoder-decoder-online-free',
    title: 'Hex Encoder & Decoder Online (Free, Private)',
    description:
      'Convert text to hexadecimal and back online. Free browser-based hex converter — nothing uploaded to servers.',
    publishedAt: '2026-04-13',
    keywords: [
      'hex encoder decoder online free',
      'text to hex online',
      'hexadecimal converter private',
      'decode hex string online',
    ],
    relatedTools: ['hex-encoder', 'binary-converter', 'ascii-converter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Hexadecimal encoding represents bytes as pairs of 0-9 and A-F characters. Developers use it for color codes, binary dumps, cryptographic keys, and debugging raw data streams.',
      },
      { type: 'heading', text: 'Common hex use cases' },
      {
        type: 'list',
        items: ['CSS color values (#FF5733)', 'Inspecting binary data in logs', 'Encoding short binary payloads as text', 'Debugging serial protocol messages'],
      },
      { type: 'tool-cta', toolId: 'hex-encoder', label: 'Convert to hex' },
    ],
  },
  'jwt-generator-online-free': {
    slug: 'jwt-generator-online-free',
    title: 'JWT Generator Online (Free, Private)',
    description:
      'Create and sign JSON Web Tokens locally in your browser. Free JWT generator — secrets never uploaded to a server.',
    publishedAt: '2026-04-14',
    keywords: [
      'jwt generator online free',
      'create jwt token online',
      'json web token generator private',
      'sign jwt browser',
    ],
    relatedTools: ['jwt-generator', 'jwt-decoder', 'base64-encoder'],
    blocks: [
      {
        type: 'paragraph',
        text: 'JWTs carry authenticated claims between services. Generating test tokens for local development requires setting header, payload, and signing secret — but production secrets must never go to server-side generators.',
      },
      { type: 'heading', text: 'JWT structure' },
      {
        type: 'list',
        items: ['Header — algorithm and token type', 'Payload — claims like sub, exp, and roles', 'Signature — verifies integrity with a shared secret or key', 'Use decoder tool to inspect existing tokens'],
      },
      { type: 'tool-cta', toolId: 'jwt-generator', label: 'Generate a JWT' },
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
      'Format and beautify HTML with proper indentation online. Free browser-based formatter — your markup never leaves your device.',
    publishedAt: '2026-04-16',
    keywords: [
      'html beautifier online free',
      'format html online',
      'pretty print html private',
      'html formatter browser',
    ],
    relatedTools: ['html-beautifier', 'html-minifier', 'css-minifier'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Minified or messy HTML from templates, CMS exports, or email clients is hard to debug. Beautifying adds readable indentation so you can spot unclosed tags, nested structure issues, and accessibility problems before shipping.',
      },
      { type: 'heading', text: 'When to beautify HTML' },
      {
        type: 'list',
        items: [
          'Reviewing scraped or exported HTML before editing',
          'Debugging layout issues in email templates',
          'Learning HTML structure from minified production pages',
          'Pair with minifier for dev vs production workflows',
        ],
      },
      { type: 'tool-cta', toolId: 'html-beautifier', label: 'Beautify HTML now' },
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
      'Convert JSON arrays to CSV spreadsheets online. Free, private converter — data processed locally in your browser.',
    publishedAt: '2026-04-16',
    keywords: [
      'json to csv converter online free',
      'convert json array to csv',
      'json csv export private',
      'json spreadsheet converter browser',
    ],
    relatedTools: ['json-to-csv', 'csv-to-json', 'json-formatter'],
    blocks: [
      {
        type: 'paragraph',
        text: 'API responses and database exports often arrive as JSON arrays of objects. Spreadsheets, BI tools, and finance teams expect CSV. Converting locally avoids uploading sensitive customer or financial data to third-party converters.',
      },
      { type: 'heading', text: 'JSON to CSV tips' },
      {
        type: 'list',
        items: [
          'Input should be a JSON array of flat objects',
          'Nested objects may need flattening first',
          'Column headers come from object keys',
          'Validate JSON syntax before converting',
        ],
      },
      { type: 'tool-cta', toolId: 'json-to-csv', label: 'Convert JSON to CSV' },
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
      'Share JSON, JWT, regex patterns, and more via URL — input is encoded in the link and restored when opened. Nothing stored on our servers.',
    publishedAt: '2026-04-16',
    keywords: [
      'share json formatter link',
      'shareable tool url with input',
      'private online tools share state',
      'utillio share link',
    ],
    relatedTools: ['json-formatter', 'jwt-decoder', 'regex-tester', 'text-diff', 'hash-generator'],
    blocks: [
      {
        type: 'paragraph',
        text: 'Many Utillio tools encode your input in the URL query string so you can bookmark, Slack, or email a link that reopens with the same content. Processing still happens entirely in your browser — we never store shared input on a server.',
      },
      { type: 'heading', text: 'Tools with shareable state' },
      {
        type: 'list',
        items: [
          'JSON Formatter, YAML to JSON, Base64 Encoder',
          'Hash Generator, JWT Decoder, URL Encoder',
          'Regex Tester and Text Diff (pattern + text preserved)',
          'Click Share on any supported tool page to copy the link',
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
