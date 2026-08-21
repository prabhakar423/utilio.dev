import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { tools } from '@/lib/tools'

interface PrimaryToolBannerProps {
  toolId: string
  label: string
  message?: string
}

export function PrimaryToolBanner({ toolId, label, message }: PrimaryToolBannerProps) {
  const tool = tools[toolId]
  if (!tool) return null

  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:p-6">
      {message && <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>}
      <Link
        href={`/tools/${toolId}`}
        className={`inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 ${message ? 'mt-4' : ''}`}
      >
        {label}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}
