import type { Metadata } from 'next'
import '@/styles/globals.scss'
import { StructuredData } from './structured-data'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://burgas-massage.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Масаж и Релаксация в Бургас | Home Massage & Mini Spa',
    template: '%s | Бургас Масаж'
  },
  description: 'Професионален масаж в Бургас. Home massage, mini spa и медитация за справяне с тревожност, стрес и паник атаки. Сертифициран масажист с над 10 години опит. Book your session today.',
  keywords: [
    'масаж Бургас',
    'home massage Бургас',
    'mini spa Бургас',
    'медитация Бургас',
    'релаксация Бургас',
    'тревожност',
    'стрес',
    'паник атаки',
    'класически масаж',
    'шведски масаж',
    'терапевтичен масаж',
    'масажист Бургас',
    'масаж на дом',
    'масаж услуги Бургас'
  ],
  authors: [{ name: 'Burgas Massage' }],
  creator: 'Burgas Massage',
  publisher: 'Burgas Massage',
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
    siteName: 'Бургас Масаж',
    title: 'Масаж и Релаксация в Бургас | Home Massage & Mini Spa',
    description: 'Професионален масаж в Бургас. Home massage, mini spa и медитация за справяне с тревожност, стрес и паник атаки. Сертифициран масажист с над 10 години опит.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Бургас Масаж - Професионален масаж и релаксация',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Масаж и Релаксация в Бургас | Home Massage & Mini Spa',
    description: 'Професионален масаж в Бургас. Home massage, mini spa и медитация за справяне с тревожност, стрес и паник атаки.',
    images: ['/logo.png'],
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

