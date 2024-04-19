import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useLocalStorage } from "@/hooks/useStorage";
import { useQuery } from "react-query";
import instance from "@/configs/axios";
import Loader from "./Loader";
import { formatCurrency } from "@/utils/helpers";

const Carts = () => {
  const [user] = useLocalStorage("user", {});

  if (!user.user) return;

  const userId = user.user._id;

  const { data, isLoading } = useQuery({
    queryKey: ["Cart", userId],
    queryFn: async () => {
      const { data } = await instance.get(`/cart/${userId}`);
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <Loader />;
  console.log(data);

  return (
    <section className="cart">
      <div className="container">
        <div className="cart-wrapper">
          <div className="cart-detail">
            <div className="cart-heading">
              <div className="cart-heading__wrapper">
                <div className="cart-title-1">
                  <span className="cart-title__product">Product</span>
                  <span className="cart-title__price">Price</span>
                </div>
                <div className="cart-title-2">
                  <span className="cart-title__price">Quantity</span>
                  <span className="cart-title__subtotal">Subtotal</span>
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
                    {formatCurrency(
                      data?.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                    )}{" "}
                    đ
                  </span>
                </div>
                <div className="cart-checkout__total">
                  <span className="cart-checkout__subtotal-title">Total</span>
                  <span className="cart-checkout__total-money">
                    {formatCurrency(
                      data?.reduce(
                        (acc, item) => acc + item.price * item.quantity,
                        0
                      )
                    )}{" "}
                    đ
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
