'use client'

import { useEffect, useState } from 'react'
import { Link2, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { decodeShareState, SHARE_PARAM } from '@/lib/share-state'
import { Button } from '@/components/ui/button'

export function SharedLinkBanner() {
  const searchParams = useSearchParams()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const encoded = searchParams.get(SHARE_PARAM)
    if (encoded && decodeShareState(encoded).trim()) {
      setVisible(true)
    }
  }, [searchParams])

  if (!visible) return null

  return (
    <div
      role="status"
      className="mb-4 flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-sm"
    >
      <Link2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
      <p className="flex-1 text-foreground/90">
        Opened from a shared link — your input has been restored.
      </p>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="size-7 shrink-0"
        onClick={() => setVisible(false)}
        aria-label="Dismiss shared link notice"
      >
        <X className="size-4" />
      </Button>
    </div>
  )
}
