import { useContext } from "react";
import ProductList from "./ProductList";
import { ProductContext } from "../context/ProductProvider";

const Products = () => {
  return (
    <section className="product">
      <div className="container">
        <ProductList />
      </div>
    </section>
  );
};

export default Products;
