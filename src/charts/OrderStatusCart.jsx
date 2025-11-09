// src/components/OrderStatusChart.jsx
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "../api/axios";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OrderStatusChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get("/orders/stats")
      .then((res) => {
        const statusData = res.data.orders_status_breakdown || {};

        const labels = Object.keys(statusData); // ['queued', 'completed', ...]
        const data = Object.values(statusData); // [5, 10, ...]

        setChartData({
          labels,
          datasets: [
            {
              label: "Orders by Status",
              data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(54, 162, 235, 0.6)",
                "rgba(255, 206, 86, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((err) => console.error(err));
  }, []);

  if (!chartData) return <p>Loading chart...</p>;

  return (
    <div style={{ width: "400px" }} className="">
      <h2 className="text-xl mb-4">Orders Status Breakdown</h2>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: true,
              position: "bottom", // move legend below the chart
            },
            tooltip: {
              enabled: true,
            },
          },
        }}
      />
    </div>
  );
}
