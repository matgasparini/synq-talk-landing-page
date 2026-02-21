import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StructuredData } from '@/components/structured-data'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' })

const SITE_URL = 'https://synqtalk.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Synq Talk — Real-Time AI Meeting Translator',
    template: '%s | Synq Talk',
  },
  description: 'Real-time AI translation with the lowest latency on the market. Synq Talk understands context, not just words. Works with Zoom, Google Meet, and Teams.',
  keywords: [
    'AI Meeting Translator',
    'Real-time Translation',
    'Low latency AI translation',
    'Synq Talk',
    'AI translation tool',
    'multilingual meetings',
    'Zoom translation',
    'Google Meet translation',
    'Microsoft Teams translation',
    'context-aware translation',
    'enterprise translation software',
  ],
  authors: [{ name: 'Synq Talk', url: SITE_URL }],
  creator: 'Synq Talk',
  publisher: 'Synq Talk',
  applicationName: 'Synq Talk',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_BR', 'es_ES', 'fr_FR'],
    url: SITE_URL,
    siteName: 'Synq Talk',
    title: 'Synq Talk — Real-Time AI Meeting Translator',
    description: 'Real-time AI translation with the lowest latency on the market. Built to understand context, not just words. Works with Zoom, Google Meet, and Teams.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Synq Talk — Real-Time AI Meeting Translator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synq Talk — Real-Time AI Meeting Translator',
    description: 'Real-time AI translation with the lowest latency on the market. Built to understand context, not just words.',
    images: ['/og-image.png'],
    creator: '@synqtalk',
    site: '@synqtalk',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en': SITE_URL,
      'pt-BR': `${SITE_URL}?lang=pt`,
      'es': `${SITE_URL}?lang=es`,
      'fr': `${SITE_URL}?lang=fr`,
      'x-default': SITE_URL,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-icon.png' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0B0B0F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <StructuredData />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
