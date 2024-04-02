import instance from "@/configs/axios";
import { useMutation, useQueryClient } from "react-query";

function useIncreaseQuantity(id: string) {
  const userId = id.user._id;

  const queryClient = useQueryClient();

  const { mutate: increasing, isLoading: isIncreasing } = useMutation({
    mutationFn: async (product: string) => {
      // console.log(product);
      const { data } = await instance.post("/cart/increseQuantity", {
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

    onError: (error) => {
      console.log(error);
    },
  });

  return { increasing, isIncreasing };
}

export default useIncreaseQuantity;
