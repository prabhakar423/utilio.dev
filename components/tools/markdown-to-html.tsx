'use client'

import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import {
  ToolActions,
  ToolExample,
  ToolPanel,
  ToolTextarea,
} from '@/components/tools/tool-ui'
import { useShareableInput } from '@/hooks/use-shareable-input'

const EXAMPLE = `# Hello World

**Bold** and *italic* text.

- First item
- Second item

[Utillio](https://utillio.com)`

function markdownToHtml(md: string): string {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/`(.+?)`/g, '<code>$1</code>')
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`)
  html = html.replace(/^(?!<[hul])(.+)$/gm, '<p>$1</p>')

  return html
}

export function MarkdownToHtml() {
  const [input, setInput] = useShareableInput('')

  const output = useMemo(() => (input.trim() ? markdownToHtml(input) : ''), [input])

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Markdown">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="# Heading\n\n**Bold** text"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="HTML output">
          <ToolTextarea value={output} readOnly placeholder="HTML appears here…" />
        </ToolPanel>
      </div>

      {output && (
        <ToolPanel label="Preview">
          <div
            className="prose prose-neutral dark:prose-invert max-w-none rounded-xl border border-border/70 bg-background p-4 text-sm"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </ToolPanel>
      )}

      <ToolActions>
        <ToolCopyButton text={output} label="Copy HTML" disabled={!output} />
        <ToolClearButton onClear={() => setInput('')} />
        <Button type="button" variant="outline" onClick={() => setInput(EXAMPLE)}>
          Load example
        </Button>
      </ToolActions>

      <ToolExample>
        <p>Supports headings, bold, italic, links, lists, and inline code.</p>
      </ToolExample>
    </div>
  )
}
