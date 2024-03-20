import { deleteProduct } from "@/services/products";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { mutate: delProduct, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteProduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });
    },
  });

  return { delProduct, isDeleting };
}
