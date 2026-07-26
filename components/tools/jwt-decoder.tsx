'use client'

import { JwtWorkbench } from '@/components/tools/jwt-workbench'

export function JwtDecoder() {
  return <JwtWorkbench defaultTab="decode" />
}
