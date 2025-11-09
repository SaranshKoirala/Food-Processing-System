import { Routes, Route } from 'react-router-dom';
import Hero from './Components/Hero';
import Menu from './Components/Menu';
import Layout from './Components/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import AddProduct from './Components/AddProduct';
import EditProduct from './Components/EditProduct';
import Categories from './pages/admin/Categories';
import AddCategory from './Components/AddCategory';
import EditCategory from './Components/EditCategory';
import Orders from './pages/admin/Orders';
import FoodDescription from './pages/menu/FoodDescription';
import Checkout from './pages/checkout/Checkout';

export default function App() {
  return (
    <Routes>
      <Route path={'/'} element={<Hero />} />
      <Route path={'/menu'} element={<Menu />} />
      <Route path={'/menu/:id'} element={<FoodDescription />} />
      <Route path={'/checkout'} element={<Checkout />} />
      <Route path={'/admin'} element={<Layout />}>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='products' element={<Products />} />
        <Route path='products/add' element={<AddProduct />} />
        <Route path='products/edit/:id' element={<EditProduct />} />
        <Route path='categories' element={<Categories />} />
        <Route path='categories/add' element={<AddCategory />} />
        <Route path='categories/edit/:id' element={<EditCategory />} />
        <Route path='orders' element={<Orders />} />
      </Route>
    </Routes>
  );
}
