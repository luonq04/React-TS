import { updateCategory } from "@/services/category";
import { useMutation, useQueryClient } from "react-query";

type Category = {
  name: string;
};

export const useUpdateCategory = (id: string) => {
  const queryClient = useQueryClient();

  const { mutate: updateCate } = useMutation({
    mutationFn: async (category: Category) => updateCategory(id, category),

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["Category"] }),
  });

  return { updateCate };
};
