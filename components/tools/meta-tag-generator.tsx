'use client'

import { useMemo } from 'react'
import { ToolClearButton, ToolCopyButton } from '@/components/tools/tool-action-buttons'
import { ToolActions, ToolInput, ToolPanel, ToolTextarea } from '@/components/tools/tool-ui'
import { useShareableJson } from '@/hooks/use-shareable-json'

const SHARE_INITIAL = { title: '', description: '', url: '', image: '' }

function escapeAttr(value: string) {
  return value.replace(/"/g, '&quot;')
}

export function MetaTagGenerator() {
  const [state, , setField] = useShareableJson(SHARE_INITIAL)
  const { title, description, url, image } = state

  const output = useMemo(() => {
    const tags = [
      title && `<title>${title}</title>`,
      description && `<meta name="description" content="${escapeAttr(description)}" />`,
      title && `<meta property="og:title" content="${escapeAttr(title)}" />`,
      description && `<meta property="og:description" content="${escapeAttr(description)}" />`,
      url && `<meta property="og:url" content="${url}" />`,
      image && `<meta property="og:image" content="${image}" />`,
      `<meta property="og:type" content="website" />`,
      title && `<meta name="twitter:card" content="summary_large_image" />`,
      title && `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
      description && `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
      image && `<meta name="twitter:image" content="${image}" />`,
    ].filter(Boolean)

    return tags.length > 1 ? tags.join('\n') : ''
  }, [title, description, url, image])

  const clearAll = () => {
    setField('title', '')
    setField('description', '')
    setField('url', '')
    setField('image', '')
  }

  return (
    <div className="grid gap-5">
      <div className="grid gap-4">
        <ToolPanel label="Page title">
          <ToolInput
            type="text"
            value={title}
            onChange={(e) => setField('title', e.target.value)}
            placeholder="My Page Title"
          />
        </ToolPanel>
        <ToolPanel label="Description">
          <ToolTextarea
            value={description}
            onChange={(e) => setField('description', e.target.value)}
            placeholder="A brief description of the page…"
            rows={3}
            className="min-h-0"
            mono={false}
          />
        </ToolPanel>
        <div className="grid gap-4 sm:grid-cols-2">
          <ToolPanel label="URL">
            <ToolInput
              type="url"
              value={url}
              onChange={(e) => setField('url', e.target.value)}
              placeholder="https://example.com/page"
            />
          </ToolPanel>
          <ToolPanel label="OG image URL">
            <ToolInput
              type="url"
              value={image}
              onChange={(e) => setField('image', e.target.value)}
              placeholder="https://example.com/og.jpg"
            />
          </ToolPanel>
        </div>
      </div>

      <ToolPanel label="HTML output">
        <ToolTextarea value={output} readOnly placeholder="Meta tags appear here as you type…" />
      </ToolPanel>

      <ToolActions>
        <ToolCopyButton text={output} disabled={!output} />
        <ToolClearButton onClear={clearAll} />
      </ToolActions>
    </div>
  )
}
