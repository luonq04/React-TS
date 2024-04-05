import { toast } from "@/components/ui/use-toast";
import { delAttributeValue } from "@/services/atttribute";
import { useMutation, useQueryClient } from "react-query";

export const useDeleteAttributValue = (AttributValue: string) => {
  const queryClient = useQueryClient();

  const { mutate: delelteValue, isLoading: isDeleting } = useMutation({
    mutationFn: (id: string) => {
      console.log(id);
      delAttributeValue(id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["Attributes", AttributValue]);
      toast({
        className: "bg-green-400 text-white",
        title: "Delete attribute value success.",
        duration: 2000,
      });
    },
  });

  return { delelteValue, isDeleting };
};
