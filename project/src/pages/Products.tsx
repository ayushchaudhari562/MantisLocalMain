// pages/Products.tsx

import Navbar from "../components/layout/Navbar";
import ProductCard from "../components/product/ProductCard";

import { useEffect, useState } from "react";
import { getProducts } from "../api";

function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);
return ( <div className="min-h-screen bg-[#F5F5F3] text-[#111315]">


  <Navbar />

  {/* Header */}
  <section className="border-b border-[#E4E7EB]">

    <div className="mx-auto max-w-7xl px-6 py-20">

      <div className="max-w-3xl">

        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#7A8796]">
          Product Ecosystem
        </p>

        <h1 className="mt-5 text-6xl font-semibold tracking-tight text-[#111315]">

          Browse Supported
          <br />
          Products

        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#5F6772]">

          Explore products equipped with intelligent diagnostics,
          official manuals, troubleshooting workflows,
          and AI-powered technical support.

        </p>

      </div>

      {/* Search */}
      <div className="mt-12">

        <div className="flex max-w-xl items-center rounded-2xl border border-[#D8DCE2] bg-white px-5 py-4 shadow-sm">

          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent text-sm text-[#111315] outline-none placeholder:text-[#9BA6B2]"
          />

        </div>

      </div>

    </div>

  </section>

  {/* Products Grid */}
  <section>

    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-16 md:grid-cols-2 xl:grid-cols-3">

      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          category={product.category}
          docs={product.docs}
          image={product.image}
        />
      ))}

    </div>

  </section>

</div>


);
}

export default Products;
