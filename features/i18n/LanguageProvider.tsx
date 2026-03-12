'use client'

import { useEffect } from 'react'

const detectLanguageFromPath = (): 'bg' | 'en' | 'ru' | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const path = window.location.pathname.toLowerCase()

  if (path === '/en' || path.startsWith('/en/')) {
    return 'en'
  }

  if (path === '/bg' || path.startsWith('/bg/')) {
    return 'bg'
  }

  if (path === '/ru' || path.startsWith('/ru/')) {
    return 'ru'
  }

  return null
}

const getLanguage = (): 'bg' | 'en' | 'ru' => {
  if (typeof window !== 'undefined') {
    const pathLang = detectLanguageFromPath()

    if (pathLang) {
      try {
        localStorage.setItem('language', pathLang)
      } catch {
        // ignore write errors
      }
      return pathLang
    }

    try {
      const saved = localStorage.getItem('language') as 'bg' | 'en' | 'ru' | null
      return saved || 'bg'
    } catch {
      return 'bg'
    }
  }
  return 'bg'
}

export function LanguageProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const lang = getLanguage()
    document.documentElement.lang = lang
  }, [])

  return null
}







