'use client'

import { useState } from 'react'

function isPalindrome(text: string, ignoreCase: boolean, ignoreSpaces: boolean): boolean {
  let s = text
  if (ignoreCase) s = s.toLowerCase()
  if (ignoreSpaces) s = s.replace(/\s/g, '')
  s = s.replace(/[^a-z0-9]/gi, '')
  return s.length > 0 && s === s.split('').reverse().join('')
}

export function PalindromeChecker() {
  const [input, setInput] = useState('')
  const [ignoreCase, setIgnoreCase] = useState(true)
  const [ignoreSpaces, setIgnoreSpaces] = useState(true)
  const [result, setResult] = useState<boolean | null>(null)

  const check = () => {
    if (!input.trim()) { setResult(null); return }
    setResult(isPalindrome(input, ignoreCase, ignoreSpaces))
  }

  return (
    <div className="grid gap-5">
      <div>
        <label className="mb-2 block text-sm font-medium">Text or phrase</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="A man a plan a canal Panama"
          className="min-h-24 w-full rounded-xl border border-border/80 px-4 py-3 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
      </div>
      <div className="flex gap-4 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={ignoreCase} onChange={(e) => setIgnoreCase(e.target.checked)} /> Ignore case</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={ignoreSpaces} onChange={(e) => setIgnoreSpaces(e.target.checked)} /> Ignore spaces</label>
      </div>
      <button type="button" onClick={check}
        className="w-fit rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
        Check palindrome
      </button>
      {result !== null && (
        <div className={`rounded-xl border p-6 text-center ${result ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-orange-500/30 bg-orange-500/10'}`}>
          <div className="text-2xl">{result ? '✓' : '✗'}</div>
          <div className="mt-2 font-semibold">{result ? 'This is a palindrome!' : 'Not a palindrome'}</div>
        </div>
      )}
    </div>
  )
}
