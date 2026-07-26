export function rot13(text: string): string {
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base)
  })
}

export const ROT13_EXAMPLE = {
  plain: 'Hello World',
  encoded: 'Uryyb Jbeyq',
} as const
