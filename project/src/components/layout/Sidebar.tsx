// Dashboard sidebar with navigation and active route states
import { Link, useLocation } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import {
  LayoutDashboard,
  Package,
  Plus,
  Bot,
  X,
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

// Sidebar navigation items
const navItems = [
  { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Products', path: '/dashboard/products', icon: Package },
  { label: 'Add Product', path: '/dashboard/products/new', icon: Plus },
];

function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  // Match active route for highlighting
  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] border-r border-[rgba(96,117,138,0.1)] bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo header */}
        <div className="flex h-16 items-center justify-between border-b border-[rgba(96,117,138,0.1)] px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#F3F5F7]">
              <Bot className="h-[18px] w-[18px] text-[#111315]" />
            </div>
            <span className="text-[16px] font-semibold tracking-tight text-[#111315]">
              Mantis
            </span>
          </Link>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#60758A] transition hover:bg-[#F3F5F7] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="mt-6 space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-[14px] font-medium transition ${
                  active
                    ? 'bg-[#111315] text-white'
                    : 'text-[#60758A] hover:bg-[#F3F5F7] hover:text-[#111315]'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-[rgba(96,117,138,0.1)] p-4">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-2xl px-4 py-3 text-[13px] font-medium text-[#60758A] transition hover:bg-[#F3F5F7] hover:text-[#111315]"
          >
            ← Back to Platform
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
