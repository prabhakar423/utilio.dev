'use client'

import dynamic from 'next/dynamic'
import { StaticHeaderShell } from '@/components/layout/static-header-shell'

const Header = dynamic(() => import('@/components/layout/header').then((mod) => mod.Header), {
  ssr: false,
  loading: () => <StaticHeaderShell />,
})

export function HomeHeader() {
  return <Header />
}
