import { addProduct } from "@/services/products";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "react-query";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isLoading: isCreating } = useMutation({
    mutationFn: (product) => addProduct(product),

    onError: (err) =>
      toast({
        className: "bg-red-400 text-white",
        title: `Add fail: ${err.message}`,
        duration: 2000,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });

      toast({
        className: "bg-green-400 text-white",
        title: "Add product Success.",
        duration: 2000,
      });
    },
  });

  return { createProduct, isCreating };
}
