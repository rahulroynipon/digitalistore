import axios from "axios";
import { clearToken, getTokens } from "./../../context/Token";

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
  const token = getTokens();
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/user`,
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

const logoutUser = async () => {
  const token = getTokens();
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    if (response.data) {
      clearToken();
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
