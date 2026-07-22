import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          color: '#ffffff',
          fontSize: 18,
          fontWeight: 700,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {siteConfig.logoInitial}
      </div>
    ),
    { ...size },
  )
}
