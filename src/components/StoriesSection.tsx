'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function StoriesSection() {
  const t = useTranslations('stories');
  const messages = useMessages() as any;
  const items = (messages?.stories?.items || []) as Array<{
    title: string;
    text: string;
    kind: 'documented' | 'legend' | 'tradition';
  }>;

  const kindLabels: Record<string, string> = {
    documented: t('kindDocumented'),
    legend: t('kindLegend'),
    tradition: t('kindTradition'),
  };

  const kindClass: Record<string, string> = {
    documented: 'kind-documented',
    legend: 'kind-legend',
    tradition: 'kind-tradition',
  };

  return (
    <section id="stories" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />
        <p
          className="text-base leading-relaxed mb-10 max-w-3xl"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('subtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <article key={i} className="story-card">
              <span className={`kind-badge ${kindClass[item.kind] || 'kind-documented'}`}>
                {kindLabels[item.kind] || kindLabels.documented}
              </span>
              <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
