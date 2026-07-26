'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

export function TipCalculator() {
  const [bill, setBill] = useState('50')
  const [tipPercent, setTipPercent] = useState(18)
  const [people, setPeople] = useState(1)

  const result = useMemo(() => {
    const billAmount = parseFloat(bill)
    if (Number.isNaN(billAmount) || billAmount <= 0 || people < 1) return null
    const tip = billAmount * (tipPercent / 100)
    const total = billAmount + tip
    return { tip, total, perPerson: total / people }
  }, [bill, tipPercent, people])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <ToolPanel label="Bill amount ($)">
          <ToolInput
            type="number"
            min={0}
            step={0.01}
            value={bill}
            onChange={(e) => setBill(e.target.value)}
          />
        </ToolPanel>
        <ToolPanel label={`Tip: ${tipPercent}%`}>
          <input
            type="range"
            min={0}
            max={50}
            value={tipPercent}
            onChange={(e) => setTipPercent(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {[15, 18, 20, 25].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => setTipPercent(pct)}
                className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                  tipPercent === pct
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/70 text-muted-foreground hover:bg-muted'
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
        </ToolPanel>
        <ToolPanel label="Split between (people)">
          <ToolInput
            type="number"
            min={1}
            max={50}
            value={people}
            onChange={(e) => setPeople(Math.max(1, Number(e.target.value)))}
          />
        </ToolPanel>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-3">
          <ToolStat label="Tip amount" value={`$${result.tip.toFixed(2)}`} accent />
          <ToolStat label="Total" value={`$${result.total.toFixed(2)}`} />
          <ToolStat label="Per person" value={`$${result.perPerson.toFixed(2)}`} />
        </div>
      )}

      <ToolActions>
        <ToolClearButton
          onClear={() => {
            setBill('50')
            setTipPercent(18)
            setPeople(1)
          }}
        />
      </ToolActions>
    </div>
  )
}
