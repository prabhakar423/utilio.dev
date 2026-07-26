export type JsonMode = 'format' | 'minify' | 'validate'

export interface JsonErrorLocation {
  line: number
  column: number
  position?: number
}

export interface JsonStats {
  rootType: 'object' | 'array' | 'primitive'
  keyCount?: number
  itemCount?: number
  maxDepth: number
  sizeBytes: number
}

export interface JsonProcessResult {
  output: string
  error: string
  valid: boolean | null
  location: JsonErrorLocation | null
  stats: JsonStats | null
  structure: string
}

export function getJsonErrorLocation(input: string, err: Error): JsonErrorLocation | null {
  const msg = err.message
  const lineColMatch = msg.match(/line (\d+) column (\d+)/i)
  if (lineColMatch) {
    return { line: Number(lineColMatch[1]), column: Number(lineColMatch[2]) }
  }

  const posMatch = msg.match(/position (\d+)/i)
  if (posMatch) {
    const position = Number(posMatch[1])
    const before = input.slice(0, position)
    const lines = before.split('\n')
    return {
      line: lines.length,
      column: lines[lines.length - 1].length + 1,
      position,
    }
  }

  return null
}

function maxDepth(value: unknown, depth = 0): number {
  if (value === null || typeof value !== 'object') return depth
  if (Array.isArray(value)) {
    if (value.length === 0) return depth + 1
    return Math.max(...value.map((item) => maxDepth(item, depth + 1)))
  }
  const values = Object.values(value as Record<string, unknown>)
  if (values.length === 0) return depth + 1
  return Math.max(...values.map((item) => maxDepth(item, depth + 1)))
}

export function getJsonStats(value: unknown, raw: string): JsonStats {
  const sizeBytes = new TextEncoder().encode(raw).length
  if (Array.isArray(value)) {
    return {
      rootType: 'array',
      itemCount: value.length,
      maxDepth: maxDepth(value),
      sizeBytes,
    }
  }
  if (value !== null && typeof value === 'object') {
    return {
      rootType: 'object',
      keyCount: Object.keys(value as object).length,
      maxDepth: maxDepth(value),
      sizeBytes,
    }
  }
  return {
    rootType: 'primitive',
    maxDepth: 0,
    sizeBytes,
  }
}

function describeValue(value: unknown, depth = 0, maxLines = 12): string[] {
  if (depth > 4) return ['…']

  if (value === null) return ['null']
  if (typeof value === 'string') return [`string (${value.length} chars)`]
  if (typeof value === 'number' || typeof value === 'boolean') return [String(value)]

  if (Array.isArray(value)) {
    if (value.length === 0) return ['array (empty)']
    const lines = [`array [${value.length} items]`]
    for (let i = 0; i < Math.min(value.length, 4); i++) {
      lines.push(`  [${i}]: ${describeValue(value[i], depth + 1)[0]}`)
    }
    if (value.length > 4) lines.push(`  … +${value.length - 4} more`)
    return lines
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    if (entries.length === 0) return ['object (empty)']
    const lines = [`object {${entries.length} keys}`]
    for (const [key, val] of entries.slice(0, maxLines)) {
      lines.push(`  ${key}: ${describeValue(val, depth + 1)[0]}`)
    }
    if (entries.length > maxLines) lines.push(`  … +${entries.length - maxLines} more keys`)
    return lines
  }

  return [typeof value]
}

export function buildStructurePreview(value: unknown): string {
  return describeValue(value).join('\n')
}

export function processJson(input: string, mode: JsonMode): JsonProcessResult {
  const empty: JsonProcessResult = {
    output: '',
    error: '',
    valid: null,
    location: null,
    stats: null,
    structure: '',
  }

  if (!input.trim()) return empty

  try {
    const parsed = JSON.parse(input)

    if (mode === 'validate') {
      return {
        output: '✓ Valid JSON',
        error: '',
        valid: true,
        location: null,
        stats: getJsonStats(parsed, input),
        structure: buildStructurePreview(parsed),
      }
    }

    const output =
      mode === 'minify' ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2)

    return {
      output,
      error: '',
      valid: true,
      location: null,
      stats: getJsonStats(parsed, input),
      structure: buildStructurePreview(parsed),
    }
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Invalid JSON'
    return {
      output: '',
      error,
      valid: false,
      location: err instanceof Error ? getJsonErrorLocation(input, err) : null,
      stats: null,
      structure: '',
    }
  }
}
