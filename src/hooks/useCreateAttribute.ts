import { createAttribute } from "@/services/atttribute";
import { useMutation, useQueryClient } from "react-query";

export const useCreateAttribute = () => {
  const queryClient = useQueryClient();

  const { mutate: createAttri, isLoading: isCreating } = useMutation({
    mutationFn: (attribute) => createAttribute(attribute),

    onSuccess: () => {
      queryClient.invalidateQueries(["Products"]);
    },
  });

  return { createAttri, isCreating };
};
