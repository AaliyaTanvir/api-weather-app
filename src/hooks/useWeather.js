import { useEffect, useState, useCallback } from 'react';
import { getFullWeather } from '../utils/api';

export function useWeather(city) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getFullWeather(city);
      if (!result || !result.weather) throw new Error('No weather data');
      setData(result);
    } catch (e) {
      setError(e.message || 'Failed to load weather');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [city?.latitude, city?.longitude, city?.timezone]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, loading, error, reload: load };
}
