import axios from "axios";

const createCategory = async (category) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/category`,
      category,
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

const deleteCategory = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/category/${id}`,
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

export const categoryService = {
  createCategory,
  getAllCategory,
  deleteCategory,
};
