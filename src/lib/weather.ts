// Open-Meteo 免费天气 API（无需密钥，适合非营利项目）
// 在服务端获取数据，并通过 next.revalidate 缓存（30 分钟 ISR 重新验证）

export interface WeatherCurrent {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
}

export interface WeatherDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: (number | null)[];
  uv_index_max: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherData {
  current: WeatherCurrent;
  daily: WeatherDaily;
}

export const WEATHER_REVALIDATE = 1800; // 缓存 30 分钟

// 阿廖沙纪念碑 / 布纳吉卡山坐标（42°08′37″N 24°44′15″E，与 Google 地图一致）
const LAT = 42.143611;
const LON = 24.7375;

const WEATHER_URL =
  `https://api.open-meteo.com/v1/forecast` +
  `?latitude=${LAT}&longitude=${LON}` +
  `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,sunrise,sunset` +
  `&timezone=auto&forecast_days=7&wind_speed_unit=kmh`;

export async function getWeather(): Promise<WeatherData | null> {
  try {
    const res = await fetch(WEATHER_URL, {
      next: { revalidate: WEATHER_REVALIDATE },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return (await res.json()) as WeatherData;
  } catch {
    return null;
  }
}

export type WeatherIconKind =
  | 'sun'
  | 'cloud'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunder';

// WMO 天气代码 -> 图标分组（https://open-meteo.com/en/docs）
export function weatherIconKind(code: number): WeatherIconKind {
  if (code === 0) return 'sun';
  if (code === 1 || code === 2 || code === 3) return 'cloud';
  if (code <= 48) return 'fog'; // 45, 48 雾
  if (code <= 57) return 'drizzle'; // 51–57 毛毛雨
  if (code <= 67) return 'rain'; // 61–67 雨
  if (code <= 77) return 'snow'; // 71–77 雪
  if (code <= 82) return 'rain'; // 80–82 阵雨
  if (code <= 86) return 'snow'; // 85–86 阵雪
  return 'thunder'; // 95–99 雷暴
}
