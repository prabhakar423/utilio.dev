'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function UnixTimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [dateInput, setDateInput] = useState('')
  const [result, setResult] = useState('')

  const now = Math.floor(Date.now() / 1000)

  const tsToDate = () => {
    const ts = Number(timestamp)
    if (!timestamp || Number.isNaN(ts)) {
      setResult('Enter a valid numeric timestamp')
      return
    }
    const ms = ts > 1e12 ? ts : ts * 1000
    const date = new Date(ms)
    if (Number.isNaN(date.getTime())) {
      setResult('Invalid timestamp')
      return
    }
    setResult(
      `Local: ${date.toLocaleString()}\nISO: ${date.toISOString()}\nUTC: ${date.toUTCString()}`,
    )
  }

  const dateToTs = () => {
    if (!dateInput) return
    const date = new Date(dateInput)
    if (Number.isNaN(date.getTime())) {
      setResult('Invalid date')
      return
    }
    const seconds = Math.floor(date.getTime() / 1000)
    setResult(`Seconds: ${seconds}\nMilliseconds: ${date.getTime()}`)
  }

  const useNow = () => {
    setTimestamp(String(now))
    setResult(
      `Local: ${new Date().toLocaleString()}\nISO: ${new Date().toISOString()}\nSeconds: ${now}`,
    )
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <ToolPanel label="Unix timestamp → Date">
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="e.g. 1700000000"
              className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </ToolPanel>
          <div className="flex gap-2">
            <Button type="button" size="sm" onClick={tsToDate}>
              Convert to date
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={useNow}>
              Use current time
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <ToolPanel label="Date → Unix timestamp">
            <input
              type="datetime-local"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </ToolPanel>
          <Button type="button" size="sm" onClick={dateToTs}>
            Convert to timestamp
          </Button>
        </div>
      </div>

      {result && (
        <ToolPanel label="Result">
          <ToolTextarea value={result} readOnly className="min-h-24" />
        </ToolPanel>
      )}
    </div>
  )
}
