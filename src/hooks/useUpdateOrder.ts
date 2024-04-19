import { updateOrder } from "@/services/orders";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  const { mutate: updateOrderStatus } = useMutation({
    mutationFn: ({ id, status }) => updateOrder(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries(["Order"]);
    },
  });

  return { updateOrderStatus };
};
