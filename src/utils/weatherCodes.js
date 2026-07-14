// Weather code descriptions mapping (Open-Meteo WMO codes)
export const WEATHER_CODES = {
  0: 'Clear.clear sky',
  1: 'Clear.mainly clear',
  2: 'Clear.partly cloudy',
  3: 'Clear.overcast',
  45: 'Fog.fog',
  48: 'Fog.depositing rime fog',
  51: 'Drizzle.light drizzle',
  53: 'Drizzle.moderate drizzle',
  55: 'Drizzle.dense drizzle',
  56: 'Drizzle.light freezing drizzle',
  57: 'Drizzle.dense freezing drizzle',
  61: 'Rain.slight rain',
  63: 'Rain.moderate rain',
  65: 'Rain.heavy rain',
  66: 'Rain.light freezing rain',
  67: 'Rain.heavy freezing rain',
  71: 'Snow.slight snow',
  73: 'Snow.moderate snow',
  75: 'Snow.heavy snow',
  77: 'Snow.snow grains',
  80: 'Rain.slight rain showers',
  81: 'Rain.moderate rain showers',
  82: 'Rain.violent rain showers',
  85: 'Snow.slight snow showers',
  86: 'Snow.heavy snow showers',
  95: 'Thunderstorm.thunderstorm',
  96: 'Thunderstorm.thunderstorm with slight hail',
  99: 'Thunderstorm.thunderstorm with heavy hail',
};

const ICON_MAP = {
  0: 'sun',
  1: 'sun',
  2: 'cloud-sun',
  3: 'cloud',
  45: 'cloud-fog',
  48: 'cloud-fog',
  51: 'cloud-drizzle',
  53: 'cloud-drizzle',
  55: 'cloud-drizzle',
  56: 'cloud-drizzle',
  57: 'cloud-drizzle',
  61: 'cloud-rain',
  63: 'cloud-rain',
  65: 'cloud-rain',
  66: 'cloud-rain',
  67: 'cloud-rain',
  71: 'cloud-snow',
  73: 'cloud-snow',
  75: 'cloud-snow',
  77: 'cloud-snow',
  80: 'cloud-rain',
  81: 'cloud-rain',
  82: 'cloud-rain',
  85: 'cloud-snow',
  86: 'cloud-snow',
  95: 'cloud-lightning',
  96: 'cloud-lightning',
  99: 'cloud-lightning',
};

export function getWeatherInfo(code) {
  const entry = WEATHER_CODES[code] || 'Unknown.unknown conditions';
  const [group, label] = entry.split('.');
  const icon = ICON_MAP[code] || 'cloud';
  return { group, label, icon };
}

export function getWeatherGroup(code) {
  return getWeatherInfo(code).group;
}

export function getWeatherLabel(code) {
  return getWeatherInfo(code).label;
}

export function getWeatherIcon(code) {
  return getWeatherInfo(code).icon;
}

// Gradient backgrounds keyed by weather group
export const GRADIENTS = {
  Clear: 'from-amber-400 via-sky-500 to-blue-700',
  Fog: 'from-slate-400 via-slate-500 to-slate-700',
  Drizzle: 'from-sky-400 via-blue-500 to-blue-700',
  Rain: 'from-sky-500 via-blue-600 to-slate-800',
  Snow: 'from-slate-200 via-sky-300 to-slate-500',
  Thunderstorm: 'from-slate-600 via-indigo-700 to-slate-900',
  Unknown: 'from-slate-500 via-slate-600 to-slate-800',
};

export function getGradient(code) {
  const group = getWeatherGroup(code);
  return GRADIENTS[group] || GRADIENTS.Unknown;
}
