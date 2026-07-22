'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('3')
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null)

  const calculate = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate)
    const t = parseFloat(years)
    if (Number.isNaN(p) || Number.isNaN(r) || Number.isNaN(t) || p <= 0 || r < 0 || t <= 0) {
      setResult(null)
      return
    }
    const interest = (p * r * t) / 100
    setResult({ interest, total: p + interest })
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Principal amount</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Annual rate (%)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Time (years)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <Button type="button" onClick={calculate}>Calculate interest</Button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <ToolStat label="Interest earned" value={result.interest.toFixed(2)} accent />
          <ToolStat label="Total amount" value={result.total.toFixed(2)} />
        </div>
      )}
    </div>
  )
}
