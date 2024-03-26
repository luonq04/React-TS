import instance from "@/configs/axios";

export const getAllCategory = async () => {
  const { data } = await instance.get("/category");
  return data.data;
};
