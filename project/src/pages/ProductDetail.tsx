// Product detail page with dynamic resources and AI assistant
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileText,
  Wrench,
  ShieldCheck,
  ArrowUpRight,
  MessageSquare,
} from 'lucide-react';
import  productService  from '../services/productService';
import ChatWindow from '../components/assistant/Chatwindow';
import { Skeleton } from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import type { Product, Resource } from '../types';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch product and resources in parallel
  const fetchProduct = () => {
    if (!id) return;
    setLoading(true);
    setError(false);
    Promise.all([
      productService.getById(id),
      productService.getResources(id),
    ])
      .then(([prod, res]) => {
        setProduct(prod);
        setResources(res);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Resource type label helper
  const resourceTypeLabel = (type: Resource['type']) => {
    const labels = {
      manual: 'PDF Manual',
      diagram: 'Wiring Diagram',
      guide: 'Guide',
      datasheet: 'Datasheet',
      video: 'Video',
    };
    return labels[type] || 'Document';
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <Skeleton className="h-[500px] rounded-3xl" />
            <Skeleton className="h-[200px] rounded-3xl" />
          </div>
          <Skeleton className="h-[600px] rounded-3xl" />
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20">
        <ErrorState
          title="Product not found"
          description="Unable to load this product. It may have been removed or is temporarily unavailable."
          onRetry={fetchProduct}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      {/* Left column — product info */}
      <div className="space-y-8">
        {/* Product hero card */}
        <div className="overflow-hidden rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white shadow-soft-sm">
          {/* Product image */}
          <div className="relative h-[360px] overflow-hidden bg-[#F3F5F7]">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <FileText className="h-16 w-16 text-[#60758A]/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Product metadata */}
          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-[13px] font-medium uppercase tracking-wide text-[#60758A]">
                  {product.category || 'Product'}
                </p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#111315] lg:text-5xl">
                  {product.name}
                </h1>
              </div>
              <div className="rounded-full border border-[rgba(96,117,138,0.1)] bg-[#F3F5F7] px-4 py-2 text-[12px] font-medium text-[#60758A]">
                AI Diagnostics Enabled
              </div>
            </div>

            {/* Product description */}
            <p className="mt-7 max-w-3xl text-[15px] leading-relaxed text-[#60758A]">
              {product.description ||
                'Access manuals, service documents, troubleshooting workflows, and AI-assisted diagnostics for this product.'}
            </p>

            {/* Quick stats grid */}
            <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3">
              <div className="rounded-2xl bg-[#F3F5F7] p-5">
                <p className="text-[12px] text-[#60758A]">Support Docs</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#111315]">
                  {resources.length || product.docs || 0}
                </h3>
              </div>
              <div className="rounded-2xl bg-[#F3F5F7] p-5">
                <p className="text-[12px] text-[#60758A]">AI Support</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#111315]">
                  Active
                </h3>
              </div>
              <div className="rounded-2xl bg-[#F3F5F7] p-5">
                <p className="text-[12px] text-[#60758A]">Diagnostics</p>
                <h3 className="mt-2 text-2xl font-semibold text-[#111315]">
                  Enabled
                </h3>
              </div>
            </div>

            {/* Full chat link */}
            <Link
              to={`/products/${product.id}/chat`}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111315] px-6 py-3 text-[14px] font-medium text-white transition hover:bg-black/80"
            >
              <MessageSquare className="h-4 w-4" />
              Open Full Chat Assistant
            </Link>
          </div>
        </div>

        {/* Resources section */}
        <div className="rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white p-8 shadow-soft-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F7]">
              <FileText className="h-5 w-5 text-[#60758A]" />
            </div>
            <div>
              <p className="text-[13px] text-[#60758A]">
                Official Documentation
              </p>
              <h2 className="text-2xl font-semibold text-[#111315]">
                Manuals &amp; Resources
              </h2>
            </div>
          </div>

          {/* Dynamic resources list */}
          <div className="mt-8 space-y-4">
            {resources.length === 0 ? (
              <p className="text-[14px] text-[#60758A]">
                No resources available for this product yet.
              </p>
            ) : (
              resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex flex-col gap-4 rounded-2xl bg-[#F3F5F7] p-5 transition hover:bg-[#EEF2F5]"
                >
                  <div>
                    <h3 className="text-[15px] font-medium text-[#111315]">
                      {resource.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-[#60758A]">
                      {resourceTypeLabel(resource.type)}
                      {resource.fileSize && ` · ${resource.fileSize}`}
                    </p>
                  </div>
                  <a 
                    href={(resource as any).file_url || resource.url || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(96,117,138,0.1)] bg-white px-4 py-3 text-[13px] font-medium text-[#111315] transition hover:bg-[#F3F5F7]"
                  >
                    Open Manual
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Safety guidance */}
        <div className="flex items-start gap-4 rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white p-6 shadow-soft-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F7]">
            <ShieldCheck className="h-5 w-5 text-[#60758A]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#111315]">
              Safety Guidance
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#60758A]">
              Always disconnect power or switch off ignition before inspecting
              electrical systems or internal components.
            </p>
          </div>
        </div>
      </div>

      {/* Right column — sticky chat and diagnostics */}
      <div className="flex flex-col gap-6 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
        {/* Chat assistant panel */}
        <div className="flex-1 min-h-[400px]">
          <ChatWindow
            productId={product.id}
            productName={product.name}
          />
        </div>

        {/* Diagnostic status card */}
        <div className="shrink-0 rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white p-6 shadow-soft-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F7]">
              <Wrench className="h-5 w-5 text-[#60758A]" />
            </div>
            <div>
              <p className="text-[12px] text-[#60758A]">Diagnostic Status</p>
              <h3 className="text-xl font-semibold text-[#111315]">
                Ready for Analysis
              </h3>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-[#F3F5F7] p-5">
            <p className="text-[14px] leading-relaxed text-[#60758A]">
              Ask questions related to troubleshooting, manuals, electrical
              systems, maintenance, or product diagnostics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
