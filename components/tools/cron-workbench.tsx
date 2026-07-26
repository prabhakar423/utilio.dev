'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { CalendarClock, ScanSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolInput,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import {
  CRON_EXAMPLE,
  CRON_FIELD_LABELS,
  CRON_PRESETS,
  describeCron,
  formatCronRun,
  getNextCronRuns,
  parseExpressionToFields,
  type CronTab,
} from '@/lib/cron'

const SHARE_INITIAL = {
  tab: 'parse' as CronTab,
  expression: CRON_EXAMPLE,
  minute: '0',
  hour: '9',
  day: '*',
  month: '*',
  weekday: '1-5',
}

const TABS: { id: CronTab; label: string; icon: typeof ScanSearch }[] = [
  { id: 'parse', label: 'Parse', icon: ScanSearch },
  { id: 'build', label: 'Build', icon: CalendarClock },
]

interface CronWorkbenchProps {
  defaultTab?: CronTab
}

export function CronWorkbench({ defaultTab = 'parse' }: CronWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as CronTab

  const builtExpression = `${state.minute} ${state.hour} ${state.day} ${state.month} ${state.weekday}`
  const activeExpression = tab === 'build' ? builtExpression : state.expression

  const described = useMemo(() => describeCron(activeExpression), [activeExpression])

  const nextRuns = useMemo(() => {
    if ('error' in described) return described
    return getNextCronRuns(activeExpression, 5)
  }, [activeExpression, described])

  const applyPreset = (value: string) => {
    const fields = parseExpressionToFields(value)
    if (!fields) return
    setField('expression', value)
    setField('minute', fields.minute)
    setField('hour', fields.hour)
    setField('day', fields.day)
    setField('month', fields.month)
    setField('weekday', fields.weekday)
  }

  const inspectInParse = () => {
    setField('expression', builtExpression)
    setField('tab', 'parse')
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            type="button"
            variant={tab === id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setField('tab', id)}
          >
            <Icon className="size-3.5" />
            {label}
          </Button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        Cron workbench — parse expressions into plain English, preview upcoming runs, and build
        schedules with presets.{' '}
        <Link href="/tools/cron-parser" className="text-primary underline-offset-4 hover:underline">
          Parser
        </Link>
        {' · '}
        <Link href="/tools/cron-generator" className="text-primary underline-offset-4 hover:underline">
          Generator
        </Link>
      </p>

      {tab === 'parse' && (
        <ToolPanel label="Cron expression (minute hour day month weekday)">
          <ToolInput
            type="text"
            value={state.expression}
            onChange={(e) => setField('expression', e.target.value)}
            placeholder={CRON_EXAMPLE}
            className="font-mono"
          />
        </ToolPanel>
      )}

      {tab === 'build' && (
        <>
          <div>
            <label className="mb-2 block text-sm font-medium">Quick presets</label>
            <div className="flex flex-wrap gap-2">
              {CRON_PRESETS.map((preset) => (
                <Button
                  key={preset.value}
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => applyPreset(preset.value)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-5">
            {(
              [
                ['minute', 'Minute', '0-59 or *'],
                ['hour', 'Hour', '0-23 or *'],
                ['day', 'Day', '1-31 or *'],
                ['month', 'Month', '1-12 or *'],
                ['weekday', 'Weekday', '0-7 or *'],
              ] as const
            ).map(([key, label, hint]) => (
              <ToolPanel key={key} label={label}>
                <ToolInput
                  type="text"
                  value={state[key]}
                  onChange={(e) => setField(key, e.target.value)}
                  placeholder={hint}
                  className="font-mono"
                />
              </ToolPanel>
            ))}
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Generated expression
            </p>
            <code className="mt-1 block font-mono text-lg">{builtExpression}</code>
          </div>
        </>
      )}

      {'error' in described && <ToolError message={described.error} />}

      {'fields' in described && (
        <>
          <div className="overflow-x-auto rounded-xl border border-border/70">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/70 bg-muted/30 text-left">
                  <th className="px-4 py-2 font-medium">Field</th>
                  <th className="px-4 py-2 font-medium">Value</th>
                  <th className="px-4 py-2 font-medium">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {described.fields.map((field) => (
                  <tr key={field.field} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-2">{field.field}</td>
                    <td className="px-4 py-2 font-mono text-xs">{field.value}</td>
                    <td className="px-4 py-2 text-muted-foreground">{field.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ToolPanel label="Summary">
            <ToolTextarea value={described.summary} readOnly mono={false} className="min-h-20" />
          </ToolPanel>
        </>
      )}

      {'runs' in nextRuns && (
        <ToolPanel label="Next 5 runs (local time)">
          <ul className="space-y-2 rounded-xl border border-border/70 bg-muted/20 px-4 py-3 text-sm">
            {nextRuns.runs.map((run) => (
              <li key={run.toISOString()} className="font-mono">
                {formatCronRun(run)}
              </li>
            ))}
          </ul>
        </ToolPanel>
      )}

      {'error' in nextRuns && 'fields' in described && (
        <ToolError message={nextRuns.error} />
      )}

      <ToolActions>
        <ToolCopyButton text={activeExpression} label="Copy expression" disabled={!activeExpression.trim()} />
        <ToolClearButton
          onClear={() => {
            setField('expression', '')
            setField('minute', '*')
            setField('hour', '*')
            setField('day', '*')
            setField('month', '*')
            setField('weekday', '*')
          }}
        />
        <Button type="button" variant="outline" onClick={() => applyPreset(CRON_EXAMPLE)}>
          Load example
        </Button>
        {tab === 'build' && (
          <Button type="button" variant="outline" size="sm" onClick={inspectInParse}>
            Parse this →
          </Button>
        )}
      </ToolActions>

      <ToolExample title="Field order">
        <p className="font-mono">{CRON_FIELD_LABELS.join(' · ')}</p>
        <p className="mt-2">
          Example <code className="rounded bg-muted px-1">{CRON_EXAMPLE}</code> — 9:00 AM, Monday through
          Friday.
        </p>
      </ToolExample>

      <p className="text-xs text-muted-foreground">
        Standard 5-field cron (minute hour day-of-month month day-of-week). Next-run previews use your
        browser&apos;s local timezone.
      </p>
    </div>
  )
}
