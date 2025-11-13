import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    stock: "",
    food_type: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/categories/names");
        setCategories(res.data); // expects array of {id, name}
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Price must be a positive number";
    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0)
      newErrors.stock = "Stock must be non-negative";
    if (!formData.category_id) newErrors.category_id = "Category is required";
    if (!formData.food_type) newErrors.food_type = "Food type is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/products", {
        name: formData.name,
        description: formData.description || null,
        price: parseInt(formData.price),
        category_id: parseInt(formData.category_id),
        stock: parseInt(formData.stock),
        food_type: formData.food_type.toLowerCase(), // match backend: veg, non-veg, drinks
      });

      setSuccess(res.data.message || "Product created successfully!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      else if (err.response?.data?.message) setError(err.response.data.message);
      else setError("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/products");
  };

  return (
    <div className="max-h-screen overflow-y-auto bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="animate-fadeIn mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#667eea] hover:bg-[#667eea10] px-3 py-2 rounded-lg transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Add New Product
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in the details to create a new product
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center justify-between animate-fadeIn mb-4">
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              className="text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg animate-fadeIn mb-4">
            {success}
          </div>
        )}

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm animate-fadeIn">
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
                } focus:ring-2 focus:outline-none transition-colors`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea] focus:outline-none transition-colors resize-none"
                placeholder="Enter product description"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
                } focus:ring-2 focus:outline-none transition-colors`}
                placeholder="Enter price"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.stock
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
                } focus:ring-2 focus:outline-none transition-colors`}
                placeholder="Enter stock quantity"
              />
              {errors.stock && (
                <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.category_id
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
                } focus:ring-2 focus:outline-none transition-colors bg-white`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category_id}
                </p>
              )}
            </div>

            {/* Food Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Type <span className="text-red-500">*</span>
              </label>
              <select
                name="food_type"
                value={formData.food_type}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.food_type
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#667eea] focus:ring-[#667eea]"
                } focus:ring-2 focus:outline-none transition-colors bg-white`}
              >
                <option value="">Select food type</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Drinks">Drinks</option>
              </select>
              {errors.food_type && (
                <p className="text-red-500 text-sm mt-1">{errors.food_type}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-3 rounded-xl font-semibold shadow-lg hover:from-[#5568d3] hover:to-[#6a3f8f] transition-all disabled:from-gray-300 disabled:to-gray-300 disabled:shadow-none disabled:text-gray-500"
              >
                {loading ? (
                  "Creating..."
                ) : (
                  <>
                    <Save size={20} /> Create Product
                  </>
                )}
              </button>
              <button
                onClick={handleBack}
                disabled={loading}
                className="flex-1 border-2 border-[#667eea] text-[#667eea] py-3 rounded-xl font-semibold text-base hover:bg-[#667eea08] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from {opacity:0; transform:translateY(10px);} to {opacity:1; transform:translateY(0);} }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      `}</style>
    </div>
  );
}
