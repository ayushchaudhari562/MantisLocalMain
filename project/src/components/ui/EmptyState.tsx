// Reusable empty state with configurable content
import { type ReactNode } from 'react';
import { Package } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white px-8 py-20 text-center">
      {/* Icon container */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3F5F7]">
        {icon || <Package className="h-7 w-7 text-[#60758A]" />}
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-semibold text-[#111315]">{title}</h3>

      {/* Description */}
      {description && (
        <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#60758A]">
          {description}
        </p>
      )}

      {/* Optional action */}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export default EmptyState;
