import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { Transition } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { Add01FreeIcons } from "@hugeicons/core-free-icons";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    category: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const handleDeleteClick = (category) =>
    setDeleteDialog({ open: true, category });
  const handleDeleteCancel = () =>
    setDeleteDialog({ open: false, category: null });

  const handleDeleteConfirm = async () => {
    const { category } = deleteDialog;
    try {
      await axios.delete(`categories/${category.id}`);
      setCategories(categories.filter((c) => c.id !== category.id));
      setDeleteDialog({ open: false, category: null });
    } catch (err) {
      console.error(err);
      alert("Failed to delete category.");
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="max-h-[90vh] overflow-y-auto bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-purple-600 mb-1">
              Categories
            </h1>
            <p className="text-gray-500">Manage your product categories</p>
          </div>
          <button
            onClick={() => navigate("/admin/categories/add")}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl font-semibold bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all"
          >
            <img src="/plus.png" alt="Add" className="h-5 w-5" />
            Add Category
          </button>
        </div>

        {/* Categories List */}
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-3xl bg-white text-center">
            <img
              src="/category-icon.svg"
              alt=""
              className="h-20 w-20 mb-4 text-gray-400"
            />
            <h2 className="text-xl font-semibold mb-1">No categories yet</h2>
            <p className="text-gray-500">
              Get started by adding your first category
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {categories.map((category, index) => (
              <Transition
                appear
                show={true}
                key={category.id}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
              >
                <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:border-indigo-500 transition-all">
                  {/* Category Header */}
                  <div
                    onClick={() =>
                      setExpandedId(
                        expandedId === category.id ? null : category.id
                      )
                    }
                    className="flex justify-between items-center p-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 flex items-center justify-center rounded-xl border border-indigo-300 bg-indigo-100/20">
                        <img
                          src="/categorization.png"
                          alt=""
                          className="h-7 w-7 text-indigo-500"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {category.name}
                        </h3>
                        <p className="text-gray-500 truncate">
                          {category.description || "No description"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/admin/categories/edit/${category.id}`);
                        }}
                        className="p-2 rounded-full hover:bg-indigo-100/50 hover:text-indigo-500 transition-all"
                      >
                        <img src="/edit.png" alt="" className="h-6 w-6" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(category);
                        }}
                        className="p-2 rounded-full hover:bg-red-100/50 hover:text-red-600 transition-all"
                      >
                        <img src="/delete (1).png" alt="" className="h-6 w-6" />
                      </button>
                      <div
                        className={`transform transition-transform duration-300 ${
                          expandedId === category.id ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === category.id && (
                    <div className="bg-gray-50 border-t border-gray-200 p-4 flex flex-col gap-3">
                      <div className="flex items-start gap-2">
                        <img
                          src="/info.png"
                          alt=""
                          className="h-5 w-5 mt-0.5 text-indigo-500"
                        />
                        <div>
                          <p className="font-semibold">Description:</p>
                          <p className="text-gray-500">
                            {category.description || "No description provided"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src="/calendar.png"
                          alt=""
                          className="h-5 w-5 text-indigo-500"
                        />
                        <div>
                          <p className="font-semibold">Created:</p>
                          <p className="text-gray-500">
                            {formatDate(category.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <img
                          src="/calendar.png"
                          alt=""
                          className="h-5 w-5 text-indigo-500"
                        />
                        <div>
                          <p className="font-semibold">Last Updated:</p>
                          <p className="text-gray-500">
                            {formatDate(category.updated_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Transition>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      {deleteDialog.open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100">
                <img
                  src="/warning.svg"
                  alt=""
                  className="h-6 w-6 text-red-600"
                />
              </div>
              <h2 className="text-lg font-semibold">Delete Category</h2>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete{" "}
              <strong>"{deleteDialog.category?.name}"</strong>? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all"
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
