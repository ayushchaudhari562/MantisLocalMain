// Public page layout with navbar and footer
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#F3F5F7] text-[#111315]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicLayout;
