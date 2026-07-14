import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import HourlyForecast from '../components/HourlyForecast';
import WeeklyForecast from '../components/WeeklyForecast';
import WeatherChart from '../components/WeatherChart';
import CurrentWeather from '../components/CurrentWeather';
import Skeleton from '../components/Skeleton';
import Loader from '../components/Loader';
import ErrorPage from '../components/ErrorPage';
import { useWeather } from '../hooks/useWeather';
import { useApp } from '../context/AppContext';

const DEFAULT_CITY = {
  id: 1275339,
  name: 'Mumbai',
  country: 'India',
  admin1: 'Maharashtra',
  latitude: 19.07283,
  longitude: 72.88261,
  timezone: 'Asia/Kolkata',
  label: 'Mumbai, Maharashtra, India',
};

export default function Forecast() {
  const { history, favorites } = useApp();
  const [city, setCity] = useState(() => history[0] || favorites[0] || DEFAULT_CITY);
  const { data, loading, error } = useWeather(city);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="max-w-xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2 text-center">Forecast</h1>
        <p className="text-textsecondary text-sm text-center mb-5">
          Detailed hourly and 7-day outlook for any city.
        </p>
        <SearchBar onSelect={setCity} />
      </div>

      {loading ? (
        <div className="space-y-5">
          <Skeleton variant="current" />
          <Skeleton variant="hourly" />
          <Skeleton variant="weekly" />
          <Skeleton className="h-72" />
        </div>
      ) : error ? (
        <ErrorPage code="Oops" message={error} />
      ) : !data ? (
        <Loader full />
      ) : (
        <div className="space-y-5">
          <CurrentWeather city={city} current={data.weather.current} />
          <HourlyForecast hourly={data.weather.hourly} />
          <WeeklyForecast daily={data.weather.daily} />
          <WeatherChart hourly={data.weather.hourly} daily={data.weather.daily} />
        </div>
      )}
    </div>
  );
}
