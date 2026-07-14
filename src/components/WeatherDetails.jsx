import {
  Droplets,
  Gauge,
  Wind,
  Sun,
  Sunrise,
  Sunset,
  Eye,
  CloudRain,
} from 'lucide-react';
import { useWind } from '../hooks/useUnits';
import { formatTime, degToCompass, uvCategory } from '../utils/format';

function DetailCard({ icon: Icon, label, value, sub, accent = 'text-secondary' }) {
  return (
    <div className="glass rounded-2xl p-4 flex flex-col gap-1.5 animate-fade-in hover:bg-white/15 transition-all duration-300">
      <div className="flex items-center gap-2 text-textsecondary">
        <Icon size={16} className={accent} />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <span className="text-xl font-bold">{value}</span>
      {sub && <span className="text-xs text-textsecondary">{sub}</span>}
    </div>
  );
}

export default function WeatherDetails({ current, daily }) {
  const wind = useWind();
  if (!current) return null;

  const uv = daily?.uv_index_max?.[0];
  const uvCat = uvCategory(uv);
  const sunrise = daily?.sunrise?.[0];
  const sunset = daily?.sunset?.[0];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      <DetailCard
        icon={Droplets}
        label="Humidity"
        value={`${current.relative_humidity_2m ?? '—'}%`}
        accent="text-secondary"
      />
      <DetailCard
        icon={Gauge}
        label="Pressure"
        value={`${current.pressure_msl ?? current.surface_pressure ?? '—'} hPa`}
        accent="text-primary"
      />
      <DetailCard
        icon={Wind}
        label="Wind"
        value={wind.format(current.wind_speed_10m)}
        sub={degToCompass(current.wind_direction_10m)}
        accent="text-secondary"
      />
      <DetailCard
        icon={Sun}
        label="UV Index"
        value={uv != null ? uv.toFixed(1) : '—'}
        sub={uvCat.label}
        accent="text-accent"
      />
      <DetailCard
        icon={Sunrise}
        label="Sunrise"
        value={sunrise ? formatTime(sunrise) : '—'}
        accent="text-accent"
      />
      <DetailCard
        icon={Sunset}
        label="Sunset"
        value={sunset ? formatTime(sunset) : '—'}
        accent="text-primary"
      />
      <DetailCard
        icon={CloudRain}
        label="Precipitation"
        value={`${current.precipitation ?? 0} mm`}
        accent="text-secondary"
      />
      <DetailCard
        icon={Eye}
        label="Cloud Cover"
        value={`${current.cloud_cover ?? '—'}%`}
        accent="text-textsecondary"
      />
    </div>
  );
}
