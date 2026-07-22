'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions } from '@/components/tools/tool-ui'

const PRESETS = [
  { label: 'Every minute', value: '* * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Daily at midnight', value: '0 0 * * *' },
  { label: 'Daily at 9 AM', value: '0 9 * * *' },
  { label: 'Weekdays at 9 AM', value: '0 9 * * 1-5' },
  { label: 'Every Monday', value: '0 0 * * 1' },
  { label: 'First of month', value: '0 0 1 * *' },
] as const

export function CronGenerator() {
  const [minute, setMinute] = useState('0')
  const [hour, setHour] = useState('9')
  const [day, setDay] = useState('*')
  const [month, setMonth] = useState('*')
  const [weekday, setWeekday] = useState('1-5')
  const [expression, setExpression] = useState('0 9 * * 1-5')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    setExpression(`${minute} ${hour} ${day} ${month} ${weekday}`)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(expression)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Quick presets</label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <Button
              key={preset.value}
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setExpression(preset.value)
                const [m, h, d, mo, w] = preset.value.split(' ')
                setMinute(m)
                setHour(h)
                setDay(d)
                setMonth(mo)
                setWeekday(w)
              }}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-5">
        {([
          ['Minute', minute, setMinute, '0-59 or *'],
          ['Hour', hour, setHour, '0-23 or *'],
          ['Day', day, setDay, '1-31 or *'],
          ['Month', month, setMonth, '1-12 or *'],
          ['Weekday', weekday, setWeekday, '0-7 or *'],
        ] as const).map(([label, value, setter, hint]) => (
          <div key={label}>
            <label className="mb-2 block text-sm font-medium">{label}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setter(e.target.value)}
              placeholder={hint}
              className="w-full rounded-xl border border-border/80 px-3 py-2 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        ))}
      </div>
      <ToolActions>
        <Button type="button" onClick={generate}>Generate expression</Button>
        <Button type="button" variant="secondary" onClick={copy}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Cron expression</p>
        <code className="mt-1 block font-mono text-lg">{expression}</code>
      </div>
      <p className="text-xs text-muted-foreground">
        Format: minute hour day-of-month month day-of-week (standard 5-field cron)
      </p>
    </div>
  )
}
