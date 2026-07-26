'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowDownToLine, ArrowUpFromLine, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolInput,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import {
  formatFromDateInput,
  formatFromTimestamp,
  type TimestampTab,
} from '@/lib/timestamp'
import { cn } from '@/lib/utils'

const SHARE_INITIAL = {
  tab: 'to-date' as TimestampTab,
  timestamp: '',
  dateInput: '',
}

const TABS: { id: TimestampTab; label: string; icon: typeof ArrowDownToLine }[] = [
  { id: 'to-date', label: 'Timestamp → Date', icon: ArrowDownToLine },
  { id: 'to-timestamp', label: 'Date → Timestamp', icon: ArrowUpFromLine },
]

interface TimestampWorkbenchProps {
  defaultTab?: TimestampTab
}

function relativeBadgeClass(tone: 'past' | 'future' | 'now'): string {
  if (tone === 'past') return 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400'
  if (tone === 'future') return 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-400'
  return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
}

export function TimestampWorkbench({ defaultTab = 'to-date' }: TimestampWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as TimestampTab

  const dateBreakdown = useMemo(
    () => (tab === 'to-date' ? formatFromTimestamp(state.timestamp) : null),
    [tab, state.timestamp],
  )

  const timestampBreakdown = useMemo(
    () => (tab === 'to-timestamp' ? formatFromDateInput(state.dateInput) : null),
    [tab, state.dateInput],
  )

  const timestampError =
    tab === 'to-date' && state.timestamp.trim() && !dateBreakdown
      ? 'Invalid timestamp. Use seconds (10 digits) or milliseconds (13 digits).'
      : ''

  const dateError =
    tab === 'to-timestamp' && state.dateInput.trim() && !timestampBreakdown
      ? 'Invalid date. Pick a value from the date picker.'
      : ''

  const copyText = useMemo(() => {
    if (tab === 'to-date' && dateBreakdown) {
      return [
        `Relative: ${dateBreakdown.relative}`,
        `Local: ${dateBreakdown.local}`,
        `ISO: ${dateBreakdown.iso}`,
        `UTC: ${dateBreakdown.utc}`,
        `Detected unit: ${dateBreakdown.unit}`,
      ].join('\n')
    }
    if (tab === 'to-timestamp' && timestampBreakdown) {
      return [
        `Seconds: ${timestampBreakdown.seconds}`,
        `Milliseconds: ${timestampBreakdown.milliseconds}`,
        `ISO: ${timestampBreakdown.iso}`,
      ].join('\n')
    }
    return ''
  }, [tab, dateBreakdown, timestampBreakdown])

  const useNow = () => {
    setField('timestamp', String(Math.floor(Date.now() / 1000)))
    setField('tab', 'to-date')
  }

  const useNowAsDate = () => {
    const now = new Date()
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
      .toISOString()
      .slice(0, 16)
    setField('dateInput', local)
    setField('tab', 'to-timestamp')
  }

  const clearAll = () => {
    setField('timestamp', '')
    setField('dateInput', '')
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

      {tab === 'to-date' ? (
        <div className="space-y-3">
          <ToolPanel label="Unix timestamp">
            <ToolInput
              type="text"
              value={state.timestamp}
              onChange={(e) => setField('timestamp', e.target.value)}
              placeholder="e.g. 1700000000 or 1700000000000"
              className="font-mono"
            />
          </ToolPanel>
          <Button type="button" size="sm" variant="outline" onClick={useNow}>
            <Clock className="size-3.5" />
            Use current time
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <ToolPanel label="Date and time">
            <ToolInput
              type="datetime-local"
              value={state.dateInput}
              onChange={(e) => setField('dateInput', e.target.value)}
            />
          </ToolPanel>
          <Button type="button" size="sm" variant="outline" onClick={useNowAsDate}>
            <Clock className="size-3.5" />
            Use current time
          </Button>
        </div>
      )}

      {(timestampError || dateError) && <ToolError message={timestampError || dateError} />}

      {tab === 'to-date' && dateBreakdown && (
        <div className="space-y-4 rounded-2xl border border-border/70 bg-muted/20 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Relative time</span>
            <span
              className={cn(
                'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium',
                relativeBadgeClass(dateBreakdown.relativeTone),
              )}
            >
              {dateBreakdown.relative}
            </span>
            <span className="text-xs text-muted-foreground">
              ({dateBreakdown.unit === 'seconds' ? 'interpreted as seconds' : 'interpreted as milliseconds'})
            </span>
          </div>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Local</dt>
              <dd className="mt-1 font-mono">{dateBreakdown.local}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">ISO 8601</dt>
              <dd className="mt-1 break-all font-mono">{dateBreakdown.iso}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">UTC</dt>
              <dd className="mt-1 font-mono">{dateBreakdown.utc}</dd>
            </div>
          </dl>
        </div>
      )}

      {tab === 'to-timestamp' && timestampBreakdown && (
        <div className="space-y-4 rounded-2xl border border-border/70 bg-muted/20 p-5">
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">Seconds</dt>
              <dd className="mt-1 font-mono text-lg">{timestampBreakdown.seconds}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Milliseconds</dt>
              <dd className="mt-1 font-mono text-lg">{timestampBreakdown.milliseconds}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">ISO 8601</dt>
              <dd className="mt-1 break-all font-mono">{timestampBreakdown.iso}</dd>
            </div>
          </dl>
        </div>
      )}

      {copyText && (
        <ToolPanel label="Copy-friendly output">
          <ToolTextarea value={copyText} readOnly className="min-h-24 font-mono text-sm" />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={copyText} disabled={!copyText} />
        <ToolClearButton onClear={clearAll} />
      </ToolActions>

      <p className="text-xs text-muted-foreground">
        JWT expiry claims use Unix seconds — decode and inspect them in the{' '}
        <Link href="/tools/jwt-decoder" className="font-medium text-primary hover:text-primary/80">
          JWT workbench
        </Link>
        . For timezone offsets, use the{' '}
        <Link href="/tools/timezone-converter" className="font-medium text-primary hover:text-primary/80">
          Timezone Converter
        </Link>
        .
      </p>
    </div>
  )
}
