import { useApp } from '../context/AppContext';

// Convert temperature based on user's unit preference
export function useTemp() {
  const { units } = useApp();
  const toF = (c) => Math.round((c * 9) / 5 + 32);
  const format = (c) => {
    if (c == null) return '—';
    return units === 'imperial' ? `${toF(c)}°F` : `${Math.round(c)}°C`;
  };
  const formatNum = (c) => {
    if (c == null) return '—';
    return units === 'imperial' ? toF(c) : Math.round(c);
  };
  const unit = units === 'imperial' ? '°F' : '°C';
  return { format, formatNum, unit, isImperial: units === 'imperial' };
}

export function useWind() {
  const { units } = useApp();
  const format = (kmh) => {
    if (kmh == null) return '—';
    if (units === 'imperial') return `${Math.round(kmh * 0.621371)} mph`;
    return `${Math.round(kmh)} km/h`;
  };
  return { format };
}
