// Dashboard product management with search, table, and CRUD actions
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Search, Pencil, FileText, Trash2 } from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';
import  productService  from '../../services/productService';
import DataTable from '../../components/ui/DataTable';
import Badge from '../../components/ui/Badge';
import ErrorState from '../../components/ui/ErrorState';
import type { Product } from '../../types';

function DashboardProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Fetch products from dashboard service
  const fetchProducts = () => {
    setLoading(true);
    setError(false);
    dashboardService
      .getCompanyProducts()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product with confirmation
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert('Failed to delete product.');
    }
  };

  // Client-side search filter
  const filtered = search
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.category?.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  // Table column definitions with action buttons
  const columns = [
    {
      key: 'name',
      label: 'Product',
      render: (item: Product) => (
        <span className="font-medium">{item.name}</span>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (item: Product) => (
        <span className="text-[#60758A]">{item.category || '—'}</span>
      ),
    },
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
      label: 'Docs',
      render: (item: Product) => (
        <span className="text-[#60758A]">{item.docs || 0}</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      render: (item: Product) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/products/${item.id}/edit`);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#60758A] transition hover:bg-[#F3F5F7]"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/dashboard/products/${item.id}/docs`);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#60758A] transition hover:bg-[#F3F5F7]"
          >
            <FileText className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item.id);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#60758A] transition hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  if (error) return <ErrorState onRetry={fetchProducts} />;

  return (
    <div className="space-y-8">
      {/* Page header with add button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#111315]">
            Products
          </h1>
          <p className="mt-2 text-[15px] text-[#60758A]">
            Manage your product catalog and documentation.
          </p>
        </div>
        <Link
          to="/dashboard/products/new"
          className="inline-flex items-center gap-2 rounded-2xl bg-[#111315] px-5 py-3 text-[14px] font-medium text-white transition hover:bg-black/80"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Search bar */}
      <div className="flex w-full max-w-md items-center gap-3 rounded-2xl border border-[rgba(96,117,138,0.1)] bg-white px-5 py-3 shadow-soft-sm">
        <Search className="h-5 w-5 text-[#60758A]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-transparent text-[14px] text-[#111315] outline-none placeholder:text-[#9BA6B2]"
        />
      </div>

      {/* Products data table */}
      <DataTable<Product>
        columns={columns}
        data={filtered}
        loading={loading}
        emptyTitle="No products found"
        emptyDescription="Create your first product to get started with diagnostics."
        keyExtractor={(item) => item.id}
      />
    </div>
  );
}

export default DashboardProducts;
