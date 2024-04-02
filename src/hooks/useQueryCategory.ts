import { getCategoryById } from "@/services/category";
import { useQuery } from "react-query";

export function useQueryCategory(id: string) {
  const { data: category, isLoading } = useQuery({
    queryKey: ["Category", id],
    queryFn: async () => getCategoryById(id),
  });

  return { category, isLoading };
}
