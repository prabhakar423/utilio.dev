export type TimestampTab = 'to-date' | 'to-timestamp'

export interface ParsedTimestamp {
  ms: number
  unit: 'seconds' | 'milliseconds'
}

export interface DateBreakdown {
  local: string
  iso: string
  utc: string
  relative: string
  relativeTone: 'past' | 'future' | 'now'
  unit: 'seconds' | 'milliseconds'
}

export interface TimestampBreakdown {
  seconds: number
  milliseconds: number
  iso: string
}

export function parseUnixInput(input: string): ParsedTimestamp | null {
  const trimmed = input.trim()
  if (!trimmed) return null
  const ts = Number(trimmed)
  if (Number.isNaN(ts)) return null
  const unit = ts > 1e12 || trimmed.length >= 13 ? 'milliseconds' : 'seconds'
  const ms = unit === 'milliseconds' ? ts : ts * 1000
  const date = new Date(ms)
  if (Number.isNaN(date.getTime())) return null
  return { ms, unit }
}

export function getRelativeTime(ms: number, now = Date.now()): { text: string; tone: 'past' | 'future' | 'now' } {
  const diffMs = ms - now
  const abs = Math.abs(diffMs)

  if (abs < 45_000) return { text: 'just now', tone: 'now' }

  const units: [number, string][] = [
    [86_400_000, 'day'],
    [3_600_000, 'hour'],
    [60_000, 'minute'],
  ]

  for (const [unitMs, label] of units) {
    const value = Math.round(abs / unitMs)
    if (value >= 1) {
      const plural = value === 1 ? label : `${label}s`
      return diffMs < 0
        ? { text: `${value} ${plural} ago`, tone: 'past' }
        : { text: `in ${value} ${plural}`, tone: 'future' }
    }
  }

  return diffMs < 0 ? { text: 'moments ago', tone: 'past' } : { text: 'in moments', tone: 'future' }
}

export function formatFromTimestamp(input: string): DateBreakdown | null {
  const parsed = parseUnixInput(input)
  if (!parsed) return null
  const date = new Date(parsed.ms)
  const relative = getRelativeTime(parsed.ms)
  return {
    local: date.toLocaleString(),
    iso: date.toISOString(),
    utc: date.toUTCString(),
    relative: relative.text,
    relativeTone: relative.tone,
    unit: parsed.unit,
  }
}

export function formatFromDateInput(dateInput: string): TimestampBreakdown | null {
  if (!dateInput.trim()) return null
  const date = new Date(dateInput)
  if (Number.isNaN(date.getTime())) return null
  return {
    seconds: Math.floor(date.getTime() / 1000),
    milliseconds: date.getTime(),
    iso: date.toISOString(),
  }
}
