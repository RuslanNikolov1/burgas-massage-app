'use client'

import { motion } from 'framer-motion'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './StickyBookingButton.module.scss'

export function StickyBookingButton() {
  const t = useTranslations()

  const handleClick = () => {
    if (typeof window === 'undefined') return
    
    const element = document.getElementById('booking')
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.button
      className={styles.button}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={t('sticky.button')}
    >
      {t('sticky.button')}
    </motion.button>
  )
}

