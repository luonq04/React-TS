import instance from "@/configs/axios";

export const getAllOrder = async () => {
  try {
    const { data } = await instance.get("/order");
    return data;
  } catch (error) {
    return error;
  }
};

export const getOrderById = async (id: string) => {
  try {
    const { data } = await instance.get(`/order/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const updateOrder = async (id: string, status: string) => {
  try {
    const { data } = await instance.put(`/order/${id}`, { status });
    return data;
  } catch (error) {
    return error;
  }
};
