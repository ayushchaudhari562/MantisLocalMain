// Reusable error state with retry action
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

function ErrorState({
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white px-8 py-20 text-center">
      {/* Error icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3F5F7]">
        <AlertTriangle className="h-7 w-7 text-[#60758A]" />
      </div>

      {/* Error title */}
      <h3 className="mt-6 text-xl font-semibold text-[#111315]">{title}</h3>

      {/* Error description */}
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[#60758A]">
        {description}
      </p>

      {/* Retry button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 rounded-xl bg-[#111315] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-black/80"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
