import { toast } from "@/components/ui/use-toast";
import { addCategory } from "@/services/category";
import { useMutation, useQueryClient } from "react-query";

type Category = {
  name: string;
};

export function useCreateCategory() {
  const queryClient = useQueryClient();

  const { mutate: createCategory, isLoading: isCreating } = useMutation({
    mutationFn: async (category: Category) => addCategory(category),

    onSuccess: () => {
      queryClient.invalidateQueries(["Category"]);

      toast({
        className: "bg-green-400 text-white",
        title: "Add category successfully.",
        duration: 2000,
      });
    },
  });

  return { createCategory, isCreating };
}
