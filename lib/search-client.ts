import type { ToolSearchItem } from '@/lib/tool-search-index'

let cachedIndex: ToolSearchItem[] | null = null
let loadPromise: Promise<ToolSearchItem[]> | null = null

export async function loadSearchIndex(): Promise<ToolSearchItem[]> {
  if (cachedIndex) return cachedIndex
  if (!loadPromise) {
    loadPromise = fetch('/search-index.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load search index')
        return response.json() as Promise<ToolSearchItem[]>
      })
      .then((index) => {
        cachedIndex = index
        return index
      })
  }
  return loadPromise
}

export function searchLoadedIndex(query: string, index: ToolSearchItem[]): ToolSearchItem[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return []

  return index.filter(
    (tool) =>
      tool.title.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.categoryName.toLowerCase().includes(lowerQuery) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery)),
  )
}

export function findInLoadedIndex(id: string, index: ToolSearchItem[]): ToolSearchItem | undefined {
  return index.find((tool) => tool.id === id)
}
