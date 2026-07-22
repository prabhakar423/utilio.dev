'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToolActions, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'

export function MetaTagGenerator() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const tags = [
      title && `<title>${title}</title>`,
      description && `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`,
      title && `<meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />`,
      description && `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />`,
      url && `<meta property="og:url" content="${url}" />`,
      image && `<meta property="og:image" content="${image}" />`,
      `<meta property="og:type" content="website" />`,
      title && `<meta name="twitter:card" content="summary_large_image" />`,
      title && `<meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />`,
      description && `<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />`,
      image && `<meta name="twitter:image" content="${image}" />`,
    ].filter(Boolean)

    setOutput(tags.join('\n'))
    setCopied(false)
  }

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Page title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Page Title"
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description of the page…" rows={3}
            className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">URL</label>
            <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/page"
              className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">OG image URL</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/og.jpg"
              className="w-full rounded-xl border border-border/80 px-4 py-2.5 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
      </div>
      <ToolActions>
        <Button type="button" onClick={generate}>Generate meta tags</Button>
        <Button type="button" variant="secondary" onClick={copy} disabled={!output}>
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />} Copy
        </Button>
      </ToolActions>
      {output && <ToolPanel label="HTML output"><ToolTextarea value={output} readOnly /></ToolPanel>}
    </div>
  )
}
