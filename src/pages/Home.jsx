import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import WeeklyForecast from '../components/WeeklyForecast';
import WeatherDetails from '../components/WeatherDetails';
import AirQuality from '../components/AirQuality';
import WeatherChart from '../components/WeatherChart';
import WeatherMap from '../components/WeatherMap';
import Skeleton from '../components/Skeleton';
import Loader from '../components/Loader';
import ErrorPage from '../components/ErrorPage';
import { useWeather } from '../hooks/useWeather';
import { useApp } from '../context/AppContext';

const DEFAULT_CITY = {
  id: 1273294,
  name: 'New Delhi',
  country: 'India',
  admin1: 'Delhi',
  latitude: 28.63576,
  longitude: 77.22445,
  timezone: 'Asia/Kolkata',
  label: 'New Delhi, Delhi, India',
};

export default function Home() {
  const { history, favorites } = useApp();
  const [city, setCity] = useState(() => {
    return history[0] || favorites[0] || DEFAULT_CITY;
  });
  const { data, loading, error, reload } = useWeather(city);

  function handleSelect(c) {
    setCity(c);
  }

  // If history loads later and no city chosen, pick first history item
  useEffect(() => {
    if (!city && history.length > 0) setCity(history[0]);
  }, [history, city]);

  const current = data?.weather?.current;
  const hourly = data?.weather?.hourly;
  const daily = data?.weather?.daily;
  const air = data?.air;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <Hero onSelect={handleSelect} />

      {city && (
        <div className="space-y-5 pb-8">
          {loading ? (
            <>
              <Skeleton variant="current" />
              <Skeleton variant="hourly" />
              <Skeleton variant="details" />
              <div className="grid lg:grid-cols-2 gap-5">
                <Skeleton variant="weekly" />
                <Skeleton className="h-80" />
              </div>
            </>
          ) : error ? (
            <ErrorPage code="Oops" message={error || 'Could not load weather for this location.'} />
          ) : data ? (
            <>
              <CurrentWeather
                city={city}
                current={current}
                onRefresh={reload}
                refreshing={loading}
              />
              <HourlyForecast hourly={hourly} />
              <WeatherDetails current={current} daily={daily} />
              <div className="grid lg:grid-cols-2 gap-5">
                <WeeklyForecast daily={daily} />
                <AirQuality air={air} />
              </div>
              <WeatherChart hourly={hourly} daily={daily} />
              <WeatherMap city={city} current={current} />
            </>
          ) : (
            <Loader full />
          )}
        </div>
      )}
    </div>
  );
}
