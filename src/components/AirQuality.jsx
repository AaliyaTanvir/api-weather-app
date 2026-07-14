import { Wind } from 'lucide-react';
import { aqiCategory } from '../utils/format';

function Pollutant({ label, value, unit }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-textsecondary font-medium">{label}</span>
      <span className="text-sm font-semibold">
        {value != null ? `${value} ${unit || ''}`.trim() : '—'}
      </span>
    </div>
  );
}

export default function AirQuality({ air }) {
  if (!air || !air.current) {
    return (
      <div className="glass rounded-3xl p-5 w-full animate-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <Wind size={16} className="text-secondary" />
          <h3 className="font-semibold">Air Quality</h3>
        </div>
        <p className="text-sm text-textsecondary">Air quality data unavailable for this location.</p>
      </div>
    );
  }

  const c = air.current;
  const aqi = c.us_aqi;
  const cat = aqiCategory(aqi);

  // gauge: 0-300 mapped to 0-180deg
  const pct = Math.min(100, ((aqi ?? 0) / 300) * 100);

  return (
    <div className="glass rounded-3xl p-5 w-full animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Wind size={16} className="text-secondary" />
        <h3 className="font-semibold">Air Quality</h3>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 264} 264`}
              className={cat.color}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{aqi ?? '—'}</span>
            <span className="text-[10px] text-textsecondary">US AQI</span>
          </div>
        </div>
        <div>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-1"
            style={{ background: cat.bg }}
          >
            {cat.label}
          </span>
          <p className="text-xs text-textsecondary">
            {aqi == null
              ? 'No AQI reading available.'
              : aqi <= 50
                ? 'Air quality is satisfactory and poses little or no risk.'
                : aqi <= 100
                  ? 'Acceptable, but sensitive groups may experience minor symptoms.'
                  : 'Health effects possible; limit prolonged outdoor exertion.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-5 pt-4 border-t border-white/10">
        <Pollutant label="PM2.5" value={c.pm2_5} unit="µg/m³" />
        <Pollutant label="PM10" value={c.pm10} unit="µg/m³" />
        <Pollutant label="O₃" value={c.ozone} unit="µg/m³" />
        <Pollutant label="NO₂" value={c.nitrogen_dioxide} unit="µg/m³" />
        <Pollutant label="SO₂" value={c.sulphur_dioxide} unit="µg/m³" />
        <Pollutant label="CO" value={c.carbon_monoxide} unit="µg/m³" />
      </div>
    </div>
  );
}
