import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alyoshamonument.com';
  const lastModified = new Date('2026-09-01');

  const entries: MetadataRoute.Sitemap = [];

  const pages = [
    '',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-settings'
  ];

  const languageLinks: Record<string, string> = {
    zh: 'zh',
    en: 'en',
    bg: 'bg',
  };

  for (const locale of routing.locales) {
    for (const page of pages) {
      const alternates: Record<string, string> = { 'x-default': `${baseUrl}/bg${page}` };
      for (const l of routing.locales) {
        alternates[languageLinks[l]] = `${baseUrl}/${l}${page}`;
      }

      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.5,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
