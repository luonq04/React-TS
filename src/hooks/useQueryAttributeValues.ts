import { getAttributeValueById } from "@/services/atttribute";
import { useQuery } from "react-query";

export const useQueryAttributeValues = (id: string) => {
  // console.log("ID:", id);

  const { data: attributeValues, isLoading } = useQuery({
    queryKey: ["Attributes", id],
    queryFn: () => getAttributeValueById(id),
  });

  return { attributeValues, isLoading };
};
