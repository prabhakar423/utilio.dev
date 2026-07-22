'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

export function MarginCalculator() {
  const [cost, setCost] = useState('50')
  const [price, setPrice] = useState('100')
  const [result, setResult] = useState<{ profit: number; margin: number; markup: number } | null>(null)

  const calculate = () => {
    const c = parseFloat(cost)
    const p = parseFloat(price)
    if (Number.isNaN(c) || Number.isNaN(p) || c <= 0 || p <= 0) { setResult(null); return }
    const profit = p - c
    const margin = (profit / p) * 100
    const markup = (profit / c) * 100
    setResult({ profit, margin, markup })
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Cost price</label>
          <input type="number" min="0" step="0.01" value={cost} onChange={(e) => setCost(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Selling price</label>
          <input type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>
      <Button type="button" onClick={calculate}>Calculate margin</Button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          <ToolStat label="Profit" value={result.profit.toFixed(2)} accent />
          <ToolStat label="Profit margin" value={`${result.margin.toFixed(1)}%`} />
          <ToolStat label="Markup" value={`${result.markup.toFixed(1)}%`} />
        </div>
      )}
      <p className="text-xs text-muted-foreground">Margin = profit ÷ selling price. Markup = profit ÷ cost.</p>
    </div>
  )
}
