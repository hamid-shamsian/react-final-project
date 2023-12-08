import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StripedTable from "../../components/widget/StripedTable";
import productService from "../../services/productService";

interface productType {
  category: string;
  createdAt: string;
  description: string;
  images: string[];
  name: string;
  price: number;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
  slugname: string;
  subcategory: string;
  thumbnail: string;
  updatedAt: string;
  _id: string;
}

const tableColumns = [
  {
    label: "محصول",
    path: "name"
  },
  {
    label: "موجودی",
    path: "quantity",
    content: (item: productType) => <span style={{ textDecoration: "underline", color: "blue" }}>{item.quantity}</span>
  },
  {
    label: "قیمت",
    path: "price",
    content: (item: productType) => <span style={{ textDecoration: "underline", color: "blue" }}>{item.price}</span>
  }
];

const getProductsOfPage = async (
  page: number,
  setProductsCallBack: Dispatch<SetStateAction<never[]>>,
  setTotalPagesCallBack: Dispatch<SetStateAction<number>>
) => {
  try {
    const { data } = await productService.getProducts(page);

    setTotalPagesCallBack(data.total_pages);
    const { products } = data.data;

    setProductsCallBack(products);
  } catch (error) {}
};

const AdminStockPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    (async () => await getProductsOfPage(currentPage, setProducts, setTotalPages))();
  }, [currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event; // just to satisfy typescript :))
    setCurrentPage(value);
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

      <StripedTable columns={tableColumns} rowsData={products} />

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          renderItem={item => <PaginationItem slots={{ previous: ArrowForwardIcon, next: ArrowBackIcon }} {...item} />}
          sx={{ marginTop: 5 }}
        />
      </Box>
    </>
  );
};

export default AdminStockPage;
