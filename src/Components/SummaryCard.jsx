import { useEffect, useState } from "react";
import axios from "../api/axios"; // your axios instance

export default function SummaryCard() {
  const [summary, setSummary] = useState({
    total_orders: 0,
    total_quantity_sold: 0,
    total_revenue: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("/categories/statistics");
        setSummary(res.data);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      }
    };

    fetchSummary();
  }, []);

  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
  };

  return (
    <div className="w-full bg-white p-10 mb-10">
      <div>
        <div className="border-b border-gray-200 mb-6">
          <h2 className="text-2xl text-black">Orders Summary</h2>
        </div>

        <div className="flex justify-between ">
          <div className="flex gap-2 items-center">
            <img
              src="/food-delivery.png"
              alt=""
              className="h-[50px] w-[50px]"
            />
            <div>
              <p>Total Orders Served</p>
              <h3 className="text-7xl font-medium">
                {formatNumber(summary.total_orders)}
              </h3>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <img src="/boxes.png" alt="" className="h-[50px] w-[50px]" />
            <div>
              <p>Total Quantity Sold</p>
              <h3 className="text-7xl font-medium">
                {formatNumber(summary.total_quantity_sold)}
              </h3>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <img src="/revenue.png" alt="" className="h-[50px] w-[50px]" />
            <div>
              <p>Total Revenue Generated</p>
              <h3 className="text-7xl font-medium">
                {formatNumber(summary.total_revenue)}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
