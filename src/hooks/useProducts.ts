import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import productService, { Product } from "../services/productService";
import subCatService from "../services/subCatService";

interface ProductQuery {
  page?: number;
  perPage: number;
  richItems?: boolean;
  ofCatId?: string;
}

interface ProductsData {
  products: Product[];
  totalCount: number;
}

const fetchProducts = async ({ page, perPage, richItems, ofCatId }: ProductQuery): Promise<ProductsData> => {
  let { products, total } = await productService.getAll(page, perPage, ofCatId);

  if (richItems) {
    const subCategories = await Promise.all(products.map((p: Product) => p.subcategory).map((subCatId: string) => subCatService.getById(subCatId)));
    products = products.map((p: Product, i: number) => ({
      ...p,
      categoryName: subCategories[i].category.name,
      subcategoryName: subCategories[i].name
    }));
  }

  return { products, totalCount: total };
};

const paginated = (query: ProductQuery) =>
  useQuery<ProductsData, Error>({
    queryKey: ["products", query],
    queryFn: () => fetchProducts(query),
    placeholderData: prevData => prevData
  });

const infinite = (query: ProductQuery) =>
  useInfiniteQuery<ProductsData, Error, InfiniteData<ProductsData>, [string, ProductQuery], number>({
    queryKey: ["products", query],
    initialPageParam: 1,
    queryFn: ({ pageParam }): Promise<ProductsData> => fetchProducts({ ...query, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => (allPages.length < lastPage.totalCount / query.perPage ? allPages.length + 1 : null)
  });

const useProducts = { paginated, infinite };

export default useProducts;
