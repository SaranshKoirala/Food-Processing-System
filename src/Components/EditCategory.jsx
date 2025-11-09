import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
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

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchingCategory, setFetchingCategory] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`categories/${id}`);
        const category = res.data;
        setFormData({
          name: category.name || "",
          description: category.description || "",
        });
      } catch (err) {
        console.error("Failed to fetch category:", err);
        setError("Failed to load category details");
      } finally {
        setFetchingCategory(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Category name is required";
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
      await axios.put(`categories/${id}`, formData);
      setSuccess("Category updated successfully!");
      setTimeout(() => navigate("/admin/categories"), 1500);
    } catch (err) {
      console.error("Failed to update category:", err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
        setError("Please fix the validation errors");
      } else {
        setError(err.response?.data?.message || "Failed to update category");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchingCategory) {
    return (
      <Box sx={{ maxHeight: "100vh", bgcolor: "#f8f9fa", py: 4 }}>
        <Container maxWidth="sm">
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
              </Stack>
            </Paper>
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ maxHeight: "100vh", bgcolor: "#f8f9fa", py: 4 }}>
      <Container maxWidth="sm">
        <Stack spacing={4}>
          <Fade in timeout={600}>
            <Box>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/admin/categories")}
                sx={{
                  color: "#667eea",
                  textTransform: "none",
                  mb: 2,
                  "&:hover": { bgcolor: "#667eea10" },
                }}
              >
                Back to Categories
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
                Edit Category
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                Update the category details
              </Typography>
            </Box>
          </Fade>

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
                    label="Category Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": { borderColor: "#667eea" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
                    }}
                  />
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
                        "&.Mui-focused fieldset": { borderColor: "#667eea" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
                    }}
                  />

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
                      {loading ? "Updating..." : "Update Category"}
                    </Button>

                    <Button
                      variant="outlined"
                      onClick={() => navigate("/admin/categories")}
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
