import instance from "@/configs/axios";
import { useMutation, useQueryClient } from "react-query";

function useDecreaseQuantity(id: string) {
  const userId = id.user._id;

  const queryClient = useQueryClient();

  const { mutate: decreasing, isLoading: isDecreasing } = useMutation({
    mutationFn: async (product: string) => {
      // console.log(product);
      const { data } = await instance.post("/cart/decreseQuantity", {
        userId,
        product,
      });
      return data;
    },

    onSuccess: () => {
      console.log(userId);
      queryClient.invalidateQueries({
        queryKey: ["Cart", userId],
      });
    },
  });

  return { decreasing, isDecreasing };
}

export default useDecreaseQuantity;
