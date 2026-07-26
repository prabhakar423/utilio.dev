export type IpFocus = 'ipv4' | 'decimal' | 'hex'

export interface IpValues {
  ipv4: string
  decimal: string
  hex: string
  error: string
}

export const IP_EXAMPLE = {
  ipv4: '192.168.1.1',
  decimal: '3232235777',
  hex: '0xC0A80101',
} as const

export function ipv4ToDecimal(ip: string): number | null {
  const parts = ip.trim().split('.')
  if (parts.length !== 4) return null
  let value = 0
  for (const part of parts) {
    const num = Number(part)
    if (!Number.isInteger(num) || num < 0 || num > 255) return null
    value = value * 256 + num
  }
  return value
}

export function decimalToIpv4(value: number): string | null {
  if (!Number.isInteger(value) || value < 0 || value > 4_294_967_295) return null
  return [(value >>> 24) & 255, (value >>> 16) & 255, (value >>> 8) & 255, value & 255].join('.')
}

export function decimalToHex(value: number): string {
  return `0x${value.toString(16).toUpperCase().padStart(8, '0')}`
}

export function hexToDecimal(hex: string): number | null {
  const cleaned = hex.trim().replace(/^0x/i, '')
  if (!/^[0-9a-fA-F]{1,8}$/.test(cleaned)) return null
  const value = parseInt(cleaned, 16)
  if (Number.isNaN(value) || value < 0 || value > 4_294_967_295) return null
  return value
}

export function convertFromIpv4(ip: string): IpValues {
  if (!ip.trim()) return { ipv4: '', decimal: '', hex: '', error: '' }
  const dec = ipv4ToDecimal(ip)
  if (dec === null) {
    return { ipv4: ip, decimal: '', hex: '', error: 'Invalid IPv4 address (e.g. 192.168.1.1)' }
  }
  return {
    ipv4: ip,
    decimal: String(dec),
    hex: decimalToHex(dec),
    error: '',
  }
}

export function convertFromDecimal(input: string): IpValues {
  if (!input.trim()) return { ipv4: '', decimal: '', hex: '', error: '' }
  const num = Number(input.trim())
  const ip = decimalToIpv4(num)
  if (!ip) {
    return { ipv4: '', decimal: input, hex: '', error: 'Invalid decimal (0–4294967295)' }
  }
  return {
    ipv4: ip,
    decimal: input.trim(),
    hex: decimalToHex(num),
    error: '',
  }
}

export function convertFromHex(input: string): IpValues {
  if (!input.trim()) return { ipv4: '', decimal: '', hex: '', error: '' }
  const dec = hexToDecimal(input)
  if (dec === null) {
    return { ipv4: '', decimal: '', hex: input, error: 'Invalid hex (e.g. 0xC0A80101)' }
  }
  const ip = decimalToIpv4(dec)
  if (!ip) {
    return { ipv4: '', decimal: '', hex: input, error: 'Invalid hex value' }
  }
  return {
    ipv4: ip,
    decimal: String(dec),
    hex: input.trim().startsWith('0x') ? input.trim() : decimalToHex(dec),
    error: '',
  }
}

export function convertIp(focus: IpFocus, ipv4: string, decimal: string, hex: string): IpValues {
  switch (focus) {
    case 'decimal':
      return convertFromDecimal(decimal)
    case 'hex':
      return convertFromHex(hex)
    default:
      return convertFromIpv4(ipv4)
  }
}
