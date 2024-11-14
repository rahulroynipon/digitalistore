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

  return <>Dashboard</>;
}

// Validation Schema
export const validationSchema = Yup.object({
  category: Yup.string().required("Category name is required"),
  subcategory: Yup.string().required("Subcategory name is required"),
});
