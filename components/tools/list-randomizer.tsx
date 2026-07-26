'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

function shuffleLines(lines: string[], seed: number): string[] {
  const result = [...lines]
  let s = seed
  for (let i = result.length - 1; i > 0; i -= 1) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    const j = s % (i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function ListRandomizer() {
  const [input, setInput] = useShareableInput('')
  const [output, setOutput] = useState('')
  const [seed, setSeed] = useState(1)

  const randomize = () => {
    const lines = input.split('\n').filter((line) => line.trim())
    setSeed((s) => s + 1)
    setOutput(shuffleLines(lines, seed + 1).join('\n'))
  }

  return (
    <div className="grid gap-5">
      <ToolPanel label="Input list (one item per line)">
        <ToolTextarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Alice&#10;Bob&#10;Charlie&#10;Diana"
          mono={false}
        />
      </ToolPanel>

      <ToolActions>
        <Button type="button" onClick={randomize} disabled={!input.trim()}>
          Shuffle list
        </Button>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton
          onClear={() => {
            setInput('')
            setOutput('')
          }}
        />
      </ToolActions>

      {output && (
        <ToolPanel label="Shuffled output">
          <ToolTextarea value={output} readOnly mono={false} />
        </ToolPanel>
      )}
    </div>
  )
}
