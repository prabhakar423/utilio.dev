export interface CategoryDefinition {
  id: string
  name: string
  description: string
  icon: string
}

export const categories: CategoryDefinition[] = [
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Format, analyze, and transform text directly in your browser.',
    icon: 'type',
  },
  {
    id: 'encoding',
    name: 'Converters',
    description: 'Encode and decode Base64, URLs, and other common data formats.',
    icon: 'arrow-left-right',
  },
  {
    id: 'generators',
    name: 'Generators',
    description: 'Create UUIDs, passwords, and other random values instantly.',
    icon: 'sparkles',
  },
  {
    id: 'calculators',
    name: 'Calculators',
    description: 'Quick calculators for finance, dates, and everyday math.',
    icon: 'calculator',
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'Debug tokens, test regex patterns, and inspect developer data formats.',
    icon: 'code-2',
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Generate cryptographic hashes and inspect security-related data.',
    icon: 'shield',
  },
  {
    id: 'math',
    name: 'Math',
    description: 'Percentage, ratio, and everyday math calculators.',
    icon: 'percent',
  },
  {
    id: 'datetime',
    name: 'Date & Time',
    description: 'Convert timestamps, timezones, and date values instantly.',
    icon: 'clock',
  },
  {
    id: 'network',
    name: 'Network',
    description: 'CIDR calculators, HTTP references, and networking utilities.',
    icon: 'network',
  },
]

export function getCategoryById(categoryId: string): CategoryDefinition | undefined {
  return categories.find((category) => category.id === categoryId)
}

export function getCategoryName(categoryId: string): string {
  return getCategoryById(categoryId)?.name ?? categoryId
}
