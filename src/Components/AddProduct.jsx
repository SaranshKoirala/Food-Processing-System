import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import axios from "../api/axios";

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch categories
    axios
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.stock) {
      newErrors.stock = "Stock is required";
    } else if (isNaN(formData.stock) || Number(formData.stock) < 0) {
      newErrors.stock = "Stock must be a non-negative number";
    }

    if (!formData.category_id) {
      newErrors.category_id = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/products", {
        name: formData.name,
        description: formData.description || null,
        price: parseInt(formData.price),
        category_id: parseInt(formData.category_id),
        stock: parseInt(formData.stock),
      });

      setSuccess("Product created successfully!");

      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (err) {
      console.error("Failed to create product:", err);

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        setError("Please fix the validation errors");
      } else {
        setError(err.response?.data?.message || "Failed to create product");
      }
    } finally {
      setLoading(false);
    }
  };

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
                  "&:hover": {
                    bgcolor: "#667eea10",
                  },
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
                Add New Product
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Fill in the details to create a new product
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
                  {/* Product Name */}
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#667eea",
                      },
                    }}
                  />

                  {/* Description */}
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#667eea",
                      },
                    }}
                  />

                  {/* Price */}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#667eea",
                      },
                    }}
                  />

                  {/* Stock */}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#667eea",
                      },
                    }}
                  />

                  {/* Category */}
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
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#667eea",
                      },
                    }}
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

                  {/* Submit Button */}
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
                      sx={{
                        flex: 1,
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                        textTransform: "none",
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: "1rem",
                        "&:hover": {
                          background:
                            "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                          boxShadow: "0 6px 25px rgba(102, 126, 234, 0.5)",
                        },
                        "&:disabled": {
                          background: "#e0e0e0",
                          color: "#9e9e9e",
                        },
                      }}
                    >
                      {loading ? "Creating..." : "Create Product"}
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() => navigate("/admin/products")}
                      disabled={loading}
                      sx={{
                        flex: 1,
                        borderColor: "#667eea",
                        color: "#667eea",
                        textTransform: "none",
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        fontSize: "1rem",
                        "&:hover": {
                          borderColor: "#667eea",
                          bgcolor: "#667eea08",
                        },
                      }}
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
