import { updateAttributeValueById } from "@/services/atttribute";
import { useMutation, useQueryClient } from "react-query";

export const useUpdateAttributeValues = (id: string, idAttribute: string) => {
  const queryClient = useQueryClient();

  const { mutate: updateAttributeValues } = useMutation({
    mutationFn: (attriVal) => updateAttributeValueById(id, attriVal),

    onSuccess: () => {
      queryClient.invalidateQueries(["Attributes", idAttribute]);
    },
  });

  return { updateAttributeValues };
};
