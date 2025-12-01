'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './About.module.scss'

export function About() {
  const t = useTranslations()
  const whatItems = [
    t('about.what.items.1'),
    t('about.what.items.2'),
    t('about.what.items.3'),
    t('about.what.items.4'),
  ]

  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('about.title')}
        </motion.h2>

        <div className={styles.topRow}>
          <motion.div
            className={styles.intro}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>{t('about.mission')}</p>
            <p>{t('about.mission2')}</p>
          </motion.div>

          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/profile-picture.jpg"
              alt="Сертифициран масажист в Бургас с над 10 години опит в класически и терапевтични масажи"
              width={400}
              height={500}
              className={styles.image}
            />
          </motion.div>
        </div>

        <motion.div
          className={styles.details}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.card}>
            <h3>{t('about.whatTitle')}</h3>
            <ul>
              {whatItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.card}>
            <h3>{t('about.philosophyTitle')}</h3>
            <p>{t('about.philosophyDescription')}</p>
          </div>
        </motion.div>

        <motion.div
          className={styles.gallery}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.galleryImageWrapper}>
            <Image
              src="/massage-1.jpg"
              alt="Професионален масаж в Бургас"
              width={600}
              height={400}
              className={styles.galleryImage}
            />
          </div>
          <div className={styles.galleryImageWrapper}>
            <Image
              src="/massage-2.png"
              alt="Релаксиращ масаж и терапия"
              width={600}
              height={400}
              className={styles.galleryImage}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

