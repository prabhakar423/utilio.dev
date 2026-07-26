'use client'

import { useMemo } from 'react'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { pattern: '', flags: 'g', text: '' }

export function RegexTester() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const { pattern, flags, text } = state

  const { result, error } = useMemo(() => {
    if (!pattern || !text) return { result: null, error: '' }

    try {
      const regex = new RegExp(pattern, flags)
      const matches = [...text.matchAll(regex)]
      return {
        result: {
          matchCount: matches.length,
          matches: matches.map((m) => ({
            match: m[0],
            index: m.index ?? 0,
            groups: m.slice(1),
          })),
        },
        error: '',
      }
    } catch (err) {
      return {
        result: null,
        error: err instanceof Error ? err.message : 'Invalid regular expression',
      }
    }
  }, [pattern, flags, text])

  const flagOptions = [
    { id: 'g', label: 'Global' },
    { id: 'i', label: 'Ignore case' },
    { id: 'm', label: 'Multiline' },
    { id: 's', label: 'Dotall' },
  ]

  const toggleFlag = (flag: string) => {
    setField(
      'flags',
      flags.includes(flag) ? flags.replace(flag, '') : flags + flag,
    )
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="mb-2 block text-sm font-medium">Regular expression</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setField('pattern', e.target.value)}
            placeholder="e.g. \d+"
            className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 font-mono text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Flags</label>
          <div className="flex flex-wrap gap-2">
            {flagOptions.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => toggleFlag(id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                  flags.includes(id)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border/70 text-muted-foreground hover:bg-muted'
                }`}
              >
                {id} — {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ToolPanel label="Test string">
        <ToolTextarea
          value={text}
          onChange={(e) => setField('text', e.target.value)}
          placeholder="Enter text to test against…"
          mono={false}
        />
      </ToolPanel>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
          <div className="text-sm font-medium">
            {result.matchCount} match{result.matchCount !== 1 ? 'es' : ''} found
          </div>
          {result.matches.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {result.matches.map((m, i) => (
                <li key={i} className="rounded-lg bg-background/60 px-3 py-2 font-mono text-sm">
                  <span className="text-primary">&quot;{m.match}&quot;</span>
                  <span className="ml-2 text-muted-foreground">at index {m.index}</span>
                  {m.groups.length > 0 && (
                    <span className="ml-2 text-muted-foreground">
                      groups: [{m.groups.join(', ')}]
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">No matches found.</p>
          )}
        </div>
      )}
    </div>
  )
}
