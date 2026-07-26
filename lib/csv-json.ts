export type CsvJsonTab = 'csv-to-json' | 'json-to-csv'

export const CSV_JSON_EXAMPLE = {
  csv: 'name,email\nJohn,john@example.com\nJane,jane@example.com',
  json: '[{"name":"John","email":"john@example.com"},{"name":"Jane","email":"jane@example.com"}]',
} as const

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split('\n')
  if (lines.length < 2) throw new Error('CSV needs a header row and at least one data row')
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''))
  return lines.slice(1).filter(Boolean).map((line) => {
    const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''))
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']))
  })
}

function jsonToCsv(data: unknown[]): string {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('JSON must be a non-empty array of objects')
  }
  const headers = Object.keys(data[0] as object)
  const rows = data.map((row) =>
    headers
      .map((h) => {
        const val = String((row as Record<string, unknown>)[h] ?? '')
        return val.includes(',') ? `"${val}"` : val
      })
      .join(','),
  )
  return [headers.join(','), ...rows].join('\n')
}

export function convertCsvJson(
  input: string,
  tab: CsvJsonTab,
): { output: string; error: string; rowCount?: number } {
  if (!input.trim()) return { output: '', error: '' }
  try {
    if (tab === 'csv-to-json') {
      const rows = parseCsv(input)
      return { output: JSON.stringify(rows, null, 2), error: '', rowCount: rows.length }
    }
    const data = JSON.parse(input) as unknown[]
    const csv = jsonToCsv(data)
    const rowCount = Array.isArray(data) ? data.length : undefined
    return { output: csv, error: '', rowCount }
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : tab === 'csv-to-json' ? 'Failed to parse CSV' : 'Invalid JSON',
    }
  }
}
