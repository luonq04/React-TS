import { Link } from "react-router-dom";
import { IProduct } from "../interface/product";
import { formatCurrency } from "../utils/helpers";
import useAddToCart from "@/hooks/useAddToCart";
import { useLocalStorage } from "@/hooks/useStorage";
import Loader from "./Loader";

const ProductItem = ({ product }: { product: IProduct }) => {
  const { name, image, price, sale, type, _id } = product;

  const [user] = useLocalStorage("user", {});

  const { addToCart, isAdding } = useAddToCart(user);

  if (isAdding) return <Loader />;

  return (
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt="true" className="product__thumbnail" />

        {sale > 0 && (
          <div className="product__wrapper-sale product-item__sale-white">
            <span className="absolute -translate-x-[10%] translate-y-[40%] top-[5%] right-[5%]">
              -{sale}%
            </span>
          </div>
        )}
      </div>
      <div className="product-info">
        <h3 className="product__name">
          <Link to="" className="product__link">
            {name}
          </Link>
        </h3>
        <Link to="" className="product__category">
          {type}
        </Link>
        <div className="product-price">
          <span className="product-price__new">{formatCurrency(price!)}đ</span>
          <span className="product-price__old">
            {formatCurrency(price! - price! * (sale! / 100))}đ
          </span>
        </div>
      </div>
      <div className="product-item-content-extra">
        <Link to={`/detail/${_id}`}>
          <button className="product-btn">View product</button>
        </Link>
        <button
          className="product-btn"
          onClick={() => addToCart({ product: _id!, quantity: 1 })}
        >
          Add to cart
        </button>
        <ul className="product-list__feature">
          <li className="product-item__feature">
            <i className="fa-solid fa-share-nodes" />
            <span>Share</span>
          </li>
          <li className="product-item__feature">
            <i className="fa-solid fa-arrow-right-arrow-left" />
            <span>Compare</span>
          </li>
          <li className="product-item__feature">
            <i className="fa-regular fa-heart" />
            <span>Like</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductItem;
