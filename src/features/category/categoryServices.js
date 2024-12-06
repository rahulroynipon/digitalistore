import axios from "axios";
import { getTokens } from "../../context/Token";

const createCategory = async (category) => {
  const token = getTokens();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/category`,
      category,
      {
        headers: {
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

const getAllCategory = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/category`
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

const deleteCategory = async (name) => {
  const token = getTokens();
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/category/${name}`,
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

export const categoryService = {
  createCategory,
  getAllCategory,
  deleteCategory,
};
