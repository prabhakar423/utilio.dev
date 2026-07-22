'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions } from '@/components/tools/tool-ui'

export function CssGradientGenerator() {
  const [color1, setColor1] = useState('#2563eb')
  const [color2, setColor2] = useState('#7c3aed')
  const [angle, setAngle] = useState(135)
  const [copied, setCopied] = useState(false)

  const css = `background: linear-gradient(${angle}deg, ${color1}, ${color2});`

  const copy = async () => {
    await navigator.clipboard.writeText(css)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div
        className="h-32 rounded-2xl border border-border/70 shadow-inner"
        style={{ background: `linear-gradient(${angle}deg, ${color1}, ${color2})` }}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Color 1</label>
          <div className="flex gap-2">
            <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} className="size-10 cursor-pointer rounded-lg border border-border/80" />
            <input type="text" value={color1} onChange={(e) => setColor1(e.target.value)}
              className="flex-1 rounded-xl border border-border/80 px-3 py-2 font-mono text-sm" />
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Color 2</label>
          <div className="flex gap-2">
            <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} className="size-10 cursor-pointer rounded-lg border border-border/80" />
            <input type="text" value={color2} onChange={(e) => setColor2(e.target.value)}
              className="flex-1 rounded-xl border border-border/80 px-3 py-2 font-mono text-sm" />
          </div>
        </div>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Angle: {angle}°</label>
        <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full" />
      </div>
      <div className="rounded-xl border border-border/70 bg-muted/30 px-4 py-3">
        <code className="break-all font-mono text-sm">{css}</code>
      </div>
      <ToolActions>
        <Button type="button" variant="secondary" onClick={copy}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy CSS
        </Button>
      </ToolActions>
    </div>
  )
}
