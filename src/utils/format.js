// Formatting + small helpers

export function formatHour(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: 'numeric', hour12: true });
}

export function formatDay(iso) {
  const d = new Date(iso);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return 'Today';
  return d.toLocaleDateString([], { weekday: 'short' });
}

export function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function degToCompass(deg) {
  const dirs = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
  ];
  return dirs[Math.round(deg / 22.5) % 16];
}

export function uvCategory(uv) {
  if (uv == null) return { label: '—', color: 'textsecondary' };
  if (uv < 3) return { label: 'Low', color: 'text-success' };
  if (uv < 6) return { label: 'Moderate', color: 'text-accent' };
  if (uv < 8) return { label: 'High', color: 'text-accent' };
  if (uv < 11) return { label: 'Very High', color: 'text-error' };
  return { label: 'Extreme', color: 'text-error' };
}

export function aqiCategory(aqi) {
  if (aqi == null) return { label: 'N/A', color: 'textsecondary', bg: 'rgba(148,163,184,0.2)' };
  if (aqi <= 50) return { label: 'Good', color: 'text-success', bg: 'rgba(34,197,94,0.2)' };
  if (aqi <= 100) return { label: 'Moderate', color: 'text-accent', bg: 'rgba(245,158,11,0.2)' };
  if (aqi <= 150) return { label: 'Unhealthy (Sensitive)', color: 'text-accent', bg: 'rgba(245,158,11,0.3)' };
  if (aqi <= 200) return { label: 'Unhealthy', color: 'text-error', bg: 'rgba(239,68,68,0.25)' };
  if (aqi <= 300) return { label: 'Very Unhealthy', color: 'text-error', bg: 'rgba(239,68,68,0.35)' };
  return { label: 'Hazardous', color: 'text-error', bg: 'rgba(239,68,68,0.45)' };
}

export function celsiusToF(c) {
  return Math.round((c * 9) / 5 + 32);
}

export function groupBy(arr, keyFn) {
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    (acc[k] = acc[k] || []).push(item);
    return acc;
  }, {});
}
