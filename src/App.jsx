import { Routes, Route, Navigate } from "react-router-dom";
import Hero from "./Components/Hero";
import Menu from "./Components/Menu";
import Layout from "./Components/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import AddProduct from "./Components/AddProduct";
import EditProduct from "./Components/EditProduct";
import Categories from "./pages/admin/Categories";
import AddCategory from "./Components/AddCategory";
import EditCategory from "./Components/EditCategory";
import Orders from "./pages/admin/Orders";
import FoodDescription from "./pages/menu/FoodDescription";
import Checkout from "./pages/checkout/Checkout";
import Login from "./Components/Login";
import ProtectedAdminRoute from "./Components/ProtectedAdminRoute";
import Register from "./Components/Register";
import ProductDashboard from "./pages/admin/ProductDashboard";
import PageNotFound from "./Components/PageNotFound";
import Employee from "./pages/admin/Employee";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/menu/:id" element={<FoodDescription />} />
      <Route path="/checkout" element={<Checkout />} />

      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products/dashboard" element={<ProductDashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="employees" element={<Employee />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
