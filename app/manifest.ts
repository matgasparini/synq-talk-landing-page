import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Synq Talk — Real-Time AI Meeting Translator',
    short_name: 'Synq Talk',
    description: 'Real-time AI translation with the lowest latency on the market. Built to understand context, not just words.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B0B0F',
    theme_color: '#0B0B0F',
    icons: [
      {
        src: '/icon-light-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['business', 'productivity', 'utilities'],
    lang: 'en',
    orientation: 'portrait',
  }
}
