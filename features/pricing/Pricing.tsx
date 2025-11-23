'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Pricing.module.scss'

const pricingData = [
  { duration: '30 мин', price: '80 лв', package: null },
  { duration: '60 мин', price: '140 лв', package: null },
  { duration: '90 мин', price: '190 лв', package: null },
  { duration: '120 мин', price: '240 лв', package: null },
  { duration: 'Пакет "Релакс"', price: '250 лв', package: '2x60 мин', original: '280 лв' },
  { duration: 'Пакет "Възстановяване"', price: '350 лв', package: '3x60 мин', original: '420 лв' },
  { duration: 'Пакет "Премиум"', price: '500 лв', package: '4x90 мин', original: '760 лв' },
]

export function Pricing() {
  const t = useTranslations()

  return (
    <section id="pricing" className={styles.pricing}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('pricing.title')}
        </motion.h2>
        
        <div className={styles.content}>
          <motion.div
            className={styles.imageWrapper}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/stones.png"
              alt="Massage stones"
              width={500}
              height={500}
              className={styles.image}
            />
          </motion.div>
          
          <motion.div
            className={styles.tableWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t('pricing.duration')}</th>
                  <th>{t('pricing.price')}</th>
                </tr>
              </thead>
              <tbody>
                {pricingData.map((item, index) => (
                  <tr key={index} className={item.package ? styles.packageRow : ''}>
                    <td>
                      <div className={styles.duration}>
                        {item.duration}
                        {item.package && (
                          <span className={styles.packageInfo}>({item.package})</span>
                        )}
                      </div>
                    </td>
                    <td className={styles.priceCell}>
                      {item.original && (
                        <span className={styles.originalPrice}>{item.original}</span>
                      )}
                      <span className={styles.price}>{item.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

