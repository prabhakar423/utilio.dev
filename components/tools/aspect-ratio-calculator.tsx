'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolStat } from '@/components/tools/tool-ui'

const PRESETS = ['16:9', '4:3', '1:1', '21:9', '3:2'] as const

function parseRatio(value: string): { w: number; h: number } | null {
  const match = value.trim().match(/^(\d+(?:\.\d+)?)\s*[:/x]\s*(\d+(?:\.\d+)?)$/)
  if (!match) return null
  const w = Number(match[1])
  const h = Number(match[2])
  if (w <= 0 || h <= 0) return null
  return { w, h }
}

export function AspectRatioCalculator() {
  const [ratio, setRatio] = useState('16:9')
  const [width, setWidth] = useState('1920')
  const [height, setHeight] = useState('')
  const [result, setResult] = useState<{ width: number; height: number } | null>(null)
  const [error, setError] = useState('')

  const calculateFromWidth = () => {
    setError('')
    const r = parseRatio(ratio)
    const w = parseFloat(width)
    if (!r || Number.isNaN(w) || w <= 0) {
      setError('Enter a valid ratio and width')
      setResult(null)
      return
    }
    const h = Math.round((w * r.h) / r.w)
    setHeight(String(h))
    setResult({ width: w, height: h })
  }

  const calculateFromHeight = () => {
    setError('')
    const r = parseRatio(ratio)
    const h = parseFloat(height)
    if (!r || Number.isNaN(h) || h <= 0) {
      setError('Enter a valid ratio and height')
      setResult(null)
      return
    }
    const w = Math.round((h * r.w) / r.h)
    setWidth(String(w))
    setResult({ width: w, height: h })
  }

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Aspect ratio</label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <Button key={preset} type="button" size="sm" variant={ratio === preset ? 'default' : 'outline'} onClick={() => setRatio(preset)}>
              {preset}
            </Button>
          ))}
        </div>
        <input
          type="text"
          value={ratio}
          onChange={(e) => setRatio(e.target.value)}
          placeholder="16:9"
          className="mt-2 w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Width (px)</label>
          <input type="number" min="1" value={width} onChange={(e) => setWidth(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Height (px)</label>
          <input type="number" min="1" value={height} onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={calculateFromWidth}>Calculate height from width</Button>
        <Button type="button" variant="outline" onClick={calculateFromHeight}>Calculate width from height</Button>
      </div>
      {result && (
        <div className="grid gap-4 sm:grid-cols-2">
          <ToolStat label="Width" value={`${result.width}px`} accent />
          <ToolStat label="Height" value={`${result.height}px`} />
        </div>
      )}
    </div>
  )
}
