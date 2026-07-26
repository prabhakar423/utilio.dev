'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

function computeSimple(principal: string, rate: string, years: string) {
  const p = parseFloat(principal)
  const r = parseFloat(rate)
  const t = parseFloat(years)
  if (Number.isNaN(p) || Number.isNaN(r) || Number.isNaN(t) || p <= 0 || r < 0 || t <= 0) return null
  const interest = (p * r * t) / 100
  return { interest, total: p + interest }
}

export function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('3')

  const result = useMemo(
    () => computeSimple(principal, rate, years),
    [principal, rate, years],
  )

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <ToolPanel label="Principal amount">
          <ToolInput type="number" min={0} step={0.01} value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Annual rate (%)">
          <ToolInput type="number" min={0} step={0.01} value={rate} onChange={(e) => setRate(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Time (years)">
          <ToolInput type="number" min={0} step={0.1} value={years} onChange={(e) => setYears(e.target.value)} />
        </ToolPanel>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          <ToolStat label="Interest earned" value={result.interest.toFixed(2)} accent />
          <ToolStat label="Total amount" value={result.total.toFixed(2)} />
        </div>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => { setPrincipal('10000'); setRate('8'); setYears('3') }} />
      </ToolActions>
    </div>
  )
}
