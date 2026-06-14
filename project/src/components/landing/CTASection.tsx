// components/landing/CTASection.tsx

import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="relative overflow-hidden border-t border-[#60758A]/10 bg-[#F3F5F7] py-24">

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">

        <p className="text-[13px] font-semibold uppercase tracking-widest text-[#60758A]">
          Start Diagnosing
        </p>

        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-[#111315] lg:text-6xl">

          Find product issues
          <br />
          instantly.

        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-[#60758A]">

          Transform manuals, service guides,
          and technical documentation into an intelligent
          diagnostic experience.

        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

          {/* Start Diagnosis */}
          <Link
            to="/products"
            className="flex items-center gap-2 rounded-xl bg-[#111315] px-8 py-4 text-[15px] font-medium text-white shadow-sm transition hover:bg-black/80"
          >

            Start Diagnosis

            <ArrowRight className="h-5 w-5" />

          </Link>

          {/* Explore Products */}
          <Link
            to="/products"
            className="rounded-xl border border-[#60758A]/20 bg-white px-8 py-4 text-[15px] font-medium text-[#111315] shadow-sm transition hover:bg-[#EEF2F5]"
          >

            Explore Products

          </Link>

        </div>

      </div>

    </section>
  );
}

export default CTASection;