'use client';

import { useTranslations, useMessages } from 'next-intl';
import type { ReactNode } from 'react';

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{
    title: string;
    desc: string;
    hint: string;
  }>;

  const icons: ReactNode[] = [
    // WC
    <svg key="wc" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8" cy="12" r="1.5" />
      <circle cx="16" cy="12" r="1.5" />
      <path d="M7.5 16.5h9" />
    </svg>,
    // Parking
    <svg key="park" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h3.5a2.5 2.5 0 0 1 0 5H9" />
    </svg>,
    // Food & drink
    <svg key="food" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2v6a2 2 0 0 0 4 0V2" />
      <path d="M8 2v20" />
      <path d="M17 2c-1.5 1.5-2 3-2 5s1 3.5 2 5" />
      <path d="M17 12v10" />
    </svg>,
    // Lodging
    <svg key="hotel" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M15 11h4a2 2 0 0 1 2 2v8" />
      <path d="M7 7h4M7 11h4M7 15h4" />
      <path d="M3 21h18" />
    </svg>,
    // Shops
    <svg key="shop" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7l1.5-4h13L20 7" />
      <path d="M4 7v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7" />
      <path d="M4 7h16" />
      <path d="M9 11a3 3 0 0 0 6 0" />
    </svg>,
    // Fuel & EV
    <svg key="fuel" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 3h11v18H4z" />
      <path d="M15 8h3a2 2 0 0 1 2 2v8a1.5 1.5 0 0 0 3 0V9l-3-3" />
      <path d="M7 9h5" />
      <circle cx="8.5" cy="16.5" r="1.5" />
      <circle cx="12.5" cy="16.5" r="1.5" />
    </svg>,
  ];

  return (
    <section id="facilities" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {items.map((item, i) => (
            <div key={i} className="fac-card">
              <div className="fac-icon">{icons[i % icons.length]}</div>
              <div>
                <h3 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
              {item.hint && (
                <span className="hint-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  {item.hint}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="neutral-note">
          <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <span>{t('note')}</span>
        </div>
      </div>
    </section>
  );
}
