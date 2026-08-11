export type HashAlgorithm = 'SHA-256' | 'SHA-384' | 'SHA-512'
export type CryptoHashTab = 'hash' | 'hmac'

export const HASH_EXAMPLE = {
  input: 'Hello, Utiliio!',
  key: 'webhook-secret',
  message: 'payload={"event":"order.created"}',
} as const

export async function computeHash(text: string, algorithm: HashAlgorithm): Promise<string> {
  const data = new TextEncoder().encode(text)
  const buffer = await crypto.subtle.digest(algorithm, data)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function computeHmac(
  key: string,
  message: string,
  algorithm: HashAlgorithm,
): Promise<string> {
  const encoder = new TextEncoder()
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(key),
    { name: 'HMAC', hash: algorithm },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message))
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function hmacLabel(algorithm: HashAlgorithm): string {
  return `HMAC-${algorithm.replace('SHA-', '')}`
}
