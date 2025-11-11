import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const orderStatus = ["queued", "processing", "served", "completed"];
  const [selectedStatus, setSelectedStatus] = useState("");

  const fetchOrders = (status = "") => {
    const url = status ? `/orders/status/${status}` : "/orders";
    axios.get(url).then((res) => setOrders(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    fetchOrders(status);
  };

  return (
    <div className="max-h-[90vh] overflow-y-auto bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header with Status Dropdown */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600 mb-1">
              Orders
            </h1>
            <p className="text-gray-500">Manage your customer orders</p>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="mt-2 sm:mt-0 px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-transparent transition"
          >
            <option value="">All Statuses</option>
            {orderStatus.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-3xl bg-white text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M7 13h10"
              />
            </svg>
            <h2 className="text-xl font-semibold mb-1">No orders yet</h2>
            <p className="text-gray-500">Orders will appear here once placed</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-indigo-500 transition-all duration-300"
              >
                {/* Order Header */}
                <div
                  onClick={() =>
                    setExpandedId(expandedId === order.id ? null : order.id)
                  }
                  className="flex justify-between items-center p-4 cursor-pointer gap-4"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-indigo-300 bg-indigo-100/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M7 13h10"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        Order #{order.id} - Table {order.table_number}
                      </h3>
                      <p className="text-gray-500 truncate">
                        Status: {order.status}, Total: ${order.total_amount}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`transform transition-transform duration-300 ${
                      expandedId === order.id ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === order.id && (
                  <div className="bg-gray-50 border-t border-gray-200 p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">Created:</p>
                        <p className="text-gray-500">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">Last Updated:</p>
                        <p className="text-gray-500">
                          {formatDate(order.updated_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-500 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16h8M8 12h8m-8-4h8"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold">Order Items:</p>
                        {order.order_items.length === 0 ? (
                          <p className="text-gray-500">No items</p>
                        ) : (
                          order.order_items.map((item) => (
                            <p key={item.id} className="text-gray-500">
                              {item.quantity} × {item.product.name}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
