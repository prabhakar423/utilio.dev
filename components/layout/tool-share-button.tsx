'use client'

import { useMemo, useState } from 'react'
import { Check, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useShareUrl } from '@/components/layout/share-url-provider'
import { SHARE_PARAM } from '@/lib/share-state'

interface ToolShareButtonProps {
  title: string
}

export function ToolShareButton({ title }: ToolShareButtonProps) {
  const { shareUrl } = useShareUrl()
  const [copied, setCopied] = useState(false)

  const canShare = useMemo(() => {
    try {
      const url = new URL(shareUrl)
      return Boolean(url.searchParams.get(SHARE_PARAM))
    } catch {
      return false
    }
  }, [shareUrl])

  const handleShare = async () => {
    if (!canShare) return

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl })
        return
      } catch {
        // fall through to copy
      }
    }

    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      disabled={!canShare}
      title={canShare ? 'Copy a link with your current input' : 'Enter something to share a link'}
      aria-label={canShare ? 'Share this tool' : 'Share unavailable until you enter input'}
    >
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? 'Link copied' : 'Share'}
    </Button>
  )
}
