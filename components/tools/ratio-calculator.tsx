'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolError, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

function computeRatio(a: string, b: string, c: string) {
  const na = parseFloat(a)
  const nb = parseFloat(b)
  const nc = parseFloat(c)
  if ([na, nb, nc].some((n) => Number.isNaN(n)) || nb === 0 || na === 0) {
    return { error: 'Enter valid numbers (a and b cannot be zero)', result: null as number | null }
  }
  return { error: '', result: (nc * nb) / na }
}

export function RatioCalculator() {
  const [a, setA] = useState('2')
  const [b, setB] = useState('3')
  const [c, setC] = useState('10')

  const { result, error } = useMemo(() => computeRatio(a, b, c), [a, b, c])

  const display = result !== null ? (Number.isInteger(result) ? String(result) : result.toFixed(4)) : ''

  return (
    <div className="grid gap-5">
      <p className="text-sm text-muted-foreground">Solve proportions: if a : b = c : x, find x.</p>

      <div className="grid grid-cols-3 gap-4">
        <ToolPanel label="a">
          <ToolInput type="number" value={a} onChange={(e) => setA(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="b">
          <ToolInput type="number" value={b} onChange={(e) => setB(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="c">
          <ToolInput type="number" value={c} onChange={(e) => setC(e.target.value)} />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}

      {result !== null && !error && (
        <>
          <ToolStat label="x (result)" value={display} accent />
          <p className="text-sm text-muted-foreground">{a} : {b} = {c} : {display}</p>
        </>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => { setA('2'); setB('3'); setC('10') }} />
      </ToolActions>
    </div>
  )
}
