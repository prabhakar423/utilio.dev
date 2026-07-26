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

const EXAMPLE = `function hello(name) {
  console.log('Hello, ' + name);
}`

function minifyJs(code: string): string {
  return code
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}();,:<>=+\-*/&|?!])\s*/g, '$1')
    .trim()
}

export function JavascriptMinifier() {
  const [input, setInput] = useShareableInput('')

  const output = useMemo(() => (input.trim() ? minifyJs(input) : ''), [input])
  const saved = input.length > 0 && output ? input.length - output.length : 0

  return (
    <div className="grid gap-5">
      <ToolPanel label="JavaScript input">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="function hello() { console.log('Hello'); }"
        />
      </ToolPanel>

      {output && (
        <ToolPanel label="Minified output">
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
        <p>Basic minifier — removes comments and whitespace. Test minified code before production use.</p>
      </ToolExample>
    </div>
  )
}
