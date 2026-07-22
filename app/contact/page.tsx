import { ContentPage } from '@/components/layout/content-page'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata = createPageMetadata({
  title: `Contact — ${siteConfig.name}`,
  description: `Get in touch with the ${siteConfig.name} team.`,
  path: '/contact',
})

export default function ContactPage() {
  return (
    <ContentPage
      title="Contact"
      description="Questions, feedback, or tool requests — we'd love to hear from you."
    >
      <p>
        Have a suggestion for a new tool, found a bug, or want to partner with us? Reach out anytime.
      </p>
      <h2>Email</h2>
      <p>
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary hover:underline">
          {siteConfig.contactEmail}
        </a>
      </p>
    </ContentPage>
  )
}
