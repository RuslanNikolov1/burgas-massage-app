import { MetadataRoute } from 'next'

// Enable static generation for manifest
export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Енергиен Масаж Терапия - Професионален масаж в Бургас',
    short_name: 'Energy Massage',
    description: 'Професионална масажна терапия у дома в Бургас. Класически масаж, чакри балансиране и Destiny Matrix консултации.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f9f5f0',
    theme_color: '#d1b272',
    orientation: 'portrait-primary',
    categories: ['health', 'lifestyle', 'wellness'],
    lang: 'bg',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'Свържете се с нас',
        short_name: 'Контакти',
        description: 'Свържете се директно за резервация',
        url: '#contact',
        icons: [{ src: '/android-chrome-192x192.png', sizes: '192x192' }],
      },
    ],
  }
}
