import { useMutation, useQueryClient } from "@tanstack/react-query";
import orderService from "../services/orderService";

const useAddOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.addNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
};

export default useAddOrder;
