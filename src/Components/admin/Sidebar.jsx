import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  Category as CategoryIcon,
  People as PeopleIcon,
  LocalOffer as LocalOfferIcon,
  Restaurant as RestaurantIcon,
} from "@mui/icons-material";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.name) {
          setUserName(user.name);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, route: "dashboard" },
    { name: "Products", icon: <InventoryIcon />, route: "products/dashboard" },
    { name: "Orders", icon: <ShoppingCartIcon />, route: "orders" },
    { name: "Categories", icon: <CategoryIcon />, route: "categories" },
    { name: "Employees", icon: <PeopleIcon />, route: "employees" },
    { name: "Offers", icon: <LocalOfferIcon />, route: "offers" },
    { name: "Kitchen Logs", icon: <RestaurantIcon />, route: "/kitchen logs" },
  ];

  const handleClick = (item) => {
    setActive(item);
    const route = `/admin/${item}`;
    navigate(route);
  };

  return (
    <Box
      sx={{
        gridRow: "2 / 12",
        gridColumn: "1 / 2",
        bgcolor: "white",
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        maxHeight: "90vh",
        boxShadow: "2px 0 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Menu Items */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <List sx={{ py: 0 }}>
          {menuItems.map((item) => (
            <ListItem key={item.name} disablePadding>
              <ListItemButton
                onClick={() => handleClick(item.route)}
                sx={{
                  py: 2,
                  px: 2,
                  position: "relative",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "#f5f5f5",
                    "& .MuiListItemIcon-root": {
                      color: "#667eea",
                    },
                    "& .MuiListItemText-primary": {
                      color: "#667eea",
                    },
                  },
                  ...(active === item.name && {
                    bgcolor: "#667eea08",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: "4px",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "0 4px 4px 0",
                    },
                  }),
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: active === item.name ? "#667eea" : "#757575",
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontSize: "0.875rem",
                    fontWeight: active === item.name ? 600 : 400,
                    color: active === item.name ? "#667eea" : "#424242",
                    transition: "all 0.2s ease",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          bgcolor: "#fafafa",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#757575",
            fontSize: "0.875rem",
          }}
        >
          Logged in as {userName}
        </Typography>
      </Box>
    </Box>
  );
}
