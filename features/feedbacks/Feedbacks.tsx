'use client'

import { motion } from 'framer-motion'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Feedbacks.module.scss'

const feedbacks = [
  {
    nameKey: 'feedbacks.items.1.name',
    textKey: 'feedbacks.items.1.text',
    dateKey: 'feedbacks.items.1.date',
  },
  {
    nameKey: 'feedbacks.items.2.name',
    textKey: 'feedbacks.items.2.text',
    dateKey: 'feedbacks.items.2.date',
  },
  {
    nameKey: 'feedbacks.items.3.name',
    textKey: 'feedbacks.items.3.text',
    dateKey: 'feedbacks.items.3.date',
  },
  {
    nameKey: 'feedbacks.items.4.name',
    textKey: 'feedbacks.items.4.text',
    dateKey: 'feedbacks.items.4.date',
  },
  {
    nameKey: 'feedbacks.items.5.name',
    textKey: 'feedbacks.items.5.text',
    dateKey: 'feedbacks.items.5.date',
  },
  {
    nameKey: 'feedbacks.items.6.name',
    textKey: 'feedbacks.items.6.text',
    dateKey: 'feedbacks.items.6.date',
  },
]

export function Feedbacks() {
  const t = useTranslations()

  return (
    <section id="feedbacks" className={styles.feedbacks}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('feedbacks.title')}
        </motion.h2>
        
        <div className={styles.grid}>
          {feedbacks.map((feedback, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={styles.header}>
                <h3 className={styles.name}>{t(feedback.nameKey)}</h3>
              </div>
              <p className={styles.text}>{t(feedback.textKey)}</p>
              <span className={styles.date}>{t(feedback.dateKey)}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

