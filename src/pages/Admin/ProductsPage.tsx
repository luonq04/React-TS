import { DataTable } from "@/components/products/data-table";

import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import { useProductQuery } from "@/hooks/useProductQuery";
import { getProductColumns } from "@/components/products/columns";
import { useMutation, useQueryClient } from "react-query";
import { deleteProduct } from "@/services/products";

const ProductsPage = () => {
  const queryClient = useQueryClient();

  const { mutate: delProduct, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteProduct(id!),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Products"],
      });
    },
  });

  const { data, isLoading } = useProductQuery();
  if (isLoading) return <Loader />;

  const onDelete = (product) => {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?"
    );
    if (confirm) {
      delProduct(product._id);
    }
  };
  const columns = getProductColumns(onDelete);

  return (
    <>
      <div className="flex justify-between mb-10">
        <h3 className="ml-5 text-xl">Products</h3>
        <Link to="/dashboard/products/add">
          <button className="p-3 bg-slate-300 rounded-lg hover:bg-slate-400">
            Add Product
          </button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default ProductsPage;
