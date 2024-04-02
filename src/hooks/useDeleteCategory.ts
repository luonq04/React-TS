import { deleteCategory } from "@/services/category";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { mutate: delCategory, isLoading: isDeleting } = useMutation({
    mutationFn: async (id: string) => deleteCategory(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Category"],
      });
    },

    onError: (error) => {
      console.error("Loi");
    },
  });

  return { delCategory, isDeleting };
}
