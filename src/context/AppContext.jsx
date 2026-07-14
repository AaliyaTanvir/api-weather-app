import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AppContext = createContext(null);

const LS_KEYS = {
  theme: 'weathernow.theme',
  units: 'weathernow.units',
  favorites: 'weathernow.favorites',
  history: 'weathernow.history',
};

function readLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => readLS(LS_KEYS.theme, 'dark'));
  const [units, setUnits] = useState(() => readLS(LS_KEYS.units, 'metric'));
  const [favorites, setFavorites] = useState(() => readLS(LS_KEYS.favorites, []));
  const [history, setHistory] = useState(() => readLS(LS_KEYS.history, []));

  // Apply theme to document
  useEffect(() => {
    const body = document.body;
    body.classList.remove('light', 'dark');
    body.classList.add(theme);
    localStorage.setItem(LS_KEYS.theme, JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(LS_KEYS.units, JSON.stringify(units));
  }, [units]);

  useEffect(() => {
    localStorage.setItem(LS_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify(history));
  }, [history]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const toggleUnits = useCallback(() => {
    setUnits((u) => (u === 'metric' ? 'imperial' : 'metric'));
  }, []);

  const addFavorite = useCallback((city) => {
    setFavorites((prev) => {
      if (prev.some((c) => c.id === city.id)) return prev;
      return [{ ...city }, ...prev].slice(0, 12);
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((c) => c.id === id),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (city) => {
      if (isFavorite(city.id)) removeFavorite(city.id);
      else addFavorite(city);
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const addHistory = useCallback((city) => {
    setHistory((prev) => {
      const filtered = prev.filter((c) => c.id !== city.id);
      return [{ ...city }, ...filtered].slice(0, 8);
    });
  }, []);

  const clearHistory = useCallback(() => setHistory([]), []);

  const value = {
    theme,
    toggleTheme,
    units,
    toggleUnits,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    history,
    addHistory,
    clearHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
