import instance from "@/configs/axios";
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteProductCart(id: string) {
  const userId: string = id.user._id;

  const queryClient = useQueryClient();

  const { mutate: deleteProductCart, isLoading: isDeleting } = useMutation({
    mutationFn: async (infoProduct) => {
      const { product, attribute, attributeValue } = infoProduct;

      const { data } = await instance.post("cart/remove-from-cart", {
        userId,
        productDel: product,
        attribute,
        attributeValue,
      });

      console.log(data);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["Cart", userId]);
    },
  });

  return { deleteProductCart, isDeleting };
}
