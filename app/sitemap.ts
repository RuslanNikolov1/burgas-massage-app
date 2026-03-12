import type { MetadataRoute } from 'next'

// Enable static generation for sitemap
export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://energymassagetherapy.com'
  const lastModified = new Date()

  return [
    {
      url: `${siteUrl}/bg`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/en`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.96,
    },
    {
      url: `${siteUrl}/ru`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.92,
    },
  ]
}






