import instance from "@/configs/axios";

type Category = {
  name: string;
};

export const getAllCategory = async () => {
  const { data } = await instance.get("/category");

  return data.data;
};

export const deleteCategory = async (id: string) => {
  try {
    return await instance.delete(`/category/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const addCategory = async (category: Category) => {
  try {
    return await instance.post(`/category`, category);
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const { data } = await instance.get(`/category/${id}`);

    return data.category;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCategory = async (id: string, category: Category) => {
  try {
    return await instance.put(`/category/${id}`, category);
  } catch (error) {
    throw new Error(error);
  }
};
