// components/layout/Navbar.tsx

import { Link } from "react-router-dom";
import {
  Bot,
  LogIn,
  ArrowRight,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[#60758A]/10 bg-[#F3F5F7]/90 backdrop-blur-md">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >

          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-sm">

            <Bot
              size={18}
              className="text-[#111315]"
            />

          </div>

          <span className="text-[17px] font-semibold tracking-tight text-[#111315]">
            Mantis
          </span>

        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/products"
            className="text-[14px] font-medium text-[#60758A] transition-colors duration-200 hover:text-[#111315]"
          >
            Products
          </Link>

          <Link
            to="/resources"
            className="text-[14px] font-medium text-[#60758A] transition-colors duration-200 hover:text-[#111315]"
          >
            Resources
          </Link>

        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">

          {/* Sign In */}
          <Link
            to="/login"
            className="flex items-center gap-2 text-[14px] font-medium text-[#60758A] transition-colors duration-200 hover:text-[#111315]"
          >

            <LogIn size={16} />

            <span>Sign in</span>

          </Link>

          {/* CTA */}
          <Link
            to="/products"
            className="flex items-center gap-2 rounded-2xl border border-[#60758A]/15 bg-white px-5 py-2 text-[14px] font-medium text-[#111315] shadow-sm transition-all duration-200 hover:bg-[#EEF2F5]"
          >

            <span>Start diagnosis</span>

            <ArrowRight size={16} />

          </Link>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;