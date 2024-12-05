import axios from "axios";
import { getTokens } from "../../context/Token";

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
  const token = getTokens();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/color`,
      color,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

const deleteColor = async (name) => {
  const token = getTokens();
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/color/${name}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
