interface AdSlotProps {
  placement: 'top-banner' | 'content-middle' | 'content-bottom' | 'sidebar'
  className?: string
}

const labels: Record<AdSlotProps['placement'], string> = {
  'top-banner': 'Top banner',
  'content-middle': 'In-content',
  'content-bottom': 'Bottom content',
  sidebar: 'Sidebar',
}

export function AdSlot({ placement, className = '' }: AdSlotProps) {
  if (placement === 'sidebar') {
    return (
      <aside
        aria-hidden
        className={`hidden xl:flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/20 text-xs text-muted-foreground ${className}`}
      >
        Ad · {labels[placement]}
      </aside>
    )
  }

  return (
    <div
      aria-hidden
      className={`flex min-h-20 items-center justify-center rounded-xl border border-dashed border-border/70 bg-muted/20 text-xs text-muted-foreground ${className}`}
    >
      Ad · {labels[placement]}
    </div>
  )
}
