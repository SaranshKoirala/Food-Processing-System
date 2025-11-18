import { IoIosLogOut } from "react-icons/io";
import { FaKitchenSet } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { LuCookingPot } from "react-icons/lu";
import { FiPackage } from "react-icons/fi";
import { MdOutlineDone } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Kitchen() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log("orders", orders);

  const foodStatus = [
    {
      id: 0,
      statusValue: "all",
      label: "All Order",
      logo: <FaKitchenSet className="font-bold text-lg" />,
    },
    {
      id: 1,
      statusValue: "queued",
      label: "New Order",
      logo: <IoMdTime className="font-bold text-lg" />,
    },
    {
      id: 2,
      statusValue: "processing",
      label: "Preparing",
      logo: <LuCookingPot className="font-bold text-lg" />,
    },
    {
      id: 3,
      statusValue: "ready", // Changed from 'ready' to 'served'
      label: "Ready", // Changed from 'Ready' to 'Served'
      logo: <FiPackage className="font-bold text-lg" />,
    },
    {
      id: 4,
      statusValue: "completed",
      label: "Completed",
      logo: <MdOutlineDone className="font-bold text-lg" />,
    },
  ];

  // Fetch orders when selectedStatus changes
  useEffect(() => {
    fetchOrdersByStatus(selectedStatus);
  }, [selectedStatus]);

  const fetchOrdersByStatus = async (status) => {
    try {
      setLoading(true);

      if (status === "all") {
        // Fetch all orders
        const res = await axios.get("http://127.0.0.1:8000/api/orders");
        let allOrders = res.data.orders || res.data || [];

        console.log("Fetched all orders:", allOrders);

        // Sort by created_at (oldest first for FCFS)
        const sortedOrders = allOrders.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        setOrders(sortedOrders);
      } else {
        // Fetch orders by specific status
        const res = await axios.get(
          `http://127.0.0.1:8000/api/orders?status=${status}`
        );
        let statusOrders = res.data.orders || res.data || [];

        console.log(`Fetched orders with status '${status}':`, statusOrders);

        // Double-check: Filter on frontend as well to ensure correct status
        statusOrders = statusOrders.filter((order) => order.status === status);

        console.log(
          `After filtering, orders with status '${status}':`,
          statusOrders
        );

        // Sort by created_at (oldest first for FCFS)
        const sortedOrders = statusOrders.sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );

        setOrders(sortedOrders);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      if (err.response) {
        console.error("Error details:", err.response.data);
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  function handleFoodStatus(status) {
    setSelectedStatus(status);
    console.log("Selected status:", status);
  }

  async function handleLogout() {
    try {
      localStorage.removeItem("user");

      delete axios.defaults.headers.common["Authorization"];
      const res = axios.post("http://127.0.0.1:8000/api/logout");
      const data = res.data;
      toast.success("You are logged out!");
      navigate("/");
    } catch (e) {
      console.log("Something happened while logging out.");
      toast.error("Couldn't logout!");
    }
  }

  // Function to update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/orders/${orderId}/status`, {
        status: newStatus,
      });

      console.log(`Order ${orderId} updated to ${newStatus}`);

      // Refresh orders after update
      fetchOrdersByStatus(selectedStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
      if (err.response) {
        console.error("Error details:", err.response.data);
      }
      alert("Failed to update order status");
    }
  };

  return (
    <div className="bg-amber-500/5 min-h-screen">
      {/* <Navbar backStatus={true} cartStatus={false} /> */}
      <div className="px-17 py-6">
        <div className="flex justify-between items-center mb-10">
          <div className="flex justify-start items-center gap-4 w-fit text-amber-500">
            <FaKitchenSet className="text-6xl" />
            <div>
              <h1 className="font-bold text-4xl">Kitchen Dashboard</h1>
              <p className="text-black/40">
                Manage and track all orders in real-time
              </p>
            </div>
          </div>
          <button
            className="flex justify-center items-center gap-2 hover:bg-red-200 px-3 py-2 border border-amber-500/30 hover:border-red-500 rounded-xl hover:text-red-500 text-sm cursor-pointer"
            onClick={handleLogout}
          >
            <IoIosLogOut /> <p>Logout</p>
          </button>
        </div>

        {/* Status Filter Buttons */}
        <ul className="flex flex-wrap justify-start items-center gap-8 mb-10 font-medium text-sm">
          {foodStatus.map((item) => (
            <button
              key={item.id}
              className={
                selectedStatus === item.statusValue
                  ? "group bg-amber-500 px-3 py-2 border border-amber-500/20 rounded-xl text-white cursor-pointer flex justify-center items-center gap-2 w-35 transition-all duration-300"
                  : "group hover:scale-105 transition-all duration-300 px-4 py-2 border border-amber-500 rounded-xl text-sm cursor-pointer w-35 flex justify-center items-center gap-2 bg-white"
              }
              onClick={() => handleFoodStatus(item.statusValue)}
            >
              {item.logo}
              <p>{item.label}</p>
            </button>
          ))}
        </ul>

        {/* Orders Display */}
        {loading ? (
          <div className="flex justify-center items-center bg-white border border-amber-500 border-dashed rounded-2xl w-full h-70">
            <p className="text-black/50">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex justify-center items-center bg-white border border-amber-500 border-dashed rounded-2xl w-full h-70">
            <div className="flex flex-col justify-center items-center gap-3 text-black/50">
              <FaKitchenSet className="text-6xl" />
              <p>
                No {selectedStatus === "all" ? "" : selectedStatus} Orders Yet
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* Orders Count */}
            <div className="mb-4">
              <p className="font-semibold text-amber-600 text-lg">
                {orders.length}{" "}
                {selectedStatus === "all"
                  ? "Total"
                  : selectedStatus.charAt(0).toUpperCase() +
                    selectedStatus.slice(1)}{" "}
                Order{orders.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Orders Grid */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white shadow-sm hover:shadow-md p-6 border border-amber-500/20 rounded-2xl transition-shadow"
                >
                  {/* Order Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl">Order #{order.id}</h3>
                    <span
                      className={`px-3 py-1 rounded-full font-medium text-sm ${
                        order.status === "queued"
                          ? "bg-orange-500/10 text-orange-600"
                          : order.status === "processing"
                          ? "bg-blue-500/10 text-blue-600"
                          : order.status === "ready"
                          ? "bg-green-500/10 text-green-600" // Changed from 'ready'
                          : order.status === "completed"
                          ? "bg-gray-500/10 text-gray-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}
                    >
                      {order.status === "queued"
                        ? "New Order"
                        : order.status === "processing"
                        ? "Preparing"
                        : order.status === "ready"
                        ? "Ready" // Changed from 'Ready'
                        : order.status === "completed"
                        ? "Completed"
                        : order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                    </span>
                  </div>

                  {/* Table Number */}
                  <p className="mb-4 text-black">
                    <span className="font-semibold">Table:</span>{" "}
                    {order.table_number}
                  </p>

                  {/* Order Items */}
                  <div className="mb-4 pl-4">
                    <p className="mb-1 text-black/50">Items:</p>
                    <ul className="h-16 overflow-y-scroll scrollbar-hide">
                      {order.order_items?.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between items-center gap-1 bg-amber-500/5 rounded text-sm"
                        >
                          <div>
                            <span className="mr-1 font-semibold">
                              {item.quantity}x
                            </span>
                            <span>{item.product?.name || "Unknown Item"}</span>
                          </div>
                          <div>
                            <span>{item.grand_total}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* <p className='mb-4 text-black/40 text-xs'>
                    Ordered: {new Date(order.created_at).toLocaleString()}
                  </p> */}

                  {/* Status Update Buttons */}
                  <div className="flex gap-2 w-full">
                    {order.status === "queued" && (
                      <button
                        onClick={() =>
                          updateOrderStatus(order.id, "processing")
                        }
                        className="flex justify-center items-center gap-1 bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg w-full text-white text-sm transition-colors"
                      >
                        <LuCookingPot /> Start Preparing
                      </button>
                    )}
                    {order.status === "processing" && (
                      <button
                        onClick={() => updateOrderStatus(order.id, "ready")} // Changed from 'ready'
                        className="flex justify-center items-center gap-1 bg-green-500 hover:bg-green-600 px-3 py-1 rounded-lg w-full text-white text-sm transition-colors"
                      >
                        <FiPackage /> Mark Ready{" "}
                        {/* Changed from 'Mark Ready' */}
                      </button>
                    )}
                    {order.status === "ready" && ( // Changed from 'ready'
                      <button
                        onClick={() => updateOrderStatus(order.id, "completed")}
                        className="flex justify-center items-center gap-1 bg-purple-500 hover:bg-purple-600 px-3 py-1 rounded-lg w-full text-white text-sm transition-colors"
                      >
                        <MdOutlineDone /> Complete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
