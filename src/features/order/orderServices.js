import axios from "axios";

const getAllorder = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/order`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

const updateOrderStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/order`,
      { id, status },
      { withCredentials: true }
    );
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const orderService = {
  getAllorder,
  updateOrderStatus,
};
