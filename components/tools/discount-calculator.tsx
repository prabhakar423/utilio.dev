'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

export function DiscountCalculator() {
  const [price, setPrice] = useState('100')
  const [discount, setDiscount] = useState('20')
  const [result, setResult] = useState<{ finalPrice: number; savings: number } | null>(null)

  const calculate = () => {
    const original = parseFloat(price)
    const percent = parseFloat(discount)
    if (Number.isNaN(original) || Number.isNaN(percent) || original < 0 || percent < 0 || percent > 100) {
      setResult(null)
      return
    }
    const savings = original * (percent / 100)
    setResult({ finalPrice: original - savings, savings })
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Original price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Discount (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <Button type="button" onClick={calculate}>Calculate discount</Button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <ToolStat label="Final price" value={result.finalPrice.toFixed(2)} accent />
          <ToolStat label="You save" value={result.savings.toFixed(2)} />
        </div>
      )}
    </div>
  )
}
