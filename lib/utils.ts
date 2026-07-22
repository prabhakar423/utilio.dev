import { clsx, type ClassValue } from 'clsx'
import * as Icons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function kebabToPascal(value: string): string {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

export function getLucideIcon(name: string): LucideIcon | undefined {
  const key = kebabToPascal(name)
  return (Icons as unknown as Record<string, LucideIcon | undefined>)[key]
}
