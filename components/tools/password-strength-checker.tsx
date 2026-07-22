'use client'

import { useMemo, useState } from 'react'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { cn } from '@/lib/utils'

function scorePassword(pw: string) {
  let score = 0
  const feedback: string[] = []
  if (pw.length >= 8) score += 1; else feedback.push('Use at least 8 characters')
  if (pw.length >= 12) score += 1
  if (pw.length >= 16) score += 1
  if (/[a-z]/.test(pw)) score += 1; else feedback.push('Add lowercase letters')
  if (/[A-Z]/.test(pw)) score += 1; else feedback.push('Add uppercase letters')
  if (/\d/.test(pw)) score += 1; else feedback.push('Add numbers')
  if (/[^a-zA-Z0-9]/.test(pw)) score += 1; else feedback.push('Add special characters')
  if (/(.)\1{2,}/.test(pw)) { score -= 1; feedback.push('Avoid repeated characters') }
  const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong']
  const idx = Math.min(Math.max(Math.floor(score / 1.2), 0), labels.length - 1)
  return { score: Math.min(score, 7), label: labels[idx], feedback }
}

const COLORS = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500', 'bg-emerald-500']

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState('')
  const result = useMemo(() => (password ? scorePassword(password) : null), [password])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Password">
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password to check…"
          className="w-full rounded-xl border border-border/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </ToolPanel>
      {result && (
        <>
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-medium">{result.label}</span>
              <span className="text-muted-foreground">{password.length} characters</span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={cn('h-2 flex-1 rounded-full bg-muted', i < result.score && COLORS[Math.min(result.score - 1, 5)])} />
              ))}
            </div>
          </div>
          {result.feedback.length > 0 && (
            <ul className="space-y-1 text-sm text-muted-foreground">
              {result.feedback.map((f) => <li key={f}>• {f}</li>)}
            </ul>
          )}
        </>
      )}
    </div>
  )
}
