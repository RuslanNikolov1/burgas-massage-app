'use client'

import { motion } from 'framer-motion'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Feedbacks.module.scss'

const feedbacks = [
  {
    name: 'Мария Петрова',
    rating: 5,
    text: 'Невероятен опит! Масажът беше много професионален и релаксиращ. Напълно препоръчвам!',
    date: '15 Декември 2024',
  },
  {
    name: 'Иван Георгиев',
    rating: 5,
    text: 'Отличен масажист! Помогна ми много с болките в гърба. Определено ще се върна отново.',
    date: '12 Декември 2024',
  },
  {
    name: 'Елена Димитрова',
    rating: 5,
    text: 'Много спокоен и професионален подход. Медитацията беше невероятна. Благодаря!',
    date: '10 Декември 2024',
  },
  {
    name: 'Петър Стоянов',
    rating: 5,
    text: 'Първият ми масаж и беше страхотен! Много релаксиращ и професионален. Препоръчвам!',
    date: '8 Декември 2024',
  },
  {
    name: 'Анна Иванова',
    rating: 5,
    text: 'Отлично обслужване и много добър масаж. Помогна ми с тревожността. Благодаря много!',
    date: '5 Декември 2024',
  },
  {
    name: 'Димитър Николов',
    rating: 5,
    text: 'Професионален масаж и много приятна атмосфера. Определено най-добрият в Бургас!',
    date: '3 Декември 2024',
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
                <h3 className={styles.name}>{feedback.name}</h3>
              </div>
              <p className={styles.text}>{feedback.text}</p>
              <span className={styles.date}>{feedback.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

