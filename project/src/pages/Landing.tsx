// Landing page with hero, features, workflow, stats, and CTA
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, FileText, Wrench } from 'lucide-react';
import StatsStrip from '../components/landing/Stats';
import FeaturesGrid from '../components/landing/FeaturesGrid';
import AIWorkflow from '../components/landing/AIworkflow';
import CTASection from '../components/landing/CTASection';

function Landing() {
  return (
    <>
      {/* Hero section */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">
        {/* Hero left column */}
        <div>
          {/* Platform badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(96,117,138,0.2)] bg-white px-4 py-2 text-[12px] font-medium text-[#60758A] shadow-soft-sm">
            <span className="h-2 w-2 rounded-full bg-[#60758A]" />
            AI Product Diagnostics
          </div>

          {/* Hero heading */}
          <h1 className="text-[2.9rem] font-semibold leading-[1.05] tracking-tight text-[#111315] lg:text-[3.8rem]">
            Diagnose product
            <br />
            problems using
            <br />
            <span className="text-[#60758A]">manuals &amp; AI.</span>
          </h1>

          {/* Hero description */}
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#60758A]">
            Describe the issue. Get answers from manuals, service documents, and
            AI-assisted diagnostics.
          </p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-[#111315] px-6 py-3 text-[14px] font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-black/85"
            >
              Start Diagnosis
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl border border-[rgba(96,117,138,0.2)] bg-white px-6 py-3 text-[14px] font-medium text-[#111315] transition-all duration-300 hover:bg-[#EEF2F5]"
            >
              Browse Products
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center gap-5 text-[13px] text-[#60758A]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              Official Manuals
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              AI Diagnostics
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Service Documentation
            </div>
          </div>

          {/* Supported categories */}
          <p className="mt-8 text-[13px] leading-relaxed text-[#9BA6B2]">
            Supports scooters, appliances, electronics, and industrial systems.
          </p>
        </div>

        {/* Hero right — chat preview card */}
        <div className="w-full max-w-lg rounded-3xl border border-[rgba(96,117,138,0.1)] bg-white shadow-soft transition-all duration-300 hover:shadow-soft-lg lg:ml-auto">
          {/* Preview header */}
          <div className="flex items-center justify-between border-b border-[#F3F5F7] px-6 py-5">
            <div>
              <p className="text-[14px] font-semibold text-[#111315]">
                AI Diagnostic Session
              </p>
              <p className="mt-1 text-[12px] text-[#60758A]">
                Active diagnostic session
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#F3F5F7] px-3 py-1.5 text-[11px] font-medium text-[#60758A]">
              <span className="h-2 w-2 rounded-full bg-[#111315]" />
              Live
            </div>
          </div>

          {/* Preview messages */}
          <div className="flex flex-col gap-5 bg-[#F3F5F7]/40 px-6 py-6">
            {/* User message */}
            <div className="ml-auto max-w-[80%]">
              <div className="rounded-2xl rounded-br-sm bg-[#111315] px-5 py-3 text-[14px] leading-relaxed text-white">
                My scooter horn is not working.
              </div>
              <p className="mt-1 text-right text-[11px] text-[#9BA6B2]">
                Just now
              </p>
            </div>

            {/* Assistant response */}
            <div className="max-w-[85%]">
              <div className="rounded-2xl rounded-bl-sm border border-[rgba(96,117,138,0.1)] bg-white px-5 py-3 text-[14px] leading-relaxed text-[#111315]">
                Check Fuse F3 (10A) beneath the front panel. It controls the
                horn relay.
              </div>
              <p className="mt-1 text-[11px] text-[#9BA6B2]">
                Mantis Assistant
              </p>
            </div>

            {/* Typing indicator */}
            <div className="flex items-center gap-2 text-[12px] text-[#60758A]">
              <div className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60758A]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60758A] [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#60758A] [animation-delay:300ms]" />
              </div>
              Assistant is analyzing manuals...
            </div>
          </div>

          {/* Preview input */}
          <div className="flex gap-3 border-t border-[#F3F5F7] px-6 py-5">
            <input
              disabled
              type="text"
              placeholder="Describe your issue..."
              className="h-12 flex-1 rounded-xl border border-[rgba(96,117,138,0.2)] bg-[#F3F5F7] px-4 text-[14px] text-[#60758A] outline-none"
            />
            <button className="rounded-xl bg-[#111315] px-5 py-3 text-[14px] font-medium text-white transition hover:bg-black/80">
              Send
            </button>
          </div>
        </div>
      </section>

      {/* Platform stats strip */}
      <StatsStrip />

      {/* Features bento grid */}
      <FeaturesGrid />

      {/* AI diagnostic workflow */}
      <AIWorkflow />

      {/* Call to action */}
      <CTASection />
    </>
  );
}

export default Landing;