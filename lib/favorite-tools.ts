const STORAGE_KEY = 'utiliio-favorite-tools'
const LEGACY_STORAGE_KEYS = ['utillio-favorite-tools', 'utilio-favorite-tools']
const MAX_FAVORITES = 24

export const FAVORITES_CHANGED_EVENT = 'utiliio-favorites-changed'

function readStoredFavorites(): string | null {
  if (typeof window === 'undefined') return null
  const current = localStorage.getItem(STORAGE_KEY)
  if (current) return current
  for (const legacyKey of LEGACY_STORAGE_KEYS) {
    const legacy = localStorage.getItem(legacyKey)
    if (legacy) {
      localStorage.setItem(STORAGE_KEY, legacy)
      localStorage.removeItem(legacyKey)
      return legacy
    }
  }
  return null
}

function notifyChange(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT))
}

export function getFavoriteToolIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = readStoredFavorites()
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
  for (const legacyKey of LEGACY_STORAGE_KEYS) {
    localStorage.removeItem(legacyKey)
  }
  notifyChange()
}
