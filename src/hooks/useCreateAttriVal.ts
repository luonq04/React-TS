import { createAttributeValue } from "@/services/atttribute";
import { useMutation, useQueryClient } from "react-query";

export const useCreateAttriVal = (id?: string) => {
  const queryClient = useQueryClient();

  const { mutate: createAttriVal, isLoading } = useMutation({
    mutationFn: (values) => createAttributeValue(values),
    onSuccess: () => {
      queryClient.invalidateQueries(["Attributes", id]);
    },
  });

  return { createAttriVal, isLoading };
};
