const STORAGE_KEY = 'utilio-recent-tools'
const MAX_RECENT = 8

export function getRecentToolIds(): string[] {
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

export function addRecentTool(toolId: string): void {
  if (typeof window === 'undefined') return
  const recent = getRecentToolIds().filter((id) => id !== toolId)
  recent.unshift(toolId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)))
}

export function clearRecentTools(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
