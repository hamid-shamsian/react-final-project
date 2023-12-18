import { useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "../services/productService";

const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.editById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
};

export default useEditProduct;
