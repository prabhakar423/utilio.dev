import Link from 'next/link'
import { Link2 } from 'lucide-react'

interface ClusterToolLink {
  id: string
  title: string
  seoH1?: string
}

interface ClusterToolLinksProps {
  tools: ClusterToolLink[]
}

export function ClusterToolLinks({ tools }: ClusterToolLinksProps) {
  if (tools.length === 0) return null

  return (
    <section
      aria-labelledby="cluster-tools-heading"
      className="mt-8 rounded-2xl border border-border/70 bg-muted/20 p-5 sm:p-6"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Link2 className="size-4 text-primary" aria-hidden />
        <h2 id="cluster-tools-heading" className="text-base font-semibold text-foreground">
          Often used together
        </h2>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.id}`}
            className="rounded-xl border border-border/70 bg-background px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
          >
            {tool.seoH1 ?? tool.title}
          </Link>
        ))}
      </div>
    </section>
  )
}
