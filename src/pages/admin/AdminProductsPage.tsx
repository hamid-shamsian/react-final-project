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
import subCatService from "../../services/subCatService";
import config from "../../../config.json";

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
    label: "تصویر",
    key: "thumbnail",
    content: (item: productType) => (
      <img src={`${config.BACKEND_BASE_URL}/images/products/thumbnails/` + item.thumbnail} alt='thumbnail' width={100} />
    )
  },
  {
    label: "محصول",
    path: "name"
  },
  {
    label: "دسته‌بندی",
    path: "cat",
    content: (item: productType) => (
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

const getProductsOfPage = async (
  page: number,
  setProductsCallBack: Dispatch<SetStateAction<never[]>>,
  setTotalPagesCallBack: Dispatch<SetStateAction<number>>
) => {
  try {
    const { data } = await productService.getProducts(page);

    setTotalPagesCallBack(data.total_pages);
    const { products } = data.data;

    const subCategories = await Promise.all(
      products.map((p: productType) => p.subcategory).map((subCatId: string) => subCatService.getSubCatById(subCatId))
    );

    const richProductItems = products.map((p: productType, i: number) => ({
      ...p,
      category: subCategories[i].data.data.subcategory.category.name,
      subcategory: subCategories[i].data.data.subcategory.name
    }));

    setProductsCallBack(richProductItems);
  } catch (error) {}
};

const AdminProductsPage = () => {
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
          مدیریت محصولات
        </Typography>

        <Button variant='contained' color='success'>
          افزودن محصول
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

export default AdminProductsPage;
