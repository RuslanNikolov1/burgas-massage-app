'use client'

import { useEffect } from 'react'

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

export function LanguageProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const lang = getLanguage()
    document.documentElement.lang = lang
  }, [])

  return null
}



