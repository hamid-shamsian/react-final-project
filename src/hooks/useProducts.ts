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

interface ProductsData {
  products: Product[];
  totalCount: number;
}

const fetchProducts = async (page: number, perPage: number): Promise<ProductsData> => {
  const { data } = await productService.getProducts(page, perPage);
  const { products } = data.data;

  const subCategories = await Promise.all(
    products.map((p: Product) => p.subcategory).map((subCatId: string) => subCatService.getSubCatById(subCatId))
  );

  const richProductItems = products.map((p: Product, i: number) => ({
    ...p,
    category: subCategories[i].data.data.subcategory.category.name,
    subcategory: subCategories[i].data.data.subcategory.name
  }));

  return { products: richProductItems, totalCount: data.total };
};

interface ProductQuery {
  page: number;
  perPage: number;
}

const useProducts = (query: ProductQuery) =>
  useQuery<ProductsData, Error>({
    queryKey: ["products", query],
    queryFn: () => fetchProducts(query.page, query.perPage),
    placeholderData: prevData => prevData
  });

export default useProducts;
