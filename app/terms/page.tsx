import { ContentPage } from '@/components/layout/content-page'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata = createPageMetadata({
  title: `Terms of Service — ${siteConfig.name}`,
  description: `Terms of service for using ${siteConfig.name} free online tools.`,
  path: '/terms',
})

export default function TermsPage() {
  return (
    <ContentPage
      title="Terms of Service"
      description={`Simple terms for using ${siteConfig.name}.`}
    >
      <p>Last updated: February 2026</p>
      <h2>Use of service</h2>
      <p>
        {siteConfig.name} provides free browser-based utility tools &quot;as is.&quot; You may use
        them for personal and commercial purposes at no charge.
      </p>
      <h2>No warranty</h2>
      <p>
        While we strive for accuracy, tools are provided without warranty. Verify critical results
        (financial calculations, encoded data, etc.) independently before relying on them.
      </p>
      <h2>Limitation of liability</h2>
      <p>
        {siteConfig.name} is not liable for any damages arising from the use of our tools, including
        data loss or incorrect output.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms or modify tools at any time. Continued use of the platform
        constitutes acceptance of updated terms.
      </p>
    </ContentPage>
  )
}
