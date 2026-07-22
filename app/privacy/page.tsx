import { ContentPage } from '@/components/layout/content-page'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata = createPageMetadata({
  title: `Privacy Policy — ${siteConfig.name}`,
  description: `Privacy policy for ${siteConfig.name}. We do not collect or store your tool input data.`,
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      description="Your data stays on your device. Here's how we handle information."
    >
      <p>Last updated: February 2026</p>
      <h2>Tool data</h2>
      <p>
        All {siteConfig.name} tools process data entirely in your browser. We do not receive, store,
        or transmit the text, files, or inputs you use within our tools.
      </p>
      <h2>Analytics</h2>
      <p>
        We may use privacy-focused analytics (such as Vercel Analytics) to understand aggregate
        traffic patterns. This does not include the content you enter into any tool.
      </p>
      <h2>Cookies</h2>
      <p>
        We use local storage to remember your theme preference (light, dark, or system). No
        advertising or tracking cookies are used at this time.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about privacy? Email us at{' '}
        <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary hover:underline">
          {siteConfig.contactEmail}
        </a>
        .
      </p>
    </ContentPage>
  )
}
