'use client'

import { useCallback } from 'react'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './StickyContactButton.module.scss'

export function StickyContactButton() {
  const t = useTranslations()

  const handleScrollToContact = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (typeof window === 'undefined') return

    const target = document.getElementById('contact')
    if (target) {
      const headerOffset = 60
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    } else {
      // Fallback for hash navigation
      window.location.href = '#contact'
    }
  }, [])

  return (
    <button
      className={styles.stickyButton}
      onClick={handleScrollToContact}
      aria-label={t('contact.title')}
    >
      Резервирай
    </button>
  )
}
