'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from '@/features/i18n/useTranslations'
import { LanguageSwitcher } from '@/features/i18n/LanguageSwitcher'
import { MusicPlayer } from '@/features/ui/MusicPlayer'
import styles from './Header.module.scss'

const sections = [
  { id: 'about', key: 'nav.about' },
  { id: 'feedbacks', key: 'nav.feedbacks' },
  { id: 'products', key: 'nav.products' },
  { id: 'pricing', key: 'nav.pricing' },
  { id: 'booking', key: 'nav.booking' },
  { id: 'destiny-matrix', key: 'nav.destiny-matrix' },
  { id: 'contact', key: 'nav.contact' },
]

export function Header() {
  const [activeSection, setActiveSection] = useState('about')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    if (typeof window === 'undefined') return
    
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setIsMenuOpen(false)
    }
  }
  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className={styles.nav} role="navigation" aria-label={t('nav.mainNavigation')}>
        <div className={styles.brandRow}>
          <button
            type="button"
            className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
            aria-expanded={isMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
          <a href="#hero" className={styles.logoLink} onClick={(e) => handleNavClick(e, 'hero')} aria-label={t('nav.logoAria')}>
            <Image src="/logo.png" alt={t('nav.logoAlt')} width={140} height={140} className={styles.logoImage} priority />
          </a>
        </div>
        <div className={`${styles.navList} ${isMenuOpen ? styles.open : ''}`}>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => handleNavClick(e, section.id)}
                  className={`${styles.navLink} ${activeSection === section.id ? styles.active : ''}`}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {t(section.key)}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.controls}>
            <MusicPlayer />
            <div className={styles.languageSwitcher}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

