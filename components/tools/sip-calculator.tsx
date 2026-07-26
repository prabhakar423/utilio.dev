'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

function computeSip(monthly: string, rate: string, years: string) {
  const p = parseFloat(monthly)
  const r = parseFloat(rate) / 100 / 12
  const n = parseFloat(years) * 12
  if (Number.isNaN(p) || Number.isNaN(r) || Number.isNaN(n) || p <= 0 || n <= 0) return null
  const total = r === 0 ? p * n : p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
  const invested = p * n
  return { invested, returns: total - invested, total }
}

function fmt(n: number) {
  return `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export function SipCalculator() {
  const [monthly, setMonthly] = useState('5000')
  const [rate, setRate] = useState('12')
  const [years, setYears] = useState('10')

  const result = useMemo(
    () => computeSip(monthly, rate, years),
    [monthly, rate, years],
  )

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <ToolPanel label="Monthly investment (₹)">
          <ToolInput type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Expected return (% p.a.)">
          <ToolInput type="number" step={0.1} value={rate} onChange={(e) => setRate(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Time period (years)">
          <ToolInput type="number" value={years} onChange={(e) => setYears(e.target.value)} />
        </ToolPanel>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-3">
          <ToolStat label="Total invested" value={fmt(result.invested)} />
          <ToolStat label="Est. returns" value={fmt(result.returns)} accent />
          <ToolStat label="Maturity value" value={fmt(result.total)} />
        </div>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => { setMonthly('5000'); setRate('12'); setYears('10') }} />
      </ToolActions>
    </div>
  )
}
