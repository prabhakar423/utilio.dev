'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

const VAT_RATES = [5, 10, 15, 20, 21, 25]

export function VatCalculator() {
  const [amount, setAmount] = useState('100')
  const [rate, setRate] = useState(20)
  const [mode, setMode] = useState<'exclusive' | 'inclusive'>('exclusive')
  const [result, setResult] = useState<{ vat: number; total: number; base: number } | null>(null)

  const calculate = () => {
    const a = parseFloat(amount)
    if (Number.isNaN(a) || a <= 0) { setResult(null); return }
    const r = rate / 100
    if (mode === 'exclusive') {
      const vat = a * r
      setResult({ base: a, vat, total: a + vat })
    } else {
      const base = a / (1 + r)
      const vat = a - base
      setResult({ base, vat, total: a })
    }
  }

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button type="button" size="sm" variant={mode === 'exclusive' ? 'default' : 'outline'} onClick={() => setMode('exclusive')}>VAT exclusive</Button>
        <Button type="button" size="sm" variant={mode === 'inclusive' ? 'default' : 'outline'} onClick={() => setMode('inclusive')}>VAT inclusive</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Amount</label>
          <input type="number" min="0" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">VAT rate: {rate}%</label>
          <div className="flex flex-wrap gap-2">
            {VAT_RATES.map((r) => (
              <Button key={r} type="button" size="sm" variant={rate === r ? 'default' : 'outline'} onClick={() => setRate(r)}>{r}%</Button>
            ))}
          </div>
        </div>
      </div>
      <Button type="button" onClick={calculate}>Calculate VAT</Button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          <ToolStat label="Net amount" value={result.base.toFixed(2)} />
          <ToolStat label="VAT amount" value={result.vat.toFixed(2)} accent />
          <ToolStat label="Gross total" value={result.total.toFixed(2)} />
        </div>
      )}
    </div>
  )
}
