import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import axios from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.password_confirmation)
      newErrors.password_confirmation = "Passwords do not match";

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
      const res = await axios.post("register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      setSuccess("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8f9fa",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Fade in>
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
              <Typography variant="h3" fontWeight={700} sx={{ mb: 1 }}>
                Register
              </Typography>
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
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    required
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation}
                    required
                  />
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
                      textTransform: "none",
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: "1rem",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      "&:hover": {
                        background:
                          "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                      },
                    }}
                  >
                    {loading ? "Registering..." : "Register"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/login")}
                    disabled={loading}
                    sx={{
                      textTransform: "none",
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: "1rem",
                      borderColor: "#667eea",
                      color: "#667eea",
                      "&:hover": { bgcolor: "#667eea08" },
                    }}
                  >
                    Go to Login
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
