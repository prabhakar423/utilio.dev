'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { Code2, Eye, FileCode } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'
import {
  HTML_EXAMPLE,
  htmlToMarkdown,
  MARKDOWN_EXAMPLE,
  markdownToHtml,
  type MarkdownTab,
} from '@/lib/markdown'

const SHARE_INITIAL = {
  tab: 'preview' as MarkdownTab,
  markdown: '',
  htmlInput: '',
}

const TABS: { id: MarkdownTab; label: string; icon: typeof Eye }[] = [
  { id: 'preview', label: 'Live preview', icon: Eye },
  { id: 'html', label: 'Markdown → HTML', icon: Code2 },
  { id: 'html-to-md', label: 'HTML → Markdown', icon: FileCode },
]

interface MarkdownWorkbenchProps {
  defaultTab?: MarkdownTab
}

export function MarkdownWorkbench({ defaultTab = 'preview' }: MarkdownWorkbenchProps) {
  const [state, , setField] = useShareableJson({
    ...SHARE_INITIAL,
    tab: defaultTab,
  })

  const tab = (TABS.some((t) => t.id === state.tab) ? state.tab : defaultTab) as MarkdownTab

  const htmlFromMarkdown = useMemo(
    () => (state.markdown.trim() ? markdownToHtml(state.markdown) : ''),
    [state.markdown],
  )

  const markdownFromHtml = useMemo(
    () => (state.htmlInput.trim() ? htmlToMarkdown(state.htmlInput) : ''),
    [state.htmlInput],
  )

  const loadExample = () => {
    if (tab === 'html-to-md') {
      setField('htmlInput', HTML_EXAMPLE)
    } else {
      setField('markdown', MARKDOWN_EXAMPLE)
    }
  }

  const clearAll = () => {
    setField('markdown', '')
    setField('htmlInput', '')
  }

  const sendHtmlToReverse = () => {
    if (!htmlFromMarkdown) return
    setField('htmlInput', htmlFromMarkdown)
    setField('tab', 'html-to-md')
  }

  const sendMdToPreview = () => {
    if (!markdownFromHtml) return
    setField('markdown', markdownFromHtml)
    setField('tab', 'preview')
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

      {tab === 'preview' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <ToolPanel label="Markdown">
            <ToolTextarea
              value={state.markdown}
              onChange={(e) => setField('markdown', e.target.value)}
              placeholder="# Heading&#10;&#10;**Bold** text"
              className="min-h-80"
              mono={false}
            />
          </ToolPanel>
          <ToolPanel label="Live preview">
            <div
              className="prose prose-neutral dark:prose-invert min-h-80 max-w-none rounded-xl border border-border/70 bg-background p-4 text-sm"
              dangerouslySetInnerHTML={{
                __html: htmlFromMarkdown || '<p class="text-muted-foreground">Preview appears as you type…</p>',
              }}
            />
          </ToolPanel>
        </div>
      )}

      {tab === 'html' && (
        <>
          <div className="grid gap-4 lg:grid-cols-2">
            <ToolPanel label="Markdown">
              <ToolTextarea
                value={state.markdown}
                onChange={(e) => setField('markdown', e.target.value)}
                placeholder="# Heading"
                mono={false}
              />
            </ToolPanel>
            <ToolPanel label="HTML source">
              <ToolTextarea
                value={htmlFromMarkdown}
                readOnly
                placeholder="HTML appears here…"
              />
            </ToolPanel>
          </div>
          {htmlFromMarkdown && (
            <ToolPanel label="Rendered preview">
              <div
                className="prose prose-neutral dark:prose-invert max-w-none rounded-xl border border-border/70 bg-background p-4 text-sm"
                dangerouslySetInnerHTML={{ __html: htmlFromMarkdown }}
              />
            </ToolPanel>
          )}
        </>
      )}

      {tab === 'html-to-md' && (
        <div className="grid gap-4 lg:grid-cols-2">
          <ToolPanel label="HTML input">
            <ToolTextarea
              value={state.htmlInput}
              onChange={(e) => setField('htmlInput', e.target.value)}
              placeholder="<h1>Title</h1><p>Paragraph…</p>"
            />
          </ToolPanel>
          <ToolPanel label="Markdown output">
            <ToolTextarea
              value={markdownFromHtml}
              readOnly
              placeholder="Markdown appears here…"
              mono={false}
            />
          </ToolPanel>
        </div>
      )}

      <ToolActions>
        {tab === 'html' && (
          <ToolCopyButton text={htmlFromMarkdown} label="Copy HTML" disabled={!htmlFromMarkdown} />
        )}
        {tab === 'html-to-md' && (
          <ToolCopyButton text={markdownFromHtml} label="Copy Markdown" disabled={!markdownFromHtml} />
        )}
        {tab === 'preview' && htmlFromMarkdown && (
          <ToolCopyButton text={htmlFromMarkdown} label="Copy HTML" />
        )}
        <ToolClearButton onClear={clearAll} />
        <Button type="button" variant="outline" size="sm" onClick={loadExample}>
          Load example
        </Button>
        {tab === 'html' && htmlFromMarkdown && (
          <Button type="button" variant="outline" size="sm" onClick={sendHtmlToReverse}>
            Convert HTML → Markdown →
          </Button>
        )}
        {tab === 'html-to-md' && markdownFromHtml && (
          <Button type="button" variant="outline" size="sm" onClick={sendMdToPreview}>
            Preview Markdown →
          </Button>
        )}
      </ToolActions>

      <p className="text-xs text-muted-foreground">
        Supports headings, bold, italic, links, lists, and inline code. Beautify HTML in the{' '}
        <Link href="/tools/html-beautifier" className="font-medium text-primary hover:text-primary/80">
          HTML Beautifier
        </Link>
        .
      </p>

      <ToolExample>
        <pre className="whitespace-pre-wrap font-mono text-sm">
          {tab === 'html-to-md' ? HTML_EXAMPLE : MARKDOWN_EXAMPLE}
        </pre>
      </ToolExample>
    </div>
  )
}
