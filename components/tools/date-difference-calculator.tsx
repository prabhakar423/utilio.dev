'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

function diffDates(start: string, end: string) {
  if (!start || !end) return null
  const d1 = new Date(start)
  const d2 = new Date(end)
  if (Number.isNaN(d1.getTime()) || Number.isNaN(d2.getTime())) return null
  const ms = Math.abs(d2.getTime() - d1.getTime())
  return {
    days: Math.floor(ms / (1000 * 60 * 60 * 24)),
    hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((ms / (1000 * 60)) % 60),
    totalDays: (ms / (1000 * 60 * 60 * 24)).toFixed(2),
  }
}

export function DateDifferenceCalculator() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const result = useMemo(() => diffDates(start, end), [start, end])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label="Start date">
          <ToolInput type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="End date">
          <ToolInput type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
        </ToolPanel>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-4">
          <ToolStat label="Days" value={result.days} accent />
          <ToolStat label="Hours" value={result.hours} />
          <ToolStat label="Minutes" value={result.minutes} />
          <ToolStat label="Total days" value={result.totalDays} />
        </div>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => { setStart(''); setEnd('') }} />
      </ToolActions>
    </div>
  )
}
