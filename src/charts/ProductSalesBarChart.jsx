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

export default function ProductSalesBarChart({ date }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/products/sales/summary", {
          params: { date },
        });
        const data = res.data.data;

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
      }
    };

    fetchData();
  }, [date]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Product Sales Summary (${date || "Today"})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: false,
        },
      },
      x: {
        ticks: {
          display: false, // hides product names
        },
        grid: {
          display: false, // removes grid lines
        },
        title: {
          display: false,
          label: "Product",
        },
      },
    },
  };

  return (
    <div className="w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}
