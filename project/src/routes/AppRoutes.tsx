import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Login from "../pages/login";
import Signup from "../pages/SignUp";
import Resources from "../pages/resources";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />

      <Route path="/products" element={<Products />} />

      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/resources" element={<Resources />} />
    </Routes>
  );
}

export default AppRoutes;