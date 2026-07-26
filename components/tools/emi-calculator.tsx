'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

function calculateEmi(principal: number, rate: number, tenure: number) {
  if (principal <= 0 || rate < 0 || tenure <= 0) return null

  const monthlyRate = rate / 12 / 100
  const monthlyEmi =
    monthlyRate === 0
      ? principal / tenure
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1)

  const totalAmount = monthlyEmi * tenure
  return {
    monthlyEmi,
    totalAmount,
    totalInterest: totalAmount - principal,
  }
}

function formatInr(value: number) {
  return `₹${value.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`
}

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(12)

  const result = useMemo(
    () => calculateEmi(principal, rate, tenure),
    [principal, rate, tenure],
  )

  return (
    <div className="grid gap-5">
      <ToolPanel label={`Loan amount: ${formatInr(principal)}`}>
        <input
          type="range"
          min={10000}
          max={10000000}
          step={10000}
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <ToolInput
          type="number"
          min={1000}
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="mt-2"
        />
      </ToolPanel>

      <ToolPanel label={`Annual interest rate: ${rate.toFixed(2)}%`}>
        <input
          type="range"
          min={0}
          max={30}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <ToolInput
          type="number"
          min={0}
          step={0.1}
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="mt-2"
        />
      </ToolPanel>

      <ToolPanel label={`Tenure: ${tenure} months (${(tenure / 12).toFixed(1)} years)`}>
        <input
          type="range"
          min={1}
          max={480}
          step={1}
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <ToolInput
          type="number"
          min={1}
          max={480}
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="mt-2"
        />
      </ToolPanel>

      {result && (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <ToolStat label="Monthly EMI" value={formatInr(result.monthlyEmi)} accent />
            <ToolStat label="Total interest" value={formatInr(result.totalInterest)} />
            <ToolStat label="Total payable" value={formatInr(result.totalAmount)} />
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/20 p-4 text-sm">
            <p className="font-medium">Payment summary</p>
            <dl className="mt-3 space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <dt>Principal</dt>
                <dd className="font-medium text-foreground">{formatInr(principal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Rate</dt>
                <dd className="font-medium text-foreground">{rate.toFixed(2)}% p.a.</dd>
              </div>
              <div className="flex justify-between">
                <dt>Tenure</dt>
                <dd className="font-medium text-foreground">{tenure} months</dd>
              </div>
              <div className="flex justify-between border-t border-border/60 pt-2">
                <dt>Monthly EMI</dt>
                <dd className="font-semibold text-foreground">{formatInr(result.monthlyEmi)}</dd>
              </div>
            </dl>
          </div>
        </>
      )}

      <ToolActions>
        <ToolClearButton
          onClear={() => {
            setPrincipal(100000)
            setRate(8.5)
            setTenure(12)
          }}
        />
      </ToolActions>
    </div>
  )
}
