// components/landing/StatsStrip.tsx

import { Wrench, Package, ShieldCheck, Activity } from "lucide-react";

function StatsStrip() {
return ( <section className="relative border-y border-[#60758A]/10 bg-[#F3F5F7]">


  <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 md:grid-cols-2 lg:grid-cols-4">

    {/* Card 1 */}
    <div className="rounded-3xl border border-[#60758A]/10 bg-white p-6 shadow-soft transition hover:-translate-y-1">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F7]">

        <Wrench className="h-5 w-5 text-[#60758A]" />

      </div>

      <h3 className="mt-6 text-3xl font-semibold text-[#111315]">
        12K+
      </h3>

      <p className="mt-2 text-[14px] leading-relaxed text-[#60758A]">
        Diagnostics completed across multiple product categories.
      </p>

    </div>

    {/* Card 2 */}
    <div className="rounded-3xl border border-[#60758A]/10 bg-white p-6 shadow-soft transition hover:-translate-y-1">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F7]">

        <Package className="h-5 w-5 text-[#60758A]" />

      </div>

      <h3 className="mt-6 text-3xl font-semibold text-[#111315]">
        320+
      </h3>

      <p className="mt-2 text-[14px] leading-relaxed text-[#60758A]">
        Products supported with manuals, diagrams, and service guides.
      </p>

    </div>

    {/* Card 3 */}
    <div className="rounded-3xl border border-[#60758A]/10 bg-white p-6 shadow-soft transition hover:-translate-y-1">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F7]">

        <ShieldCheck className="h-5 w-5 text-[#60758A]" />

      </div>

      <h3 className="mt-6 text-3xl font-semibold text-[#111315]">
        94%
      </h3>

      <p className="mt-2 text-[14px] leading-relaxed text-[#60758A]">
        Diagnostic accuracy powered by verified official documentation.
      </p>

    </div>

    {/* Card 4 */}
    <div className="rounded-3xl border border-[#60758A]/10 bg-white p-6 shadow-soft transition hover:-translate-y-1">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F5F7]">

        <Activity className="h-5 w-5 text-[#60758A]" />

      </div>

      <h3 className="mt-6 text-3xl font-semibold text-[#111315]">
        24/7
      </h3>

      <p className="mt-2 text-[14px] leading-relaxed text-[#60758A]">
        Intelligent assistance available anytime for troubleshooting.
      </p>

    </div>

  </div>

</section>


);
}

export default StatsStrip;
