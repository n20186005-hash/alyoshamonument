import type { WeatherData } from '@/lib/weather';

export type AdviceGroup = 'outfit' | 'plan' | 'gear' | 'risk';

/** 四个分组的渲染顺序（出穿搭 → 游玩 → 随身 → 风险） */
export const ADVICE_GROUPS: AdviceGroup[] = ['outfit', 'plan', 'gear', 'risk'];

/** 风险项展示优先级（雷雨 > 大风 > 强降雨 > 雾） */
const RISK_PRIORITY: Record<string, number> = {
  thunder: 0,
  windGale: 1,
  rainHeavy: 2,
  fog: 3,
};

// WMO 天气代码分组
const CODE = {
  thunder: [95, 96, 99],
  heavyRain: [63, 65, 66, 67, 82], // 中到大雨 / 冻雨 / 强阵雨
  lightRain: [51, 53, 55, 56, 57, 61, 80], // 毛毛雨 / 小雨 / 小阵雨
  snow: [71, 73, 75, 77, 85, 86],
  fog: [45, 48],
  clear: [0, 1],
  cloudy: [2, 3],
};

const PRECIPITATING = new Set<number>([
  ...CODE.thunder,
  ...CODE.heavyRain,
  ...CODE.lightRain,
  ...CODE.snow,
]);

const inCode = (code: number, list: number[]) => list.includes(code);

/** km/h -> 蒲福风级（0-12） */
export function windBeaufort(kmh: number): number {
  const UPPER = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
  let level = 0;
  for (let i = 0; i < UPPER.length; i++) {
    if (kmh >= UPPER[i]) level = i + 1;
  }
  return level;
}

export interface WeatherAdvice {
  outfit: string[];
  plan: string[];
  gear: string[];
  risk: string[];
}

/**
 * 基于实时/当日天气数据，为普通游客生成出行建议。
 * 输出的是「文案键」，由组件按多语言渲染；不满足条件的类别不会出现。
 */
export function buildWeatherAdvice(data: WeatherData): WeatherAdvice {
  const { current, daily } = data;

  const code = current.weather_code;
  const bf = windBeaufort(current.wind_speed_10m);
  const todayTemp = current.temperature_2m;
  const maxTemp = daily.temperature_2m_max[0] ?? todayTemp;
  const minTemp = daily.temperature_2m_min[0] ?? todayTemp;
  const popToday = daily.precipitation_probability_max[0] ?? 0;
  const uvMax = daily.uv_index_max?.[0] ?? 0;

  const raining = PRECIPITATING.has(code);

  const advice: WeatherAdvice = { outfit: [], plan: [], gear: [], risk: [] };
  const add = (group: AdviceGroup, key: string) => {
    if (!advice[group].includes(key)) advice[group].push(key);
  };

  // 当前天气现象
  if (inCode(code, CODE.thunder)) {
    add('risk', 'thunder');
    add('plan', 'thunder');
  } else if (inCode(code, CODE.heavyRain)) {
    add('risk', 'rainHeavy');
    add('plan', 'rainHeavy');
    add('gear', 'rainHeavy');
  } else if (inCode(code, CODE.lightRain)) {
    add('outfit', 'rainLight');
    add('plan', 'rainLight');
    add('gear', 'rainLight');
  } else if (inCode(code, CODE.snow)) {
    add('outfit', 'snow');
    add('plan', 'snow');
    add('gear', 'snow');
  } else if (inCode(code, CODE.fog)) {
    add('risk', 'fog');
    add('plan', 'fog');
    add('gear', 'fog');
  }

  // 风力（5-6 级 / 7 级及以上）
  if (bf >= 7) {
    add('risk', 'windGale');
    add('plan', 'windGale');
  } else if (bf >= 5) {
    add('outfit', 'wind5');
    add('plan', 'wind5');
  }

  // 当日降水概率 >= 60%
  if (popToday >= 60) {
    add('outfit', 'rainChance');
    add('gear', 'rainChance');
    // 若当下并非晴空，额外建议调整行程；晴空时可照常户外、仅需备伞
    if (!inCode(code, CODE.clear)) add('plan', 'rainChance');
  }

  // 高温 / 紫外线
  const hot = todayTemp >= 32 || maxTemp >= 32;
  const uvHigh = uvMax >= 5;
  if (hot && uvHigh) {
    add('outfit', 'heat');
    add('plan', 'heat');
    add('gear', 'heatUV');
  } else if (hot) {
    add('outfit', 'heat');
    add('plan', 'heat');
    add('gear', 'heat');
  } else if (uvHigh) {
    add('gear', 'uv');
  }

  // 低温 / 昼夜温差
  if (maxTemp <= 10) {
    add('outfit', 'cold');
    add('gear', 'cold');
  } else if (!hot && maxTemp - minTemp > 8) {
    add('outfit', 'diurnal');
  }

  // 晴 / 阴 的通用玩法建议（若预报有明显降雨概率，不再提示“适合户外”）
  if (inCode(code, CODE.clear)) {
    add('plan', 'clear');
  } else if (inCode(code, CODE.cloudy) && !raining && popToday < 60) {
    add('plan', 'cloudy');
  }

  // 风险提醒按严重程度排序
  advice.risk.sort(
    (a, b) => (RISK_PRIORITY[a] ?? 99) - (RISK_PRIORITY[b] ?? 99),
  );

  return advice;
}
