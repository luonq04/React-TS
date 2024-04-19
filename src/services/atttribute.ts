import instance from "@/configs/axios";

export const getAllAtrribute = async () => {
  try {
    const { data } = await instance.get("attributes");
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const createAttribute = async (attribute: string) => {
  try {
    const { data } = await instance.post("/attributes", attribute);
    return data;
  } catch (error) {
    return error;
  }
};

export const deleteAttribute = async (id: string) => {
  try {
    const { data } = await instance.delete(`/attributes/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

// ================== Attribute Value ==================

export const createAttributeValue = async (attriVal) => {
  try {
    const { attributeId, name, price, quantity, color } = attriVal;

    console.log(color);

    const { data } = await instance.post(`attributes/${attributeId}/values`, {
      name,
      price,
      quantity,
      color: color,
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAttributeById = async (id: string) => {
  // console.log(id);
  try {
    const { data } = await instance.get(`attributes/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const delAttributeValue = async (id: string) => {
  try {
    const { data } = await instance.delete(`/attributes/${id}/values`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAttributeValueById = async (id: string) => {
  try {
    const { data } = await instance.get(`/attributeValues/${id}`);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateAttributeValueById = async (id: string, attriVal) => {
  try {
    const { name, price, quantity, color } = attriVal;

    const { data } = await instance.put(`/attributeValues/${id}`, {
      name,
      price,
      quantity,
      color,
    });
    return data;
  } catch (error) {
    throw new Error(error);
  }
};
