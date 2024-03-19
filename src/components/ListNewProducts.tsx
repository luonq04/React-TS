import { useContext } from "react";
import { IProduct } from "../interface/product";
import ProductItem from "./ProductItem";
import { ProductContext } from "../context/ProductProvider";

import Loader from "./Loader";

const ListNewProducts = () => {
  const { products } = useContext(ProductContext);

  if (products.isLoading) return <Loader />;
  // if (!products.isLoading) return <Loader />;

  return (
    <div className="section-body">
      <div className="product-list" data-aos="fade-right">
        {/* Product Item (MAP) */}
        {products.value.slice(0, 4).map((pro: IProduct) => (
          <ProductItem product={pro} key={pro._id} />
        ))}
        {/* <ProductItem /> */}
      </div>
    </div>
  );
};

export default ListNewProducts;
