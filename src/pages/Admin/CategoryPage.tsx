import { DataTable } from "@/components/products/data-table";

import Loader from "@/components/Loader";
import { Link } from "react-router-dom";

import { getCategoryColumns } from "@/components/categories/columns";
import { useDeleteCategory } from "@/hooks/useDeleteCategory";
import { useQueryAllCategory } from "@/hooks/useQueryAllCategory";

const CategoryPage = () => {
  const { delCategory } = useDeleteCategory();

  const { category, isLoading } = useQueryAllCategory();
  if (isLoading) return <Loader />;

  const onDelete = (category) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn danh mục này không?");
    if (confirm) {
      delCategory(category._id);
    }
  };
  const columns = getCategoryColumns(onDelete);

  return (
    <>
      <div className="flex justify-between mb-10">
        <h3 className="ml-5 text-xl">Categories</h3>
        <Link to="/dashboard/categories/add">
          <button className="p-3 bg-slate-300 rounded-lg hover:bg-slate-400">
            Add Category
          </button>
        </Link>
      </div>
      <DataTable columns={columns} data={category} />
    </>
  );
};

export default CategoryPage;
