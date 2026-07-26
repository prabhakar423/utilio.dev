'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

type Mode = 'of' | 'increase' | 'decrease'

const LABELS = {
  of: { a: 'Value', b: 'Total', hint: 'What percent is A of B?' },
  increase: { a: 'New value', b: 'Original value', hint: 'Percentage increase from B to A' },
  decrease: { a: 'New value', b: 'Original value', hint: 'Percentage decrease from B to A' },
}

function computePercentage(mode: Mode, a: string, b: string) {
  const numA = parseFloat(a)
  const numB = parseFloat(b)
  if (Number.isNaN(numA) || Number.isNaN(numB)) return null
  if (mode === 'of') return numB === 0 ? 0 : (numA / numB) * 100
  if (mode === 'increase') return numB === 0 ? 0 : ((numA - numB) / numB) * 100
  return numB === 0 ? 0 : ((numB - numA) / numB) * 100
}

export function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>('of')
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const result = useMemo(() => computePercentage(mode, a, b), [mode, a, b])

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
          <Button key={id} type="button" variant={mode === id ? 'default' : 'outline'} size="sm" onClick={() => setMode(id)}>
            {label}
          </Button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">{LABELS[mode].hint}</p>

      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label={LABELS[mode].a}>
          <ToolInput type="number" value={a} onChange={(e) => setA(e.target.value)} />
        </ToolPanel>
        <ToolPanel label={LABELS[mode].b}>
          <ToolInput type="number" value={b} onChange={(e) => setB(e.target.value)} />
        </ToolPanel>
      </div>

      {result !== null && a && b && (
        <ToolStat label="Result" value={`${result.toFixed(2)}%`} accent />
      )}

      <ToolActions>
        <ToolClearButton onClear={() => { setA(''); setB('') }} />
      </ToolActions>
    </div>
  )
}
