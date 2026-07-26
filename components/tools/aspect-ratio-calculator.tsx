'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolError, ToolInput, ToolPanel, ToolStat } from '@/components/tools/tool-ui'

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
  const [height, setHeight] = useState('1080')
  const [driver, setDriver] = useState<'width' | 'height'>('width')

  const parsed = useMemo(() => parseRatio(ratio), [ratio])

  useEffect(() => {
    if (!parsed) return
    if (driver === 'width') {
      const w = parseFloat(width)
      if (!Number.isNaN(w) && w > 0) {
        setHeight(String(Math.round((w * parsed.h) / parsed.w)))
      }
    } else {
      const h = parseFloat(height)
      if (!Number.isNaN(h) && h > 0) {
        setWidth(String(Math.round((h * parsed.w) / parsed.h)))
      }
    }
  }, [ratio, width, height, driver, parsed])

  const w = parseFloat(width)
  const h = parseFloat(height)
  const valid = parsed && !Number.isNaN(w) && !Number.isNaN(h) && w > 0 && h > 0

  return (
    <div className="grid gap-5">
      <ToolPanel label="Aspect ratio">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <Button
              key={preset}
              type="button"
              size="sm"
              variant={ratio === preset ? 'default' : 'outline'}
              onClick={() => setRatio(preset)}
            >
              {preset}
            </Button>
          ))}
        </div>
        <ToolInput
          type="text"
          value={ratio}
          onChange={(e) => setRatio(e.target.value)}
          placeholder="16:9"
          className="mt-2 font-mono"
        />
      </ToolPanel>

      {!parsed && ratio.trim() && <ToolError message="Enter a valid ratio like 16:9 or 4/3" />}

      <div className="grid gap-4 sm:grid-cols-2">
        <ToolPanel label="Width (px)">
          <ToolInput
            type="number"
            min={1}
            value={width}
            onChange={(e) => {
              setDriver('width')
              setWidth(e.target.value)
            }}
          />
        </ToolPanel>
        <ToolPanel label="Height (px)">
          <ToolInput
            type="number"
            min={1}
            value={height}
            onChange={(e) => {
              setDriver('height')
              setHeight(e.target.value)
            }}
          />
        </ToolPanel>
      </div>

      {valid && parsed && (
        <div className="grid gap-3 sm:grid-cols-3">
          <ToolStat label="Dimensions" value={`${Math.round(w)} × ${Math.round(h)}`} accent />
          <ToolStat label="Ratio" value={ratio} />
          <ToolStat
            label="Decimal ratio"
            value={(w / h).toFixed(3)}
          />
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        Edit width or height — the other dimension updates automatically to preserve the ratio.
      </p>

      <ToolActions>
        <ToolClearButton
          onClear={() => {
            setRatio('16:9')
            setWidth('1920')
            setHeight('1080')
            setDriver('width')
          }}
        />
      </ToolActions>
    </div>
  )
}
