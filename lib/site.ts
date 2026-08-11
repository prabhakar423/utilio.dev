export const siteConfig = {
  name: 'Utiliio',
  logoInitial: 'U',
  tagline: 'Tools that stay on your device',
  subtitle: 'Private browser utilities',
  description:
    'Utiliio is a free library of 100+ browser-based tools for developers and everyday tasks. Format JSON, encode data, calculate, convert — all processed locally with zero uploads.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://utiliio.com',
  contactEmail: 'hello@utiliio.dev',
  hero: {
    badge: 'Free · private · no sign-up',
    headline: 'Fast, private tools',
    highlight: 'that never leave your browser',
  },
} as const
