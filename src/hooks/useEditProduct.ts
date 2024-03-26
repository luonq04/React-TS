import { editProduct } from "@/services/products";
import { IProduct } from "@/interface/product";
import { useMutation, useQueryClient } from "react-query";

export function useEditProduct(id: string | number) {
  const queryClient = useQueryClient();

  const { mutate: updateProduct, isUpdating } = useMutation({
    mutationFn: ({ id, newProduct }: { id: string; newProduct: IProduct }) =>
      editProduct(id, newProduct),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Products"] }),
  });

  return { updateProduct, isUpdating };
}
