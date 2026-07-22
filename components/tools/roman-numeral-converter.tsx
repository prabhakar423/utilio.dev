'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

const ROMAN: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
  [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

function toRoman(n: number): string {
  if (n < 1 || n > 3999) throw new Error('Number must be between 1 and 3999')
  let result = ''
  for (const [val, sym] of ROMAN) {
    while (n >= val) { result += sym; n -= val }
  }
  return result
}

function fromRoman(s: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  const upper = s.toUpperCase().trim()
  if (!/^[IVXLCDM]+$/.test(upper)) throw new Error('Invalid Roman numeral')
  let total = 0
  for (let i = 0; i < upper.length; i++) {
    const curr = map[upper[i]]
    const next = map[upper[i + 1]]
    total += next && curr < next ? -curr : curr
  }
  return total
}

export function RomanNumeralConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'to-roman' | 'from-roman'>('to-roman')
  const [error, setError] = useState('')

  const convert = () => {
    setError('')
    try {
      setOutput(mode === 'to-roman' ? toRoman(parseInt(input, 10)) : String(fromRoman(input)))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed')
      setOutput('')
    }
  }

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button type="button" size="sm" variant={mode === 'to-roman' ? 'default' : 'outline'} onClick={() => setMode('to-roman')}>Number → Roman</Button>
        <Button type="button" size="sm" variant={mode === 'from-roman' ? 'default' : 'outline'} onClick={() => setMode('from-roman')}>Roman → Number</Button>
      </div>
      <ToolPanel label="Input">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'to-roman' ? '2024' : 'MMXXIV'}
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm" />
      </ToolPanel>
      <Button type="button" onClick={convert}>Convert</Button>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      {output && <ToolPanel label="Result"><ToolTextarea value={output} readOnly className="min-h-16" /></ToolPanel>}
    </div>
  )
}
