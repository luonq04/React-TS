import Banner from "../components/Banner";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import Service from "../components/Service";

const ShopPage = () => {
  return (
    <>
      <Banner title="Shop" subTitle="Home > Shop" />
      <Filter />
      <Products />
      <Pagination />
      <Service />
    </>
  );
};

export default ShopPage;
