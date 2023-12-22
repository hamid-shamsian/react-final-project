import { useInfiniteQuery } from "@tanstack/react-query";
import productService, { Product } from "../services/productService";
import subCatService from "../services/subCatService";

interface InfiniteProductsQuery {
  perPage: number;
  ofCatId?: string;
  ofSubCatId?: string;
  richItems?: boolean;
}

interface FetchProducts extends InfiniteProductsQuery {
  page: number;
}

const fetchProducts = async ({ page, perPage, ofCatId, richItems = false }: FetchProducts): Promise<Product[]> => {
  let { products } = await productService.getAll(page, perPage, ofCatId);

  if (richItems) {
    const subCategories = await Promise.all(products.map((p: Product) => p.subcategory).map((subCatId: string) => subCatService.getById(subCatId)));
    products = products.map((p: Product, i: number) => ({
      ...p,
      categoryName: subCategories[i].category.name,
      subcategoryName: subCategories[i].name
    }));
  }

  return products;
};

const useInfiniteProducts = (query: InfiniteProductsQuery) =>
  useInfiniteQuery<Product[], Error>({
    queryKey: ["products", query],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) => fetchProducts({ ...query, page: pageParam }),
    placeholderData: prevData => prevData,
    getNextPageParam: (lastPage, allPages) => (lastPage.length ? allPages.length + 1 : undefined)
  });

export default useInfiniteProducts;
