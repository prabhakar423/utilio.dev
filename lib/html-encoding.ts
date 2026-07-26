export type HtmlTab = 'encode' | 'decode'

const entityMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

export const HTML_EXAMPLE = {
  plain: '<div class="greeting">Hello & "world"</div>',
  encoded: '&lt;div class=&quot;greeting&quot;&gt;Hello &amp; &quot;world&quot;&lt;/div&gt;',
} as const

export function encodeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (char) => entityMap[char] ?? char)
}

export function decodeHtml(text: string): string {
  if (typeof document === 'undefined') return text
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

export function transformHtml(
  input: string,
  tab: HtmlTab,
): { output: string; error: string } {
  if (!input) return { output: '', error: '' }
  try {
    return {
      output: tab === 'encode' ? encodeHtml(input) : decodeHtml(input),
      error: '',
    }
  } catch {
    return { output: '', error: 'Failed to decode HTML entities.' }
  }
}
