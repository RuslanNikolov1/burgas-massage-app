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
    telephone: '+359-886-830-825',
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
      'https://www.facebook.com/share/18Dxd94v7V/',
      'https://www.instagram.com/batvu?utm_source=qr&igsh=MWZzbTdla3l4cThxZQ==',
      'https://m.me/batvu',
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
    telephone: '+359-886-830-825',
    description: 'Професионален масаж в Бургас с домашно посещение, мини спа и медитация за тревожност, стрес и паник атаки.',
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

