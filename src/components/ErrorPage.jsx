import { Link } from 'react-router-dom';
import { CloudOff, Home } from 'lucide-react';

export default function ErrorPage({ code, message }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass rounded-3xl p-8 sm:p-12 text-center max-w-md w-full animate-fade-in-up">
        <div className="mx-auto w-fit p-4 rounded-2xl bg-error/20 mb-5">
          <CloudOff size={48} className="text-error" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold mb-2">{code || '404'}</h1>
        <p className="text-textsecondary text-sm mb-6">
          {message || 'The page you are looking for drifted away on the wind.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-all active:scale-95"
        >
          <Home size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
