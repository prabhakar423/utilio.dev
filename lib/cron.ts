export type CronTab = 'parse' | 'build'

export const CRON_FIELD_LABELS = [
  'Minute',
  'Hour',
  'Day of month',
  'Month',
  'Day of week',
] as const

export const CRON_PRESETS = [
  { label: 'Every minute', value: '* * * * *' },
  { label: 'Every hour', value: '0 * * * *' },
  { label: 'Daily at midnight', value: '0 0 * * *' },
  { label: 'Daily at 9 AM', value: '0 9 * * *' },
  { label: 'Weekdays at 9 AM', value: '0 9 * * 1-5' },
  { label: 'Every Monday', value: '0 0 * * 1' },
  { label: 'First of month', value: '0 0 1 * *' },
] as const

export const CRON_EXAMPLE = '0 9 * * 1-5'

export interface CronFieldInfo {
  field: string
  value: string
  description: string
}

function describeField(value: string, index: number): string {
  const label = CRON_FIELD_LABELS[index]
  if (value === '*') return `Every ${label.toLowerCase()}`
  if (value.startsWith('*/')) return `Every ${value.slice(2)} ${label.toLowerCase()}s`
  if (value.includes('-')) {
    const [a, b] = value.split('-')
    return `${label} ${a} through ${b}`
  }
  if (value.includes(',')) return `${label} at ${value}`
  return `${label} at ${value}`
}

export function splitCronExpression(expr: string): string[] | { error: string } {
  const parts = expr.trim().split(/\s+/)
  if (parts.length !== 5) {
    return { error: 'Expected 5 fields: minute hour day-of-month month day-of-week' }
  }
  return parts
}

export function describeCron(expr: string): { fields: CronFieldInfo[]; summary: string } | { error: string } {
  const parts = splitCronExpression(expr)
  if ('error' in parts) return parts

  const fields = parts.map((part, i) => ({
    field: CRON_FIELD_LABELS[i],
    value: part,
    description: describeField(part, i),
  }))

  const summary = `Runs at minute ${fields[0].value} of hour ${fields[1].value}, on days matching the pattern above.`

  return { fields, summary }
}

type FieldSet = Set<number> | 'all'

function parseField(field: string, min: number, max: number): FieldSet {
  if (field === '*') return 'all'

  const values = new Set<number>()

  for (const part of field.split(',')) {
    if (part.includes('/')) {
      const [rangePart, stepStr] = part.split('/')
      const step = Number(stepStr)
      if (Number.isNaN(step) || step <= 0) continue

      let start = min
      let end = max
      if (rangePart !== '*') {
        if (rangePart.includes('-')) {
          const [a, b] = rangePart.split('-').map(Number)
          start = a
          end = b
        } else {
          start = end = Number(rangePart)
        }
      }
      for (let i = start; i <= end; i += step) values.add(i)
    } else if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number)
      for (let i = a; i <= b; i++) values.add(i)
    } else {
      values.add(Number(part))
    }
  }

  return values
}

function normalizeWeekdaySet(weekdays: FieldSet): Set<number> {
  if (weekdays === 'all') return new Set()
  const normalized = new Set<number>()
  for (const day of weekdays) {
    normalized.add(day === 7 ? 0 : day)
  }
  return normalized
}

function matchesField(set: FieldSet, value: number): boolean {
  return set === 'all' || set.has(value)
}

export function matchesCron(date: Date, parts: string[]): boolean {
  const minute = date.getMinutes()
  const hour = date.getHours()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const weekday = date.getDay()

  const minutes = parseField(parts[0], 0, 59)
  const hours = parseField(parts[1], 0, 23)
  const days = parseField(parts[2], 1, 31)
  const months = parseField(parts[3], 1, 12)
  const weekdays = parseField(parts[4], 0, 7)

  if (!matchesField(minutes, minute)) return false
  if (!matchesField(hours, hour)) return false
  if (!matchesField(months, month)) return false

  const domRestricted = parts[2] !== '*'
  const dowRestricted = parts[4] !== '*'

  if (domRestricted && dowRestricted) {
    const dowSet = normalizeWeekdaySet(weekdays)
    const domMatch = matchesField(days, day)
    const dowMatch = dowSet.has(weekday)
    if (!domMatch && !dowMatch) return false
  } else {
    if (!matchesField(days, day)) return false
    if (weekdays !== 'all') {
      const dowSet = normalizeWeekdaySet(weekdays)
      if (!dowSet.has(weekday)) return false
    }
  }

  return true
}

export function getNextCronRuns(
  expr: string,
  count = 5,
  from = new Date(),
): { runs: Date[] } | { error: string } {
  const parts = splitCronExpression(expr)
  if ('error' in parts) return parts

  const runs: Date[] = []
  const cursor = new Date(from)
  cursor.setSeconds(0, 0)
  cursor.setMinutes(cursor.getMinutes() + 1)

  const maxIterations = 525_600

  for (let i = 0; i < maxIterations && runs.length < count; i++) {
    if (matchesCron(cursor, parts)) {
      runs.push(new Date(cursor))
    }
    cursor.setMinutes(cursor.getMinutes() + 1)
  }

  if (runs.length === 0) {
    return { error: 'No matching runs found within the next year' }
  }

  return { runs }
}

export function formatCronRun(date: Date): string {
  return date.toLocaleString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function parseExpressionToFields(expr: string): Record<'minute' | 'hour' | 'day' | 'month' | 'weekday', string> | null {
  const parts = splitCronExpression(expr)
  if ('error' in parts) return null
  return {
    minute: parts[0],
    hour: parts[1],
    day: parts[2],
    month: parts[3],
    weekday: parts[4],
  }
}
