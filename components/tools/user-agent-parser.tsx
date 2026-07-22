'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function parseUserAgent(ua: string): Record<string, string> {
  const result: Record<string, string> = { 'User-Agent': ua }

  if (/Edg\//.test(ua)) result.Browser = ua.match(/Edg\/([\d.]+)/)?.[0] ?? 'Edge'
  else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) result.Browser = ua.match(/Chrome\/([\d.]+)/)?.[0] ?? 'Chrome'
  else if (/Firefox\//.test(ua)) result.Browser = ua.match(/Firefox\/([\d.]+)/)?.[0] ?? 'Firefox'
  else if (/Safari\//.test(ua) && !/Chrome/.test(ua)) result.Browser = ua.match(/Version\/([\d.]+)/)?.[0] ?? 'Safari'
  else result.Browser = 'Unknown'

  if (/Windows NT 10/.test(ua)) result.OS = 'Windows 10/11'
  else if (/Windows NT/.test(ua)) result.OS = 'Windows'
  else if (/Mac OS X/.test(ua)) result.OS = 'macOS'
  else if (/Android/.test(ua)) result.OS = 'Android'
  else if (/iPhone|iPad/.test(ua)) result.OS = 'iOS'
  else if (/Linux/.test(ua)) result.OS = 'Linux'
  else result.OS = 'Unknown'

  if (/Mobile|Android|iPhone/.test(ua)) result.Device = 'Mobile'
  else if (/iPad|Tablet/.test(ua)) result.Device = 'Tablet'
  else result.Device = 'Desktop'

  if (/bot|crawl|spider|slurp/i.test(ua)) result.Type = 'Bot/Crawler'
  else result.Type = 'Browser'

  return result
}

export function UserAgentParser() {
  const [input, setInput] = useState(
    typeof navigator !== 'undefined' ? navigator.userAgent : '',
  )
  const [output, setOutput] = useState('')

  const parse = () => {
    const parsed = parseUserAgent(input)
    setOutput(Object.entries(parsed).map(([k, v]) => `${k}: ${v}`).join('\n'))
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="User-Agent string">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Mozilla/5.0 …" mono={false} className="min-h-24" />
      </ToolPanel>
      <Button type="button" onClick={parse}>Parse User-Agent</Button>
      {output && (
        <ToolPanel label="Parsed details">
          <ToolTextarea value={output} readOnly mono={false} className="min-h-36" />
        </ToolPanel>
      )}
    </div>
  )
}
