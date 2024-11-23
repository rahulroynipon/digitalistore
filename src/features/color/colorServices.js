import axios from "axios";

const getAllcolor = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/color`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

const createColor = async (color) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/color`,
      color,
      { withCredentials: true }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

const deleteColor = async (name) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/color/${name}`,
      {
        withCredentials: true,
      }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const colorService = {
  getAllcolor,
  createColor,
  deleteColor,
};
