import Breadcrumb from "../components/Breadcrumb";
import InfoProduct from "../components/InfoProduct";
import DescriptionProduct from "../components/DescriptionProduct";
import RelatedProduct from "../components/RelatedProduct";
import { useParams } from "react-router-dom";

import axios from "axios";
import { useQuery } from "react-query";
import Loader from "../components/Loader";

const ProductDetailPage = () => {
  const { id } = useParams();

  const getProductDetai = async () => {
    window.scrollTo(0, 0);
    return axios.get(`http://localhost:8080/api/products/${id}`);
  };

  const { isLoading, data } = useQuery(["product", id], getProductDetai);

  if (isLoading) return <Loader />;

  return (
    <>
      <Breadcrumb name={data?.data?.name} />
      <InfoProduct product={data?.data} />
      <DescriptionProduct />
      <RelatedProduct />
    </>
  );
};

export default ProductDetailPage;
