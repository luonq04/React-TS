import { useEffect, useState } from "react";

interface IProps {
  title: string;
  subTitle: string;
}

const Banner = (props: IProps) => {
  const [title, setTitle] = useState("banner__heading");
  const [subTitle, setSubTitle] = useState("banner__sub--heading");

  useEffect(
    function checkTitle() {
      if (props.title === "Shop") {
        setTitle("banner__heading-shop");
        setSubTitle("banner__sub--heading-shop");
      }

      if (props.title === "Cart") {
        setTitle("banner__heading-cart");
        setSubTitle("banner__sub--heading-cart");
      }

      if (props.title === "Checkout") {
        setTitle("banner__heading-checkout");
        setSubTitle("banner__sub--heading-checkout");
      }
    },
    [props.title]
  );

  return (
    <section className="banner">
      <div className="banner__wrapper">
        <img src="/Rectangle 1.png" alt="true" className="banner__img" />
      </div>
      <h3 className={title}>{props.title}</h3>
      <span className={subTitle}>{props.subTitle}</span>
    </section>
  );
};

export default Banner;
