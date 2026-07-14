import { CloudSun, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-textsecondary">
        <div className="flex items-center gap-2">
          <CloudSun size={16} className="text-secondary" />
          <span>
            Weather<span className="text-secondary font-semibold">Now</span> — data by Open-Meteo
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:text-textprimary transition">Home</Link>
          <Link to="/forecast" className="hover:text-textprimary transition">Forecast</Link>
          <Link to="/favorites" className="hover:text-textprimary transition">Favorites</Link>
          <Link to="/settings" className="hover:text-textprimary transition">Settings</Link>
        </div>
        <div className="flex items-center gap-1">
          Built with <Heart size={12} className="text-error fill-error" /> using React
        </div>
      </div>
    </footer>
  );
}
