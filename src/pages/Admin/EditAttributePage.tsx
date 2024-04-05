import Loader from "@/components/Loader";
import { getValueColumns } from "@/components/attributeValues/columns";
import { DataTable } from "@/components/attributeValues/data-table";
import { useDeleteAttributValue } from "@/hooks/useDeleteAttributValue";
import { useQueryAttribute } from "@/hooks/useQueryAttribute";
import { Link, useParams } from "react-router-dom";
import Userpage from "./UserPage";

const EditAttributePage = () => {
  const { id } = useParams<{ id: string }>();
  const { attribute, isLoading } = useQueryAttribute(id!);
  const { delelteValue } = useDeleteAttributValue(id!);

  if (isLoading) return <Loader />;

  // console.log(attribute);

  const onDelete = (value) => {
    console.log(value);
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn xóa giá trị này không?"
    );
    if (confirm) {
      delelteValue(value._id);
    }
  };

  const columns = getValueColumns(onDelete);

  return (
    <>
      <div className="flex justify-between mb-10">
        <h3 className="ml-5 text-xl">Attributes Values: {attribute.name}</h3>
        <Userpage />
      </div>
      <DataTable columns={columns} data={attribute.values} />
    </>
  );
};

export default EditAttributePage;
