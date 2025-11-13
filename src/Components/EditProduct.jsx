import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Stack,
  CircularProgress,
  Alert,
  Fade,
  Skeleton,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import axios from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    stock: "",
    food_type: "", // added food_type
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoriesRes] = await Promise.all([
          axios.get(`products/${id}`),
          axios.get("categories"),
        ]);

        const product = productRes.data;
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          category_id: product.category_id || "",
          stock: product.stock || "",
          food_type: product.food_type || "", // autofill food_type
        });

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

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Price must be a positive number";
    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0)
      newErrors.stock = "Stock must be non-negative";
    if (!formData.category_id) newErrors.category_id = "Category is required";
    if (!formData.food_type) newErrors.food_type = "Food type is required"; // validation for food_type
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
      const response = await axios.put(`products/${id}`, {
        name: formData.name,
        description: formData.description || null,
        price: parseInt(formData.price),
        category_id: parseInt(formData.category_id),
        stock: parseInt(formData.stock),
        food_type: formData.food_type.toLowerCase(), // match backend validation
      });

      setSuccess("Product updated successfully!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (err) {
      console.error("Failed to update product:", err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        setError("Please fix the validation errors");
      } else {
        setError(err.response?.data?.message || "Failed to update product");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProduct) {
    return (
      <Box sx={{ maxHeight: "100vh", bgcolor: "#f8f9fa", py: 4 }}>
        <Container maxWidth="md">
          <Stack spacing={4}>
            <Box>
              <Skeleton variant="text" width={200} height={40} />
              <Skeleton variant="text" width={300} height={60} sx={{ mt: 1 }} />
            </Box>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid #e0e0e0",
                bgcolor: "white",
              }}
            >
              <Stack spacing={3}>
                <Skeleton variant="rectangular" height={56} />
                <Skeleton variant="rectangular" height={120} />
                <Skeleton variant="rectangular" height={56} />
                <Skeleton variant="rectangular" height={56} />
                <Skeleton variant="rectangular" height={56} />
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ maxHeight: "100vh", bgcolor: "#f8f9fa", py: 4 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          {/* Header */}
          <Fade in timeout={600}>
            <Box>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/admin/products")}
                sx={{
                  color: "#667eea",
                  textTransform: "none",
                  mb: 2,
                  "&:hover": { bgcolor: "#667eea10" },
                }}
              >
                Back to Products
              </Button>
              <Typography
                variant="h3"
                fontWeight={700}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Edit Product
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Update the product details
              </Typography>
            </Box>
          </Fade>

          {/* Alerts */}
          {error && (
            <Fade in>
              <Alert severity="error" onClose={() => setError("")}>
                {error}
              </Alert>
            </Fade>
          )}
          {success && (
            <Fade in>
              <Alert severity="success">{success}</Alert>
            </Fade>
          )}

          {/* Form */}
          <Fade in timeout={800}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                border: "1px solid #e0e0e0",
                bgcolor: "white",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                  />
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    error={!!errors.price}
                    helperText={errors.price}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    error={!!errors.stock}
                    helperText={errors.stock}
                    required
                  />
                  <TextField
                    fullWidth
                    select
                    label="Category"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    error={!!errors.category_id}
                    helperText={errors.category_id}
                    required
                  >
                    <MenuItem value="" disabled>
                      Select a category
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* Food Type */}
                  <TextField
                    fullWidth
                    select
                    label="Food Type"
                    name="food_type"
                    value={formData.food_type}
                    onChange={handleChange}
                    error={!!errors.food_type}
                    helperText={errors.food_type}
                    required
                  >
                    <MenuItem value="" disabled>
                      Select food type
                    </MenuItem>
                    <MenuItem value="veg">Veg</MenuItem>
                    <MenuItem value="non-veg">Non-Veg</MenuItem>
                    <MenuItem value="drinks">Drinks</MenuItem>
                  </TextField>

                  <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
                    <Button
                      variant="contained"
                      type="submit"
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <SaveIcon />
                        )
                      }
                      disabled={loading}
                    >
                      {loading ? "Updating..." : "Update Product"}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/admin/products")}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Stack>
              </form>
            </Paper>
          </Fade>
        </Stack>
      </Container>
    </Box>
  );
}
