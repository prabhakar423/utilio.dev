'use client'

import { useState } from 'react'
import { Check, Copy, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolStat } from '@/components/tools/tool-ui'

function randomHex(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const n = parseInt(hex.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

export function RandomColorGenerator() {
  const [color, setColor] = useState('#2563eb')
  const [copied, setCopied] = useState<string | null>(null)

  const generate = () => setColor(randomHex())

  const rgb = hexToRgb(color)
  const hsl = (() => {
    const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    const l = (max + min) / 2
    if (max === min) return `hsl(0, 0%, ${Math.round(l * 100)}%)`
    const d = max - min
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    let h = 0
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  })()

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    window.setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="h-32 rounded-2xl border border-border/70 shadow-inner transition-colors" style={{ backgroundColor: color }} />
      <div className="grid gap-4 sm:grid-cols-3">
        <ToolStat label="HEX" value={color.toUpperCase()} accent />
        <ToolStat label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
        <ToolStat label="HSL" value={hsl} />
      </div>
      <ToolActions>
        <Button type="button" onClick={generate}>
          <RefreshCw className="size-4" /> Generate color
        </Button>
        <Button type="button" variant="secondary" onClick={() => copy(color, 'hex')}>
          {copied === 'hex' ? <Check className="size-4" /> : <Copy className="size-4" />} Copy HEX
        </Button>
      </ToolActions>
    </div>
  )
}
