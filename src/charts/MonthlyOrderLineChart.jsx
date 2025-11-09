import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function MonthlyOrderLineChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/orders/monthly/data");
        const data = res.data.data;

        // Define all months in correct order
        const allMonths = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        // Create a lookup map from API
        const monthMap = {};
        data.forEach((item) => {
          monthMap[item.month] = {
            orders: item.orders,
            revenue: item.revenue,
          };
        });

        // Fill missing months with 0
        const orders = allMonths.map((m) => monthMap[m]?.orders || 0);
        const revenue = allMonths.map((m) => monthMap[m]?.revenue || 0);

        setChartData({
          labels: allMonths,
          datasets: [
            {
              label: "Number of Orders",
              data: orders,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              yAxisID: "y1", // separate axis for orders
              tension: 0.4,
            },
            {
              label: "Revenue",
              data: revenue,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              yAxisID: "y2", // separate axis for revenue
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch monthly data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Orders & Revenue",
      },
    },
    scales: {
      y1: {
        type: "linear",
        position: "left",
        beginAtZero: true,
        title: {
          display: true,
          text: "Orders",
        },
      },
      y2: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        grid: {
          drawOnChartArea: false, // don’t overlap grid lines
        },
        title: {
          display: true,
          text: "Revenue",
        },
      },
    },
  };

  return (
    <div className="w-250">
      <Line data={chartData} options={options} />
    </div>
  );
}
