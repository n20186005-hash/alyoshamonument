import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const baseUrl = 'https://alyoshamonument.com';

const htmlLangMap: Record<string, string> = {
  zh: 'zh-CN',
  bg: 'bg-BG',
  en: 'en',
};

const ogLocaleMap: Record<string, string> = {
  zh: 'zh_CN',
  bg: 'bg_BG',
  en: 'en_US',
};

const touristAttractionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  '@id': `${baseUrl}/#attraction`,
  name: 'Monument of the Red Army "Alyosha"',
  alternateName: [
    'Alyosha Monument',
    'Паметник на Червената армия „Альоша“',
    'Soviet Monument Plovdiv',
  ],
  description:
    'An iconic 11-metre-tall statue of a Soviet soldier, located on Bunardzhika Hill in Plovdiv, Bulgaria. A free, open-air monument offering panoramic views over the city.',
  url: baseUrl,
  image: [
    `${baseUrl}/gallery/monument-red-army-alyosha-plovdiv%20(1).jpg`,
  ],
  isAccessibleForFree: true,
  touristType: ['Historic Landmark', 'Open-Air Monument', 'Viewpoint'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Plovdiv',
    addressRegion: 'Plovdiv Province',
    postalCode: '4000',
    addressCountry: 'BG',
    streetAddress: 'Bunardzhika Hill (Хълм „Бунарджика“)',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.143766,
    longitude: 24.737763,
  },
  hasMap: 'https://maps.app.goo.gl/vqoPaMATs3mQh3EL6',
  sameAs: [
    'https://maps.app.goo.gl/vqoPaMATs3mQh3EL6',
    'https://www.visitplovdiv.com/',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.6',
    reviewCount: '5284',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const bgUrl = `${baseUrl}/bg`;
  const selfUrl = `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      siteName: 'Alyosha Monument',
      locale: ogLocaleMap[locale] || 'en_US',
      type: 'website',
      url: selfUrl,
      images: [
        {
          url: `${baseUrl}/gallery/monument-red-army-alyosha-plovdiv%20(1).jpg`,
          width: 1920,
          height: 1080,
          alt: 'Monument of the Red Army "Alyosha" on Bunardzhika Hill, Plovdiv',
        },
      ],
    },
    alternates: {
      canonical: selfUrl,
      languages: {
        zh: zhUrl,
        en: enUrl,
        bg: bgUrl,
        'x-default': bgUrl,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={htmlLangMap[locale] || 'en'}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(touristAttractionJsonLd),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || '{}');
                  if (prefs.analytics === true) {
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-HXM22WWPKP', { anonymize_ip: true });
                    var s = document.createElement('script');
                    s.async = true;
                    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP';
                    document.head.appendChild(s);
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
