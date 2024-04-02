import instance from "@/configs/axios";
import { useMutation, useQueryClient } from "react-query";

export default function useAddToCart(id: string) {
  const userId = id.user._id;
  // console.log(userId);

  const queryClient = useQueryClient();

  const { mutate: addToCart, isLoading: isAdding } = useMutation({
    mutationFn: async ({
      product,
      quantity,
    }: {
      product: string;
      quantity: number;
    }) => {
      const { data } = await instance.post("/cart/add-to-cart", {
        userId,
        product,
        quantity,
      });

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["Cart", userId]);
    },
  });

  return { addToCart, isAdding };
}
