'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Pricing.module.scss'

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
        
        <motion.p
          className={styles.note}
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('pricing.note')}
        </motion.p>
        
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
              alt="Топли масажни камъни използвани за релаксация и терапевтичен масаж"
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
            {/* Partial Therapies */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{t('pricing.sections.partial.title')}</h3>
              <p className={styles.sectionSubtitle}>{t('pricing.sections.partial.subtitle')}</p>
              <p className={styles.sectionAreas}>{t('pricing.sections.partial.areas')}</p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t('pricing.duration')}</th>
                    <th className={styles.priceHeader}>{t('pricing.price')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.durationCell}>
                      <div className={styles.duration}>{t('pricing.sections.partial.40.duration')}</div>
                    </td>
                    <td className={styles.priceCell}>
                      <span className={styles.price}>{t('pricing.sections.partial.40.price')}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.durationCell}>
                      <div className={styles.duration}>{t('pricing.sections.partial.60.duration')}</div>
                    </td>
                    <td className={styles.priceCell}>
                      <span className={styles.price}>{t('pricing.sections.partial.60.price')}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Complete Therapies */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{t('pricing.sections.complete.title')}</h3>
              <p className={styles.sectionSubtitle}>{t('pricing.sections.complete.subtitle')}</p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t('pricing.duration')}</th>
                    <th className={styles.priceHeader}>{t('pricing.price')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.durationCell}>
                      <div className={styles.duration}>{t('pricing.sections.complete.70.duration')}</div>
                    </td>
                    <td className={styles.priceCell}>
                      <span className={styles.price}>{t('pricing.sections.complete.70.price')}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.durationCell}>
                      <div className={styles.duration}>{t('pricing.sections.complete.90.duration')}</div>
                    </td>
                    <td className={styles.priceCell}>
                      <span className={styles.price}>{t('pricing.sections.complete.90.price')}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Premium Therapy */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{t('pricing.sections.premium.title')}</h3>
              <p className={styles.sectionSubtitle}>{t('pricing.sections.premium.subtitle')}</p>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t('pricing.duration')}</th>
                    <th className={styles.priceHeader}>{t('pricing.price')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.durationCell}>
                      <div className={styles.duration}>{t('pricing.sections.premium.120.duration')}</div>
                    </td>
                    <td className={styles.priceCell}>
                      <span className={styles.price}>{t('pricing.sections.premium.120.price')}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Package Therapies */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{t('pricing.sections.packages.title')}</h3>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t('pricing.duration')}</th>
                    <th className={styles.priceHeader}>{t('pricing.price')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.packageRow}>
                    <td className={styles.durationCell}>
                      <div className={styles.duration}>{t('pricing.sections.packages.5.therapy')}</div>
                    </td>
                    <td className={styles.priceCell}>
                      <span className={styles.price}>{t('pricing.sections.packages.5.discount')}</span>
                    </td>
                  </tr>
                  <tr className={styles.packageRow}>
                    <td className={styles.durationCell}>
                      <div className={styles.duration}>{t('pricing.sections.packages.10.therapy')}</div>
                    </td>
                    <td className={styles.priceCell}>
                      <span className={styles.price}>{t('pricing.sections.packages.10.discount')}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

