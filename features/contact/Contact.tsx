'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ComponentType } from 'react'
import {
  InstagramLogo,
  PhoneCall,
  MessengerLogo,
  ChatsCircle,
  Envelope,
  FacebookLogo,
  LinkSimple,
  type IconProps,
} from '@phosphor-icons/react'
import { useTranslations } from '@/features/i18n/useTranslations'
import styles from './Contact.module.scss'

const iconColor = '#d1b272'
const iconSize = 34

const ICON_MAP: Record<string, ComponentType<IconProps>> = {
  instagram: InstagramLogo,
  phone: PhoneCall,
  messenger: MessengerLogo,
  viber: ChatsCircle,
  email: Envelope,
  facebook: FacebookLogo,
}

const INSTAGRAM_URL = 'https://www.instagram.com/batvu?utm_source=qr&igsh=MWZzbTdla3l4cThxZQ=='

const contactLinks = [
  { type: 'phone', url: 'tel:+359886830825', label: '+359 886 830 825' },
  { type: 'viber', url: 'viber://chat?number=%2B359886830825', label: 'Viber' },
  { type: 'messenger', url: 'https://m.me/batvu', label: 'Messenger' },
  { type: 'email', url: 'mailto:ivanvelichkov13@gmail.com', label: 'ivanvelichkov13@gmail.com' },
  { type: 'facebook', url: 'https://www.facebook.com/search/pages?id=61584564035812', label: 'Facebook' },
  { type: 'instagram', url: INSTAGRAM_URL, label: 'Instagram' },
]

export function Contact() {
  const t = useTranslations()

  const renderIcon = (type: string) => {
    const IconComponent = ICON_MAP[type] || LinkSimple
    return <IconComponent size={iconSize} color={iconColor} weight="duotone" aria-hidden />
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
              alt={t('contact.meditationAlt')}
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
                  <span className={styles.icon}>{renderIcon(link.type)}</span>
                  <span className={styles.label}>{link.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        <a className={styles.cashBadge} href="tel:+359886830825" aria-label="Позвънете на +359 886 830 825">
          <span className={styles.cashLabel}>{t('contact.cashLabel')}</span>
          <Image
            src="/city-cash.png"
            alt=""
            width={140}
            height={140}
            className={styles.cashImage}
            priority={false}
          />
          <span className={styles.cashPhone}>+359 886 830 825</span>
        </a>
      </div>
    </section>
  )
}

