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
import { useShareableInput } from '@/hooks/use-shareable-input'

const EXAMPLE = `.card {
  color: red;
  padding: 1rem;
}`

function minifyCss(css: string) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .trim()
}

export function CssMinifier() {
  const [input, setInput] = useShareableInput('')

  const output = useMemo(() => (input.trim() ? minifyCss(input) : ''), [input])
  const saved = input.length > 0 && output ? input.length - output.length : 0

  return (
    <div className="grid gap-5">
      <ToolPanel label="CSS input">
        <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder=".class { color: red; }" />
      </ToolPanel>

      {output && (
        <ToolPanel label="Minified CSS">
          <ToolTextarea value={output} readOnly />
          {saved > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Saved {saved} characters ({Math.round((saved / input.length) * 100)}% reduction)
            </p>
          )}
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
        <Button type="button" variant="outline" onClick={() => setInput(EXAMPLE)}>
          Load example
        </Button>
      </ToolActions>

      <ToolExample>
        <pre className="font-mono whitespace-pre-wrap">{EXAMPLE}</pre>
      </ToolExample>
    </div>
  )
}
