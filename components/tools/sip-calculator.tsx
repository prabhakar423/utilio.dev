'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

export function SipCalculator() {
  const [monthly, setMonthly] = useState('5000')
  const [rate, setRate] = useState('12')
  const [years, setYears] = useState('10')
  const [result, setResult] = useState<{ invested: number; returns: number; total: number } | null>(
    null,
  )

  const calculate = () => {
    const p = parseFloat(monthly)
    const r = parseFloat(rate) / 100 / 12
    const n = parseFloat(years) * 12
    if (Number.isNaN(p) || Number.isNaN(r) || Number.isNaN(n) || p <= 0 || n <= 0) {
      setResult(null)
      return
    }
    const total = r === 0 ? p * n : p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    const invested = p * n
    setResult({ invested, returns: total - invested, total })
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Monthly investment (₹)</label>
          <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Expected return (% p.a.)</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Time period (years)</label>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>
      <Button type="button" onClick={calculate}>Calculate SIP</Button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          <ToolStat label="Total invested" value={`₹${result.invested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} />
          <ToolStat label="Est. returns" value={`₹${result.returns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} accent />
          <ToolStat label="Maturity value" value={`₹${result.total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`} />
        </div>
      )}
    </div>
  )
}
