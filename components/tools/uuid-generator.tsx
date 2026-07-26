'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolInput,
  ToolPanel,
} from '@/components/tools/tool-ui'

function generateUuidV4(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)

  const handleGenerate = () => {
    const safeCount = Math.min(100, Math.max(1, count))
    setUuids(Array.from({ length: safeCount }, generateUuidV4))
  }

  useEffect(() => {
    handleGenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const output = uuids.join('\n')

  return (
    <div className="grid gap-5">
      <ToolPanel label="Number of UUIDs (max 100)">
        <ToolInput
          type="number"
          min={1}
          max={100}
          value={count}
          onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value, 10) || 1)))}
        />
      </ToolPanel>

      {uuids.length > 0 && (
        <ToolPanel label={`Generated UUIDs (${uuids.length})`}>
          <div className="max-h-96 space-y-2 overflow-y-auto rounded-xl border border-border/70 bg-muted/20 p-3">
            {uuids.map((uuid) => (
              <div
                key={uuid}
                className="rounded-lg bg-background/70 px-3 py-2 font-mono text-sm"
              >
                {uuid}
              </div>
            ))}
          </div>
        </ToolPanel>
      )}

      <ToolActions>
        <Button type="button" onClick={handleGenerate}>
          Generate
        </Button>
        <ToolCopyButton text={output} label="Copy all" disabled={!output} />
        <ToolClearButton onClear={() => setUuids([])} />
      </ToolActions>

      <ToolExample title="About UUID v4">
        <p>
          UUID v4 uses random or pseudo-random numbers. Ideal for database primary keys, request
          IDs, and session tokens — generated locally with crypto-grade randomness.
        </p>
      </ToolExample>
    </div>
  )
}
