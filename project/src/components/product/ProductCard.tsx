// Product card with hover polish and image fallback
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText } from 'lucide-react';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group overflow-hidden rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      {/* Product image with fallback */}
      <div className="relative h-[220px] overflow-hidden bg-[#F3F5F7]">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FileText className="h-12 w-12 text-[#60758A]/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-medium text-[#111315] backdrop-blur-sm">
          AI Support
        </div>
      </div>

      {/* Card content */}
      <div className="p-6">
        {/* Category label */}
        <p className="text-[12px] font-medium uppercase tracking-wide text-[#60758A]">
          {product.category || 'Product'}
        </p>

        {/* Product name */}
        <h3 className="mt-2 text-[20px] font-semibold tracking-tight text-[#111315]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-3 text-[14px] leading-relaxed text-[#60758A]">
          {product.description ||
            'Access manuals, troubleshooting help, and AI-powered diagnostic assistance.'}
        </p>

        {/* Card footer */}
        <div className="mt-6 flex items-center justify-between border-t border-[#F3F5F7] pt-5">
          <div className="flex items-center gap-2 text-[#60758A]">
            <FileText className="h-4 w-4" />
            <span className="text-[13px]">{product.docs || 0} resources</span>
          </div>
          <div className="flex items-center gap-2 text-[13px] font-medium text-[#111315]">
            Open
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;