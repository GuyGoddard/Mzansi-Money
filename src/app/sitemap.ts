import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mzansi-money.com'
  const now  = new Date()

  return [
    { url: base,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0  },
    { url: `${base}/personal`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${base}/start-business`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${base}/run-business`,      lastModified: now, changeFrequency: 'monthly', priority: 0.9  },
    { url: `${base}/tools`,             lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
  ]
}
