'use client';

import { useTranslations, useMessages } from 'next-intl';

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items = (messages?.sources?.items || []) as Array<{
    name: string;
    url: string;
    note: string;
  }>;

  return (
    <section id="sources" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />
        <p
          className="text-sm leading-relaxed mb-8 max-w-3xl"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('subtitle')}
        </p>

        <div className="space-y-3">
          {items.map((item, i) => {
            let host = '';
            try {
              host = new URL(item.url).hostname.replace(/^www\./, '');
            } catch {
              host = item.url;
            }
            return (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="source-link"
              >
                <div>
                  <div className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                    {item.name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    {item.note}
                  </div>
                </div>
                <span className="src-domain">{host}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
