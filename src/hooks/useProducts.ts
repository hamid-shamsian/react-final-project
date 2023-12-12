import { useQuery } from "@tanstack/react-query";
import productService from "../services/productService";
import subCatService from "../services/subCatService";

export interface Product {
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

interface ProductQuery {
  page: number;
  perPage: number;
  richItems?: boolean;
}

interface ProductsData {
  products: Product[];
  totalCount: number;
}

const fetchProducts = async ({ page, perPage, richItems }: ProductQuery): Promise<ProductsData> => {
  const { data } = await productService.getProducts(page, perPage);
  let { products } = data.data;

  if (richItems) {
    const subCategories = await Promise.all(
      products.map((p: Product) => p.subcategory).map((subCatId: string) => subCatService.getSubCatById(subCatId))
    );

    products = products.map((p: Product, i: number) => ({
      ...p,
      category: subCategories[i].data.data.subcategory.category.name,
      subcategory: subCategories[i].data.data.subcategory.name
    }));
  }

  return { products, totalCount: data.total };
};

const useProducts = (query: ProductQuery) =>
  useQuery<ProductsData, Error>({
    queryKey: ["products", query],
    queryFn: () => fetchProducts(query),
    placeholderData: prevData => prevData
  });

export default useProducts;
