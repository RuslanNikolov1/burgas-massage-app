'use client'

import Image from 'next/image'
import {
  FlowerLotus,
  PersonSimpleWalk,
  Wind,
  Tree,
  DropHalf,
  MusicNotes,
  Quotes,
} from '@phosphor-icons/react'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Chakras.module.scss'

const iconColor = '#d1b272'

const PRACTICES = [
  {
    titleKey: 'chakras.practices.meditation.title',
    descriptionKey: 'chakras.practices.meditation.description',
    icon: FlowerLotus,
  },
  {
    titleKey: 'chakras.practices.yoga.title',
    descriptionKey: 'chakras.practices.yoga.description',
    icon: PersonSimpleWalk,
  },
  {
    titleKey: 'chakras.practices.pranayama.title',
    descriptionKey: 'chakras.practices.pranayama.description',
    icon: Wind,
  },
  {
    titleKey: 'chakras.practices.grounding.title',
    descriptionKey: 'chakras.practices.grounding.description',
    icon: Tree,
  },
  {
    titleKey: 'chakras.practices.aroma.title',
    descriptionKey: 'chakras.practices.aroma.description',
    icon: DropHalf,
  },
  {
    titleKey: 'chakras.practices.music.title',
    descriptionKey: 'chakras.practices.music.description',
    icon: MusicNotes,
  },
  {
    titleKey: 'chakras.practices.affirmations.title',
    descriptionKey: 'chakras.practices.affirmations.description',
    icon: Quotes,
  },
]

export function Chakras() {
  const t = useTranslations()

  return (
    <section id="chakras" className={styles.chakras} aria-labelledby="chakras-title">
      <div className="container">
        <div className={styles.imageWrapper}>
          <Image
            src="/chakras.jpg"
            alt={t('chakras.imageAlt')}
            width={360}
            height={360}
            className={styles.image}
            sizes="(max-width: 768px) 60vw, 360px"
          />
        </div>

        <header className={styles.header}>
          <h2 id="chakras-title" className="section-title">
            {t('chakras.title')}
          </h2>
        </header>

        <p className={styles.intro}>{t('chakras.intro')}</p>

        <div className={styles.grid} aria-label={t('chakras.ariaPractices')}>
          {PRACTICES.map(practice => (
            <article key={practice.titleKey} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>
                  <practice.icon size={32} color={iconColor} weight="duotone" aria-hidden />
                </span>
                <h3>{t(practice.titleKey)}</h3>
              </div>
              <p>{t(practice.descriptionKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


