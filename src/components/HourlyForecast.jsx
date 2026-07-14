import { Clock } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { useTemp } from '../hooks/useUnits';
import { formatHour } from '../utils/format';

export default function HourlyForecast({ hourly }) {
  const temp = useTemp();
  if (!hourly) return null;

  const now = new Date();
  const items = hourly.time
    .map((t, i) => ({ time: t, temp: hourly.temperature_2m[i], code: hourly.weather_code[i], pop: hourly.precipitation_probability?.[i] }))
    .filter((x) => new Date(x.time) >= now - 3600000)
    .slice(0, 24);

  if (items.length === 0) return null;

  return (
    <div className="glass rounded-3xl p-5 w-full animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Clock size={16} className="text-secondary" />
        <h3 className="font-semibold">24-Hour Forecast</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {items.map((h, i) => (
          <div
            key={h.time}
            className="flex flex-col items-center gap-2 min-w-[72px] py-3 px-2 rounded-2xl hover:bg-white/10 transition-all duration-300"
            style={{ animation: `fade-in 0.4s ease-out ${i * 0.03}s both` }}
          >
            <span className="text-xs font-medium text-textsecondary">
              {i === 0 ? 'Now' : formatHour(h.time)}
            </span>
            <WeatherIcon code={h.code} size={28} className="text-secondary" />
            <span className="text-sm font-semibold">{temp.formatNum(h.temp)}°</span>
            {h.pop != null && (
              <span className="text-[10px] text-secondary font-medium">{h.pop}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
