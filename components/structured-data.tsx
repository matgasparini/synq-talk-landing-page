const SITE_URL = 'https://synqtalk.com'

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Synq Talk',
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  description: 'Real-time AI translation with the lowest latency on the market. Built to understand context, not just words.',
  sameAs: [
    'https://twitter.com/synqtalk',
    'https://linkedin.com/company/synqtalk',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'contact@synqtalk.com',
  },
}

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Synq Talk',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, Chrome Extension',
  description: 'Real-time AI translation with the lowest latency on the market. Works with Zoom, Google Meet, and Microsoft Teams. Understands context, not just words.',
  url: SITE_URL,
  screenshot: `${SITE_URL}/og-image.png`,
  featureList: [
    'Real-time AI translation',
    'Ultra-low latency (~120ms)',
    '30+ supported languages',
    'Context-aware translation',
    'Privacy-first with AES-256 encryption',
    'One-click install for Zoom, Google Meet, Teams',
    'Enterprise-grade security',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free early access — join the waitlist',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '127',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Synq Talk',
    url: SITE_URL,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Synq Talk?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Synq Talk is a real-time AI meeting translator that works with Zoom, Google Meet, and Microsoft Teams. It provides context-aware translation with the lowest latency on the market (~120ms), supporting 30+ languages.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Synq Talk work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Synq Talk works in three steps: you speak naturally in your language, the AI engine captures meaning and context, and everyone in the meeting hears the translation in their own language — almost instantly with ~120ms latency.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many languages does Synq Talk support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Synq Talk supports 30+ languages including English, Portuguese, Spanish, French, German, Japanese, Korean, Chinese, Italian, Russian, Arabic, and Hindi.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Synq Talk secure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Synq Talk uses enterprise-grade AES-256 encryption. Your conversations are private and secure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which meeting platforms does Synq Talk work with?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Synq Talk integrates with Zoom, Google Meet, and Microsoft Teams with a one-click install.',
      },
    },
  ],
}

export function StructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
