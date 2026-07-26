'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolInput,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

function parseCidr(cidr: string) {
  const [ipStr, prefixStr] = cidr.split('/')
  const prefix = parseInt(prefixStr, 10)
  if (!ipStr || Number.isNaN(prefix) || prefix < 0 || prefix > 32) {
    throw new Error('Invalid CIDR notation')
  }

  const parts = ipStr.split('.').map(Number)
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) {
    throw new Error('Invalid IP address')
  }

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
  const [input, setInput] = useShareableInput('192.168.1.0/24')

  const { output, error } = useMemo(() => {
    const trimmed = input.trim()
    if (!trimmed) return { output: '', error: '' }
    try {
      const r = parseCidr(trimmed)
      return {
        output: [
          `Network address: ${r.network}`,
          `Subnet mask: ${r.mask}`,
          `Broadcast: ${r.broadcast}`,
          `First host: ${r.firstHost}`,
          `Last host: ${r.lastHost}`,
          `Usable hosts: ${r.totalHosts}`,
          `Prefix: /${r.prefix}`,
        ].join('\n'),
        error: '',
      }
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Invalid CIDR',
      }
    }
  }, [input])

  return (
    <div className="grid gap-5">
      <ToolPanel label="CIDR notation">
        <ToolInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="192.168.1.0/24"
          className="font-mono"
        />
      </ToolPanel>

      {error && <ToolError message={error} />}

      {output && (
        <ToolPanel label="Network details">
          <ToolTextarea value={output} readOnly mono={false} className="min-h-40" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} label="Copy details" disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
      </ToolActions>

      <ToolExample>
        <p className="font-mono">192.168.1.0/24 → 254 usable hosts</p>
      </ToolExample>
    </div>
  )
}
