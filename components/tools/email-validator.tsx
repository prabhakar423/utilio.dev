'use client'

import { useEffect, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolResult } from '@/components/tools/tool-ui'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string) {
  const details: string[] = []
  const trimmed = email.trim()

  if (!trimmed) return null

  if (!trimmed.includes('@')) details.push('Missing @ symbol')
  if (trimmed.includes(' ')) details.push('Contains spaces')
  if (trimmed.startsWith('.') || trimmed.endsWith('.')) details.push('Cannot start or end with a dot')
  if (/\.{2,}/.test(trimmed)) details.push('Contains consecutive dots')

  const [local, domain] = trimmed.split('@')
  if (local && local.length > 64) details.push('Local part too long (max 64 characters)')
  if (domain && !domain.includes('.')) details.push('Domain missing top-level domain (e.g. .com)')

  const valid = EMAIL_REGEX.test(trimmed) && details.length === 0
  return {
    valid,
    details: valid ? ['Format looks valid'] : details,
  }
}

export function EmailValidator() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<ReturnType<typeof validateEmail>>(null)

  useEffect(() => {
    setResult(validateEmail(email))
  }, [email])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Email address">
        <ToolInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="user@example.com"
          autoComplete="off"
        />
      </ToolPanel>

      {result && (
        <ToolResult
          variant={result.valid ? 'success' : 'error'}
          title={result.valid ? 'Valid format' : 'Invalid format'}
        >
          <ul className="space-y-1">
            {result.details.map((d) => (
              <li key={d}>• {d}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs">
            Format check only — does not verify if the mailbox exists or accepts mail.
          </p>
        </ToolResult>
      )}

      <ToolActions>
        <ToolClearButton onClear={() => setEmail('')} />
      </ToolActions>
    </div>
  )
}
