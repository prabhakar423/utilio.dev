'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

const TIMEZONES = [
  'UTC', 'America/New_York', 'America/Los_Angeles', 'America/Chicago',
  'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Kolkata',
  'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Dubai', 'Australia/Sydney',
]

function formatInTz(date: Date, tz: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
}

export function TimezoneConverter() {
  const [fromTz, setFromTz] = useState('UTC')
  const [toTz, setToTz] = useState('Asia/Kolkata')
  const [datetime, setDatetime] = useState('')
  const [output, setOutput] = useState('')

  const convert = () => {
    const date = datetime ? new Date(datetime) : new Date()
    if (Number.isNaN(date.getTime())) {
      setOutput('Invalid date/time')
      return
    }
    setOutput(`From (${fromTz}):\n${formatInTz(date, fromTz)}\n\nTo (${toTz}):\n${formatInTz(date, toTz)}`)
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">From timezone</label>
          <select value={fromTz} onChange={(e) => setFromTz(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm">
            {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">To timezone</label>
          <select value={toTz} onChange={(e) => setToTz(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm">
            {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Date & time (leave empty for now)</label>
        <input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)}
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm" />
      </div>
      <Button type="button" onClick={convert}>Convert timezone</Button>
      {output && <ToolPanel label="Result"><ToolTextarea value={output} readOnly mono={false} /></ToolPanel>}
    </div>
  )
}
