import { Link, useLocation } from 'react-router-dom';
import { CloudSun, Home, CalendarDays, Star, Settings, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LINKS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/forecast', label: 'Forecast', icon: CalendarDays },
  { to: '/favorites', label: 'Favorites', icon: Star },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Navbar() {
  const { theme, toggleTheme } = useApp();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full">
      <nav className="glass-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-xl bg-gradient-to-br from-secondary to-primary shadow-soft">
              <CloudSun size={22} className="text-white" strokeWidth={2} />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Weather<span className="text-secondary">Now</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {LINKS.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active
                      ? 'bg-white/20 text-textprimary shadow-soft'
                      : 'text-textsecondary hover:text-textprimary hover:bg-white/10'
                  }`}
                >
                  <Icon size={16} strokeWidth={2} />
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 active:scale-95"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-accent" />
              ) : (
                <Moon size={18} className="text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden flex items-center justify-around px-2 pb-2 -mt-1">
          {LINKS.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-[11px] font-medium transition-all ${
                  active ? 'text-secondary' : 'text-textsecondary'
                }`}
              >
                <Icon size={18} strokeWidth={2} />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
