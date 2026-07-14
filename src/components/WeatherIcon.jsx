import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from 'lucide-react';
import { getWeatherIcon } from '../utils/weatherCodes';

const MAP = {
  sun: Sun,
  'cloud-sun': CloudSun,
  cloud: Cloud,
  'cloud-fog': CloudFog,
  'cloud-drizzle': CloudDrizzle,
  'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow,
  'cloud-lightning': CloudLightning,
};

export default function WeatherIcon({ code, size = 64, className = '', strokeWidth = 1.5 }) {
  const name = getWeatherIcon(code);
  const Icon = MAP[name] || Cloud;
  return <Icon size={size} className={className} strokeWidth={strokeWidth} />;
}
