'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

const MORSE: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
}
const REVERSE = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]))

function encodeMorse(text: string) {
  return text.toUpperCase().split('').map((c) => (c === ' ' ? '/' : MORSE[c] ?? '')).filter(Boolean).join(' ')
}

function decodeMorse(code: string) {
  return code.split(/\s+/).map((w) => (w === '/' ? ' ' : REVERSE[w] ?? '')).join('')
}

export function MorseCodeTranslator() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setOutput(mode === 'encode' ? encodeMorse(input) : decodeMorse(input))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button type="button" size="sm" variant={mode === 'encode' ? 'default' : 'outline'} onClick={() => setMode('encode')}>Text → Morse</Button>
        <Button type="button" size="sm" variant={mode === 'decode' ? 'default' : 'outline'} onClick={() => setMode('decode')}>Morse → Text</Button>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input"><ToolTextarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'SOS' : '... --- ...'} /></ToolPanel>
        <ToolPanel label="Output"><ToolTextarea value={output} readOnly /></ToolPanel>
      </div>
      <ToolActions>
        <Button type="button" onClick={convert}>Translate</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
    </div>
  )
}
