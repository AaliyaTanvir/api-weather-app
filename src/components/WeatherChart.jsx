import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { useTemp } from '../hooks/useUnits';
import { formatHour, formatDay } from '../utils/format';

function ChartTooltip({ active, payload, label, unit }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-xs">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}
          {unit}
        </p>
      ))}
    </div>
  );
}

export default function WeatherChart({ hourly, daily }) {
  const temp = useTemp();

  const hourlyData = (hourly?.time || []).slice(0, 24).map((t, i) => ({
    label: formatHour(t),
    temp: temp.formatNum(hourly.temperature_2m[i]),
    pop: hourly.precipitation_probability?.[i] ?? 0,
  }));

  const dailyData = (daily?.time || []).map((t, i) => ({
    label: formatDay(t),
    max: temp.formatNum(daily.temperature_2m_max[i]),
    min: temp.formatNum(daily.temperature_2m_min[i]),
  }));

  return (
    <div className="glass rounded-3xl p-5 w-full animate-fade-in">
      <h3 className="font-semibold mb-4">Temperature & Precipitation</h3>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hourlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: 'currentColor', fontSize: 11, opacity: 0.6 }}
              axisLine={false}
              tickLine={false}
              interval={3}
            />
            <YAxis
              tick={{ fill: 'currentColor', fontSize: 11, opacity: 0.6 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<ChartTooltip unit={temp.unit} />} />
            <Area
              type="monotone"
              dataKey="temp"
              name="Temp"
              stroke="#38BDF8"
              strokeWidth={2}
              fill="url(#tempGrad)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="pop"
              name="Precip %"
              stroke="#2563EB"
              strokeWidth={2}
              fill="url(#popGrad)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {dailyData.length > 0 && (
        <>
          <h3 className="font-semibold mt-6 mb-3">Weekly High & Low</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fill: 'currentColor', fontSize: 11, opacity: 0.6 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'currentColor', fontSize: 11, opacity: 0.6 }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Tooltip content={<ChartTooltip unit={temp.unit} />} />
                <Line type="monotone" dataKey="max" name="High" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="min" name="Low" stroke="#38BDF8" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
