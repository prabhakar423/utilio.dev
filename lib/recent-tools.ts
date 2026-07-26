const STORAGE_KEY = 'utillio-recent-tools'
const LEGACY_STORAGE_KEY = 'utilio-recent-tools'
const MAX_RECENT = 8

function readStoredRecent(): string | null {
  if (typeof window === 'undefined') return null
  const current = localStorage.getItem(STORAGE_KEY)
  if (current) return current
  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY)
  if (legacy) {
    localStorage.setItem(STORAGE_KEY, legacy)
    localStorage.removeItem(LEGACY_STORAGE_KEY)
    return legacy
  }
  return null
}

export function getRecentToolIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = readStoredRecent()
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : []
  } catch {
    return []
  }
}

export function addRecentTool(toolId: string): void {
  if (typeof window === 'undefined') return
  const recent = getRecentToolIds().filter((id) => id !== toolId)
  recent.unshift(toolId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)))
}

export function clearRecentTools(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(LEGACY_STORAGE_KEY)
}
