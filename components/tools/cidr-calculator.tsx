'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function parseCidr(cidr: string) {
  const [ipStr, prefixStr] = cidr.split('/')
  const prefix = parseInt(prefixStr, 10)
  if (!ipStr || Number.isNaN(prefix) || prefix < 0 || prefix > 32) throw new Error('Invalid CIDR notation')

  const parts = ipStr.split('.').map(Number)
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) throw new Error('Invalid IP address')

  const ip = parts.reduce((acc, p) => (acc << 8) + p, 0) >>> 0
  const mask = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0
  const network = (ip & mask) >>> 0
  const broadcast = (network | ~mask) >>> 0
  const hosts = prefix >= 31 ? 0 : broadcast - network - 1

  const fmt = (n: number) => [24, 16, 8, 0].map((s) => (n >>> s) & 255).join('.')

  return {
    network: fmt(network),
    broadcast: fmt(broadcast),
    mask: fmt(mask),
    firstHost: hosts > 0 ? fmt(network + 1) : 'N/A',
    lastHost: hosts > 0 ? fmt(broadcast - 1) : 'N/A',
    totalHosts: hosts,
    prefix,
  }
}

export function CidrCalculator() {
  const [input, setInput] = useState('192.168.1.0/24')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    try {
      const r = parseCidr(input.trim())
      setOutput(
        `Network address: ${r.network}\nSubnet mask: ${r.mask}\nBroadcast: ${r.broadcast}\nFirst host: ${r.firstHost}\nLast host: ${r.lastHost}\nUsable hosts: ${r.totalHosts}\nPrefix: /${r.prefix}`,
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid CIDR')
      setOutput('')
    }
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="CIDR notation">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="192.168.1.0/24"
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </ToolPanel>
      <Button type="button" onClick={calculate}>Calculate</Button>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      {output && <ToolPanel label="Result"><ToolTextarea value={output} readOnly mono={false} /></ToolPanel>}
    </div>
  )
}
