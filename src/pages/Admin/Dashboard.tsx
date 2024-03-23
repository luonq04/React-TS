import Loader from "@/components/Loader";
import { useQueryAllProduct } from "@/hooks/useQueryAllProduct";

const Dashboard = () => {
  const { allProducts, isLoading } = useQueryAllProduct();

  if (isLoading) return <Loader />;

  console.log(allProducts);

  return <div>Dashboard</div>;
};

export default Dashboard;
