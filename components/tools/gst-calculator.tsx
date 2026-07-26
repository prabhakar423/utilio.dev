'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

const GST_RATES = [0, 5, 12, 18, 28]

function computeGst(amount: string, rate: number, mode: 'exclusive' | 'inclusive') {
  const a = parseFloat(amount)
  if (Number.isNaN(a) || a <= 0) return null
  const r = rate / 100
  if (mode === 'exclusive') {
    const gst = a * r
    return { base: a, gst, total: a + gst }
  }
  const base = a / (1 + r)
  return { base, gst: a - base, total: a }
}

export function GstCalculator() {
  const [amount, setAmount] = useState('1000')
  const [rate, setRate] = useState(18)
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive')

  const result = useMemo(
    () => computeGst(amount, rate, mode),
    [amount, rate, mode],
  )

  const fmt = (n: number) => `₹${n.toFixed(2)}`

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        <Button type="button" size="sm" variant={mode === 'exclusive' ? 'default' : 'outline'} onClick={() => setMode('exclusive')}>
          GST exclusive
        </Button>
        <Button type="button" size="sm" variant={mode === 'inclusive' ? 'default' : 'outline'} onClick={() => setMode('inclusive')}>
          GST inclusive
        </Button>
      </div>

      <ToolPanel label="Amount (₹)">
        <ToolInput type="number" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} />
      </ToolPanel>

      <div>
        <label className="mb-2 block text-sm font-medium">GST rate: {rate}%</label>
        <div className="flex flex-wrap gap-2">
          {GST_RATES.filter((r) => r > 0).map((r) => (
            <Button key={r} type="button" size="sm" variant={rate === r ? 'default' : 'outline'} onClick={() => setRate(r)}>
              {r}%
            </Button>
          ))}
        </div>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-3">
          <ToolStat label="Base amount" value={fmt(result.base)} />
          <ToolStat label="GST amount" value={fmt(result.gst)} accent />
          <ToolStat label="Total" value={fmt(result.total)} />
        </div>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => { setAmount('1000'); setRate(18); setMode('exclusive') }} />
      </ToolActions>
    </div>
  )
}
