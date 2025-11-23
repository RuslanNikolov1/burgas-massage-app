'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Hero.module.scss'

export function Hero() {
  const t = useTranslations()

  return (
    <section id="hero" className={styles.hero}>
      <div className="container">
        <div className={styles.content}>
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.logoWrapper}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={320}
                height={320}
                priority
                className={styles.logo}
              />
            </div>
            <h1 className={styles.title}>
              {t('hero.services')}
            </h1>
            <p className={styles.subtitle}>
              {t('hero.subtitle')}
            </p>
            <p className={styles.motivational}>
              {t('hero.motivational')}
            </p>
          </motion.div>
          
          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src="/man.png"
                alt="Masseur"
                width={400}
                height={350}
                priority
                className={styles.image}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

