'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

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

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

function generateSentence() {
  const length = 6 + Math.floor(Math.random() * 10)
  const words = Array.from({ length }, randomWord)
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return `${words.join(' ')}.`
}

function generateParagraph() {
  return Array.from({ length: 4 + Math.floor(Math.random() * 3) }, generateSentence).join(' ')
}

export function LoremIpsumGenerator() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    if (type === 'paragraphs') {
      setOutput(Array.from({ length: count }, generateParagraph).join('\n\n'))
    } else if (type === 'sentences') {
      setOutput(Array.from({ length: count }, generateSentence).join(' '))
    } else {
      setOutput(Array.from({ length: count }, randomWord).join(' '))
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2">
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
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Count:</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value))))}
            className="w-20 rounded-lg border border-border/80 px-3 py-1.5 text-sm"
          />
        </div>
      </div>

      <Button type="button" onClick={generate}>
        Generate Lorem Ipsum
      </Button>

      {output && (
        <>
          <ToolPanel label="Generated text">
            <ToolTextarea value={output} readOnly className="min-h-48" mono={false} />
          </ToolPanel>
          <Button type="button" variant="secondary" onClick={copy}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            {copied ? 'Copied' : 'Copy text'}
          </Button>
        </>
      )}
    </div>
  )
}
