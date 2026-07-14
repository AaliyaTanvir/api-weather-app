import { CalendarDays } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { useTemp } from '../hooks/useUnits';
import { formatDay } from '../utils/format';

export default function WeeklyForecast({ daily }) {
  const temp = useTemp();
  if (!daily) return null;

  const days = daily.time.map((t, i) => ({
    time: t,
    code: daily.weather_code[i],
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    pop: daily.precipitation_probability_max?.[i],
  }));

  // compute range for the temp bar
  const allTemps = days.flatMap((d) => [d.max, d.min]);
  const globalMin = Math.min(...allTemps);
  const globalMax = Math.max(...allTemps);
  const range = Math.max(1, globalMax - globalMin);

  return (
    <div className="glass rounded-3xl p-5 w-full animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays size={16} className="text-secondary" />
        <h3 className="font-semibold">7-Day Forecast</h3>
      </div>
      <div className="space-y-1">
        {days.map((d, i) => {
          const leftPct = ((d.min - globalMin) / range) * 100;
          const widthPct = ((d.max - d.min) / range) * 100;
          return (
            <div
              key={d.time}
              className="grid grid-cols-[64px_40px_1fr_72px] items-center gap-3 py-2.5 px-2 rounded-2xl hover:bg-white/10 transition-all"
              style={{ animation: `fade-in 0.4s ease-out ${i * 0.05}s both` }}
            >
              <span className="text-sm font-semibold">{formatDay(d.time)}</span>
              <WeatherIcon code={d.code} size={26} className="text-secondary" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-textsecondary w-8 text-right">{temp.formatNum(d.min)}°</span>
                <div className="relative flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="absolute top-0 h-full rounded-full bg-gradient-to-r from-secondary via-accent to-error"
                    style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 8)}%` }}
                  />
                </div>
                <span className="text-xs font-semibold w-8">{temp.formatNum(d.max)}°</span>
              </div>
              <span className="text-xs text-secondary text-right">{d.pop != null ? `${d.pop}%` : ''}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
