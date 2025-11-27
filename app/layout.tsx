import type { Metadata } from 'next'
import '@/styles/globals.scss'
import { StructuredData } from './structured-data'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://energymassagetherapy.com'

const defaultTitle = 'Energy Massage Burgas | Домашен масаж и медитация в Бургас'
const defaultDescription =
  'Energy Massage Therapy в Бургас предлага домашен масаж, енергийна терапия и медитация за тревожност, стрес и мускулно напрежение. Сертифициран терапевт с персонални програми за Център, Лазур и Морската градина. Резервирайте домашно посещение или студийна сесия в Бургас.'
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
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#04282f" />
        <link rel="icon" href="/logo.png" sizes="32x32" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <StructuredData />
      </head>
      <body>{children}</body>
    </html>
  )
}

