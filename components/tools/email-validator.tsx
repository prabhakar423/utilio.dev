'use client'

import { useState } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function EmailValidator() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState<{ valid: boolean; details: string[] } | null>(null)

  const validate = () => {
    const details: string[] = []
    const trimmed = email.trim()

    if (!trimmed) { setResult(null); return }

    if (!trimmed.includes('@')) details.push('Missing @ symbol')
    if (trimmed.includes(' ')) details.push('Contains spaces')
    if (trimmed.startsWith('.') || trimmed.endsWith('.')) details.push('Cannot start or end with a dot')
    if (/\.{2,}/.test(trimmed)) details.push('Contains consecutive dots')
    const [local, domain] = trimmed.split('@')
    if (local && local.length > 64) details.push('Local part too long (max 64 chars)')
    if (domain && !domain.includes('.')) details.push('Domain missing TLD')

    const valid = EMAIL_REGEX.test(trimmed) && details.length === 0
    setResult({ valid, details: valid ? ['Format looks valid'] : details })
  }

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Email address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="user@example.com"
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </div>
      <button type="button" onClick={validate}
        className="w-fit rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Validate email
      </button>
      {result && (
        <div className={`rounded-xl border p-4 ${result.valid ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-destructive/30 bg-destructive/10'}`}>
          <div className="font-semibold">{result.valid ? '✓ Valid format' : '✗ Invalid format'}</div>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {result.details.map((d) => <li key={d}>• {d}</li>)}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">Format check only — does not verify if the mailbox exists.</p>
        </div>
      )}
    </div>
  )
}
