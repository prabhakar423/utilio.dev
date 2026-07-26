export type Base64Tab = 'encode' | 'decode'
export type Base64Variant = 'standard' | 'urlsafe'

export const BASE64_EXAMPLE = {
  plain: 'Hello World',
  standard: 'SGVsbG8gV29ybGQ=',
  urlsafe: 'SGVsbG8gV29ybGQ',
} as const

export function encodeBase64(text: string, variant: Base64Variant): string {
  const standard = btoa(unescape(encodeURIComponent(text)))
  if (variant === 'standard') return standard
  return standard.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function decodeBase64(input: string, variant: Base64Variant): string {
  let b64 = input.trim()
  if (variant === 'urlsafe') {
    b64 = b64.replace(/-/g, '+').replace(/_/g, '/')
  }
  const pad = b64 + '='.repeat((4 - (b64.length % 4)) % 4)
  return decodeURIComponent(escape(atob(pad)))
}

export function transformBase64(
  input: string,
  tab: Base64Tab,
  variant: Base64Variant,
): { output: string; error: string } {
  if (!input) return { output: '', error: '' }
  try {
    return {
      output: tab === 'encode' ? encodeBase64(input, variant) : decodeBase64(input, variant),
      error: '',
    }
  } catch {
    return {
      output: '',
      error:
        tab === 'encode'
          ? 'Failed to encode input.'
          : 'Invalid Base64 input. Check padding and character set.',
    }
  }
}
