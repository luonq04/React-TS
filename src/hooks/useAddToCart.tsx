import instance from "@/configs/axios";
import { useMutation, useQueryClient } from "react-query";
import { useLocalStorage } from "./useStorage";

export default function useAddToCart() {
  const [user] = useLocalStorage("user", {});

  const userId = user?.user?._id;

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
