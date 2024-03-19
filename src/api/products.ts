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
