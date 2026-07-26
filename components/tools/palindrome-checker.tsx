'use client'

import { useMemo, useState } from 'react'
import { ToolClearButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolExample, ToolPanel, ToolResult, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

function isPalindrome(text: string, ignoreCase: boolean, ignoreSpaces: boolean): boolean {
  let s = text
  if (ignoreCase) s = s.toLowerCase()
  if (ignoreSpaces) s = s.replace(/\s/g, '')
  s = s.replace(/[^a-z0-9]/gi, '')
  return s.length > 0 && s === s.split('').reverse().join('')
}

export function PalindromeChecker() {
  const [input, setInput] = useShareableInput('')
  const [ignoreCase, setIgnoreCase] = useState(true)
  const [ignoreSpaces, setIgnoreSpaces] = useState(true)

  const result = useMemo(() => {
    if (!input.trim()) return null
    return isPalindrome(input, ignoreCase, ignoreSpaces)
  }, [input, ignoreCase, ignoreSpaces])

  return (
    <div className="grid gap-5">
      <ToolPanel label="Text or phrase">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="A man, a plan, a canal: Panama"
          mono={false}
          className="min-h-24"
        />
      </ToolPanel>

      <div className="flex flex-wrap gap-3">
        {[
          { key: 'case' as const, label: 'Ignore case', checked: ignoreCase, set: setIgnoreCase },
          { key: 'spaces' as const, label: 'Ignore spaces', checked: ignoreSpaces, set: setIgnoreSpaces },
        ].map(({ key, label, checked, set }) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-border/70 bg-card/50 px-4 py-2.5 text-sm"
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => set(e.target.checked)}
              className="size-4 rounded border-border accent-primary"
            />
            {label}
          </label>
        ))}
      </div>

      {result !== null && (
        <ToolResult
          variant={result ? 'success' : 'warning'}
          title={result ? 'This is a palindrome' : 'Not a palindrome'}
        />
      )}

      <ToolActions>
        <ToolClearButton onClear={() => setInput('')} />
      </ToolActions>

      <ToolExample>
        <p>Try: <span className="font-mono">racecar</span> or <span className="font-mono">A man a plan a canal Panama</span></p>
      </ToolExample>
    </div>
  )
}
