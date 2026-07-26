'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const entityMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

const SHARE_INITIAL = { input: '', mode: 'encode' }

function encodeHtml(text: string) {
  return text.replace(/[&<>"']/g, (char) => entityMap[char] ?? char)
}

function decodeHtml(text: string) {
  if (typeof document === 'undefined') return text
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

export function HtmlEncoder() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const { input } = state
  const mode = state.mode === 'decode' ? 'decode' : 'encode'

  const output = useMemo(() => {
    if (!input) return ''
    return mode === 'encode' ? encodeHtml(input) : decodeHtml(input)
  }, [input, mode])

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button type="button" variant={mode === 'encode' ? 'default' : 'outline'} size="sm" onClick={() => setField('mode', 'encode')}>
          Encode
        </Button>
        <Button type="button" variant={mode === 'decode' ? 'default' : 'outline'} size="sm" onClick={() => setField('mode', 'decode')}>
          Decode
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea
            value={input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder={mode === 'encode' ? 'Enter HTML or text…' : 'Enter HTML entities…'}
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Output appears here…" />
        </ToolPanel>
      </div>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>

      <ToolExample>
        <p>Encode: <span className="font-mono">&lt;div&gt;</span> → <span className="font-mono">&amp;lt;div&amp;gt;</span></p>
      </ToolExample>
    </div>
  )
}
