// Platform footer with navigation links
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-[rgba(96,117,138,0.1)] bg-[#F3F5F7]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 md:flex-row">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#111315]" />
            <span className="text-[15px] font-semibold text-[#111315]">
              Mantis
            </span>
          </div>
          <p className="mt-2 text-[14px] text-[#60758A]">
            AI-powered product diagnostics.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-[14px] font-medium">
          <Link
            to="/products"
            className="text-[#60758A] transition hover:text-[#111315]"
          >
            Products
          </Link>
          <Link
            to="/dashboard"
            className="text-[#60758A] transition hover:text-[#111315]"
          >
            Dashboard
          </Link>
          <Link
            to="/profile"
            className="text-[#60758A] transition hover:text-[#111315]"
          >
            Profile
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-[13px] text-[#9BA6B2]">
          © {new Date().getFullYear()} Mantis
        </p>
      </div>
    </footer>
  );
}

export default Footer;
