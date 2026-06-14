// Application route configuration with layout wrappers
import { Routes, Route } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';

import RoleProtectedRoute from '../components/auth/RoleProtectedRoute';

// Public pages
import Landing from '../pages/Landing';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import ProductChat from '../pages/ProductChat';
import Profile from '../pages/Profile';

// Dashboard pages
import DashboardOverview from '../pages/dashboard/DashboardOverview';
import DashboardProducts from '../pages/dashboard/DashboardProducts';
import ProductForm from '../pages/dashboard/ProductForm';
import ProductDocs from '../pages/dashboard/ProductDocs';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes with navbar and footer */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/:id/chat" element={<ProductChat />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>

      {/* Dashboard routes with sidebar layout */}
      <Route element={
        <ProtectedRoute>
          <RoleProtectedRoute allowedRole="company">
            <DashboardLayout />
          </RoleProtectedRoute>
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardOverview />} />
        <Route path="/dashboard/products" element={<DashboardProducts />} />
        <Route path="/dashboard/products/new" element={<ProductForm />} />
        <Route path="/dashboard/products/:id/edit" element={<ProductForm />} />
        <Route path="/dashboard/products/:id/docs" element={<ProductDocs />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;