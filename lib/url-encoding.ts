export type UrlTab = 'encode' | 'decode' | 'parse'
export type UrlEncoding = 'component' | 'full' | 'form'

export const URL_EXAMPLE = {
  plain: 'hello world?',
  component: 'hello%20world%3F',
  fullUrl: 'https://example.com/search?q=hello world&lang=en',
  parseUrl: 'https://example.com:8080/path?q=hello&page=1#section',
} as const

export interface ParsedUrlComponent {
  label: string
  value: string
}

export interface ParsedUrl {
  components: ParsedUrlComponent[]
  params: { key: string; value: string }[]
  breakdown: string
}

export function parseUrl(input: string): ParsedUrl | { error: string } {
  const trimmed = input.trim()
  if (!trimmed) return { error: 'Paste a URL to parse' }

  try {
    const u = new URL(trimmed)
    const components: ParsedUrlComponent[] = [
      { label: 'Protocol', value: u.protocol },
      { label: 'Hostname', value: u.hostname },
      { label: 'Port', value: u.port || '(default)' },
      { label: 'Pathname', value: u.pathname },
      { label: 'Search', value: u.search || '(none)' },
      { label: 'Hash', value: u.hash || '(none)' },
      { label: 'Origin', value: u.origin },
      { label: 'Host', value: u.host },
    ]
    const params = [...u.searchParams.entries()].map(([key, value]) => ({ key, value }))
    const breakdown = [
      ...components.map((c) => `${c.label}: ${c.value}`),
      '',
      'Query parameters:',
      ...(params.length > 0
        ? params.map((p) => `  ${p.key} = ${p.value}`)
        : ['  (none)']),
    ].join('\n')

    return { components, params, breakdown }
  } catch {
    return { error: 'Invalid URL. Include protocol (https:// or http://).' }
  }
}

export function encodeUrl(text: string, encoding: UrlEncoding): string {
  if (encoding === 'full') return encodeURI(text)
  if (encoding === 'form') return encodeURIComponent(text).replace(/%20/g, '+')
  return encodeURIComponent(text)
}

export function decodeUrl(text: string, encoding: UrlEncoding): string {
  if (encoding === 'full') return decodeURI(text)
  if (encoding === 'form') return decodeURIComponent(text.replace(/\+/g, ' '))
  return decodeURIComponent(text)
}

export function transformUrl(
  input: string,
  tab: UrlTab,
  encoding: UrlEncoding,
): { output: string; error: string } {
  if (!input) return { output: '', error: '' }
  try {
    return {
      output: tab === 'encode' ? encodeUrl(input, encoding) : decodeUrl(input, encoding),
      error: '',
    }
  } catch {
    return {
      output: '',
      error: 'Invalid encoded URL. Check for malformed percent-encoding.',
    }
  }
}

export function encodingLabel(encoding: UrlEncoding): string {
  switch (encoding) {
    case 'component':
      return 'Component (encodeURIComponent)'
    case 'full':
      return 'Full URL (encodeURI)'
    case 'form':
      return 'Form (+ for spaces)'
  }
}
