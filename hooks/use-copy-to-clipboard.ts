'use client'

import { useCallback, useState } from 'react'

export function useCopyToClipboard(resetMs = 2000) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(
    async (text: string) => {
      if (!text) return false
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), resetMs)
      return true
    },
    [resetMs],
  )

  return { copied, copy }
}
