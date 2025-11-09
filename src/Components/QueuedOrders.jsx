import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function QueuedOrders() {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    async function fetchOrdersByStatus(status) {
      try {
        const res = await axios.get(`/orders/status/${status}`);
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    }

    fetchOrdersByStatus("queued"); // fetch pending orders initially
  }, []);

  const toggleDropdown = (orderId) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  return (
    <div className="w-full bg-white px-6 pt-6 rounded-lg shadow h-90 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Queued Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No pending orders.</p>
      ) : (
        <div className="space-y-4 max-h-60 overflow-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleDropdown(order.id)}
              >
                <div>
                  <p className="font-semibold">
                    Table No: {order.table_number}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Total: Rs. {order.total_amount ?? "0.00"}
                </p>
              </div>

              {expandedOrderId === order.id && (
                <div className="mt-3 pl-4 border-t border-gray-200 pt-3">
                  <h4 className="text-sm font-semibold mb-2">
                    Products in this order:
                  </h4>
                  {order.order_items?.length > 0 ? (
                    <ul className="list-disc pl-6 space-y-1">
                      {order.order_items.map((item) => (
                        <li key={item.id} className="text-sm text-gray-700">
                          <div>
                            <p>{item.product?.name ?? "Unknown Product"}</p>
                            <p>
                              Qty: {item.quantity}, Subtotal: Rs.{" "}
                              {item.grand_total}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">No products found.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
