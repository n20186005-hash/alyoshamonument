import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Monument of the Red Army "Alyosha" (Plovdiv) - Visitor Guide',
    short_name: 'Alyosha Monument',
    description:
      'Visitor guide to the Monument of the Red Army "Alyosha" on Bunardzhika Hill, Plovdiv, Bulgaria.',
    start_url: '/bg',
    display: 'standalone',
    background_color: '#faf8f4',
    theme_color: '#3a7a8d',
    icons: [
      {
        src: '/icons/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
