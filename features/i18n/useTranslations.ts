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
  'about.description': { bg: 'Аз съм сертифициран класически масажист в Бургас, специализиран в релаксационни и терапевтични масажи. С над десет години опит работя с хора с хронично напрежение, тревожност и паник атаки и създавам индивидуални програми, които съчетават класически техники, дихателни практики и нежни разтягания. Вярвам, че общуването и доверието са основа на всяка лечебна сесия, затова обръщам внимание на начина, по който се чувствате през целия процес.', en: 'I am a certified classical massage therapist based in Burgas, specializing in relaxation and therapeutic treatments. With more than a decade of experience, I support people dealing with chronic tension, anxiety, and panic attacks by creating tailored programs that combine classical techniques, breathing practices, and gentle stretches. I believe communication and trust are the foundation of every healing session, so I stay attentive to how you feel throughout the process.' },
  'classic.label': { bg: 'Класически масаж', en: 'Classical Massage' },
  'classic.heading': { bg: 'Основата на обновяващото докосване', en: 'The Foundation of Restorative Touch' },
  'classic.description': {
    bg: 'Класическият (шведски) масаж комбинира плавни ефльоражни движения, месене и нежни мобилизации в ставите. Първо успокоява нервната система, за да омекне тялото и последващата работа да бъде безболезнена. Всяка сесия се адаптира спрямо състоянието ви в момента — за заземяване, зареждане или насочено освобождаване на упорито напрежение.',
    en: 'Classical (Swedish) massage blends flowing effleurage strokes, kneading, and gentle joint mobilizations. It calms the nervous system first so the body softens and deeper work stays comfortable. Every session is adjusted to how you arrive—grounding, energizing, or focusing on stubborn tension.'
  },
  'classic.bedAlt1': { bg: 'Масажно легло с подредени кърпи', en: 'Massage table with neatly folded towels' },
  'classic.bedAlt2': { bg: 'Подготвено пространство за класически масаж', en: 'Prepared space for a classical massage' },
  'classic.benefits.relaxation.title': { bg: 'Дълбока релаксация', en: 'Deep relaxation' },
  'classic.benefits.relaxation.description': {
    bg: 'Дългите плавни движения извеждат нервната система от стресов режим и позволяват на тялото да се отпусне.',
    en: 'Long, flowing strokes shift the nervous system out of stress mode so the body can truly soften.'
  },
  'classic.benefits.circulation.title': { bg: 'По-добро кръвообращение', en: 'Improved circulation' },
  'classic.benefits.circulation.description': {
    bg: 'Стимулира кръвния и лимфния поток, за да достигат повече кислород и хранителни вещества до мускулите.',
    en: 'Encourages blood and lymph flow so muscles receive more oxygen and nutrients.'
  },
  'classic.benefits.recovery.title': { bg: 'По-бързо възстановяване', en: 'Faster recovery' },
  'classic.benefits.recovery.description': {
    bg: 'Освобождава мускулни сраствания и скованост, съкращавайки времето за възстановяване след натоварване.',
    en: 'Releases adhesions and stiffness, shortening the recovery window after activity.'
  },
  'classic.benefits.posture.title': { bg: 'Осъзнаване на стойката', en: 'Posture awareness' },
  'classic.benefits.posture.description': {
    bg: 'Нежните мобилизации показват дисбаланси и помагат да нагласите стойката си между сесиите.',
    en: 'Gentle mobilizations highlight imbalances so you can adjust your posture between sessions.'
  },
  'chakras.title': { bg: 'Отваряне и балансиране на чакрите', en: 'Opening and Balancing the Chakras' },
  'chakras.intro': {
    bg: 'Отварянето на чакрите се постига чрез медитация, йога, дихателни практики (пранаяма), заземяване и използване на афирмации, етерични масла, музика и цветове. Тези техники подпомагат балансирането на енергийните центрове в тялото, водят до по-дълбоко спокойствие и възвръщане на жизнеността.',
    en: 'Chakra opening comes through meditation, yoga, breathwork (pranayama), grounding, affirmations, essential oils, music, and colors. Combined with mindful daily rituals and intentional rest, these practices keep the body’s energy centers balanced—cultivating calm, clarity, and a deeper sense of purpose in everyday life.'
  },
  'chakras.imageAlt': { bg: 'Илюстрация на чакрите', en: 'Illustration of chakras' },
  'chakras.ariaPractices': { bg: 'Практики за отваряне на чакрите', en: 'Practices for opening the chakras' },
  'chakras.practices.meditation.title': { bg: 'Медитация', en: 'Meditation' },
  'chakras.practices.meditation.description': {
    bg: 'Фокусирайте вниманието си върху всяка чакра, като наблюдавате дишането и усещанията в тялото.',
    en: 'Focus gently on each chakra while observing your breath and noticing subtle shifts in the body, allowing space for whatever arises.'
  },
  'chakras.practices.yoga.title': { bg: 'Йога', en: 'Yoga' },
  'chakras.practices.yoga.description': {
    bg: 'Асани като позата Дърво стабилизират коренната чакра, а нежните извивания активират горните центрове.',
    en: 'Asanas like Tree Pose stabilize the root chakra, while slow twists and backbends open the upper centers without overwhelming the system.'
  },
  'chakras.practices.pranayama.title': { bg: 'Пранаяма', en: 'Pranayama' },
  'chakras.practices.pranayama.description': {
    bg: 'Редуваното дишане през ноздрите и дълбокото коремно дишане успокояват нервната система и балансират чакрите.',
    en: 'Alternate-nostril breathing and deep belly breaths calm the nervous system, balancing each chakra with slow, intentional inhales and exhales.'
  },
  'chakras.practices.grounding.title': { bg: 'Заземяване', en: 'Grounding' },
  'chakras.practices.grounding.description': {
    bg: 'Разходка боси на земята активира коренната чакра и създава чувство на стабилност.',
    en: 'Walking barefoot on the earth, hugging a tree, or simply pausing outdoors activates the root chakra and renews your sense of stability.'
  },
  'chakras.practices.aroma.title': { bg: 'Ароматерапия', en: 'Aromatherapy' },
  'chakras.practices.aroma.description': {
    bg: 'Етерични масла като лавандула за сърдечната чакра или лимон за слънчевия сплит подкрепят хармонията.',
    en: 'Essential oils such as lavender for the heart or lemon for the solar plexus restore harmony and anchor a calming ritual at home.'
  },
  'chakras.practices.music.title': { bg: 'Музика и цветове', en: 'Music & color' },
  'chakras.practices.music.description': {
    bg: 'Бинаурални ритми, звуци и цветотерапия подпомагат релаксацията и изчистването на енергийните блокажи.',
    en: 'Binaural beats, healing sounds, and mindful use of color encourage relaxation, gently clearing energetic blocks layer by layer.'
  },
  'chakras.practices.affirmations.title': { bg: 'Афирмации', en: 'Affirmations' },
  'chakras.practices.affirmations.description': {
    bg: 'Утвърждения като „Аз съм в баланс“ пренасочват ума и подпомагат процеса на отваряне.',
    en: 'Affirmations such as “I am in balance” or “My energy flows freely” retrain the mind and keep the chakra-opening process supported.'
  },
  'pricing.title': { bg: 'Цени и Пакети', en: 'Pricing & Packages' },
  'pricing.duration': { bg: 'Продължителност', en: 'Duration' },
  'pricing.price': { bg: 'Цена', en: 'Price' },
  'pricing.rows.single30.duration': { bg: '30 мин', en: '30 min' },
  'pricing.rows.single30.price': { bg: '80 лв', en: '80 BGN' },
  'pricing.rows.single60.duration': { bg: '60 мин', en: '60 min' },
  'pricing.rows.single60.price': { bg: '140 лв', en: '140 BGN' },
  'pricing.rows.single90.duration': { bg: '90 мин', en: '90 min' },
  'pricing.rows.single90.price': { bg: '190 лв', en: '190 BGN' },
  'pricing.rows.single120.duration': { bg: '120 мин', en: '120 min' },
  'pricing.rows.single120.price': { bg: '240 лв', en: '240 BGN' },
  'pricing.rows.relax.duration': { bg: 'Пакет „Релакс“', en: '“Relax” Package' },
  'pricing.rows.relax.package': { bg: '2 x 60 мин', en: '2 x 60 min' },
  'pricing.rows.relax.price': { bg: '250 лв', en: '250 BGN' },
  'pricing.rows.relax.original': { bg: '280 лв', en: '280 BGN' },
  'pricing.rows.recovery.duration': { bg: 'Пакет „Възстановяване“', en: '“Recovery” Package' },
  'pricing.rows.recovery.package': { bg: '3 x 60 мин', en: '3 x 60 min' },
  'pricing.rows.recovery.price': { bg: '350 лв', en: '350 BGN' },
  'pricing.rows.recovery.original': { bg: '420 лв', en: '420 BGN' },
  'pricing.rows.premium.duration': { bg: 'Пакет „Премиум“', en: '“Premium” Package' },
  'pricing.rows.premium.package': { bg: '4 x 90 мин', en: '4 x 90 min' },
  'pricing.rows.premium.price': { bg: '500 лв', en: '500 BGN' },
  'pricing.rows.premium.original': { bg: '760 лв', en: '760 BGN' },
  'booking.title': { bg: 'Резервирайте час', en: 'Book Your Session' },
  'booking.workingHours': { bg: 'Работно време: 9:00 - 18:00', en: 'Working hours: 9:00 AM - 6:00 PM' },
  'booking.prevMonth': { bg: '← Предишен', en: '← Previous' },
  'booking.nextMonth': { bg: 'Следващ →', en: 'Next →' },
  'booking.prevMonthAria': { bg: 'Предишен месец', en: 'Previous month' },
  'booking.nextMonthAria': { bg: 'Следващ месец', en: 'Next month' },
  'booking.selectDate': { bg: 'Изберете дата', en: 'Select Date' },
  'booking.selectTime': { bg: 'Изберете час', en: 'Select Time' },
  'booking.datesAria': { bg: 'Календар с налични дати за резервация', en: 'Calendar with available booking dates' },
  'booking.timesAria': { bg: 'Налични часове за избраната дата', en: 'Available times for the selected date' },
  'feedbacks.title': { bg: 'Отзиви от клиенти', en: 'Client Reviews' },
  'feedbacks.items.1.name': { bg: 'Мария Петрова', en: 'Maria Petrova' },
  'feedbacks.items.1.text': { bg: 'Невероятен опит! Масажът беше много професионален и релаксиращ. Напълно препоръчвам!', en: 'Amazing experience! The massage was professional and deeply relaxing. Highly recommend!' },
  'feedbacks.items.1.date': { bg: '15 Декември 2024', en: '15 December 2024' },
  'feedbacks.items.2.name': { bg: 'Иван Георгиев', en: 'Ivan Georgiev' },
  'feedbacks.items.2.text': { bg: 'Отличен масажист! Помогна ми много с болките в гърба. Определено ще се върна отново.', en: 'Excellent therapist! Helped a lot with my back pain. I will definitely return.' },
  'feedbacks.items.2.date': { bg: '12 Декември 2024', en: '12 December 2024' },
  'feedbacks.items.3.name': { bg: 'Елена Димитрова', en: 'Elena Dimitrova' },
  'feedbacks.items.3.text': { bg: 'Много спокоен и професионален подход. Медитацията беше невероятна. Благодаря!', en: 'Very calm and professional approach. The meditation was incredible. Thank you!' },
  'feedbacks.items.3.date': { bg: '10 Декември 2024', en: '10 December 2024' },
  'feedbacks.items.4.name': { bg: 'Петър Стоянов', en: 'Petar Stoyanov' },
  'feedbacks.items.4.text': { bg: 'Първият ми масаж и беше страхотен! Много релаксиращ и професионален. Препоръчвам!', en: 'My first massage and it was great! Very relaxing and professional. Recommend!' },
  'feedbacks.items.4.date': { bg: '8 Декември 2024', en: '8 December 2024' },
  'feedbacks.items.5.name': { bg: 'Анна Иванова', en: 'Anna Ivanova' },
  'feedbacks.items.5.text': { bg: 'Отлично обслужване и много добър масаж. Помогна ми с тревожността. Благодаря много!', en: 'Excellent service and a great massage. Helped with my anxiety. Many thanks!' },
  'feedbacks.items.5.date': { bg: '5 Декември 2024', en: '5 December 2024' },
  'feedbacks.items.6.name': { bg: 'Димитър Николов', en: 'Dimitar Nikolov' },
  'feedbacks.items.6.text': { bg: 'Професионален масаж и много приятна атмосфера. Определено най-добрият в Бургас!', en: 'Professional massage and a lovely atmosphere. Definitely the best in Burgas!' },
  'feedbacks.items.6.date': { bg: '3 Декември 2024', en: '3 December 2024' },
  'products.title': { bg: 'Масажни продукти', en: 'Massage Products' },
  'products.womanAlt': { bg: 'Жена, наслаждаваща се на релаксиращ масаж', en: 'Woman enjoying a relaxing massage' },
  'products.items.1.name': { bg: 'Ароматерапевтично масло за масаж', en: 'Aromatherapy Massage Oil' },
  'products.items.1.description': { bg: 'Натурално масло с лавандула за релаксация', en: 'Natural lavender oil for deep relaxation' },
  'products.items.1.price': { bg: '45 лв', en: '45 BGN' },
  'products.items.2.name': { bg: 'Масажни камъни', en: 'Massage Stones' },
  'products.items.2.description': { bg: 'Комплект от базалтови камъни за топъл масаж', en: 'Set of basalt stones for hot massages' },
  'products.items.2.price': { bg: '80 лв', en: '80 BGN' },
  'products.items.3.name': { bg: 'Релаксиращ крем за тяло', en: 'Relaxing Body Cream' },
  'products.items.3.description': { bg: 'Крем с ментол и календула за успокояване', en: 'Menthol and calendula cream for soothing care' },
  'products.items.3.price': { bg: '35 лв', en: '35 BGN' },
  'products.items.4.name': { bg: 'Ароматни свещи', en: 'Aromatic Candles' },
  'products.items.4.description': { bg: 'Свещи с естествени аромати за атмосфера', en: 'Candles with natural scents for ambience' },
  'products.items.4.price': { bg: '25 лв', en: '25 BGN' },
  'products.items.5.name': { bg: 'Масажен ролер', en: 'Massage Roller' },
  'products.items.5.description': { bg: 'Дървен ролер за самомасаж', en: 'Wooden roller for self-massage' },
  'products.items.5.price': { bg: '55 лв', en: '55 BGN' },
  'products.items.6.name': { bg: 'Релаксиращ чай комплект', en: 'Relaxing Tea Set' },
  'products.items.6.description': { bg: 'Смес от билки за релаксация и спокойствие', en: 'Herbal blend for relaxation and calm' },
  'products.items.6.price': { bg: '30 лв', en: '30 BGN' },
  'products.buy': { bg: 'Купи', en: 'Buy' },
  'contact.title': { bg: 'Свържете се с мен', en: 'Get in Touch' },
  'contact.facebook': { bg: 'Facebook', en: 'Facebook' },
  'contact.instagram': { bg: 'Instagram', en: 'Instagram' },
  'contact.phone': { bg: 'Телефон', en: 'Phone' },
  'contact.messenger': { bg: 'Messenger', en: 'Messenger' },
  'contact.viber': { bg: 'Viber', en: 'Viber' },
  'contact.cashLabel': { bg: 'Моята друга работа', en: 'My other job' },
  'sticky.button': { bg: 'Резервирай', en: 'Book Now' },
}

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

function useLanguageState() {
  const [languageState] = useState<'bg' | 'en'>(() => getLanguage())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? languageState : 'bg'
}

export function useLanguage() {
  return useLanguageState()
}

export function useTranslations() {
  const language = useLanguageState()

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
      return translation[language] || translation.bg || key
    }
  }, [language])

  return t
}

