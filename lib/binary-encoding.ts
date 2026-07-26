export type BinaryTab = 'encode' | 'decode'

export const BINARY_EXAMPLE = {
  plain: 'Hi',
  binary: '01001000 01101001',
} as const

export function encodeBinary(text: string): string {
  return Array.from(new TextEncoder().encode(text))
    .map((b) => b.toString(2).padStart(8, '0'))
    .join(' ')
}

export function decodeBinary(binary: string): string {
  const cleaned = binary.trim()
  if (!cleaned) return ''
  const bytes = cleaned.split(/\s+/).map((b) => parseInt(b, 2))
  if (bytes.some((b) => Number.isNaN(b) || b < 0 || b > 255)) {
    throw new Error('Invalid binary — use 8-bit groups separated by spaces')
  }
  return new TextDecoder().decode(new Uint8Array(bytes))
}

export function transformBinary(
  input: string,
  tab: BinaryTab,
): { output: string; error: string; byteCount?: number } {
  if (!input.trim()) return { output: '', error: '' }
  try {
    if (tab === 'encode') {
      const bytes = Array.from(new TextEncoder().encode(input))
      return {
        output: bytes.map((b) => b.toString(2).padStart(8, '0')).join(' '),
        error: '',
        byteCount: bytes.length,
      }
    }
    return { output: decodeBinary(input), error: '' }
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'Conversion failed',
    }
  }
}
