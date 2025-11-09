import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

export default function Navbar({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout");

      localStorage.removeItem("user");

      delete axios.defaults.headers.common["Authorization"];

      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      navigate("/login", { replace: true });
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        gridColumn: "span 10",
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
        minHeight: "10vh",
        display: "flex",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          component="h1"
          sx={{
            fontSize: "1.25rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Online Food Processing System
        </Typography>

        {/* Logout Button */}
        <Button
          variant="outlined"
          startIcon={<LogoutOutlined />}
          onClick={handleLogout}
          sx={{
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            borderColor: "#667eea",
            color: "#667eea",
            px: 3,
            py: 1,
            borderRadius: 2,
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#667eea",
              bgcolor: "#667eea08",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
