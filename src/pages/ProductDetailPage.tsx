import Breadcrumb from "../components/Breadcrumb";
import InfoProduct from "../components/InfoProduct";
import DescriptionProduct from "../components/DescriptionProduct";
import RelatedProduct from "../components/RelatedProduct";
import { useParams } from "react-router-dom";

import Loader from "../components/Loader";
import { useProductQuery } from "@/hooks/useProductQuery";

const ProductDetailPage = () => {
  const { id } = useParams();
  window.scrollTo(0, 0);

  const { data, isLoading } = useProductQuery(id);

  if (isLoading) return <Loader />;

  return (
    <>
      <Breadcrumb name={data?.name} />
      <InfoProduct product={data} />
      <DescriptionProduct customerReview={data?.customerReview} />
      <RelatedProduct />
    </>
  );
};

export default ProductDetailPage;
