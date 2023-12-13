import { useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "../services/productService";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.deleteById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
};

export default useDeleteProduct;
