'use client'

import { Suspense, useEffect } from 'react'
import dynamic from 'next/dynamic'

import { Header } from '@/features/layout/Header'
import { Hero } from '@/features/hero/Hero'
import { LoadingSkeleton } from '@/features/ui/LoadingSkeleton'
import { StickyContactButton } from '@/features/ui/StickyContactButton'
import { MusicMessage } from '@/features/ui/MusicMessage'
import { useTranslations } from '@/features/i18n/useTranslations'
import { UserCircleDashed } from '@phosphor-icons/react'
import footerStyles from '@/app/page.module.scss'

const About = dynamic(
  () => import('@/features/about/About').then(mod => ({ default: mod.About })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
)

const ClassicalMassage = dynamic(
  () => import('@/features/classicMassage/ClassicalMassage').then(mod => ({ default: mod.ClassicalMassage })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
)

const Energy = dynamic(
  () => import('@/features/energy/Energy').then(mod => ({ default: mod.Energy })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
)

const DestinyMatrix = dynamic(
  () => import('@/features/destinyMatrix/DestinyMatrix'),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
)

const Chakras = dynamic(
  () => import('@/features/chakras/Chakras').then(mod => ({ default: mod.Chakras })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
)

const Products = dynamic(
  () => import('@/features/products/Products').then(mod => ({ default: mod.Products })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
)

const Pricing = dynamic(
  () => import('@/features/pricing/Pricing').then(mod => ({ default: mod.Pricing })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
)

const WorkingHours = dynamic(
  () => import('@/features/workingHours/WorkingHours').then(mod => ({ default: mod.WorkingHours })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
)

const Feedbacks = dynamic(
  () => import('@/features/feedbacks/Feedbacks').then(mod => ({ default: mod.Feedbacks })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
)

const Contact = dynamic(
  () => import('@/features/contact/Contact').then(mod => ({ default: mod.Contact })),
  {
    loading: () => <LoadingSkeleton />,
    ssr: true,
  }
)

export function HomePage() {
  const t = useTranslations()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const applyHashScrollFix = () => {
      const hash = window.location.hash
      if (!hash) return
      const id = hash.replace('#', '')
      if (!id) return

      import('@/lib/scroll-to-section').then(mod =>
        mod.scrollToSectionId(id, { extraOffsetPx: id === 'contact' ? 32 : 12 })
      )
    }

    const timer = window.setTimeout(applyHashScrollFix, 0)
    window.addEventListener('hashchange', applyHashScrollFix)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('hashchange', applyHashScrollFix)
    }
  }, [])

  return (
    <>
      <StickyContactButton />
      <Header />
      <MusicMessage />
      <main role="main">
        <Hero />
        <Suspense fallback={<LoadingSkeleton />}>
          <Energy />
        </Suspense>
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
          <WorkingHours />
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

