import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://formationlisa.fr'
  const maintenant = new Date()

  const pagesPubliques = [
    '', 'programme', 'inscription', 'login', 'cgv',
    'mentions-legales', 'confidentialite', 'conditions-utilisation', 'retractation',
  ]

  return pagesPubliques.map((p) => ({
    url: `${siteUrl}/${p}`,
    lastModified: maintenant,
    changeFrequency: p === '' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : 0.6,
  }))
}
