import Banner from "../components/Banner";
import Post from "../components/Post";
import Service from "../components/Service";
import Shop from "../components/Shop";

import New from "@/components/New";

const HomePage = () => {
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
