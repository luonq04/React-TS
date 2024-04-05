import { getAttributeById } from "@/services/atttribute";
import { useQuery } from "react-query";

export const useQueryAttribute = (id: string) => {
  const { data: attribute, isLoading } = useQuery({
    queryKey: ["Attributes", id],
    queryFn: () => getAttributeById(id),
  });

  return { attribute, isLoading };
};
