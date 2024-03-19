import Banner from "@/components/Banner";
import Bill from "@/components/Bill";
import Service from "@/components/Service";

const CheckoutPage = () => {
  return (
    <>
      <Banner title="Checkout" subTitle="Home > Checkout" />
      <Bill />
      <Service />
    </>
  );
};

export default CheckoutPage;
