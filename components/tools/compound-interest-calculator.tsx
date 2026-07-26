'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolSelect, ToolStat } from '@/components/tools/tool-ui'

function computeCompound(principal: string, rate: string, years: string, frequency: number) {
  const p = parseFloat(principal)
  const r = parseFloat(rate) / 100
  const t = parseFloat(years)
  if (Number.isNaN(p) || Number.isNaN(r) || Number.isNaN(t) || p <= 0 || t <= 0) return null
  const amount = p * Math.pow(1 + r / frequency, frequency * t)
  return { amount, interest: amount - p }
}

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('5')
  const [frequency, setFrequency] = useState(12)

  const result = useMemo(
    () => computeCompound(principal, rate, years, frequency),
    [principal, rate, years, frequency],
  )

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label="Principal ($)">
          <ToolInput type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Annual rate (%)">
          <ToolInput type="number" step={0.1} value={rate} onChange={(e) => setRate(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Years">
          <ToolInput type="number" value={years} onChange={(e) => setYears(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Compounding">
          <ToolSelect value={frequency} onChange={(e) => setFrequency(Number(e.target.value))}>
            <option value={1}>Annually</option>
            <option value={4}>Quarterly</option>
            <option value={12}>Monthly</option>
            <option value={365}>Daily</option>
          </ToolSelect>
        </ToolPanel>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          <ToolStat label="Final amount" value={`$${result.amount.toFixed(2)}`} accent />
          <ToolStat label="Interest earned" value={`$${result.interest.toFixed(2)}`} />
        </div>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => { setPrincipal('10000'); setRate('8'); setYears('5'); setFrequency(12) }} />
      </ToolActions>
    </div>
  )
}
