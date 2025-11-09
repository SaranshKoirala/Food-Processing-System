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

export default function CategoryHourlyBarChart({ date }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`/categories/hourly/stats?date=${date}`);
        const data = res.data.data;

        // Extract all possible hours (0–23)
        const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

        // Extract all unique categories
        const categories = [...new Set(data.map((d) => d.category_name))];

        // Build datasets per category
        const datasets = categories.map((category, index) => {
          const backgroundColors = [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
          ];
          const color = backgroundColors[index % backgroundColors.length];

          const hourlyOrders = hours.map((_, hourIndex) => {
            const found = data.find(
              (d) => d.category_name === category && d.hour === hourIndex
            );
            return found ? found.total_orders : 0;
          });

          return {
            label: category,
            data: hourlyOrders,
            backgroundColor: color,
            borderWidth: 1,
          };
        });

        setChartData({ labels: hours, datasets });
      } catch (error) {
        console.error("Failed to fetch category hourly stats:", error);
      }
    };

    fetchStats();
  }, [date]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Hourly Orders by Category for ${date}`,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Orders",
        },
      },
    },
  };

  return (
    <div className="w-200">
      <Bar data={chartData} options={options} />;
    </div>
  );
}
