import { Search } from 'lucide-react'

export function HeroSearchForm() {
  return (
    <form action="/search" method="get" className="relative">
      <Search
        className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <input
        type="search"
        name="q"
        placeholder="Search free tools…"
        aria-label="Search tools"
        autoComplete="off"
        className="w-full rounded-xl border border-border/80 bg-background/80 py-4 pl-12 pr-12 text-base text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </form>
  )
}
