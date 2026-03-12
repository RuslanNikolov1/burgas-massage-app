'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Products.module.scss'

const products = [
  {
    slug: 'pindi',
    nameKey: 'products.items.pindi.title',
    priceKey: 'products.items.pindi.price',
    shortDescriptionKey: 'products.items.pindi.shortDescription',
    longDescriptionKey: 'products.items.pindi.longDescription',
    image: '/Store-1.jpg',
  },
]

function getExcerptCutAfterMarker(text: string, marker: string) {
  if (!text) return ''
  const markerIndex = text.indexOf(marker)
  if (markerIndex === -1) return ''
  return `${text.slice(0, markerIndex + marker.length).trim()}...`
}

function getFallbackExcerpt(text: string) {
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .slice(0, 3)

  if (lines.length === 0) return ''
  return `${lines.join(' ')}...`
}

export function Products() {
  const t = useTranslations()

  return (
    <section id="products" className={styles.products}>
      <div className="container">
        <div className={styles.intro}>
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('products.title')}
        </motion.h2>
        </div>
       
        
        <div className={styles.grid}>
          {products.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/products/${product.slug}`}
                className={styles.card}
                aria-label={`${t(product.nameKey)} - ${t(product.shortDescriptionKey)}`}
              >
                <div className={styles.imagePlaceholder}>
                  <Image
                    src={product.image}
                    alt={`${t(product.nameKey)} - ${t(product.shortDescriptionKey)} - Massage products`}
                    width={400}
                    height={300}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.content}>
                  <h3 className={styles.name}>
                    {t(product.nameKey)} - {t(product.shortDescriptionKey)}
                  </h3>
                  <p className={styles.description}>
                    {getExcerptCutAfterMarker(t(product.longDescriptionKey), 'Потопете се в уникалното') ||
                      getExcerptCutAfterMarker(t(product.longDescriptionKey), 'Immerse yourself') ||
                      getFallbackExcerpt(t(product.longDescriptionKey))}
                  </p>
                  <div className={styles.footer}>
                    <span className={styles.price}>{t(product.priceKey)}</span>
                    <span className={styles.buyButton} aria-hidden>
                      {t('products.viewDetails')}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

