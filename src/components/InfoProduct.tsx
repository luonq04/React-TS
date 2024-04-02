import { useEffect, useRef, useState } from "react";
import { IProduct } from "../interface/product";
import { formatCurrency } from "../utils/helpers";

const InfoProduct = ({ product }: { product: IProduct }) => {
  const imgEl = useRef(null);

  const [count, setCount] = useState(1);

  function increaseCount() {
    setCount(count + 1);
  }

  function decreaseCount() {
    if (count === 1) return null;
    setCount(count - 1);
  }

  useEffect(function () {
    function callback(e) {
      if (!e.target.getAttribute("data-img")) return;

      if (e.target.src === null) return;

      imgEl.current.src = e.target.src;
    }

    document.addEventListener("click", callback);

    return document.addEventListener("click", callback);
  }, []);

  const {
    _id,
    name,
    price,
    sale,
    customerReview,
    description,
    tags,
    category,
    gallery,
    image,
  } = product;

  console.log(product);

  return (
    <div>
      <section className="product-detail">
        <div className="container">
          <div className="product-detail__wrapper">
            <div className="product-detail__left">
              <div className="product-detail-list__images">
                {gallery?.map((img, index) => (
                  <div className="product-detail__image" key={index}>
                    <img src={img} alt="true" data-img />
                  </div>
                ))}
              </div>
              <div className="product-detail-main__images">
                <img src={image} alt="true" ref={imgEl} />
              </div>
            </div>
            <div className="product-detail__right">
              <h1 className="product-detail__heading">{name}</h1>
              <span className="product-detail__price">
                {formatCurrency(price!)}đ
              </span>
              <div className="product-detail__feedback">
                <div className="product-detail__star">
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star-half" />
                </div>
                <p className="product-detail__people">
                  {customerReview!.length} Customer Review
                </p>
              </div>
              <p className="product-detail__description">{description}</p>
              <div className="product-detail__size">
                <span>Size</span>
                <div className="product-detail__size-button">
                  <button className="product-detail__size-button--different">
                    L
                  </button>
                  <button className="product-detail__size-button--different">
                    XL
                  </button>
                  <button className="product-detail__size-button--different">
                    XS
                  </button>
                </div>
              </div>
              <div className="product-detail__color">
                <span>Color</span>
                <div className="product-detail__color-button">
                  <button className="product-detail__color-button--violet" />
                  <button className="product-detail__color-button--black" />
                  <button className="product-detail__color-button--brown" />
                </div>
              </div>
              <div className="product-detail__features">
                <div className="product-features product-detail__count">
                  <button onClick={decreaseCount}>-</button>
                  <span>{count}</span>
                  <button onClick={increaseCount}>+</button>
                </div>
                <div className="product-features product-detail__add">
                  <button>Add To Cart</button>
                  {/* <Button>Button</Button> */}
                </div>
                <div className="product-features product-detail__compare">
                  <button>+ Compare</button>
                </div>
                <div />
                <div />
              </div>
              <div className="product-detail__parameter">
                <div className="product-detail__param">
                  <span className="product-detail__title">SKU</span>
                  <span>:</span>
                  <span className="product-detail__parameter-quantity">
                    {_id?.slice(-6, -1)}
                  </span>
                </div>
                <div className="product-detail__param">
                  <span className="product-detail__title">Category</span>
                  <span>:</span>
                  <span className="product-detail__parameter-quantity">
                    {category!.name}
                  </span>
                </div>
                <div className="product-detail__param">
                  <span className="product-detail__title">Tags</span>
                  <span>:</span>
                  <span className="product-detail__parameter-quantity">
                    {tags.join(", ")}
                  </span>
                </div>
                <div className="product-detail__param">
                  <span className="product-detail__title">Share</span>
                  <span>:</span>
                  <div className="product-detail__network">
                    <i className="fa-brands fa-facebook" />
                    <i className="fa-brands fa-linkedin" />
                    <i className="fa-brands fa-square-twitter" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoProduct;
