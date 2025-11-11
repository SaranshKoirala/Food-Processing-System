import { useEffect, useState } from "react";
import axios from "../api/axios"; // your axios instance
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function ProductSummaryCard({ dateFrom, dateTo }) {
  const [summary, setSummary] = useState({
    total_orders: 0,
    total_quantity_sold: 0,
    total_revenue: 0,
    highest_sold_product: "",
    highest_sold_product_quantity: 0,
  });
  const [loading, setLoading] = useState(false);

  // Helper: format number to K/M
  const formatNumber = (num) => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num;
  };

  // Helper: format local date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);

      try {
        // Use today's date if not provided
        const from = dateFrom ? formatDate(dateFrom) : formatDate(new Date());
        const to = dateTo ? formatDate(dateTo) : formatDate(new Date());

        const res = await axios.get(
          `/order-items/summary?date_from=${from}&date_to=${to}`
        );

        setSummary(res.data);
      } catch (error) {
        console.error("Failed to fetch summary:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [dateFrom, dateTo]);

  return (
    <div className="w-full bg-white py-3 px-8 mb-10 shadow rounded-lg">
      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading summary...</p>
      ) : summary.total_quantity_sold === 0 ? (
        <div>
          <Link
            to="/admin/products"
            replace
            className="flex items-center  text-blue-600 hover:text-blue-800 font-medium transition-colors justify-end"
          >
            View all Products
            <ChevronRight className="w-4 h-4" />
          </Link>
          <p className="text-center text-gray-500 py-10">
            No sales found for selected date range.
          </p>
        </div>
      ) : (
        <div>
          <div className="border-b border-gray-200 mb-6 pb-4 flex justify-between items-center">
            <h2 className="text-2xl  font-semibold text-black">
              Products Summary
            </h2>

            <Link
              to="/admin/products"
              replace
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              View all Products
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex justify-between flex-wrap gap-6">
            {/* Highest Sold Product */}
            <div className="flex gap-3 items-center flex-1 min-w-[200px]">
              <img
                src="/food-delivery.png"
                alt="Highest Sold Product"
                className="h-12 w-12"
              />
              <div>
                <p className="text-sm text-gray-600">Highest Sold Product</p>
                <h3 className="text-4xl font-medium">
                  {summary.heighest_sold_product} (
                  {formatNumber(summary.heighest_sold_product_quantity)} pcs)
                </h3>
              </div>
            </div>

            {/* Total Quantity Sold */}
            <div className="flex gap-3 items-center flex-1 min-w-[200px]">
              <img
                src="/boxes.png"
                alt="Total Quantity Sold"
                className="h-12 w-12"
              />
              <div>
                <p className="text-sm text-gray-600">Total Quantity Sold</p>
                <h3 className="text-7xl font-semibold">
                  {formatNumber(summary.total_quantity_sold)}
                </h3>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="flex gap-3 items-center  min-w-[200px]">
              <img
                src="/revenue.png"
                alt="Total Revenue"
                className="h-12 w-12"
              />
              <div>
                <p className="text-sm text-gray-600">Total Revenue Generated</p>
                <h3 className="text-7xl font-semibold">
                  {formatNumber(summary.total_revenue)}
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
