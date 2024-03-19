import { DataTable } from "@/components/products/data-table";
import { columns } from "@/components/products/columns";
import axios from "axios";
import { useQuery } from "react-query";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { ProductContext } from "@/context/ProductProvider";
// import { useDeleteProduct } from "@/features/Admin/useDeleteProduct";

const ProductsPage = () => {
  const { products } = useContext(ProductContext);

  if (products.isLoading) return <Loader />;

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
      <DataTable columns={columns} data={products.value} />
    </>
  );
};

export default ProductsPage;
