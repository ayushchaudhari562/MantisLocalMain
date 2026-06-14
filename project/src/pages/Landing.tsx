// pages/Landing.tsx
import Navbar from "../components/layout/Navbar";
import StatsStrip from "../components/landing/Stats";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/layout/Footer";

function Landing() {
  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#111315]">
      <Navbar />

      {/* HERO */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-24">

        {/* Left */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#60758A]/20 bg-white px-3.5 py-1.5 text-xs text-[#60758A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#60758A]" />
            AI product diagnostics
          </div>

          <h1 className="text-[2.6rem] font-medium leading-[1.08] tracking-tight text-[#111315] lg:text-5xl">
            AI assistant for<br />
            diagnosing product<br />
            <span className="text-[#60758A]">problems.</span>
          </h1>

          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#60758A]">
            Describe an issue. The assistant checks manuals and documentation to give you a clear answer.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-xl bg-[#111315] px-6 py-3 text-sm font-medium text-white transition shadow-soft-sm hover:bg-black/80">
              Start diagnosis
            </button>
            <button className="rounded-xl border border-[#60758A]/20 bg-white px-6 py-3 text-sm font-medium text-[#111315] transition shadow-soft-sm hover:bg-[#F3F5F7]">
              Check manuals
            </button>
          </div>
        </div>

        {/* Right — Chat preview */}
        <div className="w-full max-w-lg rounded-3xl border border-[#60758A]/10 bg-white shadow-soft lg:ml-auto">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#F3F5F7] px-6 py-5">
            <div>
              <p className="text-[14px] font-medium text-[#111315]">Honda Activa 6G</p>
              <p className="mt-0.5 text-[13px] text-[#60758A]">Active session</p>
            </div>
            <span className="rounded-full border border-[#60758A]/20 bg-[#F3F5F7] px-3 py-1 text-[11px] font-medium text-[#60758A]">
              Live
            </span>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-4 px-6 py-6 bg-[#F3F5F7]/30">
            <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[#111315] px-5 py-3 text-[14px] leading-relaxed text-white">
              My scooter horn is not working.
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-[#60758A]/10 bg-white px-5 py-3 text-[14px] leading-relaxed text-[#111315] shadow-soft-sm">
              Check Fuse F3 (10A) under the front panel — it controls the horn relay.
            </div>
          </div>

          {/* Input */}
          <div className="flex gap-3 border-t border-[#F3F5F7] px-6 py-5">
            <div className="flex-1 rounded-xl border border-[#60758A]/20 bg-[#F3F5F7] px-4 py-3 text-[14px] text-[#60758A]">
              Describe your issue…
            </div>
            <button className="rounded-xl bg-[#111315] px-5 py-3 text-[14px] font-medium text-white transition hover:bg-black/80">
              Send
            </button>
          </div>
        </div>
      </section>

      <StatsStrip />
      <CTASection />
      <Footer />
    </div>
  );
}

export default Landing;