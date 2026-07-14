import { Moon, Sun, Thermometer, Trash2, Clock, Star, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

function Row({ icon: Icon, title, desc, children }) {
  return (
    <div className="glass rounded-2xl p-5 flex items-center justify-between gap-4 animate-fade-in">
      <div className="flex items-start gap-3 min-w-0">
        <div className="p-2 rounded-xl bg-white/10 shrink-0">
          <Icon size={18} className="text-secondary" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-sm">{title}</h3>
          {desc && <p className="text-xs text-textsecondary mt-0.5">{desc}</p>}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({ on, onClick, labelOn = 'On', labelOff = 'Off' }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-7 rounded-full transition-all duration-300 ${
        on ? 'bg-secondary' : 'bg-white/15'
      }`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow-soft transition-transform duration-300 ${
          on ? 'translate-x-5' : ''
        }`}
      />
      <span className="sr-only">{on ? labelOn : labelOff}</span>
    </button>
  );
}

export default function Settings() {
  const {
    theme,
    toggleTheme,
    units,
    toggleUnits,
    history,
    clearHistory,
    favorites,
  } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-4">
        <Row
          icon={theme === 'dark' ? Moon : Sun}
          title="Appearance"
          desc="Switch between dark and light mode"
        >
          <Toggle on={theme === 'light'} onClick={toggleTheme} labelOn="Light" labelOff="Dark" />
        </Row>

        <Row
          icon={Thermometer}
          title="Temperature Units"
          desc={units === 'metric' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
        >
          <Toggle on={units === 'imperial'} onClick={toggleUnits} labelOn="°F" labelOff="°C" />
        </Row>

        <Row
          icon={Clock}
          title="Search History"
          desc={`${history.length} recent search${history.length === 1 ? '' : 'es'} stored`}
        >
          <button
            onClick={clearHistory}
            disabled={history.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-error/20 hover:bg-error/30 text-error text-xs font-medium transition disabled:opacity-40 active:scale-95"
          >
            <Trash2 size={14} /> Clear
          </button>
        </Row>

        <Row
          icon={Star}
          title="Favorites"
          desc={`${favorites.length} saved cit${favorites.length === 1 ? 'y' : 'ies'}`}
        >
          <Link
            to="/favorites"
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium transition active:scale-95"
          >
            View
          </Link>
        </Row>

        <div className="glass rounded-2xl p-5 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-white/10">
              <Info size={18} className="text-secondary" />
            </div>
            <h3 className="font-semibold text-sm">About WeatherNow</h3>
          </div>
          <p className="text-xs text-textsecondary leading-relaxed">
            WeatherNow is a premium weather dashboard built with React, Vite and Tailwind CSS.
            Weather data is provided by the Open-Meteo API (no API key required). Air quality data
            comes from the Open-Meteo Air Quality API. Map tiles by OpenStreetMap & CARTO.
          </p>
        </div>
      </div>
    </div>
  );
}
