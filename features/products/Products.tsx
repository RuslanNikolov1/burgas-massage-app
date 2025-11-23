'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Products.module.scss'

const products = [
  {
    name: 'Ароматерапевтично масло за масаж',
    price: '45 лв',
    description: 'Натурално масло с лавандула за релаксация',
    image: '/product-1.jpg',
  },
  {
    name: 'Масажни камъни',
    price: '80 лв',
    description: 'Комплект от базалтови камъни за топъл масаж',
    image: '/product-2.jpg',
  },
  {
    name: 'Релаксиращ крем за тяло',
    price: '35 лв',
    description: 'Крем с ментол и календула за успокояване',
    image: '/product-3.png',
  },
  {
    name: 'Ароматни свещи',
    price: '25 лв',
    description: 'Свещи с естествени аромати за атмосфера',
    image: '/product-4.png',
  },
  {
    name: 'Масажен ролер',
    price: '55 лв',
    description: 'Дървен ролер за самомасаж',
    image: '/product-6.jpg',
  },
  {
    name: 'Релаксиращ чай комплект',
    price: '30 лв',
    description: 'Смес от билки за релаксация и спокойствие',
    image: '/product-6.jpg',
  },
]

export function Products() {
  const t = useTranslations()

  return (
    <section id="products" className={styles.products}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('products.title')}
        </motion.h2>
        
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
                  alt={product.name}
                  width={400}
                  height={300}
                  className={styles.productImage}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.footer}>
                  <span className={styles.price}>{product.price}</span>
                  <button className={styles.buyButton}>Купи / Buy</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

