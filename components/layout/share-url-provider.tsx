'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { buildShareUrl } from '@/lib/share-state'

interface ShareUrlContextValue {
  shareUrl: string
  setShareUrl: (url: string) => void
}

const ShareUrlContext = createContext<ShareUrlContextValue | null>(null)

interface ShareUrlProviderProps {
  defaultUrl: string
  children: React.ReactNode
}

export function ShareUrlProvider({ defaultUrl, children }: ShareUrlProviderProps) {
  const [shareUrl, setShareUrl] = useState(defaultUrl)

  useEffect(() => {
    setShareUrl(defaultUrl)
  }, [defaultUrl])

  const value = useMemo(
    () => ({
      shareUrl,
      setShareUrl,
    }),
    [shareUrl],
  )

  return <ShareUrlContext.Provider value={value}>{children}</ShareUrlContext.Provider>
}

export function useShareUrl() {
  const context = useContext(ShareUrlContext)
  if (!context) {
    throw new Error('useShareUrl must be used within ShareUrlProvider')
  }
  return context
}

export function useShareUrlUpdater(pathname: string) {
  const { setShareUrl } = useShareUrl()

  return (value: string) => {
    setShareUrl(buildShareUrl(pathname, value))
  }
}
