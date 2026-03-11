'use client'

import { useCallback } from 'react'
import { useTranslations } from '@/features/i18n/useTranslations'
import { scrollToSectionId } from '@/lib/scroll-to-section'
import styles from './StickyContactButton.module.scss'

export function StickyContactButton() {
  const t = useTranslations()

  const handleScrollToContact = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (typeof window === 'undefined') return

    const target = document.getElementById('contact')
    if (target) {
      scrollToSectionId('contact', { extraOffsetPx: 32 })
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








