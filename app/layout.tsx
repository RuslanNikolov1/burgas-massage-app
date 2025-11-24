import type { Metadata } from 'next'
import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Масаж и Релаксация в Бургас | Home Massage & Mini Spa',
  description: 'Професионален масаж в Бургас. Home massage, mini spa и медитация за справяне с тревожност, стрес и паник атаки. Book your session today.',
  keywords: 'масаж Бургас, home massage, mini spa, медитация, релаксация, тревожност, стрес',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Масаж и Релаксация в Бургас',
    description: 'Професионален масаж в Бургас. Home massage, mini spa и медитация.',
    locale: 'bg_BG',
    type: 'website',
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
        <link rel="icon" href="/logo.png" sizes="32x32" />
        <link rel="shortcut icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}

