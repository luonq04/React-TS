import axios from "axios";

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value);

export function formatTime(time: string) {
  const date = new Date(time);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

export const uploadFile = async (file) => {
  if (file) {
    const CLOUD_NAME = "diuaob61q";
    const PRESET_NAME = "upload-img";
    const FOLDER_NAME = "TypeScript";
    // const urls = "";
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();

    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    formData.append("file", file);

    const { data } = await axios.post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data.secure_url;
  }

  return;
};

export const uploadFiles = async (files) => {
  if (files) {
    const CLOUD_NAME = "diuaob61q";
    const PRESET_NAME = "upload-img";
    const FOLDER_NAME = "TypeScript";
    const urls = [];
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();

    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);

    for (const file of files) {
      formData.append("file", file);

      const { data } = await axios.post(api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      urls.push(data.secure_url);
    }

    return urls;
  }

  return;
};
