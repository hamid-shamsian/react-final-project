import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import productService, { RichProduct } from "../services/productService";

const useProduct = (id: string) =>
  useQuery<RichProduct, AxiosError>({
    queryKey: ["products", id],
    queryFn: () => {
      try {
        return productService.getById(id);
      } catch (error) {
        throw error;
      }
    },
    placeholderData: prevData => prevData
  });

export default useProduct;
