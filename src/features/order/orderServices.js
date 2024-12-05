import axios from "axios";
import { getTokens } from "../../context/Token";

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
  const token = getTokens();
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/order`,
      { id, status },
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

const viewOrderById = async (id) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/order/${id}`
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
  viewOrderById,
};
