'use client'

import { useState, useEffect } from 'react'
import styles from './LanguageSwitcher.module.scss'

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<'bg' | 'en'>('bg')

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const saved = localStorage.getItem('language') as 'bg' | 'en' | null
    if (saved) {
      setLanguage(saved)
    }
  }, [])

  const handleLanguageChange = (lang: 'bg' | 'en') => {
    if (typeof window === 'undefined') return
    
    setLanguage(lang)
    localStorage.setItem('language', lang)
    window.location.reload() // Simple reload to apply language change
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
    </div>
  )
}

