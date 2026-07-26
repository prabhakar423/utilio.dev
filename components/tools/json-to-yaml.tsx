'use client'

import { useMemo } from 'react'
import { dump } from 'js-yaml'
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

const EXAMPLE = '{"name":"John","age":30,"skills":["JSON","YAML"]}'

export function JsonToYaml() {
  const [input, setInput] = useShareableInput('')

  const { output, error } = useMemo(() => {
    if (!input.trim()) return { output: '', error: '' }
    try {
      return {
        output: dump(JSON.parse(input), { indent: 2, lineWidth: -1 }),
        error: '',
      }
    } catch (err) {
      return {
        output: '',
        error: err instanceof Error ? err.message : 'Invalid JSON',
      }
    }
  }, [input])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="JSON input">
          <ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name":"John","age":30}' />
        </ToolPanel>
        <ToolPanel label="YAML output">
          <ToolTextarea value={output} readOnly placeholder="YAML appears here…" />
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
        <p className="font-mono">{EXAMPLE}</p>
      </ToolExample>
    </div>
  )
}
