'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Pricing.module.scss'

const pricingData = [
  { durationKey: 'pricing.rows.single30.duration', priceKey: 'pricing.rows.single30.price' },
  { durationKey: 'pricing.rows.single60.duration', priceKey: 'pricing.rows.single60.price' },
  { durationKey: 'pricing.rows.single90.duration', priceKey: 'pricing.rows.single90.price' },
  { durationKey: 'pricing.rows.single120.duration', priceKey: 'pricing.rows.single120.price' },
  {
    durationKey: 'pricing.rows.relax.duration',
    priceKey: 'pricing.rows.relax.price',
    packageKey: 'pricing.rows.relax.package',
    originalKey: 'pricing.rows.relax.original',
  },
  {
    durationKey: 'pricing.rows.recovery.duration',
    priceKey: 'pricing.rows.recovery.price',
    packageKey: 'pricing.rows.recovery.package',
    originalKey: 'pricing.rows.recovery.original',
  },
  {
    durationKey: 'pricing.rows.premium.duration',
    priceKey: 'pricing.rows.premium.price',
    packageKey: 'pricing.rows.premium.package',
    originalKey: 'pricing.rows.premium.original',
  },
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
              alt="Топли масажни камъни използвани за релаксация и терапевтичен масаж в Бургас"
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
                  <tr key={index} className={item.packageKey ? styles.packageRow : ''}>
                    <td>
                      <div className={styles.duration}>
                        {t(item.durationKey)}
                        {item.packageKey && (
                          <span className={styles.packageInfo}>({t(item.packageKey)})</span>
                        )}
                      </div>
                    </td>
                    <td className={styles.priceCell}>
                      {item.originalKey && (
                        <span className={styles.originalPrice}>{t(item.originalKey)}</span>
                      )}
                      <span className={styles.price}>{t(item.priceKey)}</span>
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

