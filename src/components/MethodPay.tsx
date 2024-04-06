import useCart from "@/hooks/useCart";
import Loader from "./Loader";
import { formatCurrency } from "@/utils/helpers";

type ItemIncart = {
  productID: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  color: string;
  size: string;
};

const MethodPay = () => {
  const { data, isLoading, calculateTotal } = useCart();

  if (isLoading) return <Loader />;
  // console.log(data);

  return (
    <div className="method-pay">
      <div className="price-checkout">
        <div className="wrapper-info__checkout">
          <h2 className="heading-info__checkout">Product</h2>
          <h2 className="heading-info__checkout">Subtotal</h2>
        </div>
        {/* ==== Thong tin gio hang ==== */}
        {data.map((product: ItemIncart) => (
          <div className="wrapper-info__checkout" key={product.productID}>
            <div className="product-wrapper">
              <h4 className="product-name">{product.name}</h4>
              <span>x {product.quantity}</span>
            </div>
            <span className="product-price">
              {formatCurrency(product.price)} đ
            </span>
          </div>
        ))}

        <div className="wrapper-info__checkout">
          <p>Total</p>
          <span className="total-price">
            {formatCurrency(calculateTotal())} đ
          </span>
        </div>
      </div>
      {/* ==== Thong tin gio hang ==== */}

      <div className="method-pay__description">
        <div className="medthod-pay__bank">
          <label className="container-label">
            Direct Bank Transfer
            <input type="radio" name="radio" />
            <span className="checkmark" />
          </label>
          <p className="bank-policy">
            Make your payment directly into our bank account. Please use your
            Order ID as the payment reference. Your order will not be shipped
            until the funds have cleared in our account.
          </p>
        </div>
        <div className="method-pay__more">
          <label className="container-label">
            Direct Bank Transfer
            <input type="radio" name="radio" />
            <span className="checkmark" />
          </label>
          <label className="container-label">
            Cash On Delivery
            <input type="radio" name="radio" />
            <span className="checkmark" />
          </label>
          <p className="policy">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our{" "}
            <a className="policy-detail">privacy policy.</a>
          </p>
        </div>
        <div className="place-order">
          <button className="btn-order">Place order</button>
        </div>
      </div>
    </div>
  );
};

export default MethodPay;
