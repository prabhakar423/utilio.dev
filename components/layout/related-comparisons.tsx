import Link from 'next/link'
import { Scale } from 'lucide-react'
import type { Comparison } from '@/lib/comparisons'

interface RelatedComparisonsProps {
  comparisons: Comparison[]
}

export function RelatedComparisons({ comparisons }: RelatedComparisonsProps) {
  if (comparisons.length === 0) return null

  return (
    <section className="border-t border-border/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center gap-2">
          <Scale className="size-5 text-primary" />
          <h2 className="text-xl font-bold tracking-tight">Compare</h2>
        </div>
        <ul className="space-y-3">
          {comparisons.map((comparison) => (
            <li key={comparison.slug}>
              <Link
                href={`/compare/${comparison.slug}`}
                className="group block rounded-xl border border-border/70 bg-card/40 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-card/70"
              >
                <span className="font-medium group-hover:text-primary">{comparison.title}</span>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {comparison.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
