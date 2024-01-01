import { useMutation, useQueryClient } from "@tanstack/react-query";
import orderService from "../services/orderService";

const useEditOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: orderService.editById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    }
  });
};

export default useEditOrder;
