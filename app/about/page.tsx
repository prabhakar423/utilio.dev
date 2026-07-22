import { ContentPage } from '@/components/layout/content-page'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import { getToolCount } from '@/lib/tools'

export const metadata = createPageMetadata({
  title: `About — ${siteConfig.name}`,
  description: `Learn about ${siteConfig.name}, a growing platform of free browser-based utility tools.`,
  path: '/about',
})

export default function AboutPage() {
  return (
    <ContentPage
      title={`About ${siteConfig.name}`}
      description={siteConfig.tagline}
    >
      <p>
        {siteConfig.name} is a free utility platform with {getToolCount()} browser-based tools for
        developers and everyday tasks. Every tool runs locally in your browser — your data is never
        uploaded, stored, or shared.
      </p>
      <h2>Why {siteConfig.name}?</h2>
      <p>
        Most online tools send your input to a server. {siteConfig.name} is different: every utility
        runs entirely in your browser using JavaScript. That means faster results, offline support,
        and complete privacy.
      </p>
      <h2>Our principles</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong>Privacy first</strong> — processing happens on your device, not our servers.
        </li>
        <li>
          <strong>Fast by default</strong> — minimal JavaScript, instant interactions, no sign-up
          walls.
        </li>
        <li>
          <strong>Always free</strong> — no accounts, no paywalls, no usage limits.
        </li>
        <li>
          <strong>Built to scale</strong> — new tools are added regularly as the platform grows.
        </li>
      </ul>
      <h2>What&apos;s next</h2>
      <p>
        We&apos;re actively expanding categories and adding new tools. The platform is designed to
        grow from {getToolCount()} tools today to hundreds over time — without sacrificing speed or
        usability.
      </p>
    </ContentPage>
  )
}
