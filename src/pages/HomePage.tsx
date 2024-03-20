import Shop from "../components/Shop";
import Post from "../components/Post";
import Service from "../components/Service";
import Banner from "../components/Banner";

import Loader from "@/components/Loader";
import { useProductQuery } from "@/hooks/useProductQuery";
import New from "@/components/New";

const HomePage = () => {
  const { data, isLoading } = useProductQuery();

  if (isLoading) return <Loader />;

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
