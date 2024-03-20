import { getAllProducts } from "@/services/products";
import { useQuery } from "react-query";

export function useQueryAllProduct() {
  const { data: allProducts, isLoading } = useQuery({
    queryKey: ["Products"],
    queryFn: getAllProducts,
  });

  return { allProducts, isLoading };
}
