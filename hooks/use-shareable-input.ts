'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { decodeShareState, SHARE_PARAM } from '@/lib/share-state'
import { useShareUrlUpdater } from '@/components/layout/share-url-provider'

export function useShareableInput(initial = '') {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const updateShareUrl = useShareUrlUpdater(pathname)
  const encoded = searchParams.get(SHARE_PARAM)
  const [input, setInput] = useState(() => (encoded ? decodeShareState(encoded) : initial))

  useEffect(() => {
    const fromUrl = searchParams.get(SHARE_PARAM)
    if (fromUrl) {
      const decoded = decodeShareState(fromUrl)
      if (decoded) setInput(decoded)
    }
  }, [searchParams])

  useEffect(() => {
    updateShareUrl(input)
  }, [input, updateShareUrl])

  return [input, setInput] as const
}
