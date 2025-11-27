'use client'

import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './StickyBookingButton.module.scss'

const FLOATING_TRIGGER = 160
const MOBILE_BREAKPOINT = 640
const BASE_FLOATING_BOTTOM = 24
const CONTACT_OVERLAP_OFFSET = 50

export function StickyBookingButton() {
  const t = useTranslations()
  const [isFloating, setIsFloating] = useState(false)
  const [floatingBottom, setFloatingBottom] = useState(BASE_FLOATING_BOTTOM)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateState = () => {
      const scrollY = window.scrollY
      setIsFloating(scrollY > FLOATING_TRIGGER)

      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT
      if (!isMobile) {
        setFloatingBottom(BASE_FLOATING_BOTTOM)
        return
      }

      const contactSection = document.getElementById('contact')
      if (!contactSection) {
        setFloatingBottom(BASE_FLOATING_BOTTOM)
        return
      }

      const contactBottom = contactSection.offsetTop + contactSection.offsetHeight
      const viewportBottom = scrollY + window.innerHeight
      const overlap = viewportBottom - (contactBottom + CONTACT_OVERLAP_OFFSET)
      if (overlap > 0) {
        setFloatingBottom(BASE_FLOATING_BOTTOM + overlap)
      } else {
        setFloatingBottom(BASE_FLOATING_BOTTOM)
      }
    }

    updateState()
    window.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)
    return () => {
      window.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [])

  const handleScrollToBooking = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (typeof window === 'undefined') return

    const target = document.getElementById('booking')
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      })
    } else {
      window.location.href = '#booking'
    }
  }, [])

  const floatingStyle = isFloating
    ? ({ '--button-floating-bottom': `${floatingBottom}px` } as React.CSSProperties)
    : undefined

  return (
    <div className={`${styles.wrapper} ${isFloating ? styles.wrapperFloating : ''}`}>
      <motion.button
        type="button"
        className={`${styles.button} ${isFloating ? styles.buttonFloating : ''}`}
        style={floatingStyle}
        onClick={handleScrollToBooking}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        aria-label={t('booking.reserveButton')}
      >
        {t('booking.reserveButton')}
      </motion.button>
    </div>
  )
}

