import { getAllProducts, getProductById } from "@/services/products";
import { useQuery } from "react-query";

export function useProductQuery(id?: number | string) {
  const { data, isLoading } = useQuery({
    queryKey: id ? ["Products", "sale"] : ["Products"],
    queryFn: async () => {
      return id
        ? await getProductById(id as number | string)
        : await getAllProducts();
    },
  });

  return { data, isLoading };
}
