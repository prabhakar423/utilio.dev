'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

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

const SHARE_INITIAL = { input: '', mode: 'encode' }

export function MorseCodeTranslator() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const mode = state.mode === 'decode' ? 'decode' : 'encode'

  const output = useMemo(() => {
    if (!state.input) return ''
    return mode === 'encode' ? encodeMorse(state.input) : decodeMorse(state.input)
  }, [state.input, mode])

  return (
    <div className="grid gap-5">
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant={mode === 'encode' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'encode')}
        >
          Text → Morse
        </Button>
        <Button
          type="button"
          size="sm"
          variant={mode === 'decode' ? 'default' : 'outline'}
          onClick={() => setField('mode', 'decode')}
        >
          Morse → Text
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Input">
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder={mode === 'encode' ? 'SOS' : '... --- ...'}
          />
        </ToolPanel>
        <ToolPanel label="Output">
          <ToolTextarea value={output} readOnly placeholder="Translation appears here…" />
        </ToolPanel>
      </div>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
      </ToolActions>
    </div>
  )
}
