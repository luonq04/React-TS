import { IProducts } from "@/interface/product";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import "swiper/css/scrollbar";

// import module
import { Scrollbar } from "swiper/modules";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

export default function SwipperProduct({
  products,
}: {
  products: IProducts;
}): JSX.Element {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={20}
      scrollbar={{
        hide: true,
      }}
      modules={[Scrollbar]}
      className="mySwiper"
    >
      {products?.map((slide) => (
        <SwiperSlide key={slide._id}>
          {/* <div className="mb-12"> */}
          <ProductItem product={slide} />
          {/* </div> */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
