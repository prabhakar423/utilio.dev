export type AsciiTab = 'char-to-code' | 'code-to-char'

export const ASCII_EXAMPLE = {
  text: 'Hello',
  codes: '72 101 108 108 111',
} as const

export interface CharCodeRow {
  char: string
  decimal: number
  hex: string
}

export function charToCodeRows(text: string): CharCodeRow[] {
  return [...text].map((ch) => {
    const code = ch.codePointAt(0)!
    return {
      char: ch,
      decimal: code,
      hex: `0x${code.toString(16).toUpperCase()}`,
    }
  })
}

export function codesToText(input: string): string {
  const codes = input.split(/[\s,]+/).filter(Boolean)
  return codes
    .map((code) => {
      const num = code.startsWith('0x') || code.startsWith('0X')
        ? parseInt(code, 16)
        : parseInt(code, 10)
      if (Number.isNaN(num) || num < 0 || num > 0x10ffff) {
        throw new Error(`Invalid code: ${code}`)
      }
      return String.fromCodePoint(num)
    })
    .join('')
}

export function transformAscii(
  input: string,
  tab: AsciiTab,
): { output: string; error: string; rows?: CharCodeRow[] } {
  if (!input.trim()) return { output: '', error: '' }
  try {
    if (tab === 'char-to-code') {
      const rows = charToCodeRows(input)
      const output = rows
        .map((row) => `${row.char} → ${row.decimal} (${row.hex})`)
        .join('\n')
      return { output, error: '', rows }
    }
    return { output: codesToText(input), error: '' }
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : 'Conversion failed',
    }
  }
}
