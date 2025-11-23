'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './About.module.scss'

export function About() {
  const t = useTranslations()

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
        
        <div className={styles.content}>
          <motion.div
            className={styles.text}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className={styles.description}>
              {t('about.description')}
            </p>
          </motion.div>
          
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/profile-photo.jpg"
              alt="Masseur profile"
              width={400}
              height={500}
              className={styles.image}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

