'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './ProductDetails.module.scss'

type Props = {
  productSlug: 'pindi'
}

const PRODUCT_CONFIG: Record<Props['productSlug'], { imageSrc: string }> = {
  pindi: { imageSrc: '/Store-1.jpg' },
}

function splitParagraphs(text: string) {
  return text
    .split(/\n\s*\n/g)
    .map(p => p.trim())
    .filter(Boolean)
}

export function ProductDetails({ productSlug }: Props) {
  const t = useTranslations()

  const titleKey = `products.items.${productSlug}.title`
  const priceKey = `products.items.${productSlug}.price`
  const longDescriptionKey = `products.items.${productSlug}.longDescription`

  const paragraphs = splitParagraphs(t(longDescriptionKey))
  const imageSrc = PRODUCT_CONFIG[productSlug].imageSrc

  return (
    <main className={styles.page} role="main">
      <div className="container">
        <div className={styles.topRow}>
          <Link href="/#products" className={styles.backLink}>
            {t('products.details.back')}
          </Link>
        </div>

        <section className={styles.section} aria-labelledby="product-title">
          <div className={styles.grid}>
            <div className={styles.media}>
              <div className={styles.imageFrame}>
                <Image
                  src={imageSrc}
                  alt={`${t(titleKey)} - ${t('products.items.pindi.shortDescription')}`}
                  width={900}
                  height={700}
                  className={styles.image}
                  sizes="(max-width: 768px) 90vw, 46vw"
                  priority
                />
              </div>
            </div>

            <div className={styles.content}>
              <h1 id="product-title" className={styles.title}>
                {t(titleKey)}
              </h1>
              <p className={styles.price}>{t(priceKey)}</p>

              <div className={styles.description} aria-label={t('products.items.pindi.shortDescription')}>
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className={styles.actions}>
                <Link href="/#contact" className={styles.primaryCta}>
                  {t('products.details.cta')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

