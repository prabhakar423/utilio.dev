'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function getUuidVersion(uuid: string): string {
  const version = uuid.replace(/-/g, '')[12]
  const versions: Record<string, string> = {
    '1': 'Version 1 (time-based)',
    '2': 'Version 2 (DCE security)',
    '3': 'Version 3 (MD5 hash)',
    '4': 'Version 4 (random)',
    '5': 'Version 5 (SHA-1 hash)',
    '6': 'Version 6 (time-ordered)',
    '7': 'Version 7 (Unix time)',
    '8': 'Version 8 (custom)',
  }
  return versions[version] ?? `Unknown (n=${version})`
}

function getUuidVariant(uuid: string): string {
  const variant = parseInt(uuid.replace(/-/g, '')[16], 16)
  if ((variant & 0xc0) === 0x80) return 'RFC 4122'
  if ((variant & 0xe0) === 0xc0) return 'Microsoft'
  if ((variant & 0xe0) === 0xe0) return 'Reserved'
  return 'NCS backward compatibility'
}

export function UuidValidator() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ valid: boolean; version?: string; variant?: string } | null>(null)

  const validate = () => {
    const trimmed = input.trim()
    if (!trimmed) { setResult(null); return }
    const valid = UUID_REGEX.test(trimmed)
    setResult(valid
      ? { valid: true, version: getUuidVersion(trimmed), variant: getUuidVariant(trimmed) }
      : { valid: false })
  }

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">UUID</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="550e8400-e29b-41d4-a716-446655440000"
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <Button type="button" onClick={validate}>Validate UUID</Button>
      {result && (
        <div className="grid gap-4">
          <ToolStat label="Valid" value={result.valid ? 'Yes' : 'No'} accent={result.valid} />
          {result.valid && (
            <>
              <ToolStat label="Version" value={result.version ?? ''} />
              <ToolStat label="Variant" value={result.variant ?? ''} />
            </>
          )}
        </div>
      )}
    </div>
  )
}
