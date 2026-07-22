'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

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
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setOutput(markdownToHtml(input))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <ToolPanel label="Markdown">
          <ToolTextarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="# Heading&#10;&#10;**Bold** and *italic* text&#10;&#10;- List item"
            mono={false}
          />
        </ToolPanel>
        <ToolPanel label="HTML output">
          <ToolTextarea value={output} readOnly placeholder="HTML appears here…" />
        </ToolPanel>
      </div>

      <ToolActions>
        <Button type="button" onClick={convert}>
          Convert to HTML
        </Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          Copy HTML
        </Button>
      </ToolActions>

      {output && (
        <ToolPanel label="Preview">
          <div
            className="prose prose-neutral dark:prose-invert max-w-none rounded-xl border border-border/70 bg-background p-4 text-sm"
            dangerouslySetInnerHTML={{ __html: output }}
          />
        </ToolPanel>
      )}
    </div>
  )
}
