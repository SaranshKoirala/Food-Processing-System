import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Collapse,
  Paper,
  Stack,
  Divider,
  Fade,
  Grow,
} from "@mui/material";
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ShoppingCart as ShoppingCartIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";
import axios from "../../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderStats, setOrderStats] = useState({});
  const [expandedId, setExpandedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/orders").then((res) => setOrders(res.data));
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box
      sx={{ maxHeight: "90vh", bgcolor: "#f8f9fa", py: 4, overflowY: "auto" }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Header */}
          <Fade in timeout={600}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <Box>
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
                  Orders
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage your customer orders
                </Typography>
              </Box>
            </Box>
          </Fade>

          {/* Orders List */}
          {orders.length === 0 ? (
            <Fade in timeout={800}>
              <Paper
                elevation={0}
                sx={{
                  p: 8,
                  textAlign: "center",
                  borderRadius: 3,
                  border: "2px dashed #e0e0e0",
                  bgcolor: "white",
                }}
              >
                <ShoppingCartIcon
                  sx={{ fontSize: 80, color: "#bdbdbd", mb: 2 }}
                />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  No orders yet
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Orders will appear here once placed
                </Typography>
              </Paper>
            </Fade>
          ) : (
            <Stack spacing={2}>
              {orders.map((order, index) => (
                <Grow
                  in
                  timeout={600}
                  style={{ transformOrigin: "0 0 0" }}
                  {...{ timeout: 600 + index * 100 }}
                  key={order.id}
                >
                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      border: "1px solid #e0e0e0",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      bgcolor: "white",
                      "&:hover": {
                        boxShadow: "0 8px 30px rgba(102, 126, 234, 0.15)",
                        borderColor: "#667eea",
                      },
                    }}
                  >
                    {/* Order Header */}
                    <CardContent
                      sx={{
                        p: 3,
                        cursor: "pointer",
                        "&:last-child": { pb: 3 },
                      }}
                      onClick={() =>
                        setExpandedId(expandedId === order.id ? null : order.id)
                      }
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            flex: 1,
                          }}
                        >
                          <Box
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: 2,
                              background:
                                "linear-gradient(135deg, #667eea20 0%, #764ba220 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "1px solid #667eea30",
                            }}
                          >
                            <ShoppingCartIcon
                              sx={{ fontSize: 28, color: "#667eea" }}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              Order #{order.id} - Table {order.table_number}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 1,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              Status: {order.status}, Total: $
                              {order.total_amount}
                            </Typography>
                          </Box>
                        </Box>

                        <IconButton
                          size="small"
                          sx={{
                            transform:
                              expandedId === order.id
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s",
                          }}
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </Box>
                    </CardContent>

                    {/* Expanded Details */}
                    <Collapse
                      in={expandedId === order.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Divider />
                      <CardContent sx={{ p: 3, bgcolor: "#fafafa" }}>
                        <Stack spacing={2}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <CalendarTodayIcon
                              sx={{ fontSize: 20, color: "#667eea" }}
                            />
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                Created:
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {formatDate(order.created_at)}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <CalendarTodayIcon
                              sx={{ fontSize: 20, color: "#667eea" }}
                            />
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                Last Updated:
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {formatDate(order.updated_at)}
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1.5,
                            }}
                          >
                            <DescriptionIcon
                              sx={{ fontSize: 20, color: "#667eea", mt: 0.3 }}
                            />
                            <Box>
                              <Typography variant="body2" fontWeight={600}>
                                Order Items:
                              </Typography>
                              {order.order_items.length === 0 ? (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  No items
                                </Typography>
                              ) : (
                                order.order_items.map((item) => (
                                  <Typography
                                    key={item.id}
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {item.quantity} × {item.product.name}{" "}
                                  </Typography>
                                ))
                              )}
                              <Typography variant="body2" fontWeight={600}>
                                Order Items:
                              </Typography>
                            </Box>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grow>
              ))}
            </Stack>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
