import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getCategoryName } from '@/lib/category-utils'
import { cn, getLucideIcon } from '@/lib/utils'

interface ToolCardProps {
  id: string
  title: string
  description: string
  icon: string
  category: string
  compact?: boolean
  prefetch?: boolean
  favorite?: React.ReactNode
}

export function ToolCard({
  id,
  title,
  description,
  icon,
  category,
  compact = false,
  prefetch = true,
  favorite,
}: ToolCardProps) {
  const IconComponent = getLucideIcon(icon)
  const categoryName = getCategoryName(category)

  return (
    <Link
      href={`/tools/${id}`}
      prefetch={prefetch}
      className={cn(
        'group relative block h-full overflow-hidden rounded-2xl border border-border/70 bg-card/70 p-5 transition-all duration-200',
        'hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card hover:shadow-lg hover:shadow-primary/5',
        compact && 'p-4',
      )}
    >
      {favorite && (
        <div className="pointer-events-none absolute right-3 top-3 z-10 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 [&>*]:pointer-events-auto">
          {favorite}
        </div>
      )}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="flex items-start gap-3">
        {IconComponent && (
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary transition-colors group-hover:bg-primary/15">
            <IconComponent className="size-5" />
          </div>
        )}
        <div className={cn('min-w-0 flex-1', favorite && 'pr-8')}>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold tracking-tight transition-colors group-hover:text-primary">
              {title}
            </h3>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary group-hover:opacity-100" />
          </div>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
          <span className="mt-4 inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {categoryName}
          </span>
        </div>
      </div>
    </Link>
  )
}
