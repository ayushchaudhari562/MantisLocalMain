// Status badge with variant styling

interface BadgeProps {
  variant: 'active' | 'draft' | 'archived' | 'completed' | 'scheduled' | 'overdue';
  children: string;
}

// Variant-specific styling map
const variantStyles: Record<BadgeProps['variant'], string> = {
  active: 'bg-[#111315] text-white',
  completed: 'bg-[#111315] text-white',
  draft: 'bg-[#F3F5F7] text-[#60758A] border border-[rgba(96,117,138,0.15)]',
  scheduled: 'bg-[#F3F5F7] text-[#60758A] border border-[rgba(96,117,138,0.15)]',
  archived: 'bg-[#F3F5F7] text-[#9BA6B2]',
  overdue: 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]',
};

function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}

export default Badge;
