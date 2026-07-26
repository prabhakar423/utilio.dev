'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { getCategoryName, searchTools, type ToolDefinition } from '@/lib/tools'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  size?: 'default' | 'hero'
  className?: string
}

export function SearchBar({ size = 'default', className }: SearchBarProps) {
  const [value, setValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [results, setResults] = useState<ToolDefinition[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const listRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const isHero = size === 'hero'

  const handleSearch = useCallback((query: string) => {
    setValue(query)
    setActiveIndex(-1)
    if (query.trim()) {
      setResults(searchTools(query).slice(0, 6))
      setIsOpen(true)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [])

  const selectResult = useCallback(
    (toolId: string) => {
      router.push(`/tools/${toolId}`)
      setValue('')
      setResults([])
      setIsOpen(false)
      setActiveIndex(-1)
    },
    [router],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (activeIndex >= 0 && results[activeIndex]) {
      selectResult(results[activeIndex].id)
      return
    }
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value)}`)
      setIsOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((index) => (index + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1))
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      setActiveIndex(-1)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-search]')) {
        setIsOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const item = listRef.current.children[activeIndex] as HTMLElement | undefined
      item?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  return (
    <div data-search className={cn('relative', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Search
          className={cn(
            'pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground',
            isHero ? 'left-4 size-5' : 'left-3 size-4',
          )}
        />
        <input
          type="search"
          role="combobox"
          aria-expanded={isOpen && results.length > 0}
          aria-controls="search-results"
          aria-activedescendant={
            activeIndex >= 0 ? `search-result-${results[activeIndex]?.id}` : undefined
          }
          placeholder={isHero ? 'Search free tools…' : 'Search tools…'}
          data-search-input
          value={value}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => value && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className={cn(
            'w-full rounded-xl border border-border/80 bg-background/80 text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20',
            isHero ? 'py-4 pl-12 pr-12 text-base' : 'py-2 pl-9 pr-[4.5rem] text-sm',
          )}
        />
        {!isHero && !value && (
          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-border/80 bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
            Ctrl K
          </kbd>
        )}
        {value && (
          <button
            type="button"
            onClick={() => {
              setValue('')
              setResults([])
              setIsOpen(false)
              setActiveIndex(-1)
            }}
            className={cn(
              'absolute top-1/2 -translate-y-1/2 rounded-md p-0.5 transition-colors hover:bg-muted',
              isHero ? 'right-4' : 'right-3',
            )}
            aria-label="Clear search"
          >
            <X className="size-4 text-muted-foreground" />
          </button>
        )}
      </form>

      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          role="listbox"
          ref={listRef}
          className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border/80 bg-popover shadow-xl"
        >
          <div className="max-h-72 divide-y divide-border/60 overflow-y-auto">
            {results.map((tool, index) => (
              <button
                key={tool.id}
                id={`search-result-${tool.id}`}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onClick={() => selectResult(tool.id)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  'w-full px-4 py-3 text-left transition-colors',
                  index === activeIndex ? 'bg-muted' : 'hover:bg-muted/60',
                )}
              >
                <div className="font-medium text-foreground">{tool.title}</div>
                <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="line-clamp-1">{tool.description}</span>
                  <span aria-hidden>·</span>
                  <span className="shrink-0">{getCategoryName(tool.category)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
