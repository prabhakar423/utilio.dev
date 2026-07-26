'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { decodeShareState, SHARE_PARAM } from '@/lib/share-state'
import { useShareUrlUpdater } from '@/components/layout/share-url-provider'

function parseShareJson<T extends Record<string, string>>(
  encoded: string | null,
  fallback: T,
): T {
  if (!encoded) return fallback
  try {
    const decoded = decodeShareState(encoded)
    if (!decoded) return fallback
    const parsed = JSON.parse(decoded) as Partial<T>
    return { ...fallback, ...parsed }
  } catch {
    return fallback
  }
}

export function useShareableJson<T extends Record<string, string>>(initial: T) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const updateShareUrl = useShareUrlUpdater(pathname)
  const encoded = searchParams.get(SHARE_PARAM)
  const [state, setState] = useState<T>(() => parseShareJson(encoded, initial))

  useEffect(() => {
    const fromUrl = searchParams.get(SHARE_PARAM)
    if (fromUrl) {
      setState((prev) => parseShareJson(fromUrl, prev))
    }
  }, [searchParams])

  useEffect(() => {
    const hasContent = Object.values(state).some((v) => v.trim())
    updateShareUrl(hasContent ? JSON.stringify(state) : '')
  }, [state, updateShareUrl])

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }, [])

  return [state, setState, setField] as const
}
