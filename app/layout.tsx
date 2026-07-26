import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { GlobalShortcuts } from '@/components/layout/global-shortcuts'
import { ScrollToTop } from '@/components/layout/scroll-to-top'
import { createPageMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata({
  title: `${siteConfig.name} — Free Browser Tools`,
  description: siteConfig.description,
  path: '/',
  keywords: [
    'online tools',
    'developer utilities',
    'json formatter',
    'base64 encoder',
    'password generator',
    'free tools',
  ],
  }),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <GlobalShortcuts />
          {children}
          <ScrollToTop />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
