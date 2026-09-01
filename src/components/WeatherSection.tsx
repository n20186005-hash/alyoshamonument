import { getTranslations, getLocale } from 'next-intl/server';
import { getWeather, weatherIconKind, type WeatherIconKind } from '@/lib/weather';

function WeatherGlyph({ kind, size = 26 }: { kind: WeatherIconKind; size?: number }) {
  const p = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (kind) {
    case 'sun':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    case 'cloud':
      return (
        <svg {...p}>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...p}>
          <path d="M17.5 11H9a6 6 0 1 1 5.9-7.2M17.5 11a4 4 0 1 1 0 8H7" />
          <line x1="4" y1="19" x2="16" y2="19" />
          <line x1="6" y1="22" x2="14" y2="22" />
        </svg>
      );
    case 'drizzle':
      return (
        <svg {...p}>
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <line x1="8" y1="21" x2="8" y2="23" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="16" y1="21" x2="16" y2="23" />
        </svg>
      );
    case 'rain':
      return (
        <svg {...p}>
          <path d="M17.5 17H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <line x1="8" y1="19" x2="6.5" y2="22" />
          <line x1="12" y1="19" x2="10.5" y2="22" />
          <line x1="16" y1="19" x2="14.5" y2="22" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...p}>
          <path d="M17.5 17H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <circle cx="8" cy="21" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="21" r="1" fill="currentColor" stroke="none" />
          <circle cx="16" cy="21" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'thunder':
      return (
        <svg {...p}>
          <path d="M17.5 15H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          <polyline points="13 15 10.5 21 13.5 21 11 26" />
        </svg>
      );
    default:
      return null;
  }
}

export default async function WeatherSection() {
  const t = await getTranslations('weather');
  const locale = await getLocale();
  const data = await getWeather();
  const codes = (t.raw('codes') ?? {}) as Record<string, string>;
  const codeLabel = (code: number) => codes[String(code)] || String(code);

  const dayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const fmtHHMM = (iso: string) => (iso ? iso.slice(11, 16) : '');

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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

        {!data ? (
          <div className="neutral-note">
            <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <span>{t('unavailable')}</span>
          </div>
        ) : (
          <>
            <div className="weather-now">
              <div className="weather-now-main">
                <div className="weather-now-icon">
                  <WeatherGlyph kind={weatherIconKind(data.current.weather_code)} size={44} />
                </div>
                <div>
                  <div className="weather-temp">{Math.round(data.current.temperature_2m)}°C</div>
                  <div className="weather-desc">{codeLabel(data.current.weather_code)}</div>
                </div>
                <div className="weather-updated">
                  {t('updated')} {fmtHHMM(data.current.time)}
                </div>
              </div>

              <div className="weather-metrics">
                <div className="weather-metric">
                  <span className="label">{t('feelsLike')}</span>
                  <span className="value">{Math.round(data.current.apparent_temperature)}°C</span>
                </div>
                <div className="weather-metric">
                  <span className="label">{t('humidity')}</span>
                  <span className="value">{data.current.relative_humidity_2m}%</span>
                </div>
                <div className="weather-metric">
                  <span className="label">{t('wind')}</span>
                  <span className="value">{Math.round(data.current.wind_speed_10m)} km/h</span>
                </div>
                <div className="weather-metric">
                  <span className="label">{t('precipNow')}</span>
                  <span className="value">{data.current.precipitation.toFixed(1)} mm</span>
                </div>
              </div>

              <div className="weather-suntimes">
                <span className="weather-suntime">
                  <WeatherGlyph kind="sun" size={16} />
                  {t('sunrise')} {fmtHHMM(data.daily.sunrise[0])}
                </span>
                <span className="weather-suntime">
                  <WeatherGlyph kind="sun" size={16} />
                  {t('sunset')} {fmtHHMM(data.daily.sunset[0])}
                </span>
              </div>
            </div>

            <h3 className="weather-forecast-title">{t('forecastTitle')}</h3>
            <div className="weather-forecast">
              {data.daily.time.map((day, i) => {
                const pop = data.daily.precipitation_probability_max[i];
                return (
                  <div key={day} className="weather-day">
                    <div className="weather-day-name">
                      {i === 0
                        ? t('today')
                        : dayFmt.format(new Date(day + 'T12:00:00'))}
                    </div>
                    <div className="weather-day-icon">
                      <WeatherGlyph kind={weatherIconKind(data.daily.weather_code[i])} size={26} />
                    </div>
                    <div className="weather-day-temps">
                      <span className="max">{Math.round(data.daily.temperature_2m_max[i])}°</span>
                      <span className="min">{Math.round(data.daily.temperature_2m_min[i])}°</span>
                    </div>
                    <div className="weather-pop" title={t('precipProb')}>
                      {pop === null || pop === undefined ? '–' : `${pop}%`}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="weather-source">
              {t('source')}:{' '}
              <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">
                {t('sourceLink')}
              </a>
              <span> · {t('sourceNote')}</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
