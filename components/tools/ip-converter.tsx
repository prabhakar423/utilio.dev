'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolPanel } from '@/components/tools/tool-ui'

function ipv4ToDecimal(ip: string): number | null {
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

function decimalToIpv4(value: number): string | null {
  if (!Number.isInteger(value) || value < 0 || value > 4294967295) return null
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255,
  ].join('.')
}

function ipv4ToHex(ip: string): string | null {
  const decimal = ipv4ToDecimal(ip)
  if (decimal === null) return null
  return '0x' + decimal.toString(16).toUpperCase().padStart(8, '0')
}

export function IpConverter() {
  const [ipv4, setIpv4] = useState('192.168.1.1')
  const [decimal, setDecimal] = useState('')
  const [hex, setHex] = useState('')
  const [error, setError] = useState('')

  const fromIpv4 = () => {
    setError('')
    const dec = ipv4ToDecimal(ipv4)
    if (dec === null) {
      setError('Invalid IPv4 address')
      setDecimal('')
      setHex('')
      return
    }
    setDecimal(String(dec))
    setHex(ipv4ToHex(ipv4) ?? '')
  }

  const fromDecimal = () => {
    setError('')
    const num = Number(decimal)
    const ip = decimalToIpv4(num)
    if (!ip) {
      setError('Invalid decimal value (0–4294967295)')
      setHex('')
      return
    }
    setIpv4(ip)
    setHex(ipv4ToHex(ip) ?? '')
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label="IPv4 address">
          <input
            type="text"
            value={ipv4}
            onChange={(e) => setIpv4(e.target.value)}
            placeholder="192.168.1.1"
            className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </ToolPanel>
        <ToolPanel label="Decimal (long)">
          <input
            type="text"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            placeholder="3232235777"
            className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </ToolPanel>
      </div>
      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={fromIpv4}>IPv4 → Decimal</Button>
        <Button type="button" variant="outline" onClick={fromDecimal}>Decimal → IPv4</Button>
      </div>
      {hex && (
        <ToolPanel label="Hexadecimal">
          <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3 font-mono text-sm">
            {hex}
          </div>
        </ToolPanel>
      )}
    </div>
  )
}
