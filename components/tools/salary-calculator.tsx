'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

export function SalaryCalculator() {
  const [hourly, setHourly] = useState('25')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [annual, setAnnual] = useState('')
  const [result, setResult] = useState<{ hourly: number; annual: number; monthly: number } | null>(null)

  const fromHourly = () => {
    const h = parseFloat(hourly)
    const hrs = parseFloat(hoursPerWeek)
    if (Number.isNaN(h) || Number.isNaN(hrs) || h <= 0 || hrs <= 0) { setResult(null); return }
    const yearly = h * hrs * 52
    setAnnual(yearly.toFixed(2))
    setResult({ hourly: h, annual: yearly, monthly: yearly / 12 })
  }

  const fromAnnual = () => {
    const a = parseFloat(annual)
    const hrs = parseFloat(hoursPerWeek)
    if (Number.isNaN(a) || Number.isNaN(hrs) || a <= 0 || hrs <= 0) { setResult(null); return }
    const h = a / (hrs * 52)
    setHourly(h.toFixed(2))
    setResult({ hourly: h, annual: a, monthly: a / 12 })
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm font-medium">Hourly rate ($)</label>
          <input type="number" min="0" step="0.01" value={hourly} onChange={(e) => setHourly(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Hours per week</label>
          <input type="number" min="1" max="168" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Annual salary ($)</label>
          <input type="number" min="0" step="0.01" value={annual} onChange={(e) => setAnnual(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={fromHourly}>Hourly → Annual</Button>
        <Button type="button" variant="outline" onClick={fromAnnual}>Annual → Hourly</Button>
      </div>
      {result && (
        <div className="grid gap-4 sm:grid-cols-3">
          <ToolStat label="Hourly" value={`$${result.hourly.toFixed(2)}`} />
          <ToolStat label="Monthly" value={`$${result.monthly.toFixed(2)}`} accent />
          <ToolStat label="Annual" value={`$${result.annual.toFixed(2)}`} />
        </div>
      )}
    </div>
  )
}
