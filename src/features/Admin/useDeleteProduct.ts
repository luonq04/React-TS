// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { deleteProduct } from "@/api/products";

// export function useDeleteProduct() {
//   const queryClient = useQueryClient();

//   const { mutate: delProduct, isLoading: isDeleting } = useMutation({
//     mutationFn: deleteProduct,

//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["product"],
//       });
//     },
//   });

//   return { deleteProduct, isDeleting };
// }
