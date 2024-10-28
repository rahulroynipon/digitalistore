import axios from "axios";

const googleAuth = async (token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/google`,
      {},
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

const getUserAuth = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/user`,
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

const logoutUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
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

export const authService = {
  googleAuth,
  getUserAuth,
  logoutUser,
};
