import { editProduct } from "@/api/products";
import { IProduct } from "@/interface/product";
import { useMutation, useQueryClient } from "react-query";

export function useEditProduct(id) {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isUpdating } = useMutation({
    mutationFn: ({ id, newProduct }: { id: string; newProduct: IProduct }) =>
      editProduct(id, newProduct),

    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["productEdit", id] }),
  });

  return { updateProduct, isUpdating };
}
