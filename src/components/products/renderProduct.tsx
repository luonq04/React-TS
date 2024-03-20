import axios from "axios";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import Loader from "../Loader";
import { useQuery } from "react-query";

// Theo đúng hướng dẫn của Shadcn UI thì đây chính là chỗ render ra table

export default async function DemoPage() {
  // const getProductDetai = async () => {
  //   window.scrollTo(0, 0);
  //   return axios.get(`http://localhost:8080/api/products`);

  //   return data;
  // };

  // const { isLoading, data } = useQuery("product", getProductDetai);

  // if (isLoading) return <Loader />;

  // console.log("data", data.data);

  // const data = await getData();

  return (
    <div className="container mx-auto py-10">
      {/* <DataTable columns={columns} data={data} /> */}
    </div>
  );
}

// Theo đúng hướng dẫn của Shadcn UI thì đây chính là chỗ render ra table
