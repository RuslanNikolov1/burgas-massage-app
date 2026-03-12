import type { Metadata } from 'next'

import { HomePage } from '@/features/home/home-page'
import { siteUrl } from '../layout'

type LangParam = 'bg' | 'en' | 'ru'

type PageProps = {
  params: {
    lang: LangParam
  }
}

type LocalizedMeta = {
  title: string
  description: string
  locale: string
  keywords: string[]
}

const getLocalizedMeta = (lang: LangParam): LocalizedMeta => {
  if (lang === 'en') {
    return {
      title: 'Massage in Sveti Vlas, Nessebar & Sunny Beach – Home massage, mini spa and meditation',
      description:
        'Professional massage in Sveti Vlas, Nessebar and Sunny Beach with home visits. Relaxing, deep-tissue and therapeutic massage, mini spa rituals and guided meditation for anxiety, stress and panic attacks. Book your session today.',
      locale: 'en_US',
      keywords: [
        'massage Sveti Vlas',
        'massage Nessebar',
        'massage Sunny Beach',
        'home massage Sveti Vlas',
        'home massage Nessebar',
        'home massage Sunny Beach',
        'mini spa Sveti Vlas',
        'mini spa Nessebar',
        'mini spa Sunny Beach',
        'meditation for anxiety',
        'massage for panic attacks',
      ],
    }
  }

  if (lang === 'ru') {
    return {
      title:
        'Массаж в Святом Власе, Несебре и Солнечном Береге — выездной массаж, мини-спа и медитация',
      description:
        'Профессиональный массаж в Святом Власе, Несебре и Солнечном Береге с выездом на дом. Расслабляющий, глубокотканный и терапевтический массаж, мини-спа ритуалы и медитация при тревожности, стрессе и панических атаках. Запишитесь на сеанс уже сегодня.',
      locale: 'ru_RU',
      keywords: [
        'массаж Святой Влас',
        'массаж Несебр',
        'массаж Солнечный берег',
        'домашний массаж Святой Влас',
        'домашний массаж Несебр',
        'домашний массаж Солнечный берег',
        'мини спа Святой Влас',
        'мини спа Несебр',
        'мини спа Солнечный берег',
        'медитация при тревожности',
        'массаж при панических атаках',
      ],
    }
  }

  return {
    title:
      'Масаж в Свети Влас, Несебър и Слънчев бряг – Домашен масаж, мини спа и медитация',
    description:
      'Професионален масаж в Свети Влас, Несебър и Слънчев бряг с домашно посещение. Релаксиращ, дълбокотъканен и терапевтичен масаж, мини спа ритуали и водена медитация за тревожност, стрес и паник атаки. Запазете час още днес.',
    locale: 'bg_BG',
    keywords: [
      'масаж Свети Влас',
      'масаж Несебър',
      'масаж Слънчев бряг',
      'домашен масаж Свети Влас',
      'домашен масаж Несебър',
      'домашен масаж Слънчев бряг',
      'мини спа Свети Влас',
      'мини спа Несебър',
      'мини спа Слънчев бряг',
      'медитация при тревожност',
      'масаж при паник атаки',
    ],
  }
}

export function generateMetadata({ params }: PageProps): Metadata {
  const lang: LangParam = params.lang === 'en' || params.lang === 'ru' ? params.lang : 'bg'
  const localized = getLocalizedMeta(lang)
  const canonical = `${siteUrl}/${lang}`

  return {
    title: localized.title,
    description: localized.description,
    keywords: localized.keywords,
    alternates: {
      canonical,
      languages: {
        bg: `${siteUrl}/bg`,
        en: `${siteUrl}/en`,
        ru: `${siteUrl}/ru`,
        'x-default': siteUrl,
      },
    },
    openGraph: {
      type: 'website',
      locale: localized.locale,
      url: canonical,
      siteName: 'Energy Massage Therapy',
      title: localized.title,
      description: localized.description,
      images: [
        {
          url: `${siteUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'Energy Massage Therapy – професионален масаж и медитация',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localized.title,
      description: localized.description,
      images: [`${siteUrl}/logo.png`],
    },
  }
}

export default function LangHomePage() {
  return <HomePage />
}

