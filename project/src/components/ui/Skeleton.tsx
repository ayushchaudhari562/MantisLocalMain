// Configurable skeleton loader for premium loading states

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-2xl bg-[#E8EAED] ${className}`} />
  );
}

// Product card loading placeholder
function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white">
      <Skeleton className="h-[220px] rounded-none" />
      <div className="space-y-4 p-6">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between border-t border-[#F3F5F7] pt-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

// Table row loading placeholder
function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 border-b border-[rgba(96,117,138,0.1)] px-6 py-4">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
  );
}

// Analytics card loading placeholder
function StatCardSkeleton() {
  return (
    <div className="rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white p-6">
      <Skeleton className="h-10 w-10 rounded-2xl" />
      <Skeleton className="mt-6 h-8 w-20" />
      <Skeleton className="mt-3 h-4 w-32" />
    </div>
  );
}

export { Skeleton, ProductCardSkeleton, TableRowSkeleton, StatCardSkeleton };
export default Skeleton;
