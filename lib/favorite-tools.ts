const STORAGE_KEY = 'utilio-favorite-tools'
const MAX_FAVORITES = 24

export const FAVORITES_CHANGED_EVENT = 'utilio-favorites-changed'

function notifyChange(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT))
}

export function getFavoriteToolIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function isFavoriteTool(toolId: string): boolean {
  return getFavoriteToolIds().includes(toolId)
}

export function toggleFavoriteTool(toolId: string): boolean {
  if (typeof window === 'undefined') return false
  const favorites = getFavoriteToolIds()
  const exists = favorites.includes(toolId)
  const next = exists
    ? favorites.filter((id) => id !== toolId)
    : [toolId, ...favorites].slice(0, MAX_FAVORITES)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  notifyChange()
  return !exists
}

export function clearFavoriteTools(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  notifyChange()
}
