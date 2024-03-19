import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

const RelatedProduct = () => {
  return (
    <section className="related-products">
      <h1 className="related-product__heading">Related Products</h1>
      <div className="container">
        <div className="section-body">
          <div className="related-product__list">
            <ProductItem />
            {/* End Product Item */}
          </div>
        </div>
        <div className="show-more">
          <button className="btn-related">Show more</button>
        </div>
      </div>
    </section>
  );
};

export default RelatedProduct;
