'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

const GST_RATES = [0, 5, 12, 18, 28]

export function GstCalculator() {
  const [amount, setAmount] = useState('1000')
  const [rate, setRate] = useState(18)
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive')
  const [result, setResult] = useState<{ gst: number; total: number; base: number } | null>(null)

  const calculate = () => {
    const a = parseFloat(amount)
    if (Number.isNaN(a) || a <= 0) { setResult(null); return }
    const r = rate / 100
    if (mode === 'exclusive') {
      const gst = a * r
      setResult({ base: a, gst, total: a + gst })
    } else {
      const base = a / (1 + r)
      const gst = a - base
      setResult({ base, gst, total: a })
    }
  }

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button type="button" size="sm" variant={mode === 'exclusive' ? 'default' : 'outline'} onClick={() => setMode('exclusive')}>
          GST exclusive
        </Button>
        <Button type="button" size="sm" variant={mode === 'inclusive' ? 'default' : 'outline'} onClick={() => setMode('inclusive')}>
          GST inclusive
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Amount (₹)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">GST rate: {rate}%</label>
          <div className="flex flex-wrap gap-2">
            {GST_RATES.filter((r) => r > 0).map((r) => (
              <Button key={r} type="button" size="sm" variant={rate === r ? 'default' : 'outline'} onClick={() => setRate(r)}>{r}%</Button>
            ))}
          </div>
        </div>
      </div>
      <Button type="button" onClick={calculate}>Calculate GST</Button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          <ToolStat label="Base amount" value={`₹${result.base.toFixed(2)}`} />
          <ToolStat label="GST amount" value={`₹${result.gst.toFixed(2)}`} accent />
          <ToolStat label="Total" value={`₹${result.total.toFixed(2)}`} />
        </div>
      )}
    </div>
  )
}
