import axios from "axios";

const createProduct = async (product) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/product`,
      product,
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

const getAllProduct = async (category, brand) => {
  try {
    console.log(brand);
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/product`,
      {
        params: {
          ...(category && { category }),
          ...(brand && { brand }),
        },
      }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/product/${id}`,
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

const getProductByID = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/product/${id}`
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const productService = {
  createProduct,
  getAllProduct,
  deleteProduct,
  getProductByID,
};
