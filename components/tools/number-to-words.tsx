'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const SCALES = ['', 'thousand', 'million', 'billion']

function chunkToWords(n: number): string {
  if (n === 0) return ''
  if (n < 20) return ONES[n]
  if (n < 100) return `${TENS[Math.floor(n / 10)]}${n % 10 ? '-' + ONES[n % 10] : ''}`
  return `${ONES[Math.floor(n / 100)]} hundred${n % 100 ? ' ' + chunkToWords(n % 100) : ''}`
}

function numberToWords(n: number): string {
  if (n === 0) return 'zero'
  if (n < 0) return 'negative ' + numberToWords(-n)
  if (n > 999_999_999) throw new Error('Number too large (max 999,999,999)')

  const parts: string[] = []
  let remaining = n
  let scale = 0
  while (remaining > 0) {
    const chunk = remaining % 1000
    if (chunk) {
      const words = chunkToWords(chunk)
      parts.unshift(scale ? `${words} ${SCALES[scale]}` : words)
    }
    remaining = Math.floor(remaining / 1000)
    scale++
  }
  return parts.join(' ')
}

export function NumberToWords() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    const n = parseInt(input.replace(/,/g, ''), 10)
    if (Number.isNaN(n)) { setError('Enter a valid integer'); return }
    try {
      setOutput(numberToWords(n))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed')
      setOutput('')
    }
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Number">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="1234567"
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm" />
      </ToolPanel>
      <Button type="button" onClick={convert}>Convert to words</Button>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      {output && <ToolPanel label="Result"><ToolTextarea value={output} readOnly mono={false} className="min-h-16" /></ToolPanel>}
    </div>
  )
}
