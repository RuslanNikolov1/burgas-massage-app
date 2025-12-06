export function StructuredData() {
  const rawSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://energymassagetherapy.com'
  const siteUrl = rawSiteUrl.startsWith('http://') || rawSiteUrl.startsWith('https://')
    ? rawSiteUrl
    : `https://${rawSiteUrl}`

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}#business`,
    name: 'Бургас Масаж',
    alternateName: 'Burgas Massage',
    description: 'Професионален масаж в Бургас. Home massage, mini spa и медитация за справяне с тревожност, стрес и паник атаки.',
    url: siteUrl,
    telephone: '+359-XXX-XXX-XXX', // Update with actual phone number
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Бургас',
      addressRegion: 'Бургас',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '42.5048',
      longitude: '27.4626',
    },
    areaServed: {
      '@type': 'City',
      name: 'Бургас',
    },
    image: `${siteUrl}/logo.png`,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      // Add social media links here when available
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Massage Therapy',
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}#business`,
    },
    areaServed: {
      '@type': 'City',
      name: 'Бургас',
    },
    description: 'Професионален масаж в Бургас. Home massage, mini spa и медитация за справяне с тревожност, стрес и паник атаки.',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BGN',
      availability: 'https://schema.org/InStock',
    },
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Burgas Massage Therapist',
    jobTitle: 'Certified Massage Therapist',
    description: 'Сертифициран класически масажист в Бургас, специализиран в релаксационни и терапевтични масажи.',
    knowsAbout: [
      'Classical Massage',
      'Swedish Massage',
      'Therapeutic Massage',
      'Relaxation Therapy',
      'Meditation',
      'Anxiety Management',
      'Stress Relief',
    ],
    worksFor: {
      '@id': `${siteUrl}#business`,
    },
  }

  const healthAndBeautyBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: 'Масаж в Бургас',
    image: `${siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Бургас',
      addressCountry: 'BG',
    },
    url: siteUrl,
    telephone: '+359-XXX-XXX-XXX', // Update with actual phone number
    description: 'Професионален масаж в Бургас с домашно посещение, мини спа и медитация.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(healthAndBeautyBusinessSchema) }}
      />
    </>
  )
}

