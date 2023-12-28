import { RichCartItem } from "../pages/CartPage";
import { farsify } from "../utils/utilityFuncs";
import config from "../../config.json";

const tableColumns = [
  {
    path: "loading"
  },
  {
    label: "تصویر",
    key: "thumbnail",
    content: (item: RichCartItem) => {
      if (item.thumbnail)
        return <img src={`${config.BACKEND_BASE_URL}/images/products/thumbnails/` + item.thumbnail} alt='thumbnail' width={100} height={100} />;
    }
  },
  {
    label: "نام محصول",
    path: "name"
  },
  {
    label: "قیمت واحد",
    key: "price",
    content: (item: RichCartItem) => {
      if (item.price) return <span>{farsify(item.price)} تومان</span>;
    }
  }
];

export default tableColumns;
