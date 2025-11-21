import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { ChevronsDown } from "lucide-react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    product: null,
  });
  const navigate = useNavigate();

  // Fetch categories and products initially
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/categories/names");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const fetchProducts = async (categoryId = "") => {
    try {
      const url = categoryId
        ? `/categories/products/${categoryId}`
        : `/d/categories/products`;
      const res = await axios.get(url);
      const data = res.data.products;
      console.log(data);
      setProducts(data);
      console.log(products);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  };

  const handleDeleteClick = (product) => {
    setDeleteDialog({ open: true, product });
  };

  const handleDeleteConfirm = async () => {
    const { product } = deleteDialog;
    try {
      await axios.delete(`products/${product.id}`);
      setProducts(products.filter((p) => p.id !== product.id));
      setDeleteDialog({ open: false, product: null });
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="max-h-[90vh] bg-[#f8f9fa] py-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1
              className="text-4xl font-bold mb-1 bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              Products
            </h1>
            <p className="text-gray-600">Manage your product inventory</p>
          </div>
          <button
            onClick={() => navigate("/admin/products/add")}
            className="flex items-center gap-2 px-4 py-2.5 font-semibold rounded-md text-white"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
            }}
          >
            <img src="/plus.png" alt="" className="w-5 h-5" />
            Add Product
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex justify-start">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#667eea]"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product List */}
        {products?.length === 0 ? (
          <div className="p-10 text-center rounded-xl border-2 border-dashed border-gray-300 bg-white">
            <img
              src="/empty.png"
              alt=""
              className="w-20 h-20 mx-auto opacity-60 mb-3"
            />
            <h2 className="text-xl font-semibold mb-1">No products yet</h2>
            <p className="text-gray-600">
              Get started by adding your first product
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-300 rounded-xl bg-white hover:border-[#667eea] transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                {/* Header */}
                <div
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === product.id ? null : product.id)
                  }
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div
                      className="w-14 h-14 flex items-center justify-center rounded-lg"
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea20 0%, #764ba220 100%)",
                        border: "1px solid #667eea30",
                      }}
                    >
                      <img src="/box.png" alt="" className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-base">{product.name}</p>
                      <div className="flex gap-4 items-center mt-1">
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          Rs.
                          {product.price}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <img src="/box.png" alt="" className="w-4 h-4" />
                          Stock: {product.stock}
                        </div>
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-md ${
                            product.is_active
                              ? "bg-[#667eea15] text-[#667eea] border border-[#667eea30]"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {product.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/products/edit/${product.id}`);
                      }}
                      className="p-1.5 rounded-md hover:bg-[#667eea10]"
                    >
                      <img src="/edit.png" alt="" className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(product);
                      }}
                      className="p-1.5 rounded-md hover:bg-[#f4433610]"
                    >
                      <img src="/delete (1).png" alt="" className="w-5 h-5" />
                    </button>

                    <ChevronsDown className="w-5 h-5" />
                  </div>
                </div>

                {/* Expanded */}
                {expandedId === product.id && (
                  <div className="bg-[#fafafa] border-t border-gray-200 p-4 text-sm text-gray-700 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#667eea]">
                            Price:
                          </span>
                          Rs.{product.price}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#667eea]">
                            Stock:
                          </span>
                          {product.stock}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#667eea]">
                            Category:
                          </span>
                          {product.category?.name || "Uncategorized"}
                        </div>
                      </div>

                      {product.offers && product.offers.length > 0 && (
                        <div>
                          <p className="font-semibold text-[#764ba2] mb-2">
                            Active Offers:
                          </p>
                          <div className="space-y-2">
                            {product.offers.map((offer) => (
                              <div
                                key={offer.id}
                                className="flex justify-between items-center px-3 py-2 rounded-md border border-[#764ba230] bg-[#764ba210]"
                              >
                                <p>{offer.title}</p>
                                <span className="px-2 py-0.5 rounded-md border border-[#764ba230] bg-[#764ba220] text-[#764ba2] font-semibold text-xs">
                                  {offer.value}
                                  {offer.offer_kind === "percentage" ? "%" : ""}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      {deleteDialog.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-xl w-[400px] p-5 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#f4433610]">
                <img src="/warning.png" alt="" className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold">Delete Product</h3>
            </div>
            <p className="text-gray-700">
              Are you sure you want to delete{" "}
              <strong>"{deleteDialog.product?.name}"</strong>? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteDialog({ open: false, product: null })}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-md text-white bg-[#f44336] hover:bg-[#d32f2f]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
