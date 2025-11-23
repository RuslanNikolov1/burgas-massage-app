'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Contact.module.scss'

const contactLinks = [
  { type: 'facebook', url: '#', label: 'Facebook' },
  { type: 'instagram', url: '#', label: 'Instagram' },
  { type: 'phone', url: 'tel:+359888123456', label: '+359 888 123 456' },
  { type: 'messenger', url: '#', label: 'Messenger' },
  { type: 'viber', url: '#', label: 'Viber' },
]

export function Contact() {
  const t = useTranslations()

  const getIcon = (type: string) => {
    switch (type) {
      case 'facebook':
        return '📘'
      case 'instagram':
        return '📷'
      case 'phone':
        return '📞'
      case 'messenger':
        return '💬'
      case 'viber':
        return '💜'
      default:
        return '🔗'
    }
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t('contact.title')}
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
              src="/meditation.png"
              alt="Meditation"
              width={500}
              height={500}
              className={styles.image}
            />
          </motion.div>
          
          <motion.div
            className={styles.linksWrapper}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.links}>
              {contactLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  className={styles.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.label}
                >
                  <span className={styles.icon}>{getIcon(link.type)}</span>
                  <span className={styles.label}>{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

