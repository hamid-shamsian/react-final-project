import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StripedTable from "../../components/widget/StripedTable";
import Pagination from "../../components/common/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import DeleteModal from "../../components/widget/DeleteModal";
import ProductModal from "../../components/widget/ProductModal";
import useProducts from "../../hooks/useProducts";
import useAddProduct from "../../hooks/useAddProduct";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import useCategories from "../../hooks/useCategories";
import columns from "../../tablesColumns/adminProducts";
import { Product } from "../../services/productService";

const AdminProductsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const [deleteModal, setDeleteModal] = useState({ open: false, id: "", name: "" });
  const [productModal, setProductModal] = useState<{ open: boolean; product: Product | null }>({ open: false, product: null });

  const { data, isLoading } = useProducts({ page, perPage, richItems: true });
  const { products = null, totalCount = 0 } = data ?? {};

  const addProduct = useAddProduct();
  const deleteProduct = useDeleteProduct();

  const { data: categories } = useCategories();

  const handlePageChange = (page: number) => setPage(page);
  const handlePerPageChange = (perPage: number) => {
    setPage(1);
    setPerPage(perPage);
  };

  const handleOpenDeleteModal = (product: Product) => setDeleteModal({ open: true, id: product._id, name: product.name });
  const handleCloseDeleteModal = () => setDeleteModal(prev => ({ ...prev, open: false })); // I didnt reset id and name properties because of fade-out animation while disappearing modal.
  const handleDelete = (id: string) => {
    deleteProduct.mutate(id);
    handleCloseDeleteModal();
  };

  const handleOpenProductModal = (product: Product | null = null) => setProductModal({ open: true, product });
  const handleCloseProductModal = () => setProductModal({ open: false, product: null });
  const handleAdd = (data: FormData) => {
    // console.log(data);
    addProduct.mutate(data);
    handleCloseProductModal();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 5, mb: 3 }}>
        <Typography variant='h4' component='h2' mb={5}>
          مدیریت محصولات
        </Typography>

        <Button variant='contained' color='success' onClick={() => handleOpenProductModal()}>
          افزودن محصول
        </Button>
      </Box>

      {isLoading && <LoadingSpinner />}

      {!products && !isLoading && <Typography textAlign='center'>محصولی وجود ندارد! یک محصول جدید اضافه کنید.</Typography>}

      {products && !isLoading && (
        <Pagination
          itemsTitle='محصول'
          itemsCount={totalCount}
          page={page}
          perPage={perPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        >
          <StripedTable columns={columns} rowsData={products} actions={{ delete: handleOpenDeleteModal, edit: handleOpenProductModal }} />
        </Pagination>
      )}

      <DeleteModal data={deleteModal} onConfirm={handleDelete} onCancel={handleCloseDeleteModal} item='محصول' />

      <ProductModal data={productModal} categories={categories} onSubmit={handleAdd} onCancel={handleCloseProductModal} />
    </>
  );
};

export default AdminProductsPage;
