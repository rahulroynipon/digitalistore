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

export const authService = {
  googleAuth,
};
