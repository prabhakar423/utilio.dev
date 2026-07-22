import { generateOgImage, ogContentType, ogSize } from '@/lib/og-image'
import { getCategoryName, tools } from '@/lib/tools'

export const alt = 'Tool preview'
export const size = ogSize
export const contentType = ogContentType

interface PageProps {
  params: Promise<{ toolId: string }>
}

export default async function Image({ params }: PageProps) {
  const { toolId } = await params
  const tool = tools[toolId]

  if (!tool) {
    return generateOgImage({ title: 'Tool Not Found' })
  }

  return generateOgImage({
    badge: getCategoryName(tool.category),
    title: tool.title,
    subtitle: tool.description,
  })
}

export async function generateStaticParams() {
  return Object.keys(tools).map((toolId) => ({ toolId }))
}
