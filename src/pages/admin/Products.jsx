import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Collapse,
  Grid,
  Paper,
  Stack,
  Divider,
  Fade,
  Grow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Inventory as InventoryIcon,
  LocalOffer as LocalOfferIcon,
  AttachMoney as AttachMoneyIcon,
  Category as CategoryIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import axios from "../../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    product: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/products").then((res) => setProducts(res.data));
  }, []);

  const handleDeleteClick = (product) => {
    setDeleteDialog({ open: true, product });
  };

  const handleDeleteConfirm = async () => {
    const { product } = deleteDialog;

    try {
      await axios.delete(`products/${product.id}`);
      setProducts(products.filter((p) => p.id !== product.id));
      setDeleteDialog({ open: false, product: null });
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, product: null });
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
                  Products
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage your product inventory
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/admin/products/add")}
                sx={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  boxShadow: "0 4px 20px rgba(102, 126, 234, 0.4)",
                  textTransform: "none",
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)",
                    boxShadow: "0 6px 25px rgba(102, 126, 234, 0.5)",
                  },
                }}
              >
                Add Product
              </Button>
            </Box>
          </Fade>

          {/* Products List */}
          {products.length === 0 ? (
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
                <InventoryIcon sx={{ fontSize: 80, color: "#bdbdbd", mb: 2 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  No products yet
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Get started by adding your first product
                </Typography>
              </Paper>
            </Fade>
          ) : (
            <Stack spacing={2}>
              {products.map((product, index) => (
                <Grow
                  in
                  timeout={600}
                  style={{ transformOrigin: "0 0 0" }}
                  {...{ timeout: 600 + index * 100 }}
                  key={product.id}
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
                    {/* Product Header */}
                    <CardContent
                      sx={{
                        p: 3,
                        cursor: "pointer",
                        "&:last-child": { pb: 3 },
                      }}
                      onClick={() =>
                        setExpandedId(
                          expandedId === product.id ? null : product.id
                        )
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
                            <InventoryIcon
                              sx={{ fontSize: 28, color: "#667eea" }}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h7"
                              fontWeight={400}
                              gutterBottom
                            >
                              {product.name}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <AttachMoneyIcon
                                  sx={{ fontSize: 16, color: "#757575" }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {product.price}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <InventoryIcon
                                  sx={{ fontSize: 16, color: "#757575" }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Stock: {product.stock}
                                </Typography>
                              </Box>
                              <Chip
                                label={
                                  product.is_active ? "Active" : "Inactive"
                                }
                                size="small"
                                sx={{
                                  bgcolor: product.is_active
                                    ? "#667eea15"
                                    : "#e0e0e0",
                                  color: product.is_active
                                    ? "#667eea"
                                    : "#757575",
                                  fontWeight: 600,
                                  border: product.is_active
                                    ? "1px solid #667eea30"
                                    : "none",
                                }}
                              />
                            </Stack>
                          </Box>
                        </Box>

                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/products/edit/${product.id}`);
                            }}
                            sx={{
                              "&:hover": {
                                bgcolor: "#667eea10",
                                color: "#667eea",
                              },
                            }}
                          >
                            <img src="/edit.png" alt="" className="h-6 w-6" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(product);
                            }}
                            sx={{
                              "&:hover": {
                                bgcolor: "#f4433610",
                                color: "#f44336",
                              },
                            }}
                          >
                            <img
                              src="/delete (1).png"
                              alt=""
                              className="h-6 w-6"
                            />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{
                              transform:
                                expandedId === product.id
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              transition: "transform 0.3s",
                            }}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Stack>
                      </Box>
                    </CardContent>

                    {/* Expanded Details */}
                    <Collapse
                      in={expandedId === product.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Divider />
                      <CardContent sx={{ p: 3, bgcolor: "#fafafa" }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={2}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                }}
                              >
                                <AttachMoneyIcon
                                  sx={{ fontSize: 20, color: "#667eea" }}
                                />
                                <Typography variant="body2" fontWeight={600}>
                                  Price:
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  ${product.price}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                }}
                              >
                                <InventoryIcon
                                  sx={{ fontSize: 20, color: "#667eea" }}
                                />
                                <Typography variant="body2" fontWeight={600}>
                                  Stock:
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {product.stock}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                }}
                              >
                                <CategoryIcon
                                  sx={{ fontSize: 20, color: "#667eea" }}
                                />
                                <Typography variant="body2" fontWeight={600}>
                                  Category:
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {product.category?.name || "Uncategorized"}
                                </Typography>
                              </Box>
                            </Stack>
                          </Grid>

                          {product.offers && product.offers.length > 0 && (
                            <Grid item xs={12} md={6}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1.5,
                                  mb: 2,
                                }}
                              >
                                <LocalOfferIcon
                                  sx={{ fontSize: 20, color: "#764ba2" }}
                                />
                                <Typography variant="body2" fontWeight={600}>
                                  Active Offers:
                                </Typography>
                              </Box>
                              <Stack spacing={1.5}>
                                {product.offers.map((offer) => (
                                  <Paper
                                    key={offer.id}
                                    elevation={0}
                                    sx={{
                                      p: 1.5,
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      bgcolor: "#764ba210",
                                      border: "1px solid #764ba230",
                                      borderRadius: 2,
                                    }}
                                  >
                                    <Typography
                                      variant="body2"
                                      fontWeight={500}
                                    >
                                      {offer.title}
                                    </Typography>
                                    <Chip
                                      label={`${offer.value}${
                                        offer.offer_kind === "percentage"
                                          ? "%"
                                          : ""
                                      }`}
                                      size="small"
                                      sx={{
                                        bgcolor: "#764ba220",
                                        color: "#764ba2",
                                        fontWeight: 600,
                                        border: "1px solid #764ba230",
                                      }}
                                    />
                                  </Paper>
                                ))}
                              </Stack>
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grow>
              ))}
            </Stack>
          )}
        </Stack>
      </Container>

      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: "#f4433610",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WarningIcon sx={{ fontSize: 28, color: "#f44336" }} />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              Delete Product
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            Are you sure you want to delete{" "}
            <strong>"{deleteDialog.product?.name}"</strong>? This action cannot
            be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "#e0e0e0",
              color: "#757575",
              "&:hover": {
                borderColor: "#bdbdbd",
                bgcolor: "#f5f5f5",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: "#f44336",
              "&:hover": {
                bgcolor: "#d32f2f",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
