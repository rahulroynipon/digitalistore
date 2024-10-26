import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
} from "@mui/material";
import { indigo, amber } from "@mui/material/colors";
import { button } from "framer-motion/client";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: mode === "light" ? indigo[500] : indigo[900],
      },
      secondary: {
        main: mode === "light" ? amber[500] : amber[700],
      },
      background: {
        default: mode === "light" ? "#FFFFFF99" : "#071739",
        paper: mode === "light" ? "#F5F5F5" : "#003366",
      },
      button: {
        btnH: mode === "light" ? "#F0F5FF" : "#112755",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#FFFFFF",
        secondary: mode === "light" ? "" : "#596780",
      },
      icon: {
        primary: mode === "light" ? "#292929" : "#fff",
      },
      border: {
        primary: mode === "light" ? "#D3D3D3" : "#071739",
        secondary: mode === "light" ? "#071739" : "#D3D3D3",
      },
      color: {
        header: mode === "light" ? "#FDFDFD" : "#112143",
        login: mode === "light" ? "#f0f0f0" : "#1b2b4d",
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
