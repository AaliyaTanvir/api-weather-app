import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Trash2, MapPin, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getWeather } from '../utils/api';
import { useTemp } from '../hooks/useUnits';
import { getWeatherLabel } from '../utils/weatherCodes';
import WeatherIcon from '../components/WeatherIcon';
import Loader from '../components/Loader';


function FavoriteCard({ city, onRemove }) {
  const temp = useTemp();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const w = await getWeather(city.latitude, city.longitude, city.timezone || 'auto');
        if (active) setWeather(w);
      } catch {
        // ignore
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [city.latitude, city.longitude, city.timezone]);

  return (
    <div className="glass rounded-3xl p-5 relative overflow-hidden animate-fade-in-up hover:bg-white/15 transition-all duration-300 group">
      <button
        onClick={() => onRemove(city.id)}
        className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-error/30 transition opacity-0 group-hover:opacity-100"
        aria-label="Remove favorite"
      >
        <Trash2 size={14} className="text-error" />
      </button>
      <div className="flex items-center gap-2 mb-1">
        <MapPin size={14} className="text-secondary" />
        <h3 className="font-semibold truncate">{city.name}</h3>
      </div>
      <p className="text-xs text-textsecondary truncate mb-3">
        {[city.admin1, city.country].filter(Boolean).join(', ')}
      </p>
      {loading ? (
        <div className="h-20 flex items-center justify-center">
          <Loader />
        </div>
      ) : weather ? (
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold">
              {temp.formatNum(weather.current.temperature_2m)}
              <span className="text-lg">{temp.unit}</span>
            </span>
            <p className="text-xs text-textsecondary capitalize">
              {getWeatherLabel(weather.current.weather_code)}
            </p>
          </div>
          <WeatherIcon code={weather.current.weather_code} size={48} className="text-secondary" />
        </div>
      ) : (
        <p className="text-xs text-textsecondary">Unavailable</p>
      )}
    </div>
  );
}

export default function Favorites() {
  const { favorites, removeFavorite } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Star size={22} className="text-accent fill-accent" />
        <h1 className="text-3xl font-bold">Favorite Cities</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center animate-fade-in">
          <Star size={40} className="mx-auto text-textsecondary mb-3" />
          <h3 className="font-semibold mb-1">No favorites yet</h3>
          <p className="text-textsecondary text-sm mb-5">
            Tap the star icon on any city to save it here for quick access.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition active:scale-95"
          >
            <Search size={16} /> Find a city
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((c) => (
            <FavoriteCard key={c.id} city={c} onRemove={removeFavorite} />
          ))}
        </div>
      )}
    </div>
  );
}
