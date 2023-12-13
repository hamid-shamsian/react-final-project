import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StripedTable from "../../components/widget/StripedTable";
import Pagination from "../../components/common/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useProducts from "../../hooks/useProducts";
import useDeleteProduct from "../../hooks/useDeleteProduct";
import columns from "../../tablesColumns/adminProducts";
import { Product } from "../../services/productService";

const AdminProductsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isLoading } = useProducts({ page, perPage, richItems: true });
  const { products = null, totalCount = 0 } = data ?? {};

  const deleteProduct = useDeleteProduct();

  const handlePageChange = (page: number) => setPage(page);
  const handlePerPageChange = (perPage: number) => {
    setPage(1);
    setPerPage(perPage);
  };

  const handleDelete = (product: Product) => deleteProduct.mutate(product._id);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 5, mb: 3 }}>
        <Typography variant='h4' component='h2' mb={5}>
          مدیریت محصولات
        </Typography>

        <Button variant='contained' color='success'>
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
          <StripedTable columns={columns} rowsData={products} actions={{ delete: handleDelete }} />
        </Pagination>
      )}
    </>
  );
};

export default AdminProductsPage;
