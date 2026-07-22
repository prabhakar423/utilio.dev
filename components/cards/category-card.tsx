import Link from 'next/link'
import { getToolsByCategory } from '@/lib/tools'
import { getLucideIcon } from '@/lib/utils'

interface CategoryCardProps {
  id: string
  name: string
  description: string
  icon: string
}

export function CategoryCard({ id, name, description, icon }: CategoryCardProps) {
  const IconComponent = getLucideIcon(icon)
  const toolCount = getToolsByCategory(id).length

  return (
    <Link
      href={`/category/${id}`}
      className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 transition-transform group-hover:scale-110" />

      <div className="relative flex flex-col gap-4">
        {IconComponent && (
          <div className="inline-flex w-fit rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 p-3 text-primary">
            <IconComponent className="size-6" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary">
            {name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {toolCount} tool{toolCount !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </Link>
  )
}
