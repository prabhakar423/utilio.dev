'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolError, ToolInput, ToolStat } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const PERMS = ['read', 'write', 'execute'] as const

const SHARE_INITIAL = { input: '755', mode: 'octal' }

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
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const mode = state.mode === 'symbolic' ? 'symbolic' : 'octal'

  const { result, error } = useMemo(() => {
    if (!state.input.trim()) return { result: null, error: '' }

    if (mode === 'octal') {
      const symbolic = octalToSymbolic(state.input)
      const parts = parseOctal(state.input)
      if (!symbolic || !parts) {
        return { result: null, error: 'Enter a valid octal value (000–777)' }
      }
      return {
        result: {
          octal: state.input.padStart(3, '0').slice(-3),
          symbolic,
          breakdown: `Owner: ${digitToSymbolic(parts[0])} · Group: ${digitToSymbolic(parts[1])} · Others: ${digitToSymbolic(parts[2])}`,
        },
        error: '',
      }
    }

    const octal = symbolicToOctal(state.input)
    if (!octal) {
      return { result: null, error: 'Enter valid symbolic notation (e.g. rwxr-xr-x)' }
    }
    const parts = parseOctal(octal)!
    return {
      result: {
        octal,
        symbolic: state.input,
        breakdown: `Owner: ${digitToSymbolic(parts[0])} · Group: ${digitToSymbolic(parts[1])} · Others: ${digitToSymbolic(parts[2])}`,
      },
      error: '',
    }
  }, [state.input, mode])

  const copyText = result ? `${result.octal} ${result.symbolic}` : ''

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === 'octal' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'octal')}
        >
          Octal → Symbolic
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === 'symbolic' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'symbolic')}
        >
          Symbolic → Octal
        </Button>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          {mode === 'octal' ? 'Octal permissions' : 'Symbolic permissions'}
        </label>
        <ToolInput
          type="text"
          value={state.input}
          onChange={(e) => setField('input', e.target.value)}
          placeholder={mode === 'octal' ? '755' : 'rwxr-xr-x'}
          className="font-mono"
        />
      </div>

      {error && <ToolError message={error} />}

      {result && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <ToolStat label="Octal" value={result.octal} accent />
            <ToolStat label="Symbolic" value={result.symbolic} />
          </div>
          <p className="text-sm text-muted-foreground">{result.breakdown}</p>
        </>
      )}

      <ToolActions>
        <ToolCopyButton text={copyText} disabled={!copyText} label="Copy result" />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>
    </div>
  )
}
