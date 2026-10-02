import { setRequestLocale, getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TransportSection from '@/components/TransportSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import MapEmbed from '@/components/MapEmbed';
import SourcesSection from '@/components/SourcesSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const b = messages?.bunardzhika || {};
  const baseUrl = 'https://www.alyoshamonument.com';
  const selfUrl = `${baseUrl}/${locale}/bunardzhika-hill`;

  return {
    title: b.metaTitle || 'Bunardzhika Hill Plovdiv',
    description: b.metaDescription || '',
    alternates: {
      canonical: selfUrl,
      languages: {
        zh: `${baseUrl}/zh/bunardzhika-hill`,
        en: `${baseUrl}/en/bunardzhika-hill`,
        bg: `${baseUrl}/bg/bunardzhika-hill`,
        'x-default': `${baseUrl}/bg/bunardzhika-hill`,
      },
    },
  };
}

export default async function BunardzhikaHillPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await getMessages()) as any;
  const b = messages?.bunardzhika || {};
  const overview = b.overview || { title: '', paragraphs: [] };
  const history = b.history || { title: '', items: [] };
  const viewpoints = b.viewpoints || { title: '', paragraphs: [] };
  const route = b.route || { title: '', steps: [] };
  const faq = b.faq || { title: '', items: [] };
  const homeHref = `/${locale}`;
  const mapsLink = messages?.hero?.mapsLink || 'https://maps.app.goo.gl/vqoPaMATs3mQh3EL6';
  const baseUrl = 'https://www.alyoshamonument.com';

  const hillJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${baseUrl}/#bunardzhika-hill`,
    name: b.heroTitle || 'Bunardzhika Hill',
    alternateName: ['Bunardzhika Hill', 'Хълм Бунарджика', 'Hill of the Liberators'],
    description: b.metaDescription || '',
    url: `${baseUrl}/${locale}/bunardzhika-hill`,
    isAccessibleForFree: true,
    publicAccess: true,
    touristType: ['Historic Landmark', 'Park', 'Viewpoint'],
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
    containsPlace: { '@type': 'TouristAttraction', '@id': `${baseUrl}/#attraction` },
    sameAs: [
      'https://www.visitplovdiv.com/en/node/697',
      'https://en.wikipedia.org/wiki/Alyosha_Monument',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hillJsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-end pb-16 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/gallery/monument-red-army-alyosha-plovdiv (2).jpg"
              alt="Bunardzhika Hill and the Alyosha Monument overlooking Plovdiv"
              className="w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
                {b.heroTitle}
              </h1>
              <p className="text-lg sm:text-xl text-white/80 mb-8 font-light">
                {b.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
                  style={{ background: 'var(--accent)' }}
                >
                  {messages?.hero?.openMaps || 'View on Google Maps'}
                </a>
                <a
                  href={homeHref}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors"
                >
                  {b.backLink}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto">
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {overview.title}
            </h2>
            <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
            {overview.paragraphs?.map((p: string, i: number) => (
              <p
                key={i}
                className="text-lg leading-relaxed mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              {history.title}
            </h2>
            <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />
            <div className="space-y-8">
              {history.items?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="rounded-xl p-6 sm:p-8"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <h3
                    className="font-display text-xl font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.heading}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related to Alyosha Monument */}
        <section className="section-padding">
          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-xl border" style={{ background: 'var(--bg-tertiary)', borderColor: 'var(--accent)' }}>
            <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              {b.relatedTitle}
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
              {b.relatedText}
            </p>
            <a
              href={homeHref}
              className="text-sm font-medium hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              {b.backLink} →
            </a>
          </div>
        </section>

        {/* Viewpoints */}
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {viewpoints.title}
            </h2>
            <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
            {viewpoints.paragraphs?.map((p: string, i: number) => (
              <p
                key={i}
                className="text-lg leading-relaxed mb-6"
                style={{ color: 'var(--text-secondary)' }}
              >
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Getting there */}
        <TransportSection />

        {/* Walking route */}
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              {route.title}
            </h2>
            <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ background: 'var(--border-color)' }} />
              <div className="space-y-6">
                {route.steps?.map((step: string, i: number) => (
                  <div key={i} className="relative flex gap-4 pl-4">
                    <div
                      className="absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full border-2"
                      style={{ background: 'var(--accent)', borderColor: 'var(--accent)', top: '0.25rem' }}
                    />
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: 'var(--accent)', color: 'white' }}
                    >
                      {i + 1}
                    </div>
                    <div
                      className="flex-1 rounded-xl p-4"
                      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                    >
                      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <FacilitiesSection />

        {/* FAQ */}
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto">
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              {faq.title}
            </h2>
            <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />
            <div className="space-y-6">
              {faq.items?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="rounded-xl p-6"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <h3
                    className="font-display text-lg font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.question}
                  </h3>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map */}
        <MapEmbed />

        {/* Sources */}
        <SourcesSection />
      </main>
      <Footer />
    </>
  );
}
