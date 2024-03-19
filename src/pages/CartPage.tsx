import Banner from "../components/Banner";
import Carts from "../components/Carts";
import Service from "../components/Service";

const CartPage = () => {
  return (
    <>
      <Banner title="Cart" subTitle="Home > Cart" />
      <Carts />
      <Service />
    </>
  );
};

export default CartPage;
