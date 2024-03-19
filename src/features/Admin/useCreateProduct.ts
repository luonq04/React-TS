import { addProduct } from "@/api/products";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "react-query";

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isLoading: isCreating } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast({
        // variant: "destructive",
        className: "bg-green-400 text-white",
        title: "Add product Success.",
        duration: 2000,
        // description: "There was a problem with your request.",
      });
    },

    onError: (err) =>
      toast({
        // variant: "destructive",
        className: "bg-green-400 text-white",
        title: "Add fail",
        duration: 2000,
        // description: "There was a problem with your request.",
      }),
  });

  return { createProduct, isCreating };
}
