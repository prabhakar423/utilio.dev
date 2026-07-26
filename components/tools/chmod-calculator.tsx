'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolStat } from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'
import { useToolShortcut } from '@/hooks/use-tool-shortcut'

const PERMS = ['read', 'write', 'execute'] as const

function parseOctal(octal: string) {
  const value = parseInt(octal, 8)
  if (Number.isNaN(value) || value < 0 || value > 777) return null
  const digits = octal.padStart(3, '0').slice(-3)
  return digits.split('').map((d) => parseInt(d, 10))
}

function digitToSymbolic(digit: number): string {
  return PERMS.map((perm, i) => (digit & (4 >> i) ? perm[0] : '-')).join('')
}

function octalToSymbolic(octal: string): string | null {
  const parts = parseOctal(octal)
  if (!parts || parts.length !== 3) return null
  return parts.map((d) => digitToSymbolic(d)).join('')
}

function symbolicToOctal(symbolic: string): string | null {
  const groups = symbolic.match(/[rwx-]{3}/gi)
  if (!groups || groups.length !== 3) return null

  const digits = groups.map((group) => {
    let val = 0
    if (group[0] === 'r') val += 4
    if (group[1] === 'w') val += 2
    if (group[2] === 'x') val += 1
    return val
  })

  return digits.map(String).join('')
}

export function ChmodCalculator() {
  const [input, setInput] = useShareableInput('755')
  const [mode, setMode] = useState<'octal' | 'symbolic'>('octal')
  const [result, setResult] = useState<{ octal: string; symbolic: string; breakdown: string } | null>(null)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    if (mode === 'octal') {
      const symbolic = octalToSymbolic(input)
      const parts = parseOctal(input)
      if (!symbolic || !parts) {
        setError('Enter a valid octal value (000–777)')
        setResult(null)
        return
      }
      setResult({
        octal: input.padStart(3, '0').slice(-3),
        symbolic,
        breakdown: `Owner: ${digitToSymbolic(parts[0])} · Group: ${digitToSymbolic(parts[1])} · Others: ${digitToSymbolic(parts[2])}`,
      })
    } else {
      const octal = symbolicToOctal(input)
      if (!octal) {
        setError('Enter valid symbolic notation (e.g. rwxr-xr-x)')
        setResult(null)
        return
      }
      const parts = parseOctal(octal)!
      setResult({
        octal,
        symbolic: input,
        breakdown: `Owner: ${digitToSymbolic(parts[0])} · Group: ${digitToSymbolic(parts[1])} · Others: ${digitToSymbolic(parts[2])}`,
      })
    }
  }

  const copy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(`${result.octal} ${result.symbolic}`)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  useToolShortcut(convert, 'Enter')

  useToolShortcut(convert, 'Enter')

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button type="button" size="sm" variant={mode === 'octal' ? 'default' : 'outline'} onClick={() => setMode('octal')}>Octal → Symbolic</Button>
        <Button type="button" size="sm" variant={mode === 'symbolic' ? 'default' : 'outline'} onClick={() => setMode('symbolic')}>Symbolic → Octal</Button>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">{mode === 'octal' ? 'Octal permissions' : 'Symbolic permissions'}</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'octal' ? '755' : 'rwxr-xr-x'}
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      {error && <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
      <ToolActions>
        <Button type="button" onClick={convert}>Convert</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!result}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
        <span className="self-center text-xs text-muted-foreground">Ctrl+Enter to convert</span>
      </ToolActions>
      {result && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <ToolStat label="Octal" value={result.octal} accent />
            <ToolStat label="Symbolic" value={result.symbolic} />
          </div>
          <p className="text-sm text-muted-foreground">{result.breakdown}</p>
        </>
      )}
    </div>
  )
}
