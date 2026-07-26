'use client'

import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolInput,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { pattern: '', flags: 'g', text: '' }

function buildHighlightedText(text: string, matches: { match: string; index: number }[]) {
  if (!matches.length) return text
  const parts: ReactNode[] = []
  let lastIndex = 0

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i]
    if (m.index > lastIndex) {
      parts.push(text.slice(lastIndex, m.index))
    }
    parts.push(
      <mark key={`${m.index}-${i}`} className="rounded bg-primary/25 px-0.5 text-foreground">
        {m.match}
      </mark>,
    )
    lastIndex = m.index + m.match.length
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

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

  const matchesText = useMemo(() => {
    if (!result?.matches.length) return ''
    return result.matches
      .map((m, i) => `${i + 1}. "${m.match}" at index ${m.index}`)
      .join('\n')
  }, [result])

  const highlighted = useMemo(() => {
    if (!result?.matches.length || !text) return null
    return buildHighlightedText(text, result.matches)
  }, [result, text])

  const clear = () => {
    setField('pattern', '')
    setField('flags', 'g')
    setField('text', '')
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Regular expression">
        <ToolInput
          type="text"
          value={pattern}
          onChange={(e) => setField('pattern', e.target.value)}
          placeholder="e.g. \\d+"
          className="font-mono"
        />
      </ToolPanel>

      <div>
        <label className="mb-2 block text-sm font-medium">Flags</label>
        <div className="flex flex-wrap gap-2">
          {flagOptions.map(({ id, label }) => (
            <Button
              key={id}
              type="button"
              variant={flags.includes(id) ? 'default' : 'outline'}
              size="sm"
              onClick={() => toggleFlag(id)}
            >
              {id} — {label}
            </Button>
          ))}
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

      {error && <ToolError message={error} />}

      {highlighted && (
        <ToolPanel label="Highlighted matches">
          <div className="min-h-20 whitespace-pre-wrap break-words rounded-xl border border-border/70 bg-muted/20 p-4 font-mono text-sm leading-relaxed">
            {highlighted}
          </div>
        </ToolPanel>
      )}

      {result && (
        <ToolPanel
          label={`${result.matchCount} match${result.matchCount !== 1 ? 'es' : ''} found`}
        >
          {result.matches.length > 0 ? (
            <ul className="space-y-2 rounded-xl border border-border/70 bg-muted/20 p-4">
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
            <p className="text-sm text-muted-foreground">No matches found.</p>
          )}
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={matchesText} label="Copy matches" disabled={!matchesText} />
        <ToolClearButton onClear={clear} />
      </ToolActions>
    </div>
  )
}
