export interface ToolSearchItem {
  id: string
  title: string
  description: string
  category: string
  categoryName: string
  icon: string
  keywords: string[]
}

export const toolSearchIndex: ToolSearchItem[] = [
  {
    "id": "json-formatter",
    "title": "JSON Formatter",
    "description": "Format, validate, and minify JSON with live error locations",
    "category": "text",
    "icon": "braces",
    "keywords": [
      "json formatter online free",
      "pretty print json",
      "format json online",
      "json validator",
      "minify json",
      "json beautifier",
      "json error line"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "base64-encoder",
    "title": "Base64 Encoder",
    "description": "Encode and decode Base64 in one workbench",
    "category": "encoding",
    "icon": "binary",
    "keywords": [
      "base64",
      "encode",
      "decode",
      "text",
      "converter",
      "base64url"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "base64-decoder",
    "title": "Base64 Decoder",
    "description": "Decode and encode Base64 in one workbench",
    "category": "encoding",
    "icon": "binary",
    "keywords": [
      "base64",
      "decode",
      "encode",
      "text",
      "converter",
      "base64url"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "url-encoder",
    "title": "URL Encoder",
    "description": "Percent-encode and decode URLs in one workbench",
    "category": "encoding",
    "icon": "link",
    "keywords": [
      "url",
      "encode",
      "decode",
      "percent encoding",
      "uri",
      "urlencode"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "url-decoder",
    "title": "URL Decoder",
    "description": "Decode and encode percent-encoded URLs",
    "category": "encoding",
    "icon": "link-2",
    "keywords": [
      "url",
      "decode",
      "encode",
      "percent encoding",
      "uri",
      "urldecode"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "uuid-generator",
    "title": "UUID Generator",
    "description": "Generate RFC 4122 UUID v4 identifiers",
    "category": "generators",
    "icon": "fingerprint",
    "keywords": [
      "uuid generator online free",
      "uuid v4 generator",
      "generate uuid",
      "guid generator",
      "unique identifier generator",
      "random uuid"
    ],
    "categoryName": "Generators"
  },
  {
    "id": "password-generator",
    "title": "Password Generator",
    "description": "Create strong, customizable passwords",
    "category": "generators",
    "icon": "key-round",
    "keywords": [
      "password",
      "generate",
      "secure",
      "random",
      "strong password"
    ],
    "categoryName": "Generators"
  },
  {
    "id": "word-counter",
    "title": "Word Counter",
    "description": "Count words, characters, sentences, and lines",
    "category": "text",
    "icon": "type",
    "keywords": [
      "word count",
      "character count",
      "text analysis",
      "line count"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "age-calculator",
    "title": "Age Calculator",
    "description": "Calculate exact age from a birthdate",
    "category": "calculators",
    "icon": "cake",
    "keywords": [
      "age calculator",
      "birthdate",
      "how old am i",
      "date"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "emi-calculator",
    "title": "EMI Calculator",
    "description": "Calculate loan EMI, interest, and total payable",
    "category": "calculators",
    "icon": "calculator",
    "keywords": [
      "emi calculator",
      "loan",
      "interest",
      "finance",
      "mortgage"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "hash-generator",
    "title": "Hash Generator",
    "description": "Generate SHA-256, SHA-384, and SHA-512 hashes",
    "category": "security",
    "icon": "shield-check",
    "keywords": [
      "hash generator",
      "sha256",
      "sha512",
      "checksum",
      "cryptographic hash",
      "hmac generator"
    ],
    "categoryName": "Security"
  },
  {
    "id": "case-converter",
    "title": "Case Converter",
    "description": "Convert text to uppercase, lowercase, title, snake, and camel case",
    "category": "text",
    "icon": "case-sensitive",
    "keywords": [
      "case converter",
      "uppercase",
      "lowercase",
      "camelcase",
      "snake case",
      "title case"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "jwt-decoder",
    "title": "JWT Decoder",
    "description": "Decode, inspect, and verify JSON Web Tokens",
    "category": "developer",
    "icon": "key",
    "keywords": [
      "jwt decoder",
      "json web token",
      "decode jwt",
      "jwt payload",
      "auth token",
      "jwt verify"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "unix-timestamp-converter",
    "title": "Unix Timestamp Converter",
    "description": "Convert Unix timestamps to dates and vice versa",
    "category": "datetime",
    "icon": "clock",
    "keywords": [
      "unix timestamp",
      "epoch converter",
      "timestamp to date",
      "date to timestamp",
      "relative time"
    ],
    "categoryName": "Date & Time"
  },
  {
    "id": "percentage-calculator",
    "title": "Percentage Calculator",
    "description": "Calculate percentages, increases, decreases, and ratios",
    "category": "math",
    "icon": "percent",
    "keywords": [
      "percentage calculator",
      "percent increase",
      "percent of",
      "ratio calculator"
    ],
    "categoryName": "Math"
  },
  {
    "id": "html-encoder",
    "title": "HTML Encoder",
    "description": "Encode special characters to HTML entities",
    "category": "encoding",
    "icon": "code",
    "keywords": [
      "html encode",
      "html encoder online free",
      "html entities",
      "escape html",
      "html encode online",
      "html decode"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "html-decoder",
    "title": "HTML Decoder",
    "description": "Decode HTML entities back to plain text",
    "category": "encoding",
    "icon": "code",
    "keywords": [
      "html decoder",
      "decode html entities",
      "unescape html",
      "html entity decoder"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "hex-encoder",
    "title": "Hex Encoder",
    "description": "Convert text to hexadecimal and hex back to text",
    "category": "encoding",
    "icon": "hash",
    "keywords": [
      "hex encoder",
      "hexadecimal",
      "text to hex",
      "hex decode",
      "hex decoder"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "hex-decoder",
    "title": "Hex Decoder",
    "description": "Convert hexadecimal strings back to plain text",
    "category": "encoding",
    "icon": "hash",
    "keywords": [
      "hex decoder",
      "hexadecimal decode",
      "hex to text",
      "decode hex string"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "lorem-ipsum-generator",
    "title": "Lorem Ipsum Generator",
    "description": "Generate placeholder paragraphs, sentences, and words",
    "category": "generators",
    "icon": "file-text",
    "keywords": [
      "lorem ipsum",
      "placeholder text",
      "dummy text generator",
      "lipsum"
    ],
    "categoryName": "Generators"
  },
  {
    "id": "random-number-generator",
    "title": "Random Number Generator",
    "description": "Generate random numbers within any range",
    "category": "generators",
    "icon": "dice-5",
    "keywords": [
      "random number",
      "number generator",
      "random integer",
      "pick a number"
    ],
    "categoryName": "Generators"
  },
  {
    "id": "regex-tester",
    "title": "Regex Tester",
    "description": "Test regular expressions with live match highlighting",
    "category": "developer",
    "icon": "regex",
    "keywords": [
      "regex tester",
      "regular expression",
      "regex match",
      "pattern tester"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "tip-calculator",
    "title": "Tip Calculator",
    "description": "Calculate tip amount and split bills between people",
    "category": "calculators",
    "icon": "receipt",
    "keywords": [
      "tip calculator",
      "gratuity",
      "split bill",
      "restaurant tip"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "bmi-calculator",
    "title": "BMI Calculator",
    "description": "Calculate Body Mass Index from height and weight",
    "category": "calculators",
    "icon": "activity",
    "keywords": [
      "bmi calculator",
      "body mass index",
      "weight calculator",
      "health"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "color-converter",
    "title": "Color Converter",
    "description": "Convert colors between HEX, RGB, and HSL",
    "category": "encoding",
    "icon": "palette",
    "keywords": [
      "color converter",
      "hex to rgb",
      "rgb to hsl",
      "color picker"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "cron-parser",
    "title": "Cron Expression Parser",
    "description": "Parse cron schedules and preview next run times",
    "category": "developer",
    "icon": "clock",
    "keywords": [
      "cron parser",
      "cron expression",
      "crontab",
      "schedule parser",
      "next cron run"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "sql-formatter",
    "title": "SQL Formatter",
    "description": "Format and beautify SQL queries",
    "category": "developer",
    "icon": "database",
    "keywords": [
      "sql formatter",
      "format sql",
      "sql beautifier",
      "pretty print sql"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "markdown-to-html",
    "title": "Markdown to HTML",
    "description": "Convert Markdown syntax to HTML instantly",
    "category": "text",
    "icon": "file-code",
    "keywords": [
      "markdown to html",
      "md converter",
      "markdown converter",
      "html generator"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "remove-line-breaks",
    "title": "Remove Line Breaks",
    "description": "Remove or replace line breaks in text",
    "category": "text",
    "icon": "wrap-text",
    "keywords": [
      "remove line breaks",
      "delete newlines",
      "text cleaner",
      "join lines"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "text-diff",
    "title": "Text Diff",
    "description": "Compare two texts and highlight differences",
    "category": "text",
    "icon": "git-compare",
    "keywords": [
      "text diff",
      "compare text",
      "diff checker",
      "text comparison"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "slug-generator",
    "title": "Slug Generator",
    "description": "Convert titles to URL-friendly slugs",
    "category": "text",
    "icon": "link",
    "keywords": [
      "slug generator",
      "url slug",
      "seo slug",
      "permalink generator"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "compound-interest-calculator",
    "title": "Compound Interest Calculator",
    "description": "Calculate compound interest and final investment value",
    "category": "calculators",
    "icon": "trending-up",
    "keywords": [
      "compound interest",
      "investment calculator",
      "interest calculator",
      "savings"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "line-sorter",
    "title": "Line Sorter",
    "description": "Sort, reverse, or shuffle lines of text",
    "category": "text",
    "icon": "arrow-down-narrow-wide",
    "keywords": [
      "sort lines",
      "alphabetical sort",
      "line sorter",
      "shuffle lines"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "strip-html-tags",
    "title": "Strip HTML Tags",
    "description": "Extract plain text from HTML",
    "category": "text",
    "icon": "eraser",
    "keywords": [
      "strip html",
      "remove html tags",
      "html to text",
      "extract text"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "sip-calculator",
    "title": "SIP Calculator",
    "description": "Calculate SIP maturity value and estimated returns",
    "category": "calculators",
    "icon": "chart-line",
    "keywords": [
      "sip calculator",
      "mutual fund sip",
      "sip returns",
      "investment calculator india"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "gst-calculator",
    "title": "GST Calculator",
    "description": "Calculate GST amount for inclusive or exclusive prices",
    "category": "calculators",
    "icon": "indian-rupee",
    "keywords": [
      "gst calculator",
      "gst inclusive",
      "gst exclusive",
      "india gst"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "timezone-converter",
    "title": "Timezone Converter",
    "description": "Convert date and time between world timezones",
    "category": "datetime",
    "icon": "globe",
    "keywords": [
      "timezone converter",
      "time zone",
      "utc converter",
      "world clock"
    ],
    "categoryName": "Date & Time"
  },
  {
    "id": "date-difference-calculator",
    "title": "Date Difference Calculator",
    "description": "Calculate days, hours, and minutes between two dates",
    "category": "datetime",
    "icon": "calendar-range",
    "keywords": [
      "date difference",
      "days between dates",
      "date calculator",
      "time between dates"
    ],
    "categoryName": "Date & Time"
  },
  {
    "id": "csv-to-json",
    "title": "CSV to JSON",
    "description": "Convert CSV data to JSON format",
    "category": "developer",
    "icon": "table",
    "keywords": [
      "csv to json",
      "convert csv",
      "csv json converter",
      "csv parser"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "json-to-csv",
    "title": "JSON to CSV",
    "description": "Convert JSON arrays to CSV format",
    "category": "developer",
    "icon": "sheet",
    "keywords": [
      "json to csv",
      "json to csv converter online free",
      "convert json csv",
      "export json to csv",
      "json csv converter",
      "json array to csv"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "xml-formatter",
    "title": "XML Formatter",
    "description": "Format and beautify XML documents",
    "category": "developer",
    "icon": "code-xml",
    "keywords": [
      "xml formatter",
      "format xml",
      "xml beautifier",
      "pretty print xml"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "password-strength-checker",
    "title": "Password Strength Checker",
    "description": "Check password strength and get improvement tips",
    "category": "security",
    "icon": "shield-alert",
    "keywords": [
      "password strength",
      "password checker",
      "strong password test",
      "password meter"
    ],
    "categoryName": "Security"
  },
  {
    "id": "credit-card-validator",
    "title": "Credit Card Validator",
    "description": "Validate card numbers with the Luhn algorithm",
    "category": "security",
    "icon": "credit-card",
    "keywords": [
      "credit card validator",
      "luhn check",
      "card number validator",
      "bin checker"
    ],
    "categoryName": "Security"
  },
  {
    "id": "binary-converter",
    "title": "Binary Converter",
    "description": "Convert text to binary and binary back to text",
    "category": "encoding",
    "icon": "binary",
    "keywords": [
      "binary converter",
      "text to binary",
      "binary to text",
      "binary encoder",
      "binary decoder"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "binary-decoder",
    "title": "Binary Decoder",
    "description": "Decode binary strings back to plain text",
    "category": "encoding",
    "icon": "binary",
    "keywords": [
      "binary decoder",
      "binary to text",
      "decode binary string",
      "binary translator"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "morse-code-translator",
    "title": "Morse Code Translator",
    "description": "Translate text to Morse code and decode Morse to text",
    "category": "encoding",
    "icon": "radio",
    "keywords": [
      "morse code",
      "morse translator",
      "text to morse",
      "morse decoder"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "morse-decoder",
    "title": "Morse Code Decoder",
    "description": "Decode Morse code dots and dashes to plain text",
    "category": "encoding",
    "icon": "radio",
    "keywords": [
      "morse decoder",
      "decode morse code",
      "morse to text",
      "morse code translator"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "rot13-encoder",
    "title": "ROT13 Encoder",
    "description": "Encode and decode text with ROT13 cipher",
    "category": "encoding",
    "icon": "lock",
    "keywords": [
      "rot13",
      "rot13 encoder",
      "caesar cipher",
      "text cipher",
      "rot13 decoder"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "rot13-decoder",
    "title": "ROT13 Decoder",
    "description": "Decode ROT13 cipher text back to plain text",
    "category": "encoding",
    "icon": "lock",
    "keywords": [
      "rot13 decoder",
      "decode rot13",
      "rot13 decrypt",
      "caesar cipher decoder"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "duplicate-line-remover",
    "title": "Duplicate Line Remover",
    "description": "Remove duplicate lines from text while preserving order",
    "category": "text",
    "icon": "list-minus",
    "keywords": [
      "remove duplicates",
      "deduplicate lines",
      "unique lines",
      "duplicate remover"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "random-string-generator",
    "title": "Random String Generator",
    "description": "Generate random alphanumeric strings and tokens",
    "category": "generators",
    "icon": "shuffle",
    "keywords": [
      "random string",
      "string generator",
      "api key generator",
      "random token"
    ],
    "categoryName": "Generators"
  },
  {
    "id": "jwt-generator",
    "title": "JWT Generator",
    "description": "Sign and generate JWT tokens for testing",
    "category": "developer",
    "icon": "key-round",
    "keywords": [
      "jwt generator",
      "create jwt",
      "json web token generator",
      "jwt builder",
      "sign jwt"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "qr-code-generator",
    "title": "QR Code Generator",
    "description": "Generate QR codes from text or URLs",
    "category": "generators",
    "icon": "qr-code",
    "keywords": [
      "qr code generator",
      "create qr code",
      "qr code maker",
      "qr code online"
    ],
    "categoryName": "Generators"
  },
  {
    "id": "unit-converter",
    "title": "Unit Converter",
    "description": "Convert length, weight, and temperature units",
    "category": "math",
    "icon": "ruler",
    "keywords": [
      "unit converter",
      "length converter",
      "weight converter",
      "temperature converter"
    ],
    "categoryName": "Math"
  },
  {
    "id": "markdown-preview",
    "title": "Markdown Preview",
    "description": "Write Markdown with live HTML preview",
    "category": "text",
    "icon": "eye",
    "keywords": [
      "markdown preview",
      "markdown editor",
      "live markdown",
      "md preview"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "http-status-codes",
    "title": "HTTP Status Codes",
    "description": "Lookup and search HTTP status codes",
    "category": "network",
    "icon": "server",
    "keywords": [
      "http status codes",
      "status code list",
      "404 500",
      "http response codes"
    ],
    "categoryName": "Network"
  },
  {
    "id": "cidr-calculator",
    "title": "CIDR Calculator",
    "description": "Calculate subnet details from CIDR notation",
    "category": "network",
    "icon": "network",
    "keywords": [
      "cidr calculator",
      "subnet calculator",
      "ip subnet",
      "network calculator"
    ],
    "categoryName": "Network"
  },
  {
    "id": "roman-numeral-converter",
    "title": "Roman Numeral Converter",
    "description": "Convert numbers to Roman numerals and back",
    "category": "math",
    "icon": "languages",
    "keywords": [
      "roman numerals",
      "roman numeral converter",
      "number to roman",
      "roman to number"
    ],
    "categoryName": "Math"
  },
  {
    "id": "number-to-words",
    "title": "Number to Words",
    "description": "Convert numbers to English words",
    "category": "text",
    "icon": "letter-text",
    "keywords": [
      "number to words",
      "number in words",
      "spell number",
      "convert number to text"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "reverse-text",
    "title": "Reverse Text",
    "description": "Reverse characters, words, or lines in text",
    "category": "text",
    "icon": "arrow-left-right",
    "keywords": [
      "reverse text",
      "flip text",
      "backwards text",
      "reverse string"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "email-validator",
    "title": "Email Validator",
    "description": "Validate email address format",
    "category": "security",
    "icon": "mail-check",
    "keywords": [
      "email validator",
      "validate email",
      "email format check",
      "email regex"
    ],
    "categoryName": "Security"
  },
  {
    "id": "url-parser",
    "title": "URL Parser",
    "description": "Parse URLs into components, params, and more",
    "category": "developer",
    "icon": "link",
    "keywords": [
      "url parser",
      "parse url",
      "url components",
      "query string parser",
      "url breakdown"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "css-minifier",
    "title": "CSS Minifier",
    "description": "Minify CSS by removing whitespace and comments",
    "category": "developer",
    "icon": "minimize-2",
    "keywords": [
      "css minifier",
      "minify css",
      "compress css",
      "css optimizer"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "html-beautifier",
    "title": "HTML Beautifier",
    "description": "Format and indent HTML code",
    "category": "developer",
    "icon": "code",
    "keywords": [
      "html beautifier",
      "format html",
      "pretty print html",
      "html formatter"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "yaml-to-json",
    "title": "YAML to JSON",
    "description": "Convert YAML data to JSON format",
    "category": "developer",
    "icon": "arrow-right-left",
    "keywords": [
      "yaml to json",
      "convert yaml",
      "yaml json converter",
      "yaml parser"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "json-to-yaml",
    "title": "JSON to YAML",
    "description": "Convert JSON data to YAML format",
    "category": "developer",
    "icon": "arrow-left-right",
    "keywords": [
      "json to yaml",
      "convert json yaml",
      "json yaml converter"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "character-frequency-counter",
    "title": "Character Frequency Counter",
    "description": "Count how often each character appears in text",
    "category": "text",
    "icon": "bar-chart-3",
    "keywords": [
      "character frequency",
      "letter frequency",
      "char count",
      "frequency analysis"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "text-repeater",
    "title": "Text Repeater",
    "description": "Repeat text multiple times with custom separators",
    "category": "text",
    "icon": "repeat",
    "keywords": [
      "text repeater",
      "repeat text",
      "duplicate text",
      "string repeater"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "find-and-replace",
    "title": "Find and Replace",
    "description": "Find and replace text with optional regex support",
    "category": "text",
    "icon": "replace",
    "keywords": [
      "find and replace",
      "search replace",
      "text replace",
      "bulk replace"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "palindrome-checker",
    "title": "Palindrome Checker",
    "description": "Check if text reads the same forwards and backwards",
    "category": "text",
    "icon": "flip-horizontal",
    "keywords": [
      "palindrome checker",
      "is palindrome",
      "palindrome test",
      "reverse word"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "discount-calculator",
    "title": "Discount Calculator",
    "description": "Calculate sale price and savings from a discount percentage",
    "category": "calculators",
    "icon": "badge-percent",
    "keywords": [
      "discount calculator",
      "sale price",
      "percent off",
      "coupon calculator"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "simple-interest-calculator",
    "title": "Simple Interest Calculator",
    "description": "Calculate simple interest on loans and deposits",
    "category": "calculators",
    "icon": "trending-up",
    "keywords": [
      "simple interest",
      "interest calculator",
      "loan interest",
      "SI calculator"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "fraction-calculator",
    "title": "Fraction Calculator",
    "description": "Add, subtract, multiply, and divide fractions",
    "category": "math",
    "icon": "divide",
    "keywords": [
      "fraction calculator",
      "add fractions",
      "simplify fraction",
      "math fractions"
    ],
    "categoryName": "Math"
  },
  {
    "id": "reading-time-calculator",
    "title": "Reading Time Calculator",
    "description": "Estimate how long it takes to read your text",
    "category": "text",
    "icon": "book-open",
    "keywords": [
      "reading time",
      "read time calculator",
      "blog reading time",
      "words per minute"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "word-frequency-counter",
    "title": "Word Frequency Counter",
    "description": "Count how often each word appears in text",
    "category": "text",
    "icon": "bar-chart-2",
    "keywords": [
      "word frequency",
      "word count analysis",
      "keyword frequency",
      "text analysis"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "list-randomizer",
    "title": "List Randomizer",
    "description": "Randomly shuffle a list of items",
    "category": "text",
    "icon": "shuffle",
    "keywords": [
      "list randomizer",
      "shuffle list",
      "random order",
      "randomize names"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "whitespace-normalizer",
    "title": "Whitespace Normalizer",
    "description": "Clean up extra spaces, tabs, and blank lines",
    "category": "text",
    "icon": "space",
    "keywords": [
      "whitespace normalizer",
      "remove extra spaces",
      "clean text",
      "trim whitespace"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "javascript-minifier",
    "title": "JavaScript Minifier",
    "description": "Minify JavaScript by removing comments and whitespace",
    "category": "developer",
    "icon": "file-code",
    "keywords": [
      "javascript minifier",
      "minify js",
      "compress javascript",
      "js optimizer"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "html-to-markdown",
    "title": "HTML to Markdown",
    "description": "Convert HTML markup to Markdown format",
    "category": "developer",
    "icon": "file-text",
    "keywords": [
      "html to markdown",
      "convert html markdown",
      "html markdown converter"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "ip-converter",
    "title": "IP Address Converter",
    "description": "Convert IPv4 addresses to decimal and hex",
    "category": "network",
    "icon": "globe",
    "keywords": [
      "ip converter",
      "ipv4 to decimal",
      "ip to long",
      "ip address converter",
      "ipv4 to hex"
    ],
    "categoryName": "Network"
  },
  {
    "id": "mac-address-generator",
    "title": "MAC Address Generator",
    "description": "Generate random MAC addresses for testing",
    "category": "network",
    "icon": "cable",
    "keywords": [
      "mac address generator",
      "random mac",
      "fake mac address",
      "network testing"
    ],
    "categoryName": "Network"
  },
  {
    "id": "hmac-generator",
    "title": "HMAC Generator",
    "description": "Generate HMAC signatures with SHA-256, SHA-384, or SHA-512",
    "category": "security",
    "icon": "key-round",
    "keywords": [
      "hmac generator",
      "hmac sha256",
      "message authentication",
      "api signature",
      "webhook signature"
    ],
    "categoryName": "Security"
  },
  {
    "id": "chmod-calculator",
    "title": "Chmod Calculator",
    "description": "Convert between octal and symbolic file permissions",
    "category": "developer",
    "icon": "terminal",
    "keywords": [
      "chmod calculator",
      "file permissions",
      "octal to symbolic",
      "unix permissions"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "aspect-ratio-calculator",
    "title": "Aspect Ratio Calculator",
    "description": "Calculate width or height from aspect ratio",
    "category": "developer",
    "icon": "ratio",
    "keywords": [
      "aspect ratio calculator",
      "16:9 calculator",
      "image dimensions",
      "responsive design"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "vat-calculator",
    "title": "VAT Calculator",
    "description": "Calculate VAT inclusive and exclusive amounts",
    "category": "calculators",
    "icon": "receipt",
    "keywords": [
      "vat calculator",
      "value added tax",
      "vat inclusive",
      "vat exclusive"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "salary-calculator",
    "title": "Salary Calculator",
    "description": "Convert between hourly rate and annual salary",
    "category": "calculators",
    "icon": "banknote",
    "keywords": [
      "salary calculator",
      "hourly to annual",
      "annual to hourly",
      "wage calculator"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "ratio-calculator",
    "title": "Ratio Calculator",
    "description": "Solve proportions and find missing values",
    "category": "math",
    "icon": "scale",
    "keywords": [
      "ratio calculator",
      "proportion calculator",
      "solve proportion",
      "cross multiply"
    ],
    "categoryName": "Math"
  },
  {
    "id": "scientific-notation-converter",
    "title": "Scientific Notation Converter",
    "description": "Convert numbers to and from scientific notation",
    "category": "math",
    "icon": "superscript",
    "keywords": [
      "scientific notation",
      "e notation",
      "convert scientific notation",
      "standard form"
    ],
    "categoryName": "Math"
  },
  {
    "id": "sentence-counter",
    "title": "Sentence Counter",
    "description": "Count sentences and average words per sentence",
    "category": "text",
    "icon": "text-quote",
    "keywords": [
      "sentence counter",
      "count sentences",
      "words per sentence",
      "text analysis"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "paragraph-counter",
    "title": "Paragraph Counter",
    "description": "Count paragraphs, words, and characters in text",
    "category": "text",
    "icon": "align-left",
    "keywords": [
      "paragraph counter",
      "count paragraphs",
      "text structure",
      "writing analysis"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "ascii-converter",
    "title": "ASCII Converter",
    "description": "Convert characters to ASCII codes and back",
    "category": "encoding",
    "icon": "hash",
    "keywords": [
      "ascii converter",
      "char to ascii",
      "ascii code",
      "character code",
      "ascii table"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "ascii-decoder",
    "title": "ASCII Decoder",
    "description": "Convert ASCII/Unicode codes back to characters",
    "category": "encoding",
    "icon": "hash",
    "keywords": [
      "ascii decoder",
      "ascii decoder online free",
      "code to char",
      "ascii to text",
      "character code decoder",
      "decode ascii"
    ],
    "categoryName": "Converters"
  },
  {
    "id": "csv-formatter",
    "title": "CSV Formatter",
    "description": "Format and align CSV data for readability",
    "category": "developer",
    "icon": "table",
    "keywords": [
      "csv formatter",
      "format csv",
      "align csv",
      "csv viewer"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "json-string-escaper",
    "title": "JSON String Escaper",
    "description": "Escape and unescape strings for JSON",
    "category": "developer",
    "icon": "quote",
    "keywords": [
      "json escape",
      "escape string json",
      "json unescape",
      "string escaper"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "user-agent-parser",
    "title": "User-Agent Parser",
    "description": "Parse browser, OS, and device from User-Agent strings",
    "category": "developer",
    "icon": "monitor-smartphone",
    "keywords": [
      "user agent parser",
      "parse user agent",
      "browser detection",
      "ua string"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "tab-to-spaces",
    "title": "Tab to Spaces",
    "description": "Convert tabs to spaces in code and text",
    "category": "developer",
    "icon": "indent-increase",
    "keywords": [
      "tab to spaces",
      "convert tabs",
      "indentation converter",
      "spaces tabs"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "cron-generator",
    "title": "Cron Expression Generator",
    "description": "Build cron schedules with presets and live preview",
    "category": "developer",
    "icon": "calendar-clock",
    "keywords": [
      "cron generator",
      "create cron expression",
      "cron builder",
      "schedule generator",
      "crontab generator"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "levenshtein-calculator",
    "title": "Levenshtein Distance Calculator",
    "description": "Measure string similarity with edit distance",
    "category": "text",
    "icon": "git-compare",
    "keywords": [
      "levenshtein distance",
      "edit distance",
      "string similarity",
      "fuzzy match"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "markdown-table-generator",
    "title": "Markdown Table Generator",
    "description": "Create Markdown tables from CSV or tab-separated data",
    "category": "developer",
    "icon": "table-2",
    "keywords": [
      "markdown table generator",
      "csv to markdown table",
      "create markdown table"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "uuid-validator",
    "title": "UUID Validator",
    "description": "Validate UUID format and identify version",
    "category": "developer",
    "icon": "badge-check",
    "keywords": [
      "uuid validator",
      "validate uuid",
      "uuid version",
      "check uuid"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "margin-calculator",
    "title": "Profit Margin Calculator",
    "description": "Calculate profit margin and markup from cost and price",
    "category": "calculators",
    "icon": "chart-line",
    "keywords": [
      "profit margin calculator",
      "markup calculator",
      "margin vs markup",
      "pricing calculator"
    ],
    "categoryName": "Calculators"
  },
  {
    "id": "css-gradient-generator",
    "title": "CSS Gradient Generator",
    "description": "Create linear CSS gradients with live preview",
    "category": "developer",
    "icon": "paintbrush",
    "keywords": [
      "css gradient generator",
      "linear gradient css",
      "gradient maker",
      "background gradient"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "meta-tag-generator",
    "title": "Meta Tag Generator",
    "description": "Generate SEO and Open Graph meta tags",
    "category": "developer",
    "icon": "tags",
    "keywords": [
      "meta tag generator",
      "og tags",
      "seo meta tags",
      "open graph generator"
    ],
    "categoryName": "Developer"
  },
  {
    "id": "add-line-numbers",
    "title": "Add Line Numbers",
    "description": "Add line numbers to text and code",
    "category": "text",
    "icon": "list-ordered",
    "keywords": [
      "add line numbers",
      "number lines",
      "line numbering",
      "code line numbers"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "extract-urls",
    "title": "Extract URLs",
    "description": "Extract all URLs from text",
    "category": "text",
    "icon": "link-2",
    "keywords": [
      "extract urls",
      "find urls in text",
      "url extractor",
      "parse links"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "extract-emails",
    "title": "Extract Emails",
    "description": "Extract all email addresses from text",
    "category": "text",
    "icon": "mail",
    "keywords": [
      "extract emails",
      "find emails in text",
      "email extractor",
      "parse emails"
    ],
    "categoryName": "Text Tools"
  },
  {
    "id": "random-color-generator",
    "title": "Random Color Generator",
    "description": "Generate random colors with HEX, RGB, and HSL values",
    "category": "generators",
    "icon": "palette",
    "keywords": [
      "random color generator",
      "random hex color",
      "color picker random",
      "generate color"
    ],
    "categoryName": "Generators"
  },
  {
    "id": "naming-convention-converter",
    "title": "Naming Convention Converter",
    "description": "Convert between camelCase, snake_case, kebab-case, and more",
    "category": "developer",
    "icon": "case-sensitive",
    "keywords": [
      "naming convention",
      "camelCase to snake_case",
      "kebab case converter",
      "variable naming"
    ],
    "categoryName": "Developer"
  }
]

export function searchToolIndex(query: string): ToolSearchItem[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return []

  return toolSearchIndex.filter(
    (tool) =>
      tool.title.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.categoryName.toLowerCase().includes(lowerQuery) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery)),
  )
}

export function getToolSearchItem(id: string): ToolSearchItem | undefined {
  return toolSearchIndex.find((tool) => tool.id === id)
}
