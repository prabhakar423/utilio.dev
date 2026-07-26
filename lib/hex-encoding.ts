export type HexTab = 'encode' | 'decode'

export const HEX_EXAMPLE = {
  plain: 'Hello',
  hex: '48656c6c6f',
} as const

export function encodeHex(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export function decodeHex(hex: string): string {
  const cleaned = hex.replace(/\s/g, '')
  if (!/^[0-9a-fA-F]*$/.test(cleaned) || cleaned.length % 2 !== 0) {
    throw new Error('Invalid hex string')
  }
  const bytes = new Uint8Array(cleaned.length / 2)
  for (let i = 0; i < cleaned.length; i += 2) {
    bytes[i / 2] = parseInt(cleaned.slice(i, i + 2), 16)
  }
  return new TextDecoder().decode(bytes)
}

export function transformHex(
  input: string,
  tab: HexTab,
): { output: string; error: string } {
  if (!input.trim()) return { output: '', error: '' }
  try {
    return {
      output: tab === 'encode' ? encodeHex(input) : decodeHex(input),
      error: '',
    }
  } catch {
    return {
      output: '',
      error: 'Invalid hex input. Use pairs of hexadecimal characters (0-9, a-f).',
    }
  }
}
