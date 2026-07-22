'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

export function TipCalculator() {
  const [bill, setBill] = useState('50')
  const [tipPercent, setTipPercent] = useState(18)
  const [people, setPeople] = useState(1)
  const [result, setResult] = useState<{ tip: number; total: number; perPerson: number } | null>(
    null,
  )

  const calculate = () => {
    const billAmount = parseFloat(bill)
    if (Number.isNaN(billAmount) || billAmount <= 0 || people < 1) {
      setResult(null)
      return
    }
    const tip = billAmount * (tipPercent / 100)
    const total = billAmount + tip
    setResult({ tip, total, perPerson: total / people })
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Bill amount ($)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Tip: {tipPercent}%</label>
          <input
            type="range"
            min="0"
            max="50"
            value={tipPercent}
            onChange={(e) => setTipPercent(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Split between</label>
          <input
            type="number"
            min="1"
            max="50"
            value={people}
            onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <Button type="button" onClick={calculate}>
        Calculate tip
      </Button>

      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          <ToolStat label="Tip amount" value={`$${result.tip.toFixed(2)}`} accent />
          <ToolStat label="Total" value={`$${result.total.toFixed(2)}`} />
          <ToolStat label="Per person" value={`$${result.perPerson.toFixed(2)}`} />
        </div>
      )}
    </div>
  )
}
