'use client'

import { useEffect, useRef, useState } from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolPanel } from '@/components/tools/tool-ui'
import { siteConfig } from '@/lib/site'

export function QrCodeGenerator() {
  const [text, setText] = useState(siteConfig.url)
  const [size, setSize] = useState(256)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!text.trim() || !canvasRef.current) return
    import('qrcode').then((QRCode) => {
      QRCode.toCanvas(canvasRef.current!, text, { width: size, margin: 2 })
    })
  }, [text, size])

  const download = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Text or URL">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text or URL…"
          className="min-h-24 w-full rounded-xl border border-border/80 px-4 py-3 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </ToolPanel>
      <div>
        <label className="mb-2 block text-sm font-medium">Size: {size}px</label>
        <input type="range" min="128" max="512" step="32" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" />
      </div>
      <div className="flex flex-col items-center gap-4 rounded-xl border border-border/70 bg-white p-6">
        <canvas ref={canvasRef} className="max-w-full" />
        <Button type="button" variant="secondary" onClick={download} disabled={!text.trim()}>
          <Download className="size-4" /> Download PNG
        </Button>
      </div>
    </div>
  )
}
