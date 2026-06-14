// pages/ProductDetail.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api";
import Navbar from "../components/layout/Navbar";
import ChatWindow from "../components/assistant/Chatwindow";

import { FileText, Wrench, ShieldCheck } from "lucide-react";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getProduct(id).then(res => setProduct(res.data)).catch(console.error);
    }
  }, [id]);

  if (!product) return <div className="p-20 text-center">Loading...</div>;
return ( <div className="min-h-screen bg-[#F5F5F3] text-[#111315]">


  <Navbar />

  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">

    {/* LEFT SIDE */}
    <div>

      {/* Product Card */}
      <div className="overflow-hidden rounded-[32px] border border-[#E4E7EB] bg-white shadow-sm">

        {/* Image */}
        <div className="relative h-[360px] overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1400&auto=format&fit=crop"
            alt="Scooter"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        </div>

        {/* Content */}
        <div className="p-8">

          <div className="flex items-start justify-between gap-6">

            <div>

              <p className="text-sm text-[#7A8796]">
                {product.category || "Product"}
              </p>

              <h1 className="mt-2 text-5xl font-semibold tracking-tight text-[#111315]">
                {product.name}
              </h1>

            </div>

            <div className="rounded-full border border-[#D8DCE2] bg-[#F8F9FA] px-4 py-2 text-sm text-[#5F6772]">

              AI Diagnostics Enabled

            </div>

          </div>

          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#5F6772]">

            Intelligent troubleshooting powered by official manuals,
            service documentation, electrical diagrams,
            and diagnostic workflows.

          </p>

          {/* Quick Specs */}
          <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3">

            <div className="rounded-2xl border border-[#E4E7EB] bg-[#FAFAF9] p-5">

              <p className="text-sm text-[#7A8796]">
                Model Year
              </p>

              <h3 className="mt-2 text-xl font-semibold text-[#111315]">
                2025
              </h3>

            </div>

            <div className="rounded-2xl border border-[#E4E7EB] bg-[#FAFAF9] p-5">

              <p className="text-sm text-[#7A8796]">
                Fuel Type
              </p>

              <h3 className="mt-2 text-xl font-semibold text-[#111315]">
                Petrol
              </h3>

            </div>

            <div className="rounded-2xl border border-[#E4E7EB] bg-[#FAFAF9] p-5">

              <p className="text-sm text-[#7A8796]">
                Support Docs
              </p>

              <h3 className="mt-2 text-xl font-semibold text-[#111315]">
                12
              </h3>

            </div>

          </div>

        </div>

      </div>

      {/* Resources */}
      <div className="mt-8 rounded-[32px] border border-[#E4E7EB] bg-white p-8 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F4F6]">

            <FileText className="h-5 w-5 text-[#5F6772]" />

          </div>

          <div>

            <p className="text-sm text-[#7A8796]">
              Official Documentation
            </p>

            <h2 className="text-2xl font-semibold text-[#111315]">
              Support Resources
            </h2>

          </div>

        </div>

        {/* Resource List */}
        <div className="mt-8 space-y-4">

          <div className="flex items-center justify-between rounded-2xl border border-[#E4E7EB] bg-[#FAFAF9] p-5">

            <div>

              <h3 className="font-medium text-[#111315]">
                Owner Manual
              </h3>

              <p className="mt-1 text-sm text-[#5F6772]">
                PDF • 12 MB
              </p>

            </div>

            <button className="rounded-full border border-[#D8DCE2] bg-white px-4 py-2 text-sm text-[#111315]">

              Open

            </button>

          </div>

          <div className="flex items-center justify-between rounded-2xl border border-[#E4E7EB] bg-[#FAFAF9] p-5">

            <div>

              <h3 className="font-medium text-[#111315]">
                Electrical Wiring Diagram
              </h3>

              <p className="mt-1 text-sm text-[#5F6772]">
                PDF • 4 MB
              </p>

            </div>

            <button className="rounded-full border border-[#D8DCE2] bg-white px-4 py-2 text-sm text-[#111315]">

              Open

            </button>

          </div>

          <div className="flex items-center justify-between rounded-2xl border border-[#E4E7EB] bg-[#FAFAF9] p-5">

            <div>

              <h3 className="font-medium text-[#111315]">
                Horn System Troubleshooting
              </h3>

              <p className="mt-1 text-sm text-[#5F6772]">
                Technical Guide
              </p>

            </div>

            <button className="rounded-full border border-[#D8DCE2] bg-white px-4 py-2 text-sm text-[#111315]">

              Open

            </button>

          </div>

        </div>

      </div>

      {/* Safety Notice */}
      <div className="mt-8 flex items-start gap-4 rounded-[28px] border border-[#E4E7EB] bg-white p-6 shadow-sm">

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F4F6]">

          <ShieldCheck className="h-5 w-5 text-[#5F6772]" />

        </div>

        <div>

          <h3 className="text-lg font-semibold text-[#111315]">
            Safety Guidance
          </h3>

          <p className="mt-2 leading-relaxed text-[#5F6772]">

            Always switch off ignition and disconnect the battery before
            inspecting electrical components or replacing fuses.

          </p>

        </div>

      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="sticky top-24 h-fit">

      <ChatWindow productId={id!} productName={product.name} />

      {/* Diagnosis Status */}
      <div className="mt-6 rounded-[28px] border border-[#E4E7EB] bg-white p-6 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F4F6]">

            <Wrench className="h-5 w-5 text-[#5F6772]" />

          </div>

          <div>

            <p className="text-sm text-[#7A8796]">
              Probable Diagnosis
            </p>

            <h3 className="text-xl font-semibold text-[#111315]">
              Fuse Failure
            </h3>

          </div>

        </div>

        <div className="mt-6 space-y-4">

          <div className="rounded-2xl border border-[#E4E7EB] bg-[#FAFAF9] p-5">

            <p className="text-sm leading-relaxed text-[#5F6772]">

              Based on current responses, the issue is likely caused by
              a damaged horn fuse or disconnected horn wiring.

            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>


);
}

export default ProductDetail;
