'use client'

import { Check, Copy, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

interface ToolCopyButtonProps {
  text: string
  label?: string
  disabled?: boolean
}

export function ToolCopyButton({ text, label = 'Copy output', disabled }: ToolCopyButtonProps) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={() => void copy(text)}
      disabled={disabled || !text}
    >
      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      {copied ? 'Copied' : label}
    </Button>
  )
}

interface ToolClearButtonProps {
  onClear: () => void
}

export function ToolClearButton({ onClear }: ToolClearButtonProps) {
  return (
    <Button type="button" variant="outline" onClick={onClear}>
      <RefreshCw className="size-4" />
      Clear
    </Button>
  )
}
