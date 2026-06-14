// components/layout/Footer.tsx

function Footer() {
return ( <footer className="bg-[#F3F5F7] border-t border-[#60758A]/10">

  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-[14px] text-[#60758A] md:flex-row">

    <div>

      <h3 className="text-[15px] font-semibold text-[#111315]">
        Mantis
      </h3>

      <p className="mt-2">
        AI-powered product diagnostics.
      </p>

    </div>

    <div className="flex items-center gap-8 font-medium">

      <button className="transition hover:text-[#111315]">
        Products
      </button>

      <button className="transition hover:text-[#111315]">
        Diagnostics
      </button>

      <button className="transition hover:text-[#111315]">
        Resources
      </button>

    </div>

  </div>

</footer>


);
}

export default Footer;
