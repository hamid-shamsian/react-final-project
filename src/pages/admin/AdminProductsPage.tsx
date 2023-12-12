import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StripedTable from "../../components/widget/StripedTable";
import Pagination from "../../components/common/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useProducts, { Product } from "../../hooks/useProducts";
import config from "../../../config.json";

const tableColumns = [
  {
    label: "تصویر",
    key: "thumbnail",
    content: (item: Product) => (
      <img src={`${config.BACKEND_BASE_URL}/images/products/thumbnails/` + item.thumbnail} alt='thumbnail' width={100} height={100} />
    )
  },
  {
    label: "محصول",
    path: "name"
  },
  {
    label: "دسته‌بندی",
    path: "cat",
    content: (item: Product) => (
      <Typography>
        {item.category} / {item.subcategory}
      </Typography>
    )
  },
  {
    label: "عملیات",
    path: "actions",
    content: (item: any) => (
      <div id={item._id}>
        <Button variant='contained' size='small' color='warning'>
          ویرایش
        </Button>
        <Button variant='contained' size='small' color='error' sx={{ mr: 2 }}>
          حذف
        </Button>
      </div>
    )
  }
];

const AdminProductsPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isLoading } = useProducts({ page, perPage, richItems: true });
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
          <StripedTable columns={tableColumns} rowsData={products} />
        </Pagination>
      )}
    </>
  );
};

export default AdminProductsPage;
