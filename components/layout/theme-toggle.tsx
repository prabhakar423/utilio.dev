'use client'

import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme, type Theme } from '@/components/providers/theme-provider'
import { Button } from '@/components/ui/button'

const cycle: Theme[] = ['light', 'dark', 'system']

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
} as const

const labels = {
  light: 'Light mode',
  dark: 'Dark mode',
  system: 'System theme',
} as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Theme">
        <Sun className="size-4" />
      </Button>
    )
  }

  const Icon = icons[theme]

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={labels[theme]}
      onClick={() => {
        const index = cycle.indexOf(theme)
        setTheme(cycle[(index + 1) % cycle.length])
      }}
    >
      <Icon className="size-4" />
    </Button>
  )
}
