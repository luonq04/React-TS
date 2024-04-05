import { getAllAtrribute } from "@/services/atttribute";
import { useQuery } from "react-query";

export const useQueryAllAttribute = () => {
  const { data: attributes, isLoading: isLoadingAttribute } = useQuery({
    queryKey: ["Attributes"],
    queryFn: async () => await getAllAtrribute(),
  });

  return { attributes, isLoadingAttribute };
};
