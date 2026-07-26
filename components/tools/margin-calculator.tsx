'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

function computeMargin(cost: string, price: string) {
  const c = parseFloat(cost)
  const p = parseFloat(price)
  if (Number.isNaN(c) || Number.isNaN(p) || c <= 0 || p <= 0) return null
  const profit = p - c
  return { profit, margin: (profit / p) * 100, markup: (profit / c) * 100 }
}

export function MarginCalculator() {
  const [cost, setCost] = useState('50')
  const [price, setPrice] = useState('100')

  const result = useMemo(() => computeMargin(cost, price), [cost, price])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label="Cost price">
          <ToolInput type="number" min={0} step={0.01} value={cost} onChange={(e) => setCost(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Selling price">
          <ToolInput type="number" min={0} step={0.01} value={price} onChange={(e) => setPrice(e.target.value)} />
        </ToolPanel>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-3">
          <ToolStat label="Profit" value={result.profit.toFixed(2)} accent />
          <ToolStat label="Profit margin" value={`${result.margin.toFixed(1)}%`} />
          <ToolStat label="Markup" value={`${result.markup.toFixed(1)}%`} />
        </div>
      )}

      <p className="text-xs text-muted-foreground">Margin = profit ÷ selling price. Markup = profit ÷ cost.</p>

      <ToolActions>
        <ToolClearButton onClear={() => { setCost('50'); setPrice('100') }} />
      </ToolActions>
    </div>
  )
}
