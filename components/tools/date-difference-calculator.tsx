'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

function diffDates(start: Date, end: Date) {
  const ms = Math.abs(end.getTime() - start.getTime())
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((ms / (1000 * 60)) % 60)
  return { days, hours, minutes, totalDays: (ms / (1000 * 60 * 60 * 24)).toFixed(2) }
}

export function DateDifferenceCalculator() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [result, setResult] = useState<ReturnType<typeof diffDates> | null>(null)

  const calculate = () => {
    if (!start || !end) return
    const d1 = new Date(start)
    const d2 = new Date(end)
    if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) { setResult(null); return }
    setResult(diffDates(d1, d2))
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Start date</label>
          <input type="date" value={start} onChange={(e) => setStart(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">End date</label>
          <input type="date" value={end} onChange={(e) => setEnd(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm" />
        </div>
      </div>
      <Button type="button" onClick={calculate}>Calculate difference</Button>
      {result && (
        <div className="grid gap-4 sm:grid-cols-4">
          <ToolStat label="Days" value={result.days} accent />
          <ToolStat label="Hours" value={result.hours} />
          <ToolStat label="Minutes" value={result.minutes} />
          <ToolStat label="Total days" value={result.totalDays} />
        </div>
      )}
    </div>
  )
}
