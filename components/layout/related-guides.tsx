import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { GuideCard } from '@/components/cards/guide-card'
import type { Guide } from '@/lib/guides'

interface RelatedGuidesProps {
  guides: Guide[]
}

export function RelatedGuides({ guides }: RelatedGuidesProps) {
  if (guides.length === 0) return null

  return (
    <section className="border-t border-border/60 bg-muted/10 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2">
          <BookOpen className="size-5 text-primary" />
          <h2 className="text-2xl font-bold tracking-tight">Related guides</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} compact />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/guides" className="text-sm font-medium text-primary hover:text-primary/80">
            Browse all guides →
          </Link>
        </div>
      </div>
    </section>
  )
}
