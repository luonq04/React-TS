import { IProduct } from "../interface/product";
import ProductItem from "./ProductItem";

import { useProductQuery } from "@/hooks/useProductQuery";
import Loader from "./Loader";

type ProductListProps = {
  sale?: boolean;
};

const ProductList = ({ sale }: ProductListProps) => {
  const { data, isLoading } = useProductQuery();

  const saleProducts = sale
    ? data?.filter((product: IProduct) => product?.sale > 0)
    : data;

  if (isLoading) return <Loader />;

  return (
    <div className="section-body">
      <div className="product-list" data-aos="fade-right">
        {saleProducts?.map((pro: IProduct) => (
          <ProductItem product={pro} key={pro._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
