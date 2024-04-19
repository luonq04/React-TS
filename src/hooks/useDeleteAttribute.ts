import { deleteAttribute } from "@/services/atttribute";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteAttribute = () => {
  const queryClient = useQueryClient();

  const { mutate: delAttribute } = useMutation({
    mutationFn: (id) => deleteAttribute(id),

    onSuccess: () => {
      queryClient.invalidateQueries(["Attributes"]);
    },
  });

  return { delAttribute };
};
