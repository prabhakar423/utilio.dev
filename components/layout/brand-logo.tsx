import Link from 'next/link'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

interface BrandLogoProps {
  showWordmark?: boolean
  size?: 'sm' | 'md'
  className?: string
}

const sizes = {
  sm: { mark: 'size-8 text-xs', name: 'text-sm', sub: 'text-[10px]' },
  md: { mark: 'size-9 text-sm', name: 'text-sm', sub: 'text-[11px]' },
} as const

export function BrandLogo({ showWordmark = true, size = 'md', className }: BrandLogoProps) {
  const s = sizes[size]

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn('group flex shrink-0 items-center gap-2.5', className)}
    >
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary to-accent font-bold text-primary-foreground shadow-sm shadow-primary/20',
          s.mark,
        )}
        aria-hidden
      >
        <span className="relative z-10">{siteConfig.logoInitial}</span>
        <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      {showWordmark && (
        <div className="hidden sm:block">
          <div className={cn('font-bold tracking-tight', s.name)}>{siteConfig.name}</div>
          <div className={cn('text-muted-foreground', s.sub)}>{siteConfig.subtitle}</div>
        </div>
      )}
    </Link>
  )
}
