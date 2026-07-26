'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'
import { load } from 'js-yaml'

const EXAMPLE = 'name: John\nage: 30\nskills:\n  - YAML\n  - JSON'

export function YamlToJson() {
  const [input, setInput] = useShareableInput('')

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' }
    try {
      return { output: JSON.stringify(load(input), null, 2), error: '' }
    } catch (err) {
      return { output: '', error: err instanceof Error ? err.message : 'Invalid YAML' }
    }
  }, [input])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="YAML input">
          <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="name: John&#10;age: 30" />
        </ToolPanel>
        <ToolPanel label="JSON output">
          <ToolTextarea value={output} readOnly placeholder="JSON appears here…" />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}

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
