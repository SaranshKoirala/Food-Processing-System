import { useState, useEffect } from "react";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentMedia, setCurrentMedia] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    stock: "",
    food_type: "",
    course_type: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          axios.get(`/products/${id}`),
          axios.get("/categories/names"),
        ]);

        const product = productRes.data;
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          category_id: product.category_id || "",
          stock: product.stock || "",
          food_type: product.food_type || "",
          course_type: product.course_type || "",
        });

        if (product.media) {
          setCurrentMedia(product.media);
          setImagePreview(
            `${import.meta.env.VITE_API_BASE_URL}/storage/${
              product.media.file_path
            }`
          );
        }

        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load product details");
      } finally {
        setFetchingProduct(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(
      currentMedia
        ? `${import.meta.env.VITE_API_BASE_URL}/storage/${
            currentMedia.file_path
          }`
        : null
    );
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
    if (!formData.course_type)
      newErrors.course_type = "Course type is required";

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
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("description", formData.description || "");
      fd.append("price", formData.price);
      fd.append("category_id", formData.category_id);
      fd.append("stock", formData.stock);
      fd.append("food_type", formData.food_type.toLowerCase());
      fd.append("course_type", formData.course_type.toLowerCase());

      if (image) {
        fd.append("image", image);
      }

      // Use POST with _method for Laravel
      fd.append("_method", "PUT");

      const res = await axios.post(`/products/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess(res.data.message || "Product updated successfully!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      else if (err.response?.data?.message) setError(err.response.data.message);
      else setError("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/products");
  };

  if (fetchingProduct) {
    return (
      <div className="max-h-screen overflow-y-auto bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="h-12 bg-gray-200 rounded w-64"></div>
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <div className="space-y-4">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-screen overflow-y-auto bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="animate-fadeIn mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-[#667eea] hover:bg-[#667eea10] px-3 py-2 rounded-lg transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Edit Product
          </h1>
          <p className="text-gray-600 mt-2">Update the product details</p>
        </div>

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

        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm animate-fadeIn">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>

              {imagePreview ? (
                <div className="relative w-full h-64 rounded-xl overflow-hidden border-2 border-gray-200 group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
                    >
                      <X size={24} />
                    </button>
                  </div>
                  {image && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                      New Image
                    </div>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#667eea] hover:bg-gray-50 transition-all duration-300">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WEBP, GIF or SVG (MAX. 2MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}

              {!imagePreview && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
              )}

              {imagePreview && !image && (
                <label
                  htmlFor="image-upload"
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#667eea] text-white rounded-lg hover:bg-[#5568d3] transition-colors cursor-pointer"
                >
                  <Upload size={18} />
                  Change Image
                </label>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />

              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>

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
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all`}
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all resize-none"
                placeholder="Enter product description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                    errors.price ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

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
                    errors.stock ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all`}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.category_id ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-[#667eea] focus:border-transparent bg-white transition-all`}
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Food Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="food_type"
                  value={formData.food_type}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.food_type ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#667eea] focus:border-transparent bg-white transition-all`}
                >
                  <option value="">Select food type</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                  <option value="drinks">Drinks</option>
                </select>
                {errors.food_type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.food_type}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="course_type"
                  value={formData.course_type}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.course_type ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#667eea] focus:border-transparent bg-white transition-all`}
                >
                  <option value="">Select course type</option>
                  <option value="appetizer">Appetizer</option>
                  <option value="main">Main</option>
                  <option value="dessert">Dessert</option>
                </select>
                {errors.course_type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.course_type}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Updating..."
                ) : (
                  <>
                    <Save size={20} /> Update Product
                  </>
                )}
              </button>

              <button
                onClick={handleBack}
                disabled={loading}
                className="flex-1 border-2 border-[#667eea] text-[#667eea] py-3 rounded-xl font-semibold hover:bg-[#667eea] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { 
          from {opacity:0; transform:translateY(10px);} 
          to {opacity:1; transform:translateY(0);} 
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      `}</style>
    </div>
  );
}
