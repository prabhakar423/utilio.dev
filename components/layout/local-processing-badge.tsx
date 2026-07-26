import { ShieldCheck } from 'lucide-react'
import { localProcessingBadge } from '@/lib/privacy-copy'

export function LocalProcessingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400">
      <ShieldCheck className="size-3.5 shrink-0" />
      {localProcessingBadge}
    </span>
  )
}
