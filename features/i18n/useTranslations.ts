'use client'

import { useState, useEffect, useMemo } from 'react'

type Translations = {
  [key: string]: {
    bg: string
    en: string
  }
}

const translations: Translations = {
  'nav.home': { bg: 'Начало', en: 'Home' },
  'nav.about': { bg: 'За мен', en: 'About' },
  'nav.pricing': { bg: 'Цени', en: 'Pricing' },
  'nav.booking': { bg: 'Резервация', en: 'Booking' },
  'nav.feedbacks': { bg: 'Отзиви', en: 'Reviews' },
  'nav.products': { bg: 'Продукти', en: 'Products' },
  'nav.contact': { bg: 'Контакти', en: 'Contact' },
  'hero.services': { bg: 'Домашен масаж, мини спа и медитация', en: 'Home massage, mini spa and meditation services' },
  'hero.subtitle': { bg: 'Помагат с тревожност, стрес и паник атаки', en: 'Help with anxiety, stress and panic attacks' },
  'hero.motivational': { bg: 'Вашите ръце носят лечебна сила и топлина, която успокоява душата и лекува тялото. Всяко докосване е изкуство, всяко движение е грижа.', en: 'Your hands carry healing power and warmth that soothes the soul and heals the body. Every touch is art, every movement is care.' },
  'about.title': { bg: 'За мен', en: 'About Me' },
  'about.description': { bg: 'Аз съм професионален масажист в Бургас, специализиран в релаксационни и терапевтични масажи. С години опит в сферата на здравето и благополучието, предлагам персонализирани сесии, които помагат за намаляване на стрес, тревожност и физическо напрежение.', en: 'I am a professional masseur in Burgas, specialized in relaxation and therapeutic massages. With years of experience in health and wellness, I offer personalized sessions that help reduce stress, anxiety and physical tension.' },
  'pricing.title': { bg: 'Цени и Пакети', en: 'Pricing & Packages' },
  'pricing.duration': { bg: 'Продължителност', en: 'Duration' },
  'pricing.price': { bg: 'Цена', en: 'Price' },
  'pricing.package1': { bg: 'Пакет "Релакс"', en: 'Relax Package' },
  'pricing.package2': { bg: 'Пакет "Възстановяване"', en: 'Recovery Package' },
  'pricing.package3': { bg: 'Пакет "Премиум"', en: 'Premium Package' },
  'booking.title': { bg: 'Резервирайте час', en: 'Book Your Session' },
  'booking.workingHours': { bg: 'Работно време: 9:00 - 18:00', en: 'Working hours: 9:00 AM - 6:00 PM' },
  'feedbacks.title': { bg: 'Отзиви от клиенти', en: 'Client Reviews' },
  'products.title': { bg: 'Масажни продукти', en: 'Massage Products' },
  'contact.title': { bg: 'Свържете се с мен', en: 'Get in Touch' },
  'contact.facebook': { bg: 'Facebook', en: 'Facebook' },
  'contact.instagram': { bg: 'Instagram', en: 'Instagram' },
  'contact.phone': { bg: 'Телефон', en: 'Phone' },
  'contact.messenger': { bg: 'Messenger', en: 'Messenger' },
  'contact.viber': { bg: 'Viber', en: 'Viber' },
  'sticky.button': { bg: 'Резервирай', en: 'Book Now' },
}

export function useTranslations() {
  const getLanguage = (): 'bg' | 'en' => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('language') as 'bg' | 'en' | null
        return saved || 'bg'
      } catch {
        return 'bg'
      }
    }
    return 'bg'
  }

  const [language] = useState<'bg' | 'en'>(() => getLanguage())
  const [mounted, setMounted] = useState(false)

  // Ensure we're mounted before accessing localStorage
  useEffect(() => {
    setMounted(true)
  }, [])

  const t = useMemo(() => {
    return (key: string): string => {
      if (!key) {
        return ''
      }
      if (!translations || typeof translations !== 'object') {
        return key
      }
      const translation = translations[key]
      if (!translation || typeof translation !== 'object') {
        return key
      }
      const currentLang = mounted ? language : 'bg'
      return translation[currentLang] || translation.bg || key
    }
  }, [language, mounted])

  return t
}

