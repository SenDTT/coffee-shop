import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { ImgurType } from "../types/ImgurTypes";

// Upload Image function
const uploadToImgur = async (filePath: string): Promise<ImgurType> => {
  const form = new FormData();
  form.append("image", fs.createReadStream(filePath));

  try {
    const response = await axios.post(process.env.IMGUR_API_URL || "", form, {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        ...form.getHeaders(),
      },
    });

    return {
      link: response.data.data.link,
      deletehash: response.data.data.deletehash
    };
  } catch (error) {
    throw new Error("Error uploading image to Imgur");
  }
};

// delete iamge function
const deleteToImgur = async (deletehash: string): Promise<boolean> => {
  const form = new FormData();

  try {
    const response = await axios.delete((process.env.IMGUR_API_URL || "") + `/${deletehash}`, {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        ...form.getHeaders(),
      },
    });

    return response.data.data;
  } catch (error) {
    throw new Error("Error uploading image to Imgur");
  }
};