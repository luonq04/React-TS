import React from "react";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

type Props = {};

const Carts = (props: Props) => {
  return (
    <section className="cart">
      <div className="container">
        <div className="cart-wrapper">
          <div className="cart-detail">
            <div className="cart-heading">
              <div className="cart-heading__wrapper">
                <div className="cart-title-1">
                  <span>Product</span>
                  <span>Price</span>
                </div>
                <div className="cart-title-2">
                  <span>Quantity</span>
                  <span>Subtotal</span>
                </div>
              </div>
            </div>
            <div className="cart-body">
              <CartItem />
            </div>
          </div>
          <div className="cart-checkout">
            <div className="cart-checkout__wrapper">
              <h2 className="cart-checkout__title">Cart Totals </h2>
              <div className="cart-checkout__total-price">
                <div className="cart-checkout__subtotal">
                  <span className="cart-checkout__subtotal-title">
                    Subtotal
                  </span>
                  <span className="cart-checkout__subtotal-price">
                    25.000.000đ
                  </span>
                </div>
                <div className="cart-checkout__total">
                  <span className="cart-checkout__subtotal-title">Total</span>
                  <span className="cart-checkout__total-money">
                    25.000.000đ
                  </span>
                </div>
              </div>
              <Link to="/checkout">
                <button className="cart-checkout__btn">Check Out</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carts;
