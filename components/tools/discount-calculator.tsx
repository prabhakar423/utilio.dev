'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

function computeDiscount(price: string, discount: string) {
  const original = parseFloat(price)
  const percent = parseFloat(discount)
  if (Number.isNaN(original) || Number.isNaN(percent) || original < 0 || percent < 0 || percent > 100) {
    return null
  }
  const savings = original * (percent / 100)
  return { finalPrice: original - savings, savings }
}

export function DiscountCalculator() {
  const [price, setPrice] = useState('100')
  const [discount, setDiscount] = useState('20')

  const result = useMemo(
    () => computeDiscount(price, discount),
    [price, discount],
  )

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label="Original price">
          <ToolInput type="number" min={0} step={0.01} value={price} onChange={(e) => setPrice(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Discount (%)">
          <ToolInput type="number" min={0} max={100} step={0.1} value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </ToolPanel>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          <ToolStat label="Final price" value={result.finalPrice.toFixed(2)} accent />
          <ToolStat label="You save" value={result.savings.toFixed(2)} />
        </div>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => { setPrice('100'); setDiscount('20') }} />
      </ToolActions>
    </div>
  )
}
