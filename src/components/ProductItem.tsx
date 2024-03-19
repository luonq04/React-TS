import { Link } from "react-router-dom";
import { IProduct } from "../interface/product";
import { formatCurrency } from "../utils/helpers";

const ProductItem = ({ product = {} }: { product: IProduct }) => {
  const { _id, name, price, type, image } = product;

  return (
    <div className="product-item">
      <div className="product-image">
        <img src={image} alt="true" className="product__thumbnail" />
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
          <span className="product-price__old">3.500.000đ</span>
        </div>
      </div>
      <div className="product-item-content-extra">
        <Link to={`/detail/${_id}`}>
          <button className="product-btn">View product</button>
        </Link>
        <button className="product-btn">Add to cart</button>
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
