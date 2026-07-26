'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import {
  BASE64_EXAMPLE,
  transformBase64,
  type Base64Tab,
  type Base64Variant,
} from '@/lib/base64'

const SHARE_INITIAL = {
  tab: 'encode' as Base64Tab,
  input: '',
  variant: 'standard' as Base64Variant,
}

const TABS: { id: Base64Tab; label: string; icon: typeof ArrowUpFromLine }[] = [
  { id: 'encode', label: 'Encode', icon: ArrowUpFromLine },
  { id: 'decode', label: 'Decode', icon: ArrowDownToLine },
]

interface Base64WorkbenchProps {
  defaultTab?: Base64Tab
}

export function Base64Workbench({ defaultTab = 'encode' }: Base64WorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as Base64Tab
  const variant = state.variant === 'urlsafe' ? 'urlsafe' : 'standard'

  const { output, error } = useMemo(
    () => transformBase64(state.input, tab, variant),
    [state.input, tab, variant],
  )

  const loadExample = () => {
    if (tab === 'encode') {
      setField('input', BASE64_EXAMPLE.plain)
    } else {
      setField(
        'input',
        variant === 'urlsafe' ? BASE64_EXAMPLE.urlsafe : BASE64_EXAMPLE.standard,
      )
    }
  }

  const swapToOtherTab = () => {
    if (!output) return
    setField('input', output)
    setField('tab', tab === 'encode' ? 'decode' : 'encode')
  }

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap gap-2">
        {TABS.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            type="button"
            variant={tab === id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setField('tab', id)}
          >
            <Icon className="size-3.5" />
            {label}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={variant === 'standard' ? 'default' : 'outline'}
          onClick={() => setField('variant', 'standard')}
        >
          Standard Base64
        </Button>
        <Button
          type="button"
          size="sm"
          variant={variant === 'urlsafe' ? 'default' : 'outline'}
          onClick={() => setField('variant', 'urlsafe')}
        >
          URL-safe
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Base64 workbench — encode and decode in one place, with standard or URL-safe output.{' '}
        <Link href="/tools/base64-encoder" className="text-primary underline-offset-4 hover:underline">
          Encoder
        </Link>
        {' · '}
        <Link href="/tools/base64-decoder" className="text-primary underline-offset-4 hover:underline">
          Decoder
        </Link>
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label={tab === 'encode' ? 'Plain text' : 'Base64 input'}>
          <ToolTextarea
            value={state.input}
            onChange={(e) => setField('input', e.target.value)}
            placeholder={tab === 'encode' ? 'Enter text to encode…' : 'Paste Base64 to decode…'}
          />
        </ToolPanel>
        <ToolPanel label={tab === 'encode' ? 'Base64 output' : 'Plain text output'}>
          <ToolTextarea value={output} readOnly placeholder="Output appears here as you type…" />
        </ToolPanel>
      </div>

      {error && <ToolError message={error} />}

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={() => setField('input', '')} />
        <Button type="button" variant="outline" onClick={loadExample}>
          Load example
        </Button>
        {output && (
          <Button type="button" variant="outline" size="sm" onClick={swapToOtherTab}>
            {tab === 'encode' ? 'Decode this →' : '← Encode this'}
          </Button>
        )}
      </ToolActions>

      <ToolExample>
        <p>Plain: {BASE64_EXAMPLE.plain}</p>
        <p>Standard: {BASE64_EXAMPLE.standard}</p>
        <p>URL-safe: {BASE64_EXAMPLE.urlsafe}</p>
      </ToolExample>
    </div>
  )
}
