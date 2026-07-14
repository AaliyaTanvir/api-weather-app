import { Star, RefreshCw } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { useApp } from '../context/AppContext';
import { useTemp, useWind } from '../hooks/useUnits';
import { getWeatherLabel } from '../utils/weatherCodes';
import { degToCompass } from '../utils/format';

export default function CurrentWeather({ city, current, onRefresh, refreshing }) {
  const { isFavorite, toggleFavorite } = useApp();
  const temp = useTemp();
  const wind = useWind();
  const fav = isFavorite(city?.id);

  if (!current) return null;

  const code = current.weather_code;
  const isDay = current.is_day !== 0;

  return (
    <div className="glass rounded-3xl p-6 sm:p-8 w-full relative overflow-hidden animate-fade-in-up">
      {/* decorative glow */}
      <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{city?.name}</h2>
            <button
              onClick={() => toggleFavorite(city)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition active:scale-90"
              aria-label={fav ? 'Remove favorite' : 'Add favorite'}
            >
              <Star
                size={18}
                className={fav ? 'text-accent fill-accent' : 'text-textsecondary'}
              />
            </button>
          </div>
          <p className="text-textsecondary text-sm">
            {[city?.admin1, city?.country].filter(Boolean).join(', ') || city?.label}
          </p>
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-6xl font-bold tracking-tighter">
              {temp.formatNum(current.temperature_2m)}
              <span className="text-3xl">{temp.unit}</span>
            </span>
            <span className="text-lg font-semibold capitalize">
              {getWeatherLabel(code)}
            </span>
          </div>
          <p className="text-textsecondary text-sm">
            Feels like {temp.format(current.apparent_temperature)} ·{' '}
            {wind.format(current.wind_speed_10m)} {degToCompass(current.wind_direction_10m)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-3xl ${isDay ? 'bg-accent/20' : 'bg-primary/20'}`}>
            <WeatherIcon
              code={code}
              size={80}
              className={isDay ? 'text-accent' : 'text-secondary'}
            />
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition active:scale-90"
              aria-label="Refresh"
            >
              <RefreshCw
                size={16}
                className={refreshing ? 'animate-spin text-secondary' : 'text-textsecondary'}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
