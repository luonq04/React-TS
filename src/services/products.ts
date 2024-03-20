import instance from "@/configs/axios";
import axios from "axios";

const URL = "http://localhost:8080/api/products";

export const deleteProduct = async (id) => {
  await axios.delete(`${URL}/${id}`);
};

export const addProduct = async (product) => {
  await axios.post(`${URL}`, product);
};

export const editProduct = async (id, product) => {
  await axios.put(`${URL}/${id}`, product);
};

// =================================================================

export const getAllProducts = async () => {
  try {
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
