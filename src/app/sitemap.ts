import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.alyoshamonument.com';
  const lastModified = new Date('2026-10-01');

  const entries: MetadataRoute.Sitemap = [];

  const languageLinks: Record<string, string> = {
    zh: 'zh',
    en: 'en',
    bg: 'bg',
  };

  // Only indexable pages. Legal/system pages are noindex and excluded.
  const mainPages = ['', '/bunardzhika-hill'];

  for (const page of mainPages) {
    for (const locale of routing.locales) {
      const alternates: Record<string, string> = {
        'x-default': `${baseUrl}/bg${page}`,
      };
      for (const l of routing.locales) {
        alternates[languageLinks[l]] = `${baseUrl}/${l}${page}`;
      }

      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
