import { useQuery } from "@tanstack/react-query";
import productService, { Product } from "../services/productService";
import subCatService from "../services/subCatService";

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
  let { products, total } = await productService.getAll(page, perPage);

  if (richItems) {
    const subCategories = await Promise.all(products.map((p: Product) => p.subcategory).map((subCatId: string) => subCatService.getById(subCatId)));
    products = products.map((p: Product, i: number) => ({ ...p, category: subCategories[i].category.name, subcategory: subCategories[i].name }));
  }

  return { products, totalCount: total };
};

const useProducts = (query: ProductQuery) =>
  useQuery<ProductsData, Error>({
    queryKey: ["products", query],
    queryFn: () => fetchProducts(query),
    placeholderData: prevData => prevData
  });

export default useProducts;
