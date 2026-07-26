'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

const VAT_RATES = [5, 10, 15, 20, 21, 25]

function computeVat(amount: string, rate: number, mode: 'exclusive' | 'inclusive') {
  const a = parseFloat(amount)
  if (Number.isNaN(a) || a <= 0) return null
  const r = rate / 100
  if (mode === 'exclusive') {
    const vat = a * r
    return { base: a, vat, total: a + vat }
  }
  const base = a / (1 + r)
  return { base, vat: a - base, total: a }
}

export function VatCalculator() {
  const [amount, setAmount] = useState('100')
  const [rate, setRate] = useState(20)
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive')

  const result = useMemo(
    () => computeVat(amount, rate, mode),
    [amount, rate, mode],
  )

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" variant={mode === 'exclusive' ? 'default' : 'outline'} onClick={() => setMode('exclusive')}>
          VAT exclusive
        </Button>
        <Button type="button" size="sm" variant={mode === 'inclusive' ? 'default' : 'outline'} onClick={() => setMode('inclusive')}>
          VAT inclusive
        </Button>
      </div>

      <ToolPanel label="Amount">
        <ToolInput type="number" min={0} step={0.01} value={amount} onChange={(e) => setAmount(e.target.value)} />
      </ToolPanel>

      <div>
        <label className="mb-2 block text-sm font-medium">VAT rate: {rate}%</label>
        <div className="flex flex-wrap gap-2">
          {VAT_RATES.map((r) => (
            <Button key={r} type="button" size="sm" variant={rate === r ? 'default' : 'outline'} onClick={() => setRate(r)}>
              {r}%
            </Button>
          ))}
        </div>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-3">
          <ToolStat label="Net amount" value={result.base.toFixed(2)} />
          <ToolStat label="VAT amount" value={result.vat.toFixed(2)} accent />
          <ToolStat label="Gross total" value={result.total.toFixed(2)} />
        </div>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => { setAmount('100'); setRate(20); setMode('exclusive') }} />
      </ToolActions>
    </div>
  )
}
