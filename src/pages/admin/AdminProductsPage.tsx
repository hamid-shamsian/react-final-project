import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import useEditProduct from "../../hooks/useEditProduct";
import useCategories from "../../hooks/useCategories";
import tableColumns from "../../tablesColumns/adminProducts";
import { Product } from "../../services/productService";
import { updatePaginationParams } from "../../utils/utilityFuncs";

const AdminProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getSearchedPage = () => {
    const p = parseInt(searchParams.get("page") ?? "1");
    return p && !isNaN(p) ? p : 1;
  };

  const getSearchedPerPage = () => {
    const p = parseInt(searchParams.get("perPage") ?? "1");
    return p && !isNaN(p) && [5, 10, 20, 50].includes(p) ? p : 5;
  };

  const [page, setPage] = useState(getSearchedPage());
  const [perPage, setPerPage] = useState(getSearchedPerPage());

  const [deleteModal, setDeleteModal] = useState({ open: false, id: "", name: "" });
  const [productModal, setProductModal] = useState<{ open: boolean; product: Product | null }>({ open: false, product: null });

  const { data, isLoading } = useProducts({ page, perPage, richItems: true });
  const { products = [], totalCount = 0 } = data ?? {};

  const addProduct = useAddProduct();
  const deleteProduct = useDeleteProduct();
  const editProduct = useEditProduct();

  const { data: categories } = useCategories();

  const handlePageChange = (page: number) => setPage(page);
  const handlePerPageChange = (perPage: number) => {
    setPage(1);
    setPerPage(perPage);
  };

  useEffect(() => {
    setSearchParams(prev => updatePaginationParams(prev, page, perPage));
  }, [page, perPage]);

  const handleOpenDeleteModal = (product: Product) => setDeleteModal({ open: true, id: product._id, name: product.name });
  const handleCloseDeleteModal = () => setDeleteModal(prev => ({ ...prev, open: false })); // I didnt reset id and name properties because of fade-out animation while disappearing modal.

  const handleDelete = (id: string) => {
    deleteProduct.mutate(id);
    handleCloseDeleteModal();
  };

  const handleOpenProductModal = (product: Product | null = null) => setProductModal({ open: true, product });
  const handleCloseProductModal = () => setProductModal({ open: false, product: null });

  const handleSubmit = (data: FormData) => {
    if (productModal.product) editProduct.mutate({ id: productModal.product._id, product: data });
    else addProduct.mutate(data);
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

      {page === 1 && !products.length && !isLoading && <Typography textAlign='center'>محصولی وجود ندارد! یک محصول جدید اضافه کنید.</Typography>}

      {page > 1 && !products.length && !isLoading && <Typography textAlign='center'>صفحه مورد نظر پیدا نشد!</Typography>}

      {products.length > 0 && !isLoading && (
        <Pagination
          itemsTitle='محصول'
          itemsCount={totalCount}
          page={page}
          perPage={perPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        >
          <StripedTable columns={tableColumns} rowsData={products} actions={{ delete: handleOpenDeleteModal, edit: handleOpenProductModal }} />
        </Pagination>
      )}

      <DeleteModal data={deleteModal} onConfirm={handleDelete} onCancel={handleCloseDeleteModal} item='محصول' />

      <ProductModal data={productModal} categories={categories} onSubmit={handleSubmit} onCancel={handleCloseProductModal} />
    </>
  );
};

export default AdminProductsPage;
