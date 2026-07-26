import fs from 'node:fs'
import path from 'node:path'

const root = path.join(import.meta.dirname, '..')
const source = fs.readFileSync(path.join(root, 'lib/tools.ts'), 'utf8')

const start = source.indexOf('export const tools: Record<string, ToolDefinition> = {')
const end = source.indexOf('export function getAllTools')
if (start < 0 || end < 0) throw new Error('Could not locate tools object')

const toolsBlock = source.slice(start, end + 2)
const entries = []

for (const match of toolsBlock.matchAll(/'([^']+)':\s*\{([\s\S]*?)\n  \},/g)) {
  const id = match[1]
  const body = match[2]
  const readString = (field) => {
    const single = body.match(new RegExp(`${field}:\\s*'((?:\\\\'|[^'])*)'`))
    if (single) return single[1]
    const multi = body.match(new RegExp(`${field}:\\s*\\n\\s*'((?:\\\\'|[^'])*)'`))
    return multi?.[1] ?? ''
  }
  const keywords = [...(body.match(/keywords:\s*\[([\s\S]*?)\]/)?.[1]?.matchAll(/'([^']*)'/g) ?? [])].map(
    (k) => k[1],
  )

  entries.push({
    id,
    title: readString('title'),
    description: readString('description'),
    category: readString('category'),
    icon: readString('icon'),
    keywords,
  })
}

const categoryNames = {
  text: 'Text Tools',
  encoding: 'Converters',
  generators: 'Generators',
  calculators: 'Calculators',
  developer: 'Developer',
  security: 'Security',
  math: 'Math',
  datetime: 'Date & Time',
  network: 'Network',
}

const searchIndexTs = `export interface ToolSearchItem {
  id: string
  title: string
  description: string
  category: string
  categoryName: string
  icon: string
  keywords: string[]
}

export const toolSearchIndex: ToolSearchItem[] = ${JSON.stringify(
  entries.map((entry) => ({
    ...entry,
    categoryName: categoryNames[entry.category] ?? entry.category,
  })),
  null,
  2,
)}

export function searchToolIndex(query: string): ToolSearchItem[] {
  const lowerQuery = query.toLowerCase().trim()
  if (!lowerQuery) return []

  return toolSearchIndex.filter(
    (tool) =>
      tool.title.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.categoryName.toLowerCase().includes(lowerQuery) ||
      tool.keywords.some((keyword) => keyword.toLowerCase().includes(lowerQuery)),
  )
}

export function getToolSearchItem(id: string): ToolSearchItem | undefined {
  return toolSearchIndex.find((tool) => tool.id === id)
}
`

fs.writeFileSync(path.join(root, 'lib/tool-search-index.ts'), searchIndexTs)
console.log(`Generated search index for ${entries.length} tools`)
