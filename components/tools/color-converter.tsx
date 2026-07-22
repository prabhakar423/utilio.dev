'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function hexToRgb(hex: string) {
  const cleaned = hex.replace('#', '')
  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) throw new Error('Invalid hex')
  const r = parseInt(cleaned.slice(0, 2), 16)
  const g = parseInt(cleaned.slice(2, 4), 16)
  const b = parseInt(cleaned.slice(4, 6), 16)
  return { r, g, b }
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export function ColorConverter() {
  const [hex, setHex] = useState('#2563eb')
  const [error, setError] = useState('')
  const [preview, setPreview] = useState('#2563eb')
  const [output, setOutput] = useState('')

  const convert = () => {
    setError('')
    try {
      const { r, g, b } = hexToRgb(hex)
      const hsl = rgbToHsl(r, g, b)
      setPreview(rgbToHex(r, g, b))
      setOutput(
        `HEX: ${rgbToHex(r, g, b)}\nRGB: rgb(${r}, ${g}, ${b})\nHSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      )
    } catch {
      setError('Enter a valid 6-digit hex color (e.g. #2563eb)')
      setOutput('')
    }
  }

  return (
    <div className="grid gap-5">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="mb-2 block text-sm font-medium">Hex color</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="#2563eb"
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div
          className="size-12 shrink-0 rounded-xl border border-border/70"
          style={{ backgroundColor: preview }}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="button" onClick={convert}>
        Convert
      </Button>

      {output && (
        <ToolPanel label="Result">
          <ToolTextarea value={output} readOnly className="min-h-24" />
        </ToolPanel>
      )}
    </div>
  )
}
