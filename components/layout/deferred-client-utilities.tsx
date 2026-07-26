'use client'

import dynamic from 'next/dynamic'

const GlobalShortcuts = dynamic(
  () => import('@/components/layout/global-shortcuts').then((mod) => mod.GlobalShortcuts),
  { ssr: false },
)

const ScrollToTop = dynamic(
  () => import('@/components/layout/scroll-to-top').then((mod) => mod.ScrollToTop),
  { ssr: false },
)

export function DeferredClientUtilities() {
  return (
    <>
      <GlobalShortcuts />
      <ScrollToTop />
    </>
  )
}
