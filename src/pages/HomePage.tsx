import Shop from "../components/Shop";
import Post from "../components/Post";
import Service from "../components/Service";
import Banner from "../components/Banner";
import New from "../components/New";
import { useQuery } from "react-query";
import Loader from "@/components/Loader";

const HomePage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["Product"],
    queryFn: () => {
      const data = fetch("http://localhost:8080/api/products").then((res) =>
        res.json()
      );

      return data;
    },
  });

  if (isLoading) return <Loader />;
  //
  console.log(data);

  return (
    <>
      <Banner title="Trang chủ" subTitle="Home" />
      <New />
      <Shop />
      <Post />
      <Service />
    </>
  );
};

export default HomePage;
