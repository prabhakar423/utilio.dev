'use client'

import { useMemo, useState } from 'react'
import { ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

function mdToHtml(md: string): string {
  let html = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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

export function MarkdownPreview() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nWrite **Markdown** here and see a live preview.\n\n- Item one\n- Item two\n\n[Link](https://example.com)')

  const html = useMemo(() => mdToHtml(markdown), [markdown])

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ToolPanel label="Markdown">
        <ToolTextarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} className="min-h-80" mono={false} />
      </ToolPanel>
      <ToolPanel label="Live preview">
        <div className="prose prose-neutral dark:prose-invert min-h-80 max-w-none rounded-xl border border-border/70 bg-background p-4 text-sm"
          dangerouslySetInnerHTML={{ __html: html }} />
      </ToolPanel>
    </div>
  )
}
