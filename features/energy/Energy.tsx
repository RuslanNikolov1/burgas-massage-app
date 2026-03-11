'use client'

import { motion } from 'framer-motion'
import { Lightning, ShieldCheck, ArrowsClockwise } from '@phosphor-icons/react'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Energy.module.scss'

const HOW_IT_WORKS = [
  { icon: Lightning, textKey: 'energy.howWorks.1' },
  { icon: ArrowsClockwise, textKey: 'energy.howWorks.2' },
  { icon: ShieldCheck, textKey: 'energy.howWorks.3' },
] as const

export function Energy() {
  const t = useTranslations()

  return (
    <section id="energy" className={styles.energy} aria-labelledby="energy-title">
      <div className="container">
        <div className={styles.header}>
          <h2 id="energy-title" className="section-title">
            {t('energy.title')}
          </h2>
        </div>

        <div className={styles.grid}>
          <motion.div
            className={styles.copy}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className={styles.subheading}>{t('energy.introTitle')}</h3>
            <p className={styles.paragraph}>{t('energy.intro')}</p>

            <h3 className={styles.subheading}>{t('energy.mainMessageTitle')}</h3>
            <p className={styles.paragraph}>{t('energy.mainMessage')}</p>

            <div className={styles.ctaRow}>
              <a
                href="#contact"
                className={styles.ctaLink}
                onClick={(e) => {
                  e.preventDefault()
                  // Lazy import avoids pulling the helper into SSR bundles unnecessarily
                  import('@/lib/scroll-to-section').then(mod => mod.scrollToSectionId('contact', { extraOffsetPx: 32 }))
                }}
              >
                {t('energy.cta')}
              </a>
            </div>
          </motion.div>

          <motion.div
            className={styles.cards}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            aria-label={t('energy.howWorksTitle')}
          >
            <h3 className={styles.cardsTitle}>{t('energy.howWorksTitle')}</h3>
            <div className={styles.cardsGrid}>
              {HOW_IT_WORKS.map(item => (
                <article key={item.textKey} className={styles.card}>
                  <span className={styles.cardIcon} aria-hidden>
                    <item.icon size={34} color="#d1b272" weight="duotone" />
                  </span>
                  <p className={styles.cardText}>{t(item.textKey)}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

