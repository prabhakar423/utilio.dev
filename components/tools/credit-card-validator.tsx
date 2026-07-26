'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolResult } from '@/components/tools/tool-ui'

function luhnCheck(num: string): boolean {
  const digits = num.replace(/\D/g, '')
  if (digits.length < 13) return false
  let sum = 0
  let alt = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10)
    if (alt) {
      n *= 2
      if (n > 9) n -= 9
    }
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

  const result = useMemo(() => {
    const digits = input.replace(/\D/g, '')
    if (!digits) return null
    return { valid: luhnCheck(digits), type: detectType(digits), digits }
  }, [input])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Card number">
        <ToolInput
          type="text"
          inputMode="numeric"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="4111 1111 1111 1111"
          className="font-mono"
          autoComplete="off"
        />
      </ToolPanel>

      {result && result.digits.length >= 13 && (
        <ToolResult
          variant={result.valid ? 'success' : 'error'}
          title={result.valid ? 'Valid card number (Luhn check passed)' : 'Invalid card number'}
        >
          <p>Detected type: {result.type}</p>
          <p className="mt-2 text-xs">
            Luhn algorithm check only — does not verify if the card is active or has funds. Never
            enter real card details on untrusted sites.
          </p>
        </ToolResult>
      )}

      {result && result.digits.length > 0 && result.digits.length < 13 && (
        <p className="text-sm text-muted-foreground">Enter at least 13 digits to validate.</p>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => setInput('')} />
      </ToolActions>
    </div>
  )
}
