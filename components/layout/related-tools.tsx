import { ToolCard } from '@/components/cards/tool-card'
import type { ToolDefinition } from '@/lib/tools'

interface RelatedToolsProps {
  tools: ToolDefinition[]
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  if (tools.length === 0) return null

  return (
    <section aria-labelledby="related-tools-heading" className="border-t border-border/60 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="related-tools-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">
          Related tools
        </h2>
        <p className="mt-2 text-muted-foreground">Continue with tools that pair well with this one.</p>
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
