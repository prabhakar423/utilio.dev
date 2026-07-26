'use client'

import { useState } from 'react'
import { Check, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useShareUrl } from '@/components/layout/share-url-provider'

interface ToolShareButtonProps {
  title: string
}

export function ToolShareButton({ title }: ToolShareButtonProps) {
  const { shareUrl } = useShareUrl()
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
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
    <Button variant="outline" size="sm" onClick={handleShare} aria-label="Share this tool">
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? 'Link copied' : 'Share'}
    </Button>
  )
}
