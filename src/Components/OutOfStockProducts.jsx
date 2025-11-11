import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function OutOfStockProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOutOfStock = async () => {
      try {
        const res = await axios.get("/products/out-of-stock");
        setProducts(res.data.out_of_stock_products || []);
      } catch (error) {
        console.error("Failed to fetch out-of-stock products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOutOfStock();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <div className="w-full bg-white p-8 mb-10 rounded-lg shadow-sm max-h-130 overflow-y-auto scrollbar-hide">
      <div className="border-b border-gray-200 mb-6 flex justify-between items-center">
        <h2 className="text-2xl pb-4 text-black font-semibold">
          Products Low on Stock
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No products are currently low on stock.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {product.name}
                  </td>
                  <td
                    className={`px-6 py-3 font-semibold ${
                      product.stock <= 5 ? "text-red-600" : "text-gray-800"
                    }`}
                  >
                    {product.stock}
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
