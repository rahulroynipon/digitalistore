import axios from "axios";
import { getTokens } from "../../context/Token";

const createBrand = async (brand) => {
  const token = getTokens();
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/brand`,
      brand,
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
    console.log(error);
    throw error.response?.data?.message || error.message;
  }
};

const getAllBrand = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/brand`);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    throw error.response?.data?.message || error.message;
  }
};

const deleteBrand = async (name) => {
  const token = getTokens();
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/brand/${name}`,
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

export const brandService = {
  createBrand,
  getAllBrand,
  deleteBrand,
};
