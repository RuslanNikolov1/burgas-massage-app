'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Header } from '@/features/layout/Header'
import { Hero } from '@/features/hero/Hero'
import { LoadingSkeleton } from '@/features/ui/LoadingSkeleton'

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

const Booking = dynamic(
  () => import('@/features/booking/Booking').then(mod => ({ default: mod.Booking })),
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

const StickyBookingButton = dynamic(
  () => import('@/features/ui/StickyBookingButton').then(mod => ({ default: mod.StickyBookingButton })),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <Header />
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
          <Booking />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <StickyBookingButton />
    </>
  )
}

