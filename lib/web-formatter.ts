export type WebFormatterTab = 'html' | 'css' | 'js' | 'xml'

export const WEB_FORMATTER_EXAMPLES = {
  html: '<div class="card"><h1>Title</h1><p>Hello world</p></div>',
  css: `.card {
  color: red;
  padding: 1rem;
}`,
  js: `function hello(name) {
  console.log('Hello, ' + name);
}`,
  xml: '<root><item>value</item><item>two</item></root>',
} as const

export function beautifyHtml(html: string): string {
  let formatted = ''
  let indent = 0
  const cleaned = html.replace(/>\s+</g, '><').trim()

  cleaned.split(/(<[^>]+>)/).filter(Boolean).forEach((part) => {
    if (part.match(/^<\/\w/)) indent = Math.max(0, indent - 1)
    formatted += '  '.repeat(indent) + part + '\n'
    if (part.match(/^<\w[^>]*[^/]>$/)) indent++
  })

  return formatted.trim()
}

export function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .trim()
}

export function minifyJs(code: string): string {
  return code
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,:<>=+\-*/&|?!])\s*/g, '$1')
    .trim()
}

function formatXml(xml: string): string {
  const trimmed = xml.replace(/>\s*</g, '><').trim()
  let formatted = ''
  let indent = 0
  const parts = trimmed.replace(/(<[^>]+>)/g, '\n$1\n').split('\n').filter(Boolean)

  for (const part of parts) {
    if (part.match(/^<\/\w/)) indent = Math.max(0, indent - 1)
    formatted += '  '.repeat(indent) + part + '\n'
    if (part.match(/^<\w[^>]*[^/]>$/)) indent++
  }
  return formatted.trim()
}

export function transformWebCode(
  input: string,
  tab: WebFormatterTab,
): { output: string; error: string; savedBytes?: number } {
  if (!input.trim()) return { output: '', error: '' }

  try {
    if (tab === 'html') {
      return { output: beautifyHtml(input), error: '' }
    }
    if (tab === 'css') {
      const output = minifyCss(input)
      return { output, error: '', savedBytes: input.length - output.length }
    }
    if (tab === 'js') {
      const output = minifyJs(input)
      return { output, error: '', savedBytes: input.length - output.length }
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(input, 'application/xml')
    if (doc.querySelector('parsererror')) throw new Error('Invalid XML')
    const output = formatXml(input)
    return { output, error: '' }
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : tab === 'xml' ? 'Invalid XML' : 'Transform failed',
    }
  }
}
