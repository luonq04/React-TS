import { Link } from "react-router-dom";

import SwipperProduct from "./SwiperProduct";
import { useProductQuery } from "@/hooks/useProductQuery";
import Loader from "./Loader";

const RelatedProduct = () => {
  const { data, isLoading } = useProductQuery();

  if (isLoading) return <Loader />;

  return (
    <section className="related-products">
      <h1 className="related-product__heading">Related Products</h1>
      <div className="container">
        <div className="section-body">
          <div className="mb-11">
            <SwipperProduct products={data} />
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
