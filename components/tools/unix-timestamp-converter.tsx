'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { timestamp: '', dateInput: '' }

function formatTimestampResult(timestamp: string): string {
  const ts = Number(timestamp)
  if (!timestamp.trim() || Number.isNaN(ts)) return ''
  const ms = ts > 1e12 ? ts : ts * 1000
  const date = new Date(ms)
  if (Number.isNaN(date.getTime())) return ''
  return `Local: ${date.toLocaleString()}\nISO: ${date.toISOString()}\nUTC: ${date.toUTCString()}`
}

function formatDateResult(dateInput: string): string {
  if (!dateInput.trim()) return ''
  const date = new Date(dateInput)
  if (Number.isNaN(date.getTime())) return ''
  const seconds = Math.floor(date.getTime() / 1000)
  return `Seconds: ${seconds}\nMilliseconds: ${date.getTime()}`
}

export function UnixTimestampConverter() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)

  const tsResult = useMemo(() => formatTimestampResult(state.timestamp), [state.timestamp])
  const dateResult = useMemo(() => formatDateResult(state.dateInput), [state.dateInput])

  const result = useMemo(() => {
    const parts: string[] = []
    if (tsResult) parts.push(`From timestamp:\n${tsResult}`)
    if (dateResult) parts.push(`From date:\n${dateResult}`)
    return parts.join('\n\n')
  }, [tsResult, dateResult])

  const useNow = () => {
    const now = Math.floor(Date.now() / 1000)
    setField('timestamp', String(now))
  }

  const clearAll = () => {
    setField('timestamp', '')
    setField('dateInput', '')
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          <ToolPanel label="Unix timestamp → Date">
            <ToolInput
              type="text"
              value={state.timestamp}
              onChange={(e) => setField('timestamp', e.target.value)}
              placeholder="e.g. 1700000000"
              className="font-mono"
            />
          </ToolPanel>
          <Button type="button" size="sm" variant="outline" onClick={useNow}>
            Use current time
          </Button>
        </div>

        <ToolPanel label="Date → Unix timestamp">
          <ToolInput
            type="datetime-local"
            value={state.dateInput}
            onChange={(e) => setField('dateInput', e.target.value)}
          />
        </ToolPanel>
      </div>

      <ToolPanel label="Result">
        <ToolTextarea value={result} readOnly className="min-h-24" placeholder="Results appear as you type…" />
      </ToolPanel>

      <ToolActions>
        <ToolCopyButton text={result} disabled={!result} />
        <ToolClearButton onClear={clearAll} />
      </ToolActions>
    </div>
  )
}
