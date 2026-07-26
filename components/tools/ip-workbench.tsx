'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Globe, Hash, Network } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolInput,
  ToolPanel,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import { convertIp, IP_EXAMPLE, type IpFocus } from '@/lib/ip-address'

const SHARE_INITIAL = {
  focus: 'ipv4' as IpFocus,
  ipv4: '',
  decimal: '',
  hex: '',
}

export function IpWorkbench() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)

  const focus = (['ipv4', 'decimal', 'hex'].includes(state.focus) ? state.focus : 'ipv4') as IpFocus

  const converted = useMemo(
    () => convertIp(focus, state.ipv4, state.decimal, state.hex),
    [focus, state.ipv4, state.decimal, state.hex],
  )

  const displayIpv4 = focus === 'ipv4' ? state.ipv4 : converted.ipv4
  const displayDecimal = focus === 'decimal' ? state.decimal : converted.decimal
  const displayHex = focus === 'hex' ? state.hex : converted.hex

  const copyAll = converted.error
    ? ''
    : [`IPv4: ${converted.ipv4}`, `Decimal: ${converted.decimal}`, `Hex: ${converted.hex}`].join('\n')

  const loadExample = () => {
    setField('focus', 'ipv4')
    setField('ipv4', IP_EXAMPLE.ipv4)
    setField('decimal', IP_EXAMPLE.decimal)
    setField('hex', IP_EXAMPLE.hex)
  }

  const clearAll = () => {
    setField('ipv4', '')
    setField('decimal', '')
    setField('hex', '')
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-3">
        <ToolPanel label="IPv4 address">
          <ToolInput
            type="text"
            value={displayIpv4}
            onChange={(e) => {
              setField('focus', 'ipv4')
              setField('ipv4', e.target.value)
            }}
            placeholder="192.168.1.1"
            className="font-mono"
          />
        </ToolPanel>
        <ToolPanel label="Decimal (long integer)">
          <ToolInput
            type="text"
            value={displayDecimal}
            onChange={(e) => {
              setField('focus', 'decimal')
              setField('decimal', e.target.value)
            }}
            placeholder="3232235777"
            className="font-mono"
          />
        </ToolPanel>
        <ToolPanel label="Hexadecimal">
          <ToolInput
            type="text"
            value={displayHex}
            onChange={(e) => {
              setField('focus', 'hex')
              setField('hex', e.target.value)
            }}
            placeholder="0xC0A80101"
            className="font-mono"
          />
        </ToolPanel>
      </div>

      {converted.error && <ToolError message={converted.error} />}

      {!converted.error && converted.ipv4 && (
        <div className="grid gap-3 rounded-2xl border border-border/70 bg-muted/20 p-5 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Globe className="size-3.5" /> Dotted decimal
            </p>
            <p className="mt-1 font-mono text-sm">{converted.ipv4}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Network className="size-3.5" /> 32-bit integer
            </p>
            <p className="mt-1 font-mono text-sm">{converted.decimal}</p>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Hash className="size-3.5" /> Hex
            </p>
            <p className="mt-1 font-mono text-sm">{converted.hex}</p>
          </div>
        </div>
      )}

      <ToolActions>
        <ToolCopyButton text={copyAll} label="Copy all formats" disabled={!copyAll} />
        <ToolClearButton onClear={clearAll} />
        <Button type="button" variant="outline" size="sm" onClick={loadExample}>
          Load example
        </Button>
      </ToolActions>

      <p className="text-xs text-muted-foreground">
        Edit any field — the others update live. For subnets, use the{' '}
        <Link href="/tools/cidr-calculator" className="font-medium text-primary hover:text-primary/80">
          CIDR Calculator
        </Link>
        .
      </p>

      <ToolExample>
        <p className="font-mono text-sm">
          {IP_EXAMPLE.ipv4} = {IP_EXAMPLE.decimal} = {IP_EXAMPLE.hex}
        </p>
      </ToolExample>
    </div>
  )
}
