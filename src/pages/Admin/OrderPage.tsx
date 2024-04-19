import Loader from "@/components/Loader";
import { getCategoryColumns } from "@/components/orders/columns";
import { DataTable } from "@/components/orders/data-table";
import { useQueryAllOrder } from "@/hooks/useQueryAllOrder";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const { data, isLoading } = useQueryAllOrder();

  if (isLoading) return <Loader />;
  // console.log(data);

  const onDelete = (category) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn danh mục này không?");
    if (confirm) {
      // delCategory(category._id);
    }
  };
  const columns = getCategoryColumns(onDelete);

  return (
    <>
      <div className="flex justify-between mb-10">
        <h3 className="ml-5 text-xl">Orders</h3>
        {/* <Link to="/dashboard/categories/add">
          <button className="p-3 bg-slate-300 rounded-lg hover:bg-slate-400">
            Add Order
          </button>
        </Link> */}
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
};

export default OrderPage;
