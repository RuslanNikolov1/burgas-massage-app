import { MetadataRoute } from 'next'

// Enable static generation for sitemap
export const dynamic = 'force-static'
export const revalidate = 86400 // 24 hours

type SectionEntry = {
  id: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://energymassagetherapy.com'
  const lastModified = new Date()

  const sections: SectionEntry[] = [
    { id: 'about', changeFrequency: 'monthly', priority: 0.82 },
    { id: 'feedbacks', changeFrequency: 'monthly', priority: 0.78 },
    { id: 'products', changeFrequency: 'weekly', priority: 0.76 },
    { id: 'pricing', changeFrequency: 'monthly', priority: 0.84 },
    { id: 'working-hours', changeFrequency: 'monthly', priority: 0.80 },
    { id: 'contact', changeFrequency: 'monthly', priority: 0.74 },
  ]

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
    ...sections.flatMap(section => [
      {
        url: `${siteUrl}/bg#${section.id}`,
        lastModified,
        changeFrequency: section.changeFrequency,
        priority: section.priority,
      },
      {
        url: `${siteUrl}/en#${section.id}`,
        lastModified,
        changeFrequency: section.changeFrequency,
        priority: section.priority,
      },
      {
        url: `${siteUrl}/ru#${section.id}`,
        lastModified,
        changeFrequency: section.changeFrequency,
        priority: section.priority,
      },
    ]),
  ]
}






