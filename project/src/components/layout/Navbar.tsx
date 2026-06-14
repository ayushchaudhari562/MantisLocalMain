// Public navigation bar with responsive mobile menu
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot, ArrowRight, Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/clerk-react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const { user } = useUser();
  const role = user?.unsafeMetadata?.role || 'user';

  // Navigation links
  const links = [
    { label: 'Products', path: '/products' },
    // Only show Dashboard if user role is company
    ...(role === 'company' ? [{ label: 'Dashboard', path: '/dashboard' }] : []),
  ];

  // Active route check
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="sticky top-0 z-50 border-b border-[rgba(96,117,138,0.1)] bg-[#F3F5F7]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white shadow-soft-sm">
            <Bot className="h-[18px] w-[18px] text-[#111315]" />
          </div>
          <span className="text-[17px] font-semibold tracking-tight text-[#111315]">
            Mantis
          </span>
        </Link>

        {/* Desktop navigation links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[14px] font-medium transition-colors duration-200 ${
                isActive(link.path)
                  ? 'text-[#111315]'
                  : 'text-[#60758A] hover:text-[#111315]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop action buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-[14px] font-medium text-[#60758A] transition-colors duration-200 hover:text-[#111315]">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              to="/profile"
              className="text-[14px] font-medium text-[#60758A] transition-colors duration-200 hover:text-[#111315] mr-2"
            >
              Profile
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <Link
            to="/products"
            className="flex items-center gap-2 rounded-2xl border border-[rgba(96,117,138,0.15)] bg-white px-5 py-2 text-[14px] font-medium text-[#111315] shadow-soft-sm transition-all duration-200 hover:bg-[#EEF2F5]"
          >
            Start Diagnosis
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#111315] transition hover:bg-white md:hidden"
        >
          {menuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="border-t border-[rgba(96,117,138,0.1)] bg-white px-6 py-4 md:hidden">
          <div className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-[14px] font-medium text-[#60758A] transition hover:bg-[#F3F5F7] hover:text-[#111315]"
              >
                {link.label}
              </Link>
            ))}
            <SignedIn>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block rounded-2xl px-4 py-3 text-[14px] font-medium text-[#60758A] transition hover:bg-[#F3F5F7] hover:text-[#111315]"
              >
                Profile
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left block rounded-2xl px-4 py-3 text-[14px] font-medium text-[#60758A] transition hover:bg-[#F3F5F7] hover:text-[#111315]"
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
          <div className="mt-4 border-t border-[rgba(96,117,138,0.1)] pt-4">
            <Link
              to="/products"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#111315] px-5 py-3 text-[14px] font-medium text-white"
            >
              Start Diagnosis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;