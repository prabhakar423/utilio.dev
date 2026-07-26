export type HmacAlgorithm = 'HS256' | 'HS384' | 'HS512'
export type RsaAlgorithm = 'RS256' | 'RS384' | 'RS512'
export type JwtTab = 'decode' | 'verify' | 'sign'
export type ExpiryStatus = 'expired' | 'active' | 'not-yet-valid' | 'no-expiry'

const HMAC_ALGORITHMS: HmacAlgorithm[] = ['HS256', 'HS384', 'HS512']
const RSA_ALGORITHMS: RsaAlgorithm[] = ['RS256', 'RS384', 'RS512']

const ALG_TO_HASH: Record<HmacAlgorithm, 'SHA-256' | 'SHA-384' | 'SHA-512'> = {
  HS256: 'SHA-256',
  HS384: 'SHA-384',
  HS512: 'SHA-512',
}

const RSA_ALG_TO_HASH: Record<RsaAlgorithm, 'SHA-256' | 'SHA-384' | 'SHA-512'> = {
  RS256: 'SHA-256',
  RS384: 'SHA-384',
  RS512: 'SHA-512',
}

export const STANDARD_CLAIMS = ['iss', 'sub', 'aud', 'exp', 'nbf', 'iat', 'jti'] as const

export const EXAMPLE_JWT = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  secret: 'your-256-bit-secret',
  header: '{"alg":"HS256","typ":"JWT"}',
  payload: '{"sub":"1234567890","name":"John Doe","iat":1516239022}',
} as const

export const EXAMPLE_JWT_RS256 = {
  token:
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.vdzxJJa7oDjdMWB5UpRNACk5SZOB9SZ77yeu9-TSIXQziGYGGSiOJyoYC1ej672E3XyxDLPnti95jqSue7gNQJB-ZC9TA7vOGJRyEH5uLJr1HdWdXIpWMNqzPNLBzFrDAWEK4Ty6nG8Wyj4ABx5j7AwFOgLLSh_BkvUflmEAx010uh01RW8rzoihsjjET3CcGfW432nWHUBZLvQynEeoo0uhlEbd9Zj9xFItpuDZM-aGRvqLx2O93Cbokkg-iTJB0nEGyeqdk78aYFAaO3VS2xID6fMDX0PSQk_-QaukDOqAUlIgsXr9vUoHHD1iwzVRgMOcOAbTmjgwcPCSAqYX9g',
  publicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1WtOrQ7sQGQ101X0gbp
O42FXf+yL7tBn3vR/3TAvzZPPabOnR5Dl1wjzenwzUdGtorDhJfmP+vDqaKlEcCy
9dKquzI7p73U68CqGUHjWONsIw82t9mo1mcVK6W95j2yw88WqU/3xHn/DTANU5qT
pTGLLwPJ+w+yFmnmEPcCx6RVzlMfzZEczXfczktr8BDFC5YB5TAxYYcZDVhoOQKr
tY5k2h3d3DogpbW4tFiPQqQIPwgBjvFwOdJ5mPPKXKVBS6+2elmk8gWnqEg89V3B
BNSHqXIQ2re4oasuyQQywBPQWIDiP2piPvM3hJ7H8iywU7nWfDFcrb3OtgJd+xR3
wwIDAQAB
-----END PUBLIC KEY-----`,
} as const

export function isHmacAlgorithm(alg: string | undefined): alg is HmacAlgorithm {
  return HMAC_ALGORITHMS.includes(alg as HmacAlgorithm)
}

export function isRsaAlgorithm(alg: string | undefined): alg is RsaAlgorithm {
  return RSA_ALGORITHMS.includes(alg as RsaAlgorithm)
}

export function base64UrlEncode(data: string | Uint8Array): string {
  const binary =
    typeof data === 'string'
      ? data
      : String.fromCharCode(...data)
  const encoded =
    typeof data === 'string'
      ? btoa(unescape(encodeURIComponent(data)))
      : btoa(binary)
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function base64UrlEncodeJson(obj: object): string {
  return base64UrlEncode(JSON.stringify(obj))
}

export function base64UrlDecode(part: string): string {
  const padded = part.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded + '='.repeat((4 - (padded.length % 4)) % 4)
  return decodeURIComponent(
    atob(pad)
      .split('')
      .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
      .join(''),
  )
}

export function base64UrlToBytes(b64: string): Uint8Array<ArrayBuffer> {
  const padded = b64.replace(/-/g, '+').replace(/_/g, '/')
  const pad = padded + '='.repeat((4 - (padded.length % 4)) % 4)
  const binary = atob(pad)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export function decodePart(part: string): unknown {
  return JSON.parse(base64UrlDecode(part))
}

export interface ParsedJwt {
  headerPart: string
  payloadPart: string
  signaturePart: string
  header: Record<string, unknown>
  payload: Record<string, unknown>
}

export function parseJwt(token: string): ParsedJwt | { error: string } {
  const trimmed = token.trim()
  if (!trimmed) return { error: 'Paste a JWT to decode' }

  const parts = trimmed.split('.')
  if (parts.length !== 3) {
    return { error: 'Invalid JWT: expected 3 parts separated by dots (header.payload.signature)' }
  }

  try {
    const header = decodePart(parts[0]) as Record<string, unknown>
    const payload = decodePart(parts[1]) as Record<string, unknown>
    return {
      headerPart: parts[0],
      payloadPart: parts[1],
      signaturePart: parts[2],
      header,
      payload,
    }
  } catch {
    return { error: 'Failed to decode JWT. Check that the token is valid Base64URL-encoded JSON.' }
  }
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`
  return `${Math.floor(seconds / 86400)}d`
}

export function getExpiryStatus(
  payload: unknown,
  nowSec = Math.floor(Date.now() / 1000),
): { status: ExpiryStatus; message: string } | null {
  if (!payload || typeof payload !== 'object') return null
  const claims = payload as Record<string, unknown>

  if (typeof claims.nbf === 'number' && claims.nbf > nowSec) {
    return {
      status: 'not-yet-valid',
      message: `Not valid until ${new Date(claims.nbf * 1000).toLocaleString()}`,
    }
  }

  if (typeof claims.exp === 'number') {
    if (claims.exp <= nowSec) {
      const ago = nowSec - claims.exp
      return {
        status: 'expired',
        message: `Expired ${formatDuration(ago)} ago (${new Date(claims.exp * 1000).toLocaleString()})`,
      }
    }
    const left = claims.exp - nowSec
    return {
      status: 'active',
      message: `Valid for ${formatDuration(left)} (expires ${new Date(claims.exp * 1000).toLocaleString()})`,
    }
  }

  return { status: 'no-expiry', message: 'No exp claim — token has no built-in expiry' }
}

export function formatClaimValue(key: string, value: unknown): string {
  if (['exp', 'iat', 'nbf'].includes(key) && typeof value === 'number') {
    return `${value} (${new Date(value * 1000).toLocaleString()})`
  }
  if (Array.isArray(value)) return value.join(', ')
  if (typeof value === 'object' && value !== null) return JSON.stringify(value)
  return String(value)
}

export function getClaimRows(payload: Record<string, unknown>) {
  const standard = STANDARD_CLAIMS.filter((key) => key in payload).map((key) => ({
    key,
    value: formatClaimValue(key, payload[key]),
    standard: true,
  }))
  const custom = Object.keys(payload)
    .filter((key) => !STANDARD_CLAIMS.includes(key as (typeof STANDARD_CLAIMS)[number]))
    .sort()
    .map((key) => ({
      key,
      value: formatClaimValue(key, payload[key]),
      standard: false,
    }))
  return [...standard, ...custom]
}

async function hmacSign(data: string, secret: string, alg: HmacAlgorithm): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: ALG_TO_HASH[alg] },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return base64UrlEncode(new Uint8Array(sig))
}

async function hmacVerify(
  data: string,
  secret: string,
  signatureB64: string,
  alg: HmacAlgorithm,
): Promise<boolean> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: ALG_TO_HASH[alg] },
    false,
    ['verify'],
  )
  return crypto.subtle.verify('HMAC', key, base64UrlToBytes(signatureB64), encoder.encode(data))
}

export async function signJwt(
  header: object,
  payload: object,
  secret: string,
): Promise<{ token: string } | { error: string }> {
  if (!secret.trim()) return { error: 'Secret is required to sign' }

  const alg = (header as { alg?: string }).alg
  if (!isHmacAlgorithm(alg)) {
    return { error: 'Header alg must be HS256, HS384, or HS512 for in-browser signing' }
  }

  const unsigned = `${base64UrlEncodeJson(header)}.${base64UrlEncodeJson(payload)}`
  try {
    const signature = await hmacSign(unsigned, secret, alg)
    return { token: `${unsigned}.${signature}` }
  } catch {
    return { error: 'Failed to sign token. Your browser may not support Web Crypto.' }
  }
}

export interface VerifyJwtResult {
  valid: boolean
  alg?: string
  error?: string
}

async function rsaVerify(
  data: string,
  publicKeyPem: string,
  signatureB64: string,
  alg: RsaAlgorithm,
): Promise<boolean> {
  const pemBody = publicKeyPem
    .replace(/-----BEGIN PUBLIC KEY-----/g, '')
    .replace(/-----END PUBLIC KEY-----/g, '')
    .replace(/-----BEGIN RSA PUBLIC KEY-----/g, '')
    .replace(/-----END RSA PUBLIC KEY-----/g, '')
    .replace(/\s/g, '')
  const binary = atob(pemBody)
  const spki = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    spki[i] = binary.charCodeAt(i)
  }

  const key = await crypto.subtle.importKey(
    'spki',
    spki,
    { name: 'RSASSA-PKCS1-v1_5', hash: RSA_ALG_TO_HASH[alg] },
    false,
    ['verify'],
  )

  return crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    key,
    base64UrlToBytes(signatureB64),
    new TextEncoder().encode(data),
  )
}

export interface VerifyJwtOptions {
  secret?: string
  publicKey?: string
}

export async function verifyJwt(token: string, options: VerifyJwtOptions): Promise<VerifyJwtResult> {
  if (!token.trim()) return { valid: false, error: 'Paste a JWT to verify' }

  const parts = token.trim().split('.')
  if (parts.length !== 3) {
    return { valid: false, error: 'Invalid JWT structure' }
  }

  let header: { alg?: string }
  try {
    header = decodePart(parts[0]) as { alg?: string }
  } catch {
    return { valid: false, error: 'Invalid JWT header' }
  }

  const alg = header.alg
  const unsigned = `${parts[0]}.${parts[1]}`

  if (isHmacAlgorithm(alg)) {
    if (!options.secret?.trim()) {
      return { valid: false, alg, error: 'HMAC secret is required for HS256/384/512 verification' }
    }
    try {
      const valid = await hmacVerify(unsigned, options.secret, parts[2], alg)
      return { valid, alg }
    } catch {
      return { valid: false, alg, error: 'HMAC verification failed' }
    }
  }

  if (isRsaAlgorithm(alg)) {
    if (!options.publicKey?.trim()) {
      return { valid: false, alg, error: 'PEM public key is required for RS256/384/512 verification' }
    }
    try {
      const valid = await rsaVerify(unsigned, options.publicKey, parts[2], alg)
      return { valid, alg }
    } catch {
      return { valid: false, alg, error: 'RSA verification failed — check that the PEM public key is valid SPKI format' }
    }
  }

  return {
    valid: false,
    alg,
    error: alg
      ? `${alg} is not supported for in-browser verification. Use HS256/384/512 with a secret or RS256/384/512 with a PEM public key.`
      : 'Missing alg in header',
  }
}
