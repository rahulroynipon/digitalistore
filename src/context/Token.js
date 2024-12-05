const saveToken = (accessToken, refreshToken) => {
  console.log(import.meta.env.VITE_API_DELIMITER);
  if (accessToken && refreshToken) {
    const baseToken = `${accessToken}${
      import.meta.env.VITE_API_DELIMITER
    }${refreshToken}`;
    localStorage.setItem("baseToken", baseToken);
  } else {
    console.error(
      "Both accessToken and refreshToken are required to save tokens."
    );
  }
};

const getTokens = () => {
  const baseToken = localStorage.getItem("baseToken");
  if (!baseToken) return null;
  return baseToken;
};

const clearToken = () => {
  localStorage.removeItem("baseToken");
};

export { saveToken, getTokens, clearToken };
