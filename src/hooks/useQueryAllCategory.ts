import { getAllCategory } from "@/services/category";
import { useQuery } from "react-query";

export function useQueryAllCategory() {
  const { data: category, isLoading } = useQuery({
    queryKey: ["Category"],
    queryFn: async () => await getAllCategory(),
  });

  return { category, isLoading };
}
