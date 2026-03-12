'use client'

import { useState, useEffect } from 'react'
import styles from './LanguageSwitcher.module.scss'

type SwitcherLanguage = 'bg' | 'en' | 'ru'

const getNextPathForLanguage = (targetLang: SwitcherLanguage): string => {
  if (typeof window === 'undefined') {
    return `/${targetLang}`
  }

  const { pathname, search, hash } = window.location
  const segments = pathname.split('/')

  if (segments.length > 1 && (segments[1] === 'bg' || segments[1] === 'en' || segments[1] === 'ru')) {
    segments[1] = targetLang
  } else {
    segments.splice(1, 0, targetLang)
  }

  const newPath = segments.join('/') || `/${targetLang}`

  return `${newPath}${search}${hash}`
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<SwitcherLanguage>('bg')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem('language') as SwitcherLanguage | null
    if (saved) {
      setLanguage(saved)
    }
  }, [])

  const handleLanguageChange = (lang: SwitcherLanguage) => {
    if (typeof window === 'undefined') return

    setLanguage(lang)
    localStorage.setItem('language', lang)

    const nextUrl = getNextPathForLanguage(lang)
    window.location.href = nextUrl
  }

  return (
    <div className={styles.switcher} role="group" aria-label="Language selector">
      <button
        className={`${styles.button} ${language === 'bg' ? styles.active : ''}`}
        onClick={() => handleLanguageChange('bg')}
        aria-label="Български"
        aria-pressed={language === 'bg'}
      >
        БГ
      </button>
      <button
        className={`${styles.button} ${language === 'en' ? styles.active : ''}`}
        onClick={() => handleLanguageChange('en')}
        aria-label="English"
        aria-pressed={language === 'en'}
      >
        EN
      </button>
      <button
        className={`${styles.button} ${language === 'ru' ? styles.active : ''}`}
        onClick={() => handleLanguageChange('ru')}
        aria-label="Руски"
        aria-pressed={language === 'ru'}
      >
        RU
      </button>
    </div>
  )
}

