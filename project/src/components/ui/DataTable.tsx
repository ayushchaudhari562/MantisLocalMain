// Generic data table with loading and empty states
import { type ReactNode } from 'react';
import { TableRowSkeleton } from './Skeleton';
import EmptyState from './EmptyState';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
  keyExtractor: (item: T) => string;
}

function DataTable<T>({
  columns,
  data,
  loading,
  emptyTitle = 'No data found',
  emptyDescription,
  onRowClick,
  keyExtractor,
}: DataTableProps<T>) {
  // Loading skeleton state
  if (loading) {
    return (
      <div className="overflow-hidden rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white">
        <div className="border-b border-[rgba(96,117,138,0.1)] bg-[#F3F5F7]/50 px-6 py-4">
          <div className="flex gap-4">
            {columns.map((col) => (
              <div
                key={col.key}
                className="h-4 flex-1 animate-pulse rounded bg-[#E8EAED]"
              />
            ))}
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <TableRowSkeleton key={i} columns={columns.length} />
        ))}
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white">
      {/* Table header */}
      <div className="border-b border-[rgba(96,117,138,0.1)] bg-[#F3F5F7]/50 px-6 py-4">
        <div className="flex items-center gap-4">
          {columns.map((col) => (
            <div
              key={col.key}
              className="flex-1 text-[12px] font-semibold uppercase tracking-wider text-[#60758A]"
            >
              {col.label}
            </div>
          ))}
        </div>
      </div>

      {/* Table rows */}
      {data.map((item) => (
        <div
          key={keyExtractor(item)}
          onClick={() => onRowClick?.(item)}
          className={`flex items-center gap-4 border-b border-[rgba(96,117,138,0.05)] px-6 py-4 transition last:border-b-0 ${
            onRowClick ? 'cursor-pointer hover:bg-[#F3F5F7]/40' : ''
          }`}
        >
          {columns.map((col) => (
            <div key={col.key} className="flex-1 text-[14px] text-[#111315]">
              {col.render
                ? col.render(item)
                : String((item as Record<string, unknown>)[col.key] ?? '')}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DataTable;
