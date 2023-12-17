import config from "../../config.json";
import { Product } from "../services/productService";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
    // align: "right"
  },
  {
    label: "دسته‌بندی",
    key: "cat",
    content: (product: Product) => (
      <Typography>
        {product.categoryName} / {product.subcategoryName}
      </Typography>
    )
  },
  {
    key: "edit",
    content: (product: Product, _edit: (product: Product) => void) => (
      <Button variant='contained' size='small' color='warning' onClick={() => _edit(product)}>
        ویرایش
      </Button>
    )
  },
  {
    key: "delete",
    content: (product: Product, _delete: (product: Product) => void) => (
      <Button variant='contained' size='small' color='error' onClick={() => _delete(product)}>
        حذف
      </Button>
    )
  }
];

export default tableColumns;
