// Skeleton loading blocks matching card shapes
export function CardSkeleton({ className = '' }) {
  return <div className={`skeleton h-32 rounded-3xl ${className}`} />;
}

export function CurrentSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 sm:p-8 w-full animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-3">
          <div className="skeleton h-5 w-40 rounded-full" />
          <div className="skeleton h-12 w-48 rounded-2xl" />
          <div className="skeleton h-4 w-32 rounded-full" />
        </div>
        <div className="skeleton h-24 w-24 rounded-full" />
      </div>
    </div>
  );
}

export function HourlySkeleton() {
  return (
    <div className="glass rounded-3xl p-5 w-full">
      <div className="skeleton h-5 w-32 rounded-full mb-4" />
      <div className="flex gap-3 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="skeleton h-28 w-24 rounded-2xl shrink-0" />
        ))}
      </div>
    </div>
  );
}

export function WeeklySkeleton() {
  return (
    <div className="glass rounded-3xl p-5 w-full">
      <div className="skeleton h-5 w-32 rounded-full mb-4" />
      <div className="space-y-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="skeleton h-14 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export function DetailsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton h-28 rounded-2xl" />
      ))}
    </div>
  );
}

export default function Skeleton({ variant = 'card' }) {
  switch (variant) {
    case 'current':
      return <CurrentSkeleton />;
    case 'hourly':
      return <HourlySkeleton />;
    case 'weekly':
      return <WeeklySkeleton />;
    case 'details':
      return <DetailsSkeleton />;
    default:
      return <CardSkeleton />;
  }
}
