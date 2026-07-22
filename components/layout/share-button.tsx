'use client'

import { useState } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShareButtonProps {
  title: string
  url: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // fall through to copy
      }
    }

    await navigator.clipboard.writeText(url)
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
