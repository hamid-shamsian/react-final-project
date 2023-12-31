import { useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "../services/productService";

const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.addNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  });
};

export default useAddProduct;
