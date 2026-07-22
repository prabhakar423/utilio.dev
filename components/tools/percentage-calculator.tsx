'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

type Mode = 'of' | 'increase' | 'decrease'

export function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('of')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const numA = parseFloat(a)
    const numB = parseFloat(b)
    if (Number.isNaN(numA) || Number.isNaN(numB)) {
      setResult(null)
      return
    }

    if (mode === 'of') {
      setResult(numB === 0 ? 0 : (numA / numB) * 100)
    } else if (mode === 'increase') {
      setResult(numB === 0 ? 0 : ((numA - numB) / numB) * 100)
    } else {
      setResult(numB === 0 ? 0 : ((numB - numA) / numB) * 100)
    }
  }

  const labels = {
    of: { a: 'Value', b: 'Total', hint: 'What percent is A of B?' },
    increase: { a: 'New value', b: 'Original value', hint: 'Percentage increase from B to A' },
    decrease: { a: 'New value', b: 'Original value', hint: 'Percentage decrease from B to A' },
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {(
          [
            ['of', 'X is % of Y'],
            ['increase', '% Increase'],
            ['decrease', '% Decrease'],
          ] as const
        ).map(([id, label]) => (
          <Button
            key={id}
            type="button"
            variant={mode === id ? 'default' : 'outline'}
            size="sm"
            onClick={() => {
              setMode(id)
              setResult(null)
            }}
          >
            {label}
          </Button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{labels[mode].hint}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">{labels[mode].a}</label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">{labels[mode].b}</label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <Button type="button" onClick={calculate}>
        Calculate
      </Button>

      {result !== null && (
        <ToolStat
          label="Result"
          value={`${result.toFixed(2)}%`}
          accent
        />
      )}
    </div>
  )
}
