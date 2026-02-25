import { ImageResponse } from 'next/og'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Accent top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: '#6366f1',
          }}
        />

        {/* Site URL */}
        <div
          style={{
            color: '#6366f1',
            fontSize: 22,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          {SITE_URL.replace('https://', '')}
        </div>

        {/* Name */}
        <div
          style={{
            color: '#f9fafb',
            fontSize: 80,
            fontWeight: 'bold',
            lineHeight: 1.1,
            textAlign: 'center',
          }}
        >
          {SITE_NAME}
        </div>

        {/* Role */}
        <div
          style={{
            color: '#9ca3af',
            fontSize: 32,
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          Tech Lead &amp; Full Stack Developer
        </div>

        {/* Decorative corner mark */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '80px',
            color: '#374151',
            fontSize: 18,
            letterSpacing: '0.1em',
          }}
        >
          RB
        </div>
      </div>
    ),
    { ...size }
  )
}
