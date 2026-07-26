export const SHARE_PARAM = 'q'
const MAX_SHARE_LENGTH = 1500

export function encodeShareState(value: string): string {
  if (!value) return ''
  return btoa(unescape(encodeURIComponent(value)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export function decodeShareState(encoded: string | null): string {
  if (!encoded) return ''
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    return decodeURIComponent(escape(atob(padded)))
  } catch {
    return ''
  }
}

export function buildShareUrl(pathname: string, value: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const base = `${origin}${pathname}`
  if (!value.trim() || value.length > MAX_SHARE_LENGTH) return base
  return `${base}?${SHARE_PARAM}=${encodeShareState(value)}`
}

export function canShareState(value: string): boolean {
  return value.trim().length > 0 && value.length <= MAX_SHARE_LENGTH
}
