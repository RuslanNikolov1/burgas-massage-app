'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './MusicMessage.module.scss'

export function MusicMessage() {
  const t = useTranslations()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Show message after 5 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 5000)

    // Hide message after 5 more seconds (10 seconds total)
    const hideTimer = setTimeout(() => {
      setIsVisible(false)
    }, 10000)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <p className={styles.message}>{t('music.relaxingMessage')}</p>
  )
}


