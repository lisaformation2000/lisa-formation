import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LISA — La formation pour débuter avec l'IA",
    short_name: 'LISA',
    description: "Apprends à utiliser l'intelligence artificielle au quotidien en 30 sessions.",
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#070014',
    theme_color: '#070014',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
