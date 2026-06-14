// components/products/ProductCard.tsx
import { Link } from "react-router-dom";

type ProductCardProps = {
  id: number;
  name: string;
  category: string;
  docs: number;
  image: string;
};

function ProductCard({ id, name, category, docs, image }: ProductCardProps) {
  return (
    <Link
      to={`/products/${id}`}
      className="group overflow-hidden rounded-xl border border-[#E2E5E9] bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(17,19,21,0.07)]"
    >
      {/* Image */}
      <div className="h-[148px] overflow-hidden bg-[#F3F5F7]">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-400 group-hover:scale-[1.03]"
        />
      </div>

      {/* Body */}
      <div className="px-4 pt-3.5">
        <p className="text-[11px] tracking-[0.01em] text-[#60758A]">
          {category}
        </p>
        <h3 className="mt-1.5 text-[15px] font-medium leading-snug text-[#111315]">
          {name}
        </h3>
      </div>

      {/* Footer */}
      <div className="mt-3.5 flex items-center justify-between border-t border-[#F0F2F4] px-4 py-2.5">
        <span className="text-[11.5px] text-[#60758A]">{docs} resources</span>
        <div className="flex items-center gap-2">
          <span className="rounded bg-[#E6F1FB] px-1.5 py-0.5 text-[10.5px] font-medium text-[#0C447C]">
            AI support
          </span>
          <button className="rounded border border-[#D8DCE2] bg-[#d7e6f4] px-2.5 py-1 text-[11.5px] font-medium text-[#111315] transition hover:bg-[#E6E9EC]">
            Open
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;