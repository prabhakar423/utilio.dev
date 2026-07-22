import { generateOgImage, ogContentType, ogSize } from '@/lib/og-image'
import { siteConfig } from '@/lib/site'

export const alt = siteConfig.name
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return generateOgImage({
    title: 'Free Browser Tools',
    subtitle: siteConfig.description,
    badge: siteConfig.name,
  })
}
