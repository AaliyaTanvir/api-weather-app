// Open-Meteo API integration (no API key required)
// Docs: https://open-meteo.com/en/docs

const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const REVERSE_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/reverse';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const AIR_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export async function searchCities(query, count = 8) {
  if (!query || query.trim().length < 2) return [];
  const url = `${GEO_URL}?name=${encodeURIComponent(query)}&count=${count}&language=en&format=json`;
  const data = await fetchJson(url);
  if (!data.results) return [];
  return data.results.map((r) => ({
    id: r.id,
    name: r.name,
    country: r.country || '',
    countryCode: r.country_code || '',
    admin1: r.admin1 || '',
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone || 'auto',
    label: [r.name, r.admin1, r.country].filter(Boolean).join(', '),
  }));
}

export async function reverseGeocode(lat, lon) {
  try {
    const url = `${REVERSE_GEO_URL}?latitude=${lat}&longitude=${lon}&language=en&format=json`;
    const data = await fetchJson(url);
    if (data.results && data.results.length > 0) {
      const r = data.results[0];
      return {
        id: r.id,
        name: r.name,
        country: r.country || '',
        admin1: r.admin1 || '',
        latitude: r.latitude,
        longitude: r.longitude,
        label: [r.name, r.admin1, r.country].filter(Boolean).join(', '),
      };
    }
  } catch {
    // fall through to generic
  }
  return {
    id: `geo-${lat.toFixed(2)}-${lon.toFixed(2)}`,
    name: 'My Location',
    country: '',
    admin1: '',
    latitude: lat,
    longitude: lon,
    label: `${lat.toFixed(2)}, ${lon.toFixed(2)}`,
  };
}

export async function getWeather(lat, lon, timezone = 'auto') {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    timezone,
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,surface_pressure,cloud_cover,precipitation',
    hourly:
      'temperature_2m,weather_code,precipitation_probability,wind_speed_10m,relative_humidity_2m',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset,uv_index_max',
    forecast_days: '7',
    wind_speed_unit: 'kmh',
    temperature_unit: 'celsius',
  });
  const url = `${FORECAST_URL}?${params.toString()}`;
  return fetchJson(url);
}

export async function getAirQuality(lat, lon, timezone = 'auto') {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    timezone,
    current: 'us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone',
  });
  const url = `${AIR_URL}?${params.toString()}`;
  try {
    return await fetchJson(url);
  } catch {
    return null;
  }
}

export async function getFullWeather(city) {
  const [weather, air] = await Promise.all([
    getWeather(city.latitude, city.longitude, city.timezone || 'auto'),
    getAirQuality(city.latitude, city.longitude, city.timezone || 'auto'),
  ]);
  return { weather, air };
}
