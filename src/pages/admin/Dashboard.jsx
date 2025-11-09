import CategoryBarChart from "../../charts/CategoryBarChart";
import CategoryHourlyBarChart from "../../charts/CategoryHourlyBarChart";
import MonthlyOrderLineChart from "../../charts/MonthlyOrderLineChart";
import OrderStatusChart from "../../charts/OrderStatusCart";
import QueuedOrders from "../../Components/QueuedOrders";
import SummaryCard from "../../Components/SummaryCard";

export default function Dashboard({ children }) {
  const today = new Date().toISOString().split("T")[0]; // e.g. "2025-11-08"

  return (
    <div className="px-5 py-2 scrollbar-hide h-screen mx-h-[90vh] overflow-y-auto">
      <SummaryCard />

      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4 place-items-center">
        <OrderStatusChart />
        <MonthlyOrderLineChart />
      </div>

      <div className="grid grid-cols-2 mt-9">
        <QueuedOrders />
        <CategoryHourlyBarChart date={today} />
      </div>
    </div>
  );
}
