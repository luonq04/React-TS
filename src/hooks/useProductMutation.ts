import { IProduct } from "@/interface/product";
import { addProduct, deleteProduct, editProduct } from "@/services/products";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

type useProductMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
};

function useProductMutation({ action }: useProductMutationProps) {
  const form = useForm({
    defaultValues: {},
  });

  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (product: IProduct) => {
      switch (action) {
        case "CREATE":
          return await addProduct(product);

        case "DELETE":
          return await deleteProduct(product._id!);

        case "UPDATE":
          return await editProduct(product._id!, product);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });
    },
  });

  const onSubmit: SubmitHandler<IProduct> = (product) => {
    mutate(product);
  };

  return { mutate, form, onSubmit, ...rest };
}

export default useProductMutation;
