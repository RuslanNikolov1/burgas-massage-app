import type { Metadata } from 'next'
import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: 'Масаж и Релаксация в Бургас | Home Massage & Mini Spa',
  description: 'Професионален масаж в Бургас. Home massage, mini spa и медитация за справяне с тревожност, стрес и паник атаки. Book your session today.',
  keywords: 'масаж Бургас, home massage, mini spa, медитация, релаксация, тревожност, стрес',
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
      <body>
        {children}
      </body>
    </html>
  )
}

