import { useContext, useEffect } from "react";
import { IProduct, IProducts } from "../interface/product";
import ProductItem from "./ProductItem";
import { ProductContext } from "../context/ProductProvider";
import axios from "axios";

const ProductList = () => {
  const { products, dispatch } = useContext(ProductContext);

  const URL = "http://localhost:8080/api/products";

  useEffect(function () {
    (async () => {
      try {
        const { data } = await axios.get(`${URL}`);
        dispatch({ type: "SET_PRODUCTS", payload: data });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="section-body">
      <div className="product-list" data-aos="fade-right">
        {/* Product Item (MAP) */}
        {products.value.map((pro: IProduct) => (
          <ProductItem product={pro} key={pro._id} />
        ))}
        {/* <ProductItem /> */}
      </div>
    </div>
  );
};

export default ProductList;
