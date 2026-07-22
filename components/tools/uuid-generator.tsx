'use client'

import { useState } from 'react'
import { Copy, RefreshCw } from 'lucide-react'

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID())
    setUuids(newUuids)
    setCopied(false)
  }

  const handleCopyAll = () => {
    const text = uuids.join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyOne = (uuid: string) => {
    navigator.clipboard.writeText(uuid)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClear = () => {
    setUuids([])
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-2">Number of UUIDs</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 border border-border rounded-lg bg-secondary text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleGenerate}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
          >
            Generate
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors font-medium text-sm inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {uuids.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Generated UUIDs ({uuids.length})</h3>
            <button
              onClick={handleCopyAll}
              className="text-xs px-3 py-1 bg-secondary text-foreground rounded hover:bg-secondary/80 transition-colors inline-flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              {copied ? 'Copied!' : 'Copy All'}
            </button>
          </div>
          <div className="border border-border rounded-lg bg-secondary p-4 max-h-96 overflow-y-auto space-y-2 font-mono text-sm">
            {uuids.map((uuid, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 hover:bg-primary/10 rounded group transition-colors">
                <span className="text-foreground">{uuid}</span>
                <button
                  onClick={() => handleCopyOne(uuid)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-primary/20 rounded transition-all"
                  title="Copy"
                >
                  <Copy className="w-4 h-4 text-primary" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 rounded-lg bg-card border border-border">
        <h3 className="font-semibold text-sm mb-2">About UUIDs</h3>
        <p className="text-xs text-muted-foreground">
          UUID (Universally Unique Identifier) v4 is randomly generated and globally unique. Perfect for database IDs and tracking.
        </p>
      </div>
    </div>
  )
}
