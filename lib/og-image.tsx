import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

interface OgImageProps {
  title: string
  subtitle?: string
  badge?: string
}

export function generateOgImage({ title, subtitle, badge }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background: 'linear-gradient(135deg, #090b10 0%, #111620 50%, #1a1040 100%)',
          color: '#eef2f7',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 700,
              color: '#fff',
            }}
          >
            {siteConfig.logoInitial}
          </div>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#94a3b8' }}>{siteConfig.name}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: 900 }}>
          {badge && (
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#60a5fa',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {badge}
            </span>
          )}
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </span>
          {subtitle && (
            <span style={{ fontSize: 28, color: '#94a3b8', lineHeight: 1.4 }}>{subtitle}</span>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 20, color: '#64748b' }}>{siteConfig.tagline}</span>
          <span style={{ fontSize: 20, color: '#64748b' }}>Free · Private · Browser-based</span>
        </div>
      </div>
    ),
    { ...ogSize },
  )
}
