import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import type { Guide } from '@/lib/guides'

interface GuideCardProps {
  guide: Guide
  compact?: boolean
}

export function GuideCard({ guide, compact = false }: GuideCardProps) {
  const formattedDate = new Date(guide.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border/70 bg-card/70 p-6 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <BookOpen className="size-3.5 shrink-0" aria-hidden />
        <time dateTime={guide.publishedAt}>{formattedDate}</time>
      </div>
      <h3
        className={`mt-2 font-semibold transition-colors group-hover:text-primary ${compact ? 'text-lg' : 'text-xl'}`}
      >
        {guide.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {guide.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Read guide
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}
