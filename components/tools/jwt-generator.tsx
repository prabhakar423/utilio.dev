'use client'

import { JwtWorkbench } from '@/components/tools/jwt-workbench'

export function JwtGenerator() {
  return <JwtWorkbench defaultTab="sign" />
}
