import { useState } from "react";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menuItems = [
    "Dashboard",
    "Products",
    "Orders",
    "Categories",
    "Employees",
    "Offers",
    "Kitchen Logs",
  ];

  return (
    <div className="row-span-10 row-start-2 col-span-1 bg-black border-x border-gray-100 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <ul className="text-gray-200">
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => setActive(item)}
              className={`p-4 cursor-pointer hover:bg-gray-800 ${
                active === item ? "bg-gray-900 font-semibold" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-gray-700 text-gray-400 text-sm">
        Logged in as Admin
      </div>
    </div>
  );
}
