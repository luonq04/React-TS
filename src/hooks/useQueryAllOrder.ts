import { getAllOrder } from "@/services/orders";
import { useQuery } from "react-query";

export const useQueryAllOrder = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["Order"],
    queryFn: getAllOrder,
  });

  return { data, isLoading };
};
