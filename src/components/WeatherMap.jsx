import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '../context/AppContext';
import { getWeatherLabel } from '../utils/weatherCodes';
import { useTemp } from '../hooks/useUnits';

// Fix default marker icons (Leaflet's bundler path issue)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function Recenter({ center }) {
  const map = useMap();
  map.setView(center, 8, { animate: true });
  return null;
}

export default function WeatherMap({ city, current }) {
  const { theme } = useApp();
  const temp = useTemp();
  if (!city) return null;

  const center = [city.latitude, city.longitude];
  const tileUrl = theme === 'dark'
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

  return (
    <div className="glass rounded-3xl p-3 sm:p-4 w-full animate-fade-in">
      <h3 className="font-semibold mb-3 px-2">Interactive Map</h3>
      <div className="rounded-2xl overflow-hidden h-72 sm:h-80 w-full">
        <MapContainer
          center={center}
          zoom={8}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={tileUrl}
            attribution='&copy; OpenStreetMap &copy; CARTO'
          />
          <Recenter center={center} />
          <Marker position={center}>
            <Popup>
              <div className="text-slate-900">
                <strong>{city.name}</strong>
                <br />
                {current ? `${temp.format(current.temperature_2m)} · ${getWeatherLabel(current.weather_code)}` : ''}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <p className="text-xs text-textsecondary mt-2 px-2">
        Showing {city.name} — drag the map to explore nearby areas.
      </p>
    </div>
  );
}
