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

export const productService = {
  createProduct,
};
