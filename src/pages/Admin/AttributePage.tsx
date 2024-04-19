import { DataTable } from "@/components/attributes/data-table";

import Loader from "@/components/Loader";
import { Link } from "react-router-dom";

import { getCategoryColumns } from "@/components/attributes/columns";
import { useQueryAllAttribute } from "@/hooks/useQueryAllAttribute";
import { useDeleteAttribute } from "@/hooks/useDeleteAttribute";
import { toast } from "@/components/ui/use-toast";

const AttributePage = () => {
  const { attributes, isLoadingAttribute } = useQueryAllAttribute();
  const { delAttribute } = useDeleteAttribute();

  if (isLoadingAttribute) return <Loader />;

  const onDelete = (attribute) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn danh mục này không?");
    if (confirm) {
      delAttribute(attribute._id);
      toast({
        title: "Delete Attribute",
      });
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
