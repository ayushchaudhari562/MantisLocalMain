// Dashboard overview with analytics cards and recent products
import { useEffect, useState } from 'react';
import { Package, FileText, Activity, Users } from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';
import StatCard from '../../components/ui/StatCard';
import { StatCardSkeleton } from '../../components/ui/Skeleton';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import ErrorState from '../../components/ui/ErrorState';
import type { AnalyticsCard, Product } from '../../types';

// Icon mapping for analytics cards
const iconMap: Record<string, React.ReactNode> = {
  'Total Products': <Package className="h-5 w-5 text-[#60758A]" />,
  Documents: <FileText className="h-5 w-5 text-[#60758A]" />,
  Diagnostics: <Activity className="h-5 w-5 text-[#60758A]" />,
  'Active Users': <Users className="h-5 w-5 text-[#60758A]" />,
};

function DashboardOverview() {
  const [cards, setCards] = useState<AnalyticsCard[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch analytics and products in parallel
  const fetchData = () => {
    setLoading(true);
    setError(false);
    Promise.all([
      dashboardService.getAnalyticsCards(),
      dashboardService.getCompanyProducts(),
    ])
      .then(([analyticsCards, prods]) => {
        setCards(analyticsCards);
        setProducts(prods);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) return <ErrorState onRetry={fetchData} />;

  // Table column definitions
  const columns = [
    { key: 'name', label: 'Product' },
    { key: 'category', label: 'Category' },
    {
      key: 'status',
      label: 'Status',
      render: (item: Product) => (
        <Badge variant={item.status || 'active'}>
          {(item.status || 'active').charAt(0).toUpperCase() +
            (item.status || 'active').slice(1)}
        </Badge>
      ),
    },
    {
      key: 'docs',
      label: 'Documents',
      render: (item: Product) => (
        <span className="text-[#60758A]">{item.docs || 0}</span>
      ),
    },
  ];

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-[#111315]">
          Dashboard
        </h1>
        <p className="mt-2 text-[15px] text-[#60758A]">
          Overview of your product ecosystem and diagnostics.
        </p>
      </div>

      {/* Analytics cards grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <StatCard
              key={card.id}
              icon={
                iconMap[card.label] || (
                  <Activity className="h-5 w-5 text-[#60758A]" />
                )
              }
              label={card.label}
              value={card.value}
              change={card.change}
              trend={card.trend}
            />
          ))}
        </div>
      )}

      {/* Recent products table */}
      <div>
        <h2 className="mb-6 text-xl font-semibold text-[#111315]">
          Recent Products
        </h2>
        <DataTable<Product>
          columns={columns}
          data={products.slice(0, 5)}
          loading={loading}
          emptyTitle="No products yet"
          emptyDescription="Add your first product to get started."
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
}

export default DashboardOverview;
