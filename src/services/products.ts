import instance from "@/configs/axios";
import { IProduct } from "@/interface/product";

export const deleteProduct = async (id: number | string) => {
  return await instance.delete(`/products/${id}`);
};

export const addProduct = async (product: IProduct) => {
  try {
    // return await instance.post(`/products`, product);
    const { data } = await instance.post(`/products`, product);
    console.log(data);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editProduct = async (id: number | string, product: IProduct) => {
  return await instance.put(`/products/${id}`, product);
};

// =================================================================

export const getAllProducts = async () => {
  try {
    // const { data } = await instance.get("/products?_page=1&_limit=6");
    const { data } = await instance.get("/products");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: number | string) => {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
