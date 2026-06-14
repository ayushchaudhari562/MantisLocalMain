// Products browsing page with search, loading, and error states
import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import  productService from '../services/productService';
import { ProductCardSkeleton } from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import ProductCard from '../components/product/ProductCard';
import type { Product } from '../types';

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');

  // Fetch products from service layer
  const fetchProducts = () => {
    setLoading(true);
    setError(false);
    productService
      .getAll()
      .then(setProducts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Client-side search filter
  const filtered = useMemo(() => {
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    );
  }, [products, search]);

  return (
    <>
      {/* Page header with search */}
      <section className="border-b border-[rgba(96,117,138,0.1)] bg-[#F3F5F7]">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-3xl">
            <p className="text-[12px] font-medium uppercase tracking-[0.25em] text-[#60758A]">
              Product Ecosystem
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight text-[#111315] lg:text-6xl">
              Browse Supported
              <br />
              Products
            </h1>
            <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-[#60758A]">
              Explore products equipped with AI diagnostics, manuals,
              troubleshooting workflows, and intelligent support systems.
            </p>
          </div>

          {/* Search and filter controls */}
          <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-[rgba(96,117,138,0.1)] bg-white px-5 py-4 shadow-soft-sm">
              <Search className="h-5 w-5 text-[#60758A]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-transparent text-[14px] text-[#111315] outline-none placeholder:text-[#9BA6B2]"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-[rgba(96,117,138,0.1)] bg-white px-5 py-4 text-[14px] font-medium text-[#111315] shadow-soft-sm transition hover:bg-[#EEF2F5]">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>
      </section>

      {/* Product grid section */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-16">
          {/* Loading skeletons */}
          {loading && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {/* Error state */}
          {!loading && error && <ErrorState onRetry={fetchProducts} />}

          {/* Empty state */}
          {!loading && !error && filtered.length === 0 && (
            <EmptyState
              icon={<Search className="h-7 w-7 text-[#60758A]" />}
              title="No products found"
              description="Try searching with another keyword or browse all supported products."
            />
          )}

          {/* Product cards grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Products;