import { MetadataRoute } from 'next'

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
    { id: 'booking', changeFrequency: 'weekly', priority: 0.9 },
    { id: 'contact', changeFrequency: 'monthly', priority: 0.74 },
  ]

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...sections.map(section => ({
      url: `${siteUrl}/#${section.id}`,
      lastModified,
      changeFrequency: section.changeFrequency,
      priority: section.priority,
    })),
  ]
}






