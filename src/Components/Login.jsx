import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
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
  Link,
} from "@mui/material";
import { Lock as LockIcon, Login as LoginIcon } from "@mui/icons-material";
import axios from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("/login", formData);

      if (!response.data.user || !response.data.token) {
        setError("The provided credentials are incorrect.");
        return;
      }

      console.log(response.data.token);

      const userData = response.data.user;
      const token = response.data.token;

      localStorage.setItem("user", JSON.stringify({ ...userData, token }));

      if (userData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        setError("You do not have access to the admin dashboard.");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", py: 8 }}>
      <Container maxWidth="sm">
        <Stack spacing={4}>
          {/* Header */}
          <Fade in timeout={600}>
            <Box textAlign="center">
              <LockIcon sx={{ fontSize: 64, color: "#667eea", mb: 2 }} />
              <Typography
                variant="h3"
                fontWeight={700}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                Admin Login
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Enter your credentials to access the dashboard
              </Typography>
            </Box>
          </Fade>

          {/* Error Alert */}
          {error && (
            <Fade in>
              <Alert severity="error" onClose={() => setError("")}>
                {error}
              </Alert>
            </Fade>
          )}

          {/* Login Form */}
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
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
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
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": { borderColor: "#667eea" },
                      },
                      "& .MuiInputLabel-root.Mui-focused": { color: "#667eea" },
                    }}
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <LoginIcon />
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
                      "&:disabled": { background: "#e0e0e0", color: "#9e9e9e" },
                    }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>

                  {/* Register Link */}
                  <Typography variant="body2" textAlign="center" mt={1}>
                    Don't have an account?{" "}
                    <Link component={RouterLink} to="/register">
                      Register
                    </Link>
                  </Typography>
                </Stack>
              </form>
            </Paper>
          </Fade>
        </Stack>
      </Container>
    </Box>
  );
}
