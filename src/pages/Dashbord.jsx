import { useTheme } from "@emotion/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Dashboard() {
  const theme = useTheme();
  const bgColor = theme.palette.color.navbar;
  const textColor = theme.palette.text.primary;
  const fieldColor = theme.palette.background.default;
  const borderColorPrimary = theme.palette.divider;
  const borderColorSecondary = theme.palette.border.secondary;
  const [image, setImage] = useState(null);

  // Image Upload Handler
  const imageHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Toggle function to expand/collapse subcategories
  const [open, setOpen] = useState({});

  const toggleRow = (id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Mock category data with subcategories
  const categories = [
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
  ];

  return <>Dashboard</>;
}

// Validation Schema
export const validationSchema = Yup.object({
  category: Yup.string().required("Category name is required"),
  subcategory: Yup.string().required("Subcategory name is required"),
});
