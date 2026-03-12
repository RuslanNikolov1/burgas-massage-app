'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import { scrollToSectionId } from '@/lib/scroll-to-section'
import styles from './WorkingHours.module.scss'

export function WorkingHours() {
  const t = useTranslations()

  const handleScrollToContact = () => {
    scrollToSectionId('contact', { extraOffsetPx: 32 })
  }

  return (
    <section id="working-hours" className={styles.workingHours}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>{t('classic.workingHoursTitle')}</h2>
          <p className={styles.scheduleText}>{t('classic.workingHours')}</p>
          
          <button 
            className={styles.reserveButton}
            onClick={handleScrollToContact}
            aria-label={t('classic.reserveButton')}
          >
            {t('classic.reserveButton')}
          </button>
          
          <motion.div 
            className={styles.bedImageWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/bed.png"
              alt="Професионално масажно легло за домашни масажи и релаксация"
              width={400}
              height={300}
              className={styles.bedImage}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}








