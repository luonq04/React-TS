import { useEffect, useRef, useState } from "react";
import { IProduct } from "../interface/product";
import { formatCurrency } from "../utils/helpers";
import instance from "@/configs/axios";
import { toast } from "./ui/use-toast";
import { useLocalStorage } from "@/hooks/useStorage";

type SizeType = { color: string }[];

const InfoProduct = ({ product }: { product: IProduct }) => {
  const imgEl = useRef(null);
  const [size, setSize] = useState<SizeType>([]);
  const [attributeValue, setAttributeValue] = useState([]);
  const [attributeId, setAttributeId] = useState("");
  const [count, setCount] = useState(1);

  const [user] = useLocalStorage("user", {});

  console.log(user);

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
    attributes,
    customerReview,
    description,
    tags,
    category,
    gallery,
    image,
  } = product;

  async function getValue(e) {
    setAttributeId(e.target.value);
    const { data } = await instance.get(`attributes/${e.target.value}`);
    console.log(data);
    setSize(data.values);
    setAttributeValue(data.values[0]);
  }

  function getValueDetail(e) {
    const valueProduct = size.find((item) => item._id === e.target.value);
    setAttributeValue(valueProduct);
  }

  async function handleSubmit() {
    if (size.length === 0)
      return toast({
        className: "bg-red-400 text-white",
        title: "Please choose size",
        duration: 2000,
      });

    if (attributeValue.length === 0)
      return toast({
        className: "bg-red-400 text-white",
        title: "Please choose color",
        duration: 2000,
      });

    const item = {
      userId: user.user._id,
      quantity: count,
      product: _id,
      attribute: attributeId,
      attributeValue: attributeValue._id,
    };

    const { data } = await instance.post("/cart/add-to-cart", item);
    console.log(data);
  }

  // console.log("DETAIL", detail);
  // console.log("SIZE", size);
  // console.log("Attribute", attributeValue);
  // console.log(attributeId);

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
                {formatCurrency(
                  attributeValue.price! ? attributeValue.price! : price
                )}
                đ
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
                  {attributes?.map((attr, index) => (
                    <button
                      value={attr._id}
                      className="product-detail__size-button--different"
                      key={index}
                      onClick={getValue}
                    >
                      {attr.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="product-detail__color">
                <span>Color</span>
                <div className="product-detail__color-button">
                  {size.map((color, index) => (
                    <button
                      value={color._id}
                      key={color._id}
                      style={{
                        backgroundColor: color.color,
                        border:
                          color._id === attributeValue._id
                            ? "2px solid #6d6464"
                            : "",
                      }}
                      onClick={getValueDetail}
                    />
                  ))}
                </div>
              </div>
              <div className="product-detail__features">
                <div className="product-features product-detail__count">
                  <button onClick={decreaseCount}>-</button>
                  <span>{count}</span>
                  <button onClick={increaseCount}>+</button>
                </div>
                <div className="product-features product-detail__add">
                  <button onClick={handleSubmit}>Add To Cart</button>
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
