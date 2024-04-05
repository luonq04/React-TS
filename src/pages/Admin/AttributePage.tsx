import { DataTable } from "@/components/attributes/data-table";

import Loader from "@/components/Loader";
import { Link } from "react-router-dom";

import { getCategoryColumns } from "@/components/attributes/columns";
import { useDeleteCategory } from "@/hooks/useDeleteCategory";
import { useQueryAllAttribute } from "@/hooks/useQueryAllAttribute";

const AttributePage = () => {
  const { delCategory } = useDeleteCategory();
  const { attributes, isLoadingAttribute } = useQueryAllAttribute();

  if (isLoadingAttribute) return <Loader />;

  // const attributesProduct = allProducts.filter(
  //   (pro) => pro.attributes.length > 0
  // );

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
        <h3 className="ml-5 text-xl">Attributes</h3>
        <Link to="/dashboard/attributes/add">
          <button className="p-3 bg-slate-300 rounded-lg hover:bg-slate-400">
            Add Attribute
          </button>
        </Link>
      </div>
      <DataTable columns={columns} data={attributes} />
    </>
  );
};

export default AttributePage;
