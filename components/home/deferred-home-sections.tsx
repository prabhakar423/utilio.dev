'use client'

import dynamic from 'next/dynamic'

const RecentToolsSection = dynamic(
  () => import('@/components/home/recent-tools-section').then((mod) => mod.RecentToolsSection),
  { ssr: false },
)

const FavoriteToolsSection = dynamic(
  () => import('@/components/home/favorite-tools-section').then((mod) => mod.FavoriteToolsSection),
  { ssr: false },
)

export function DeferredHomeSections() {
  return (
    <>
      <RecentToolsSection />
      <FavoriteToolsSection />
    </>
  )
}
