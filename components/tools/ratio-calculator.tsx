'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

export function RatioCalculator() {
  const [a, setA] = useState('2')
  const [b, setB] = useState('3')
  const [c, setC] = useState('10')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState('')

  const calculate = () => {
    setError('')
    const na = parseFloat(a)
    const nb = parseFloat(b)
    const nc = parseFloat(c)
    if ([na, nb, nc].some((n) => Number.isNaN(n)) || nb === 0) {
      setError('Enter valid numbers (b cannot be zero)')
      setResult(null)
      return
    }
    setResult((nc * nb) / na)
  }

  return (
    <div className="grid gap-5">
      <p className="text-sm text-muted-foreground">Solve proportions: if a : b = c : x, find x.</p>
      <div className="grid grid-cols-3 items-end gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">a</label>
          <input type="number" value={a} onChange={(e) => setA(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">b</label>
          <input type="number" value={b} onChange={(e) => setB(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">c</label>
          <input type="number" value={c} onChange={(e) => setC(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <Button type="button" onClick={calculate}>Calculate x</Button>
      {result !== null && (
        <>
          <ToolStat label="x (result)" value={Number.isInteger(result) ? result : result.toFixed(4)} accent />
          <p className="text-sm text-muted-foreground">{a} : {b} = {c} : {Number.isInteger(result) ? result : result.toFixed(4)}</p>
        </>
      )}
    </div>
  )
}
