export type MorseTab = 'encode' | 'decode'

export const MORSE_MAP: Record<string, string> = {
  A: '.-',
  B: '-...',
  C: '-.-.',
  D: '-..',
  E: '.',
  F: '..-.',
  G: '--.',
  H: '....',
  I: '..',
  J: '.---',
  K: '-.-',
  L: '.-..',
  M: '--',
  N: '-.',
  O: '---',
  P: '.--.',
  Q: '--.-',
  R: '.-.',
  S: '...',
  T: '-',
  U: '..-',
  V: '...-',
  W: '.--',
  X: '-..-',
  Y: '-.--',
  Z: '--..',
  '0': '-----',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
}

const REVERSE = Object.fromEntries(Object.entries(MORSE_MAP).map(([k, v]) => [v, k]))

export const MORSE_EXAMPLE = {
  text: 'SOS',
  code: '... --- ...',
} as const

export const MORSE_REFERENCE = Object.entries(MORSE_MAP).map(([char, code]) => ({ char, code }))

export function encodeMorse(text: string): string {
  return text
    .toUpperCase()
    .split('')
    .map((c) => (c === ' ' ? '/' : MORSE_MAP[c] ?? ''))
    .filter(Boolean)
    .join(' ')
}

export function decodeMorse(code: string): string {
  return code
    .split(/\s+/)
    .map((w) => (w === '/' ? ' ' : REVERSE[w] ?? ''))
    .join('')
}

export function transformMorse(
  input: string,
  tab: MorseTab,
): { output: string; error: string; symbolCount?: number } {
  if (!input.trim()) return { output: '', error: '' }
  if (tab === 'encode') {
    const output = encodeMorse(input)
    return { output, error: '', symbolCount: output.split(' ').filter(Boolean).length }
  }
  const output = decodeMorse(input)
  if (!output && input.trim()) {
    return { output: '', error: 'Unrecognized Morse pattern. Use dots (.), dashes (-), spaces, and / for word breaks.' }
  }
  return { output, error: '' }
}
