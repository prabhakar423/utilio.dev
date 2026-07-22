'use client'

import { useState } from 'react'
import { ToolPanel } from '@/components/tools/tool-ui'

function luhnCheck(num: string): boolean {
  const digits = num.replace(/\D/g, '')
  if (digits.length < 13) return false
  let sum = 0
  let alt = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10)
    if (alt) { n *= 2; if (n > 9) n -= 9 }
    sum += n
    alt = !alt
  }
  return sum % 10 === 0
}

function detectType(num: string): string {
  const d = num.replace(/\D/g, '')
  if (/^4/.test(d)) return 'Visa'
  if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return 'Mastercard'
  if (/^3[47]/.test(d)) return 'American Express'
  if (/^6(?:011|5)/.test(d)) return 'Discover'
  return 'Unknown'
}

export function CreditCardValidator() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ valid: boolean; type: string } | null>(null)

  const validate = () => {
    const digits = input.replace(/\D/g, '')
    setResult({ valid: luhnCheck(digits), type: detectType(digits) })
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Card number">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          placeholder="4111 1111 1111 1111"
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </ToolPanel>
      <button type="button" onClick={validate}
        className="w-fit rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Validate card number
      </button>
      {result && (
        <div className={`rounded-xl border p-4 ${result.valid ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-destructive/30 bg-destructive/10'}`}>
          <div className="font-semibold">{result.valid ? '✓ Valid card number' : '✗ Invalid card number'}</div>
          <div className="mt-1 text-sm text-muted-foreground">Detected type: {result.type}</div>
          <p className="mt-2 text-xs text-muted-foreground">Luhn check only — does not verify if the card is active or has funds.</p>
        </div>
      )}
    </div>
  )
}
