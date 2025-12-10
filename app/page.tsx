'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/features/layout/Header'
import { Hero } from '@/features/hero/Hero'
import { LoadingSkeleton } from '@/features/ui/LoadingSkeleton'
import { StickyContactButton } from '@/features/ui/StickyContactButton'
import { MusicMessage } from '@/features/ui/MusicMessage'
import { useTranslations } from '@/features/i18n/useTranslations'
import { UserCircleDashed } from '@phosphor-icons/react'
import footerStyles from './page.module.scss'

// Lazy load all sections except Hero (which should load immediately)
const About = dynamic(
  () => import('@/features/about/About').then(mod => ({ default: mod.About })),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: true 
  }
)

const ClassicalMassage = dynamic(
  () => import('@/features/classicMassage/ClassicalMassage').then(mod => ({ default: mod.ClassicalMassage })),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: true 
  }
)

const DestinyMatrix = dynamic(
  () => import('@/features/destinyMatrix/DestinyMatrix'),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: true 
  }
)

const Chakras = dynamic(
  () => import('@/features/chakras/Chakras').then(mod => ({ default: mod.Chakras })),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: true 
  }
)

const Products = dynamic(
  () => import('@/features/products/Products').then(mod => ({ default: mod.Products })),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: true 
  }
)

const Pricing = dynamic(
  () => import('@/features/pricing/Pricing').then(mod => ({ default: mod.Pricing })),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: true 
  }
)

const Feedbacks = dynamic(
  () => import('@/features/feedbacks/Feedbacks').then(mod => ({ default: mod.Feedbacks })),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: true 
  }
)


const Contact = dynamic(
  () => import('@/features/contact/Contact').then(mod => ({ default: mod.Contact })),
  { 
    loading: () => <LoadingSkeleton />,
    ssr: true 
  }
)

export default function Home() {
  const t = useTranslations()

  return (
    <>
      <StickyContactButton />
      <Header />
      <MusicMessage />
      <main role="main">
        <Hero />
        <Suspense fallback={<LoadingSkeleton />}>
          <ClassicalMassage />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <Chakras />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <Feedbacks />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <Products />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <DestinyMatrix />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <footer className={footerStyles.footer}>
        <span>
          {t('footer.text')}{' '}
          <a href="https://portfolio-website-dusky-five-28.vercel.app/" target="_blank" rel="noopener noreferrer">
            <UserCircleDashed
              size={20}
              color="#40b3bf"
              weight="duotone"
              aria-hidden
              className={footerStyles.footerIcon}
            />
            Ruslan Nikolov
          </a>
        </span>
      </footer>
    </>
  )
}

