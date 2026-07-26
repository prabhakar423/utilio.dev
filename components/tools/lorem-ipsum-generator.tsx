'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolInput,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum',
]

function secureIndex(max: number) {
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return array[0] % max
}

function randomWord() {
  return WORDS[secureIndex(WORDS.length)]
}

function generateSentence() {
  const length = 6 + secureIndex(10)
  const words = Array.from({ length }, randomWord)
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return `${words.join(' ')}.`
}

function generateParagraph() {
  return Array.from({ length: 4 + secureIndex(3) }, generateSentence).join(' ')
}

export function LoremIpsumGenerator() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [output, setOutput] = useState('')

  const generate = () => {
    if (type === 'paragraphs') {
      setOutput(Array.from({ length: count }, generateParagraph).join('\n\n'))
    } else if (type === 'sentences') {
      setOutput(Array.from({ length: count }, generateSentence).join(' '))
    } else {
      setOutput(Array.from({ length: count }, randomWord).join(' '))
    }
  }

  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-wrap gap-2">
          {(['paragraphs', 'sentences', 'words'] as const).map((t) => (
            <Button
              key={t}
              type="button"
              variant={type === t ? 'default' : 'outline'}
              size="sm"
              onClick={() => setType(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Button>
          ))}
        </div>
        <ToolPanel label="Count" className="w-28">
          <ToolInput
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value))))}
          />
        </ToolPanel>
      </div>

      {output && (
        <ToolPanel label="Generated text">
          <ToolTextarea value={output} readOnly className="min-h-48" mono={false} />
        </ToolPanel>
      )}

      <ToolActions>
        <Button type="button" onClick={generate}>
          Generate
        </Button>
        <ToolCopyButton text={output} label="Copy text" disabled={!output} />
        <ToolClearButton onClear={() => setOutput('')} />
      </ToolActions>

      <ToolExample>
        <p>Standard placeholder text for mockups, wireframes, and design reviews.</p>
      </ToolExample>
    </div>
  )
}
