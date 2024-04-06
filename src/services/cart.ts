import instance from "@/configs/axios";

export const decreaseQuantity = async () => {
  try {
    const { data } = await instance.post("/cart/decreseQuantity", {
      userId,
      product,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const increaseQuantity = async () => {
  try {
    const { data } = await instance.post("/cart/increseQuantity", {
      userId,
      product,
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const getCartByUserId = async () => {
  try {
    const { data } = await instance.get(`/cart/${userId}`);
    return data;
  } catch (error) {
    return error;
  }
};
