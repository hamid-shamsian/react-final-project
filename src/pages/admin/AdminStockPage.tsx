import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StripedTable from "../../components/widget/StripedTable";
import Pagination from "../../components/common/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useProducts, { Product } from "../../hooks/useProducts";

const tableColumns = [
  {
    label: "محصول",
    path: "name"
  },
  {
    label: "موجودی",
    path: "quantity",
    content: (item: Product) => <span style={{ textDecoration: "underline", color: "blue" }}>{item.quantity}</span>
  },
  {
    label: "قیمت",
    path: "price",
    content: (item: Product) => <span style={{ textDecoration: "underline", color: "blue" }}>{item.price}</span>
  }
];

const AdminStockPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isLoading } = useProducts({ page, perPage });
  const { products = null, totalCount = 0 } = data ?? {};

  const handlePageChange = (page: number) => setPage(page);
  const handlePerPageChange = (perPage: number) => {
    setPage(1);
    setPerPage(perPage);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 5, mb: 3 }}>
        <Typography variant='h4' component='h2' mb={5}>
          مدیریت موجودی و قیمت‌ها
        </Typography>

        <Button variant='contained' color='success' disabled>
          ذخیره تغییرات
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
          <StripedTable columns={tableColumns} rowsData={products} />
        </Pagination>
      )}
    </>
  );
};

export default AdminStockPage;
