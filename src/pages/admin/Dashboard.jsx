import CategoryBarChart from "../../charts/CategoryBarChart";
import MonthlyOrderLineChart from "../../charts/MonthlyOrderLineChart";
import OrderStatusChart from "../../charts/OrderStatusCart";
import QueuedOrders from "../../Components/QueuedOrders";
import SummaryCard from "../../Components/SummaryCard";

export default function Dashboard({ children }) {
  return (
    <div className="px-5 py-2 h-screen scrollbar-hide overflow-y-auto">
      <SummaryCard />

      <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-4 place-items-center">
        <OrderStatusChart />
        <MonthlyOrderLineChart />
      </div>

      <QueuedOrders />
    </div>
  );
}
