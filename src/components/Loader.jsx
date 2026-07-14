import { Cloud } from 'lucide-react';

export default function Loader({ label = 'Loading weather…', full = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-secondary/30 blur-xl animate-pulse" />
        <Cloud
          size={56}
          className="relative animate-float text-secondary"
          strokeWidth={1.5}
        />
      </div>
      <p className="text-sm font-medium text-textsecondary animate-pulse">{label}</p>
    </div>
  );

  if (full) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center w-full">
        {content}
      </div>
    );
  }
  return content;
}
