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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Category as CategoryIcon,
  Warning as WarningIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarTodayIcon,
} from "@mui/icons-material";
import axios from "../../api/axios";

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

  const handleDeleteClick = (category) => {
    setDeleteDialog({ open: true, category });
  };

  const handleDeleteConfirm = async () => {
    const { category } = deleteDialog;

    try {
      await axios.delete(`categories/${category.id}`);
      setCategories(categories.filter((c) => c.id !== category.id));
      setDeleteDialog({ open: false, category: null });
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete category.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, category: null });
  };

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
                  Categories
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Manage your product categories
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate("/admin/categories/add")}
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
                Add Category
              </Button>
            </Box>
          </Fade>

          {/* Categories List */}
          {categories.length === 0 ? (
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
                <CategoryIcon sx={{ fontSize: 80, color: "#bdbdbd", mb: 2 }} />
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  No categories yet
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Get started by adding your first category
                </Typography>
              </Paper>
            </Fade>
          ) : (
            <Stack spacing={2}>
              {categories.map((category, index) => (
                <Grow
                  in
                  timeout={600}
                  style={{ transformOrigin: "0 0 0" }}
                  {...{ timeout: 600 + index * 100 }}
                  key={category.id}
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
                    {/* Category Header */}
                    <CardContent
                      sx={{
                        p: 3,
                        cursor: "pointer",
                        "&:last-child": { pb: 3 },
                      }}
                      onClick={() =>
                        setExpandedId(
                          expandedId === category.id ? null : category.id
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
                            <CategoryIcon
                              sx={{ fontSize: 28, color: "#667eea" }}
                            />
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              {category.name}
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
                              {category.description || "No description"}
                            </Typography>
                          </Box>
                        </Box>

                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/admin/categories/edit/${category.id}`);
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
                              handleDeleteClick(category);
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
                                expandedId === category.id
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
                      in={expandedId === category.id}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Divider />
                      <CardContent sx={{ p: 3, bgcolor: "#fafafa" }}>
                        <Stack spacing={2}>
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
                                Description:
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 0.5 }}
                              >
                                {category.description ||
                                  "No description provided"}
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
                                Created:
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {formatDate(category.created_at)}
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
                                {formatDate(category.updated_at)}
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

      {/* Delete Confirmation Dialog */}
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
              Delete Category
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            Are you sure you want to delete{" "}
            <strong>"{deleteDialog.category?.name}"</strong>? This action cannot
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
