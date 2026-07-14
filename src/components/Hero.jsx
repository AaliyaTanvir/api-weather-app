import { Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Hero({ onSelect, title, subtitle }) {
  return (
    <section className="relative w-full py-10 sm:py-14">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-secondary/20 blur-3xl animate-float" />
        <div className="absolute top-10 right-1/4 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>
      <div className="text-center max-w-2xl mx-auto mb-8 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-medium text-textsecondary mb-4">
          <Sparkles size={12} className="text-accent" />
          Real-time weather, beautifully presented
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
          {title || (
            <>
              Know the <span className="text-secondary">weather</span>,
              <br className="hidden sm:block" /> before you step out
            </>
          )}
        </h1>
        <p className="text-textsecondary text-sm sm:text-base">
          {subtitle || 'Search any city or detect your location for live conditions, hourly and 7-day forecasts, air quality and more.'}
        </p>
      </div>
      <div className="max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <SearchBar onSelect={onSelect} autoFocus />
      </div>
    </section>
  );
}
