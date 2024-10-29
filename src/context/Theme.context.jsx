import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  CssBaseline,
} from "@mui/material";
import { indigo, amber } from "@mui/material/colors";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
      },
    },
    palette: {
      mode: mode,
      primary: {
        main: mode === "light" ? indigo[500] : indigo[900],
      },
      secondary: {
        main: mode === "light" ? amber[500] : amber[700],
      },
      background: {
        default: mode === "light" ? "#F8F9FA" : "#131920", //#EBE9E9 #071739
        paper: mode === "light" ? "#F5F5F5" : "#003366",
      },
      button: {
        btnH: mode === "light" ? "#e5ecfa" : "#112755",
        btnNav: mode === "light" ? "#F1F1F1" : "#293856",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#FFFFFF",
        secondary: mode === "light" ? "#6a6a76" : "#c0c3c7",
        isActive: "#4680FF",
      },
      icon: {
        primary: mode === "light" ? "#292929" : "#fff",
      },
      border: {
        primary: mode === "light" ? "#D3D3D3" : "#071739",
        secondary: mode === "light" ? "#071739" : "#D3D3D3",
      },
      color: {
        header: mode === "light" ? "#F8F7F7" : "#131920", // #112143be
        navbar: mode === "light" ? "#F8F9FA" : "#131920", // #F8F7F7  #0F1F41
        login: mode === "light" ? "#f0f0f0" : "#1B232D",
      },
    },
    // header: mode === "light" ? "#FDFDFD" : "#112143",
  });

  return (
    <ThemeContext.Provider
      value={{ mode, isOpen, setIsOpen, toggleNav, toggleTheme }}
    >
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
