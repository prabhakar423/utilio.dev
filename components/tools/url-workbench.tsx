'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { ArrowDownToLine, ArrowUpFromLine, ScanSearch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolError,
  ToolExample,
  ToolInput,
  ToolPanel,
  ToolSelect,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import {
  encodingLabel,
  parseUrl,
  transformUrl,
  URL_EXAMPLE,
  type UrlEncoding,
  type UrlTab,
} from '@/lib/url-encoding'

const SHARE_INITIAL = {
  tab: 'encode' as UrlTab,
  input: '',
  encoding: 'component' as UrlEncoding,
}

const TABS: { id: UrlTab; label: string; icon: typeof ArrowUpFromLine }[] = [
  { id: 'encode', label: 'Encode', icon: ArrowUpFromLine },
  { id: 'decode', label: 'Decode', icon: ArrowDownToLine },
  { id: 'parse', label: 'Parse', icon: ScanSearch },
]

interface UrlWorkbenchProps {
  defaultTab?: UrlTab
}

export function UrlWorkbench({ defaultTab = 'encode' }: UrlWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as UrlTab
  const encoding = (['component', 'full', 'form'].includes(state.encoding)
    ? state.encoding
    : 'component') as UrlEncoding

  const { output, error } = useMemo(() => {
    if (tab === 'parse') return { output: '', error: '' }
    return transformUrl(state.input, tab, encoding)
  }, [state.input, tab, encoding])

  const parsed = useMemo(() => {
    if (tab !== 'parse') return null
    if (!state.input.trim()) return null
    return parseUrl(state.input)
  }, [state.input, tab])

  const parseError = parsed && 'error' in parsed ? parsed.error : ''
  const parsedUrl = parsed && !('error' in parsed) ? parsed : null

  const loadExample = () => {
    if (tab === 'parse') {
      setField('input', URL_EXAMPLE.parseUrl)
    } else if (tab === 'encode') {
      setField('input', encoding === 'full' ? URL_EXAMPLE.fullUrl : URL_EXAMPLE.plain)
    } else {
      setField('input', URL_EXAMPLE.component)
    }
  }

  const swapToOtherTab = () => {
    if (!output) return
    setField('input', output)
    setField('tab', tab === 'encode' ? 'decode' : 'encode')
  }

  const parseThisUrl = () => {
    if (!state.input.trim()) return
    setField('tab', 'parse')
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

      {tab !== 'parse' && (
        <ToolPanel label="Encoding mode">
          <ToolSelect
            value={encoding}
            onChange={(e) => setField('encoding', e.target.value as UrlEncoding)}
          >
            <option value="component">Component — query params &amp; values</option>
            <option value="full">Full URL — keeps :// ? # intact</option>
            <option value="form">Form — spaces as +</option>
          </ToolSelect>
          <p className="mt-2 text-xs text-muted-foreground">{encodingLabel(encoding)}</p>
        </ToolPanel>
      )}

      <p className="text-sm text-muted-foreground">
        URL workbench — encode, decode, and parse URLs in one place.{' '}
        <Link href="/tools/url-encoder" className="text-primary underline-offset-4 hover:underline">
          Encoder
        </Link>
        {' · '}
        <Link href="/tools/url-decoder" className="text-primary underline-offset-4 hover:underline">
          Decoder
        </Link>
        {' · '}
        <Link href="/tools/url-parser" className="text-primary underline-offset-4 hover:underline">
          Parser
        </Link>
      </p>

      {tab === 'parse' ? (
        <>
          <ToolPanel label="URL">
            <ToolInput
              type="url"
              value={state.input}
              onChange={(e) => setField('input', e.target.value)}
              placeholder="https://example.com/path?q=1"
              className="font-mono"
            />
          </ToolPanel>

          {parseError && <ToolError message={parseError} />}

          {parsedUrl && (
            <>
              <div className="overflow-x-auto rounded-xl border border-border/70">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/70 bg-muted/30 text-left">
                      <th className="px-4 py-2 font-medium">Component</th>
                      <th className="px-4 py-2 font-medium">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parsedUrl.components.map((component) => (
                      <tr key={component.label} className="border-b border-border/50 last:border-0">
                        <td className="px-4 py-2">{component.label}</td>
                        <td className="px-4 py-2 break-all font-mono text-xs">{component.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {parsedUrl.params.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-border/70">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/70 bg-muted/30 text-left">
                        <th className="px-4 py-2 font-medium">Query param</th>
                        <th className="px-4 py-2 font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedUrl.params.map((param) => (
                        <tr key={param.key} className="border-b border-border/50 last:border-0">
                          <td className="px-4 py-2 font-mono text-xs">{param.key}</td>
                          <td className="px-4 py-2 break-all font-mono text-xs">{param.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <ToolPanel label="Full breakdown">
                <ToolTextarea value={parsedUrl.breakdown} readOnly className="min-h-48" mono={false} />
              </ToolPanel>
            </>
          )}

          <ToolActions>
            <ToolCopyButton
              text={parsedUrl?.breakdown ?? ''}
              label="Copy breakdown"
              disabled={!parsedUrl}
            />
            <ToolClearButton onClear={() => setField('input', '')} />
            <Button type="button" variant="outline" onClick={loadExample}>
              Load example
            </Button>
          </ToolActions>
        </>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <ToolPanel label={tab === 'encode' ? 'Raw text or URL' : 'Encoded input'}>
              <ToolTextarea
                value={state.input}
                onChange={(e) => setField('input', e.target.value)}
                placeholder={
                  tab === 'encode' ? 'Enter text or URL to encode…' : 'Paste encoded text to decode…'
                }
                mono={false}
              />
            </ToolPanel>
            <ToolPanel label={tab === 'encode' ? 'Encoded output' : 'Decoded output'}>
              <ToolTextarea value={output} readOnly placeholder="Output appears here as you type…" mono={false} />
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
            {state.input.trim() && (
              <Button type="button" variant="outline" size="sm" onClick={parseThisUrl}>
                Parse URL →
              </Button>
            )}
          </ToolActions>
        </>
      )}

      <ToolExample>
        <p>Plain: {URL_EXAMPLE.plain}</p>
        <p>Component encoded: {URL_EXAMPLE.component}</p>
        <p className="break-all">Parse example: {URL_EXAMPLE.parseUrl}</p>
      </ToolExample>
    </div>
  )
}
