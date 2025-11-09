import { Routes, Route } from "react-router-dom";
import Hero from "./Components/Hero";
import Menu from "./Components/Menu";
import Layout from "./Components/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path={"/"} element={<Hero />} />
      <Route path={"/menu"} element={<Menu />} />
      <Route path={"/admin"} element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
