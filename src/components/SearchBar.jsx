import { useState, useEffect, useRef } from 'react';
import { Search, LocateFixed, X, Loader2, MapPin } from 'lucide-react';
import { searchCities, reverseGeocode } from '../utils/api';
import { useApp } from '../context/AppContext';

export default function SearchBar({ onSelect, autoFocus = false, showDetect = true }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [error, setError] = useState(null);
  const boxRef = useRef(null);
  const { addHistory } = useApp();

  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    let active = true;
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const r = await searchCities(query, 8);
        if (active) {
          setResults(r);
          setOpen(true);
          setError(null);
        }
      } catch {
        if (active) setError('Search failed');
      } finally {
        if (active) setLoading(false);
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(t);
    };
  }, [query]);

  function handleSelect(city) {
    setQuery(city.label);
    setOpen(false);
    addHistory(city);
    onSelect?.(city);
  }

  async function detectLocation() {
    setDetecting(true);
    setError(null);
    try {
      if (!navigator.geolocation) throw new Error('Geolocation not supported');
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          maximumAge: 600000,
        })
      );
      const city = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
      setQuery(city.label);
      addHistory(city);
      onSelect?.(city);
    } catch {
      setError('Could not detect location');
    } finally {
      setDetecting(false);
    }
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <div className="glass rounded-2xl flex items-center gap-2 px-4 py-3 focus-within:ring-2 focus-within:ring-secondary/60 transition-all duration-300">
        <Search size={18} className="text-textsecondary shrink-0" />
        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length && setOpen(true)}
          placeholder="Search for a city…"
          className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-textsecondary text-textprimary"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="p-1 rounded-lg hover:bg-white/10 transition"
            aria-label="Clear"
          >
            <X size={16} className="text-textsecondary" />
          </button>
        )}
        {showDetect && (
          <button
            onClick={detectLocation}
            disabled={detecting}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-secondary/20 hover:bg-secondary/30 text-secondary text-xs font-medium transition-all disabled:opacity-50 active:scale-95"
            aria-label="Detect my location"
          >
            {detecting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <LocateFixed size={14} />
            )}
            <span className="hidden sm:inline">Locate</span>
          </button>
        )}
      </div>

      {error && (
        <p className="absolute left-0 top-full mt-1 text-xs text-error px-2">{error}</p>
      )}

      {open && (results.length > 0 || loading) && (
        <div className="absolute left-0 right-0 top-full mt-2 glass-strong rounded-2xl overflow-hidden z-50 max-h-80 overflow-y-auto animate-fade-in">
          {loading && (
            <div className="px-4 py-3 text-sm text-textsecondary flex items-center gap-2">
              <Loader2 size={14} className="animate-spin" /> Searching…
            </div>
          )}
          {!loading &&
            results.map((r) => (
              <button
                key={r.id}
                onClick={() => handleSelect(r)}
                className="w-full text-left px-4 py-3 hover:bg-white/10 transition flex items-center gap-3 border-b border-white/5 last:border-0"
              >
                <MapPin size={16} className="text-secondary shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{r.name}</p>
                  <p className="text-xs text-textsecondary truncate">
                    {[r.admin1, r.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              </button>
            ))}
          {!loading && results.length === 0 && query.trim().length >= 2 && (
            <p className="px-4 py-3 text-sm text-textsecondary">No cities found.</p>
          )}
        </div>
      )}
    </div>
  );
}
