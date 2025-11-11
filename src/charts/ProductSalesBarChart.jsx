import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ProductSalesBarChart({ dateFrom, dateTo }) {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);

  // Helper: format local date as YYYY-MM-DD
  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const today = new Date();
        const from = dateFrom ? dateFrom : today;
        const to = dateTo ? dateTo : today;

        const fromStr = formatDate(from);
        const toStr = formatDate(to);

        const res = await axios.get("/products/sales/summary", {
          params: { date_from: fromStr, date_to: toStr },
        });

        const data = res.data.data || [];
        const labels = data.map((item) => item.name);
        const quantities = data.map((item) => item.quantity);

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Quantity Sold",
              data: quantities,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch product sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateFrom, dateTo]);

  const fromLabel = formatDate(dateFrom || new Date());
  const toLabel = formatDate(dateTo || new Date());

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Product Sales Summary (${fromLabel} to ${toLabel})`,
      },
    },
    scales: {
      y: { beginAtZero: true },
      x: { ticks: { display: false }, grid: { display: false } },
    },
  };

  return (
    <div className="w-full">
      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading chart...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
}
