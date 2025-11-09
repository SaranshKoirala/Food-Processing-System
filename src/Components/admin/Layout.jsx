import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div class="grid grid-cols-10 grid-rows-10 min-h-screen">
      <Navbar />
      <Sidebar />
      <div class="col-span-10 row-span-10 row-start-2 bg-blue bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
}
