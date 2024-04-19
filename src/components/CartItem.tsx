import instance from "@/configs/axios";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

import { useLocalStorage } from "@/hooks/useStorage";
import { useQuery } from "react-query";
import Loader from "./Loader";
import { formatCurrency } from "@/utils/helpers";
import useDeleteProductCart from "@/hooks/useDeleteProductCart";
import useIncreaseQuantity from "@/hooks/useIncreaseQuantity";
import useDecreaseQuantity from "@/hooks/useDecreaseQuantity";

const CartItem = () => {
  const [user] = useLocalStorage("user", {});

  if (!user.user) return;

  const userId = user.user._id;
  const { deleteProductCart } = useDeleteProductCart(user);
  const { increasing } = useIncreaseQuantity(user);
  const { decreasing } = useDecreaseQuantity(user);

  const { data, isLoading } = useQuery({
    queryKey: ["Cart", userId],
    queryFn: async () => {
      const { data } = await instance.get(`/cart/${userId}`);
      console.log(data);
      return data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <>
      {data?.map((pro) => (
        <div
          className="cart-item"
          key={`${pro.productId}${pro.attribute}${pro.attributeValue}`}
        >
          <div className="cart-info-1">
            <img src={pro.image} alt="Image product" />
            <div className="mr-auto">
              <p className="cart-product__name">{pro.name}</p>
              {/* <span className="block">Size: {pro.size}</span>
              <span className="block">Color: {pro.color}</span> */}
            </div>
          </div>
          <div className="cart-info-2">
            <span className="item-price">{formatCurrency(pro.price)}đ</span>
            <div className="cart-total">
              <div className="flex items-center gap-3">
                <CiCirclePlus
                  className="cursor-pointer text-xl"
                  onClick={() => increasing(pro._id)}
                />
                <span className="item-quantity">{pro.quantity}</span>
                <CiCircleMinus
                  className="text-xl cursor-pointer"
                  onClick={() => decreasing(pro._id)}
                />
              </div>
              <span className="item-subtotal">
                {formatCurrency(pro.price * pro.quantity)} đ
              </span>
              <i
                className="fa-solid fa-trash"
                onClick={() =>
                  deleteProductCart({
                    attribute: pro.attribute,
                    attributeValue: pro.attributeValue,
                    product: pro.productId,
                  })
                }
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
