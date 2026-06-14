// Dashboard layout with sidebar and responsive content area
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import { Menu } from 'lucide-react';

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F3F5F7]">
      {/* Dashboard sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 lg:ml-[280px]">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-[rgba(96,117,138,0.1)] bg-[#F3F5F7]/90 px-6 backdrop-blur-md lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#111315] transition hover:bg-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-[15px] font-semibold text-[#111315]">
            Mantis
          </span>
        </div>

        {/* Page outlet */}
        <main className="p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
