'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolPanel,
  ToolStat,
  ToolTextarea,
} from '@/components/tools/tool-ui'

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

function securePick(charset: string): string {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return charset[array[0] % charset.length]
}

function generatePassword(
  length: number,
  options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean },
): string {
  let charset = ''
  const required: string[] = []

  if (options.uppercase) {
    charset += UPPERCASE
    required.push(securePick(UPPERCASE))
  }
  if (options.lowercase) {
    charset += LOWERCASE
    required.push(securePick(LOWERCASE))
  }
  if (options.numbers) {
    charset += NUMBERS
    required.push(securePick(NUMBERS))
  }
  if (options.symbols) {
    charset += SYMBOLS
    required.push(securePick(SYMBOLS))
  }

  if (!charset) return ''

  const chars = [...required]
  for (let i = chars.length; i < length; i++) {
    chars.push(securePick(charset))
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const array = new Uint32Array(1)
    crypto.getRandomValues(array)
    const j = array[0] % (i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }

  return chars.join('')
}

function strengthLabel(
  length: number,
  options: { uppercase: boolean; lowercase: boolean; numbers: boolean; symbols: boolean },
): string {
  const types = [options.uppercase, options.lowercase, options.numbers, options.symbols].filter(
    Boolean,
  ).length
  if (length >= 20 && types >= 3) return 'Very strong'
  if (length >= 16 && types >= 3) return 'Strong'
  if (length >= 12 && types >= 2) return 'Good'
  if (length >= 8) return 'Fair'
  return 'Weak'
}

const defaultOptions = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  symbols: true,
}

export function PasswordGenerator() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState(defaultOptions)

  const handleGenerate = () => {
    setPassword(generatePassword(length, options))
  }

  useEffect(() => {
    handleGenerate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = (key: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const hasCharset = Object.values(options).some(Boolean)

  return (
    <div className="grid gap-5">
      <ToolPanel label={`Password length: ${length}`}>
        <input
          type="range"
          min={8}
          max={128}
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value, 10))}
          className="w-full accent-primary"
        />
      </ToolPanel>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          { key: 'uppercase' as const, label: 'Uppercase (A–Z)' },
          { key: 'lowercase' as const, label: 'Lowercase (a–z)' },
          { key: 'numbers' as const, label: 'Numbers (0–9)' },
          { key: 'symbols' as const, label: 'Symbols (!@#$…)' },
        ].map(({ key, label }) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-border/70 bg-card/50 px-4 py-3 text-sm"
          >
            <input
              type="checkbox"
              checked={options[key]}
              onChange={() => toggle(key)}
              className="size-4 rounded border-border accent-primary"
            />
            {label}
          </label>
        ))}
      </div>

      {password && (
        <>
          <ToolPanel label="Generated password">
            <ToolTextarea value={password} readOnly className="min-h-20 font-mono" />
          </ToolPanel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <ToolStat label="Length" value={password.length} />
            <ToolStat
              label="Strength"
              value={strengthLabel(length, options)}
              accent={length >= 16}
            />
            <ToolStat
              label="Entropy"
              value={`~${Math.round(password.length * Math.log2(Object.values(options).filter(Boolean).length * 26))} bits`}
            />
          </div>
        </>
      )}

      <ToolActions>
        <Button type="button" onClick={handleGenerate} disabled={!hasCharset}>
          Generate
        </Button>
        <ToolCopyButton text={password} label="Copy password" disabled={!password} />
        <ToolClearButton onClear={() => setPassword('')} />
      </ToolActions>

      {!hasCharset && (
        <p className="text-sm text-destructive">Select at least one character set.</p>
      )}

      <ToolExample title="Tips for strong passwords">
        <ul className="list-inside list-disc space-y-1">
          <li>Use at least 16 characters for important accounts</li>
          <li>Mix character types — uppercase, lowercase, numbers, symbols</li>
          <li>Use a unique password for every account</li>
          <li>Store passwords in a reputable password manager</li>
        </ul>
      </ToolExample>
    </div>
  )
}
