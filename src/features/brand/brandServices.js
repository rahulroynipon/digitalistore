import axios from "axios";

const createBrand = async (brand) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/brand`,
      brand,
      {
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
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/brand/${name}`,
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

export const brandService = {
  createBrand,
  getAllBrand,
  deleteBrand,
};
