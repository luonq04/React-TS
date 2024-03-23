import { getAllProducts } from "@/services/products";
import { useQuery } from "react-query";

export function useQueryAllProduct() {
  const { data: allProducts, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: async () => await getAllProducts(),
  });

  return { allProducts, isLoading };
}
