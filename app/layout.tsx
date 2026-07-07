import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Manrope } from 'next/font/google'
import './globals.css'
import { StadiumProvider } from '@/components/providers/StadiumProvider'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aegis StadiumOS — Agentic AI Workforce for FIFA World Cup 2026',
  description:
    'An enterprise AI operating system where specialized agents collaborate in real time to run FIFA World Cup 2026 stadium operations. Built for fans and mission control.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.svg',
  }
}

export const viewport: Viewport = {
  themeColor: '#0a0f0c',
  colorScheme: 'dark light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} bg-background`}>
      <body className="font-sans antialiased">
        <StadiumProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </StadiumProvider>
      </body>
    </html>
  )
}
