import { useQueries } from "@tanstack/react-query";
import productService from "../services/productService";

const useProductsByIds = (idsArray: string[]) => {
  const products = useQueries({
    queries: idsArray.map(id => ({
      queryKey: ["products", id],
      queryFn: () => productService.getById(id)
    }))
  });

  const isLoading = products.some(query => query.isLoading);
  const isError = products.some(query => query.isError);
  const error = products.find(query => query.isError)?.error;

  return { products, isLoading, isError, error };
};

export default useProductsByIds;
