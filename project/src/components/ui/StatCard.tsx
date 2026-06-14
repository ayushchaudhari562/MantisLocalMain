// Analytics stat card with trend indicator
import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

function StatCard({ icon, label, value, change, trend }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-soft">
      {/* Top row: icon and trend */}
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F3F5F7]">
          {icon}
        </div>
        {change && (
          <div className="flex items-center gap-1 text-[12px] font-medium text-[#60758A]">
            {trend === 'up' && <TrendingUp className="h-3.5 w-3.5" />}
            {trend === 'down' && <TrendingDown className="h-3.5 w-3.5" />}
            {trend === 'neutral' && <Minus className="h-3.5 w-3.5" />}
            {change}
          </div>
        )}
      </div>

      {/* Value */}
      <h3 className="mt-5 text-3xl font-semibold tracking-tight text-[#111315]">
        {value}
      </h3>

      {/* Label */}
      <p className="mt-2 text-[14px] text-[#60758A]">{label}</p>
    </div>
  );
}

export default StatCard;
