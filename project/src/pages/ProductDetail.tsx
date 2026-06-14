// pages/ProductDetail.tsx

import Navbar from "../components/layout/Navbar";
import ChatWindow from "../components/assistant/Chatwindow";

import { FileText } from "lucide-react";

function ProductDetail() {
  return (

    <div className="min-h-screen bg-[#F3F5F7] text-[#111315]">

      <Navbar />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-[1fr_1fr]">

        {/* LEFT SIDE */}
        <div className="flex flex-col gap-8">

          {/* Product Info Card */}
          <div className="overflow-hidden rounded-3xl border border-[#60758A]/10 bg-white shadow-sm">

            {/* Image */}
            <div className="relative h-[320px] w-full bg-[#F3F5F7]">

              <img
                src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1400&auto=format&fit=crop"
                alt="Honda Activa 6G"
                className="h-full w-full object-cover"
              />

            </div>

            {/* Content */}
            <div className="p-8">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-[14px] font-medium text-[#60758A]">
                    Scooter
                  </p>

                  <h1 className="mt-1 text-4xl font-semibold tracking-tight text-[#111315]">
                    Honda Activa 6G
                  </h1>

                </div>

                <div className="rounded-xl border border-[#60758A]/20 bg-[#F3F5F7] px-4 py-1.5 text-[13px] font-medium text-[#60758A]">

                  AI Support Available

                </div>

              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-[#60758A]">

                Ask the assistant questions about maintenance,
                troubleshooting, parts, and electrical systems using
                official manuals and verified documentation.

              </p>

            </div>

          </div>

          {/* Resources Card */}
          <div className="rounded-3xl border border-[#60758A]/10 bg-white p-8 shadow-sm">

            <div className="flex items-center gap-4 border-b border-[#60758A]/10 pb-6">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F7]">

                <FileText className="h-5 w-5 text-[#60758A]" />

              </div>

              <div>

                <h2 className="text-xl font-semibold text-[#111315]">
                  Manuals & Documents
                </h2>

                <p className="mt-1 text-[14px] text-[#60758A]">
                  Verified official resources
                </p>

              </div>

            </div>

            {/* Resource List */}
            <div className="mt-6 flex flex-col gap-3">

              {/* Manual */}
              <div className="flex items-center justify-between rounded-2xl bg-[#F3F5F7]/50 p-4 transition hover:bg-[#F3F5F7]">

                <div>

                  <h3 className="text-[15px] font-medium text-[#111315]">
                    Owner Manual
                  </h3>

                  <p className="mt-0.5 text-[13px] text-[#60758A]">
                    PDF • 12 MB
                  </p>

                </div>

                <button className="rounded-xl border border-[#60758A]/20 bg-white px-5 py-2 text-[13px] font-medium text-[#111315] shadow-sm transition hover:bg-[#F3F5F7]">

                  View PDF

                </button>

              </div>

              {/* Wiring Diagram */}
              <div className="flex items-center justify-between rounded-2xl bg-[#F3F5F7]/50 p-4 transition hover:bg-[#F3F5F7]">

                <div>

                  <h3 className="text-[15px] font-medium text-[#111315]">
                    Electrical Wiring Diagram
                  </h3>

                  <p className="mt-0.5 text-[13px] text-[#60758A]">
                    PDF • 4 MB
                  </p>

                </div>

                <button className="rounded-xl border border-[#60758A]/20 bg-white px-5 py-2 text-[13px] font-medium text-[#111315] shadow-sm transition hover:bg-[#F3F5F7]">

                  View PDF

                </button>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="sticky top-24 h-[calc(100vh-8rem)]">

          <ChatWindow
            productId="1"
            productName="Honda Activa 6G"
          />

        </div>

      </div>

    </div>

  );
}

export default ProductDetail;