'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Products.module.scss'

const products = [
  {
    nameKey: 'products.items.1.name',
    priceKey: 'products.items.1.price',
    descriptionKey: 'products.items.1.description',
    image: '/product-1.jpg',
  },
  {
    nameKey: 'products.items.2.name',
    priceKey: 'products.items.2.price',
    descriptionKey: 'products.items.2.description',
    image: '/product-2.jpg',
  },
  {
    nameKey: 'products.items.3.name',
    priceKey: 'products.items.3.price',
    descriptionKey: 'products.items.3.description',
    image: '/product-3.png',
  },
  {
    nameKey: 'products.items.4.name',
    priceKey: 'products.items.4.price',
    descriptionKey: 'products.items.4.description',
    image: '/product-4.png',
  },
  {
    nameKey: 'products.items.5.name',
    priceKey: 'products.items.5.price',
    descriptionKey: 'products.items.5.description',
    image: '/product-6.jpg',
  },
  {
    nameKey: 'products.items.6.name',
    priceKey: 'products.items.6.price',
    descriptionKey: 'products.items.6.description',
    image: '/product-6.jpg',
  },
]

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

        <div className={styles.intro}>
          <motion.div
            className={styles.introImage}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/woman.png"
              alt="Клиентка наслаждаваща се на релаксиращ масаж в Бургас - професионални масаж услуги"
              width={360}
              height={420}
              className={styles.womanImage}
              priority={false}
            />
          </motion.div>
        </div>
        
        <div className={styles.grid}>
          {products.map((product, index) => (
            <motion.div
              key={index}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={styles.imagePlaceholder}>
                <Image
                  src={product.image}
                  alt={`${t(product.nameKey)} - ${t(product.descriptionKey)} - Масаж продукти в Бургас`}
                  width={400}
                  height={300}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{t(product.nameKey)}</h3>
                <p className={styles.description}>{t(product.descriptionKey)}</p>
                <div className={styles.footer}>
                  <span className={styles.price}>{t(product.priceKey)}</span>
                  <button className={styles.buyButton}>{t('products.buy')}</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

