'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('5')
  const [frequency, setFrequency] = useState(12)
  const [result, setResult] = useState<{ amount: number; interest: number } | null>(null)

  const calculate = () => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100
    const t = parseFloat(years)
    if (Number.isNaN(p) || Number.isNaN(r) || Number.isNaN(t) || p <= 0 || t <= 0) {
      setResult(null)
      return
    }
    const amount = p * Math.pow(1 + r / frequency, frequency * t)
    setResult({ amount, interest: amount - p })
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Principal ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Annual rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Years</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Compounding</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={1}>Annually</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
            <option value={365}>Daily</option>
          </select>
        </div>
      </div>

      <Button type="button" onClick={calculate}>
        Calculate
      </Button>

      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <ToolStat label="Final amount" value={`$${result.amount.toFixed(2)}`} accent />
          <ToolStat label="Interest earned" value={`$${result.interest.toFixed(2)}`} />
        </div>
      )}
    </div>
  )
}
