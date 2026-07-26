'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

export function SalaryCalculator() {
  const [hourly, setHourly] = useState('25')
  const [hoursPerWeek, setHoursPerWeek] = useState('40')
  const [annual, setAnnual] = useState('52000')
  const [driver, setDriver] = useState<'hourly' | 'annual'>('hourly')

  const result = useMemo(() => {
    const hrs = parseFloat(hoursPerWeek)
    if (Number.isNaN(hrs) || hrs <= 0) return null

    if (driver === 'hourly') {
      const h = parseFloat(hourly)
      if (Number.isNaN(h) || h <= 0) return null
      const yearly = h * hrs * 52
      return { hourly: h, annual: yearly, monthly: yearly / 12 }
    }

    const a = parseFloat(annual)
    if (Number.isNaN(a) || a <= 0) return null
    const h = a / (hrs * 52)
    return { hourly: h, annual: a, monthly: a / 12 }
  }, [hourly, hoursPerWeek, annual, driver])

  const syncFromHourly = (value: string) => {
    setDriver('hourly')
    setHourly(value)
    const h = parseFloat(value)
    const hrs = parseFloat(hoursPerWeek)
    if (!Number.isNaN(h) && !Number.isNaN(hrs) && h > 0 && hrs > 0) {
      setAnnual((h * hrs * 52).toFixed(0))
    }
  }

  const syncFromAnnual = (value: string) => {
    setDriver('annual')
    setAnnual(value)
    const a = parseFloat(value)
    const hrs = parseFloat(hoursPerWeek)
    if (!Number.isNaN(a) && !Number.isNaN(hrs) && a > 0 && hrs > 0) {
      setHourly((a / (hrs * 52)).toFixed(2))
    }
  }

  const syncHours = (value: string) => {
    setHoursPerWeek(value)
    const hrs = parseFloat(value)
    if (Number.isNaN(hrs) || hrs <= 0) return
    if (driver === 'hourly') {
      const h = parseFloat(hourly)
      if (!Number.isNaN(h) && h > 0) setAnnual((h * hrs * 52).toFixed(0))
    } else {
      const a = parseFloat(annual)
      if (!Number.isNaN(a) && a > 0) setHourly((a / (hrs * 52)).toFixed(2))
    }
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <ToolPanel label="Hourly rate ($)">
          <ToolInput type="number" min={0} step={0.01} value={hourly} onChange={(e) => syncFromHourly(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Hours per week">
          <ToolInput type="number" min={1} max={168} value={hoursPerWeek} onChange={(e) => syncHours(e.target.value)} />
        </ToolPanel>
        <ToolPanel label="Annual salary ($)">
          <ToolInput type="number" min={0} step={1} value={annual} onChange={(e) => syncFromAnnual(e.target.value)} />
        </ToolPanel>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-3">
          <ToolStat label="Hourly" value={`$${result.hourly.toFixed(2)}`} />
          <ToolStat label="Monthly" value={`$${result.monthly.toFixed(2)}`} accent />
          <ToolStat label="Annual" value={`$${result.annual.toFixed(2)}`} />
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Edit hourly or annual — the other field syncs automatically based on hours per week.
      </p>

      <ToolActions>
        <ToolClearButton
          onClear={() => {
            setHourly('25')
            setHoursPerWeek('40')
            setAnnual('52000')
            setDriver('hourly')
          }}
        />
      </ToolActions>
    </div>
  )
}
