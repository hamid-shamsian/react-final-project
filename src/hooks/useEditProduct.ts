import { useMutation, useQueryClient } from "@tanstack/react-query";
import productService, { Product, EditingData } from "../services/productService";

const isDataAnArray = (data: EditingData | EditingData[]): data is EditingData[] => Array.isArray(data);
const bulkEditProducts = (products: EditingData[]) => Promise.all(products.map(p => productService.editById(p)));

const useEditProduct = (bulk?: boolean) => {
  const queryClient = useQueryClient();

  return useMutation<Product | Product[], Error, EditingData | EditingData[]>({
    mutationFn: data => {
      if (bulk && isDataAnArray(data)) return bulkEditProducts(data);
      else if (!bulk && !isDataAnArray(data)) return productService.editById(data);
      else throw new Error("invalid data type for the operation!");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
};

export default useEditProduct;
