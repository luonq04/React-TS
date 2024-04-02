import instance from "@/configs/axios";

export const decreaseQuantity = async () => {
  try {
    const { data } = await instance.post("/cart/decreseQuantity", {
      userId,
      product,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
