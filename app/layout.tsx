import type { Metadata } from 'next'
import '@/styles/globals.scss'
import { StructuredData } from './structured-data'
import { LanguageProvider } from '@/features/i18n/LanguageProvider'

// Enable static generation
export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://energymassagetherapy.com'
const siteUrl = rawSiteUrl.startsWith('http://') || rawSiteUrl.startsWith('https://')
  ? rawSiteUrl
  : `https://${rawSiteUrl}`

const defaultTitle = 'Масаж в Бургас – Домашен масаж, мини спа и медитация'
const defaultDescription =
  'Професионален масаж в Бургас с домашно посещение. Релаксиращ, дълбокотъканен и терапевтичен масаж, мини спа ритуали и водена медитация. Запазете час още днес.'
const keywordList = [
  'масаж Бургас',
  'домашен масаж Бургас',
  'енергийна терапия Бургас',
  'релаксация Бургас',
  'медитация Бургас',
  'mini spa Burgas',
  'home massage Burgas',
  'massage therapist Burgas',
  'energy healing Burgas',
  'anxiety relief massage Burgas',
  'stress relief massage Burgas',
  'therapeutic massage Burgas',
]

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | Energy Massage`,
  },
  description: defaultDescription,
  keywords: keywordList,
  authors: [{ name: 'Energy Massage Therapy' }],
  creator: 'Energy Massage Therapy',
  publisher: 'Energy Massage Therapy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo.png', sizes: '192x192', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
      { url: '/logo.png', sizes: '152x152', type: 'image/png' },
      { url: '/logo.png', sizes: '120x120', type: 'image/png' },
      { url: '/logo.png', sizes: '76x76', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'bg_BG',
    alternateLocale: ['en_US'],
    url: siteUrl,
    siteName: 'Energy Massage Therapy Burgas',
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'Energy Massage Therapy – професионален масаж и медитация в Бургас',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    images: [`${siteUrl}/logo.png`],
  },
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
  alternates: {
    canonical: siteUrl,
    languages: {
      'bg-BG': siteUrl,
      'en-US': `${siteUrl}/en`,
    },
  },
  category: 'Health & Wellness',
  other: {
    'geo.region': 'BG-02',
    'geo.placename': 'Burgas',
    'geo.position': '42.5048;27.4626',
    ICBM: '42.5048, 27.4626',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bg">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#04282f" />
        
        {/* Apple Device Configuration */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Energy Massage" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        
        {/* Apple Universal Links */}
        <link rel="alternate" href="https://energymassagetherapy.com" />
        <link rel="canonical" href={siteUrl} />
        
        {/* Preload critical assets for performance */}
        <link rel="preload" href="/bed.png" as="image" type="image/png" />
        <link rel="preload" href="/bed-1.png" as="image" type="image/png" />
        <link rel="preload" href="/bed-2.png" as="image" type="image/png" />
        
        {/* DNS prefetch for faster external resource loading */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Standard Icons */}
        <link rel="icon" href="/logo.png" sizes="32x32" />
        <link rel="shortcut icon" href="/logo.png" />
        
        {/* Open Graph & Twitter */}
        <meta property="og:image" content={`${siteUrl}/logo.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Safari Pinned Tab */}
        <link rel="mask-icon" href="/logo.png" color="#04282f" />
        
        {/* Apple Smart App Banner (if you want to promote an app) */}
        {/* <meta name="apple-itunes-app" content="app-id=myAppStoreID, app-argument=https://energymassagetherapy.com"> */}
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=GFS+Didot&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <StructuredData />
      </head>
      <body>
        <LanguageProvider />
        {children}
      </body>
    </html>
  )
}

