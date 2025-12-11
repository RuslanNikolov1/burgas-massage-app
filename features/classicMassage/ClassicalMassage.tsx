'use client'

import Image from 'next/image'
import { Leaf, Heartbeat, ClockCounterClockwise, PersonSimple } from '@phosphor-icons/react'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './ClassicalMassage.module.scss'

const BENEFITS = [
  {
    titleKey: 'classic.benefits.relaxation.title',
    descriptionKey: 'classic.benefits.relaxation.description',
    icon: Leaf,
  },
  {
    titleKey: 'classic.benefits.circulation.title',
    descriptionKey: 'classic.benefits.circulation.description',
    icon: Heartbeat,
  },
  {
    titleKey: 'classic.benefits.recovery.title',
    descriptionKey: 'classic.benefits.recovery.description',
    icon: ClockCounterClockwise,
  },
  {
    titleKey: 'classic.benefits.posture.title',
    descriptionKey: 'classic.benefits.posture.description',
    icon: PersonSimple,
  },
]

export function ClassicalMassage() {
  const t = useTranslations()

  return (
    <section id="classical-massage" className={styles.classicalMassage} aria-labelledby="classical-massage-title">
      <div className="container">
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <div className={styles.intro}>
              <h2 id="classical-massage-title" className="section-title">
                {t('classic.heading')}
              </h2>
              <p>{t('classic.description')}</p>
            </div>
            <div className={styles.bedGallery}>
              <div className={styles.bedImageWrapper}>
                <Image
                  src="/bed-1.png"
                  alt={t('classic.bedAlt1')}
                  width={350}
                  height={250}
                  className={styles.bedImage}
                  sizes="(max-width: 768px) 50vw, 350px"
                />
              </div>
              <div className={styles.bedImageWrapper}>
                <Image
                  src="/bed-2.png"
                  alt={t('classic.bedAlt2')}
                  width={350}
                  height={250}
                  className={styles.bedImage}
                  sizes="(max-width: 768px) 50vw, 350px"
                />
              </div>
            </div>
          </div>

          <div className={styles.benefits} aria-label={t('classic.label')}>
            {BENEFITS.map(benefit => (
              <article key={benefit.titleKey} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>
                    <benefit.icon size={32} color="#d1b272" weight="duotone" aria-hidden />
                  </span>
                  <h3>{t(benefit.titleKey)}</h3>
                </div>
                <p>{t(benefit.descriptionKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


