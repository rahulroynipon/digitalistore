import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  Dropdown,
  TextField,
  MultiSelectDropdown,
} from "../components/Product_upload/Product_upload";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategory } from "../features/category/categorySlice";
import { getBrand } from "../features/brand/brandSlice";
import { getColor } from "../features/color/colorSlice";
import { DynamicTable } from "../components/Product_upload/DynamicTable";
import TextEditor from "../components/Global/TextEditor";
import MediaUploader from "../components/Product_upload/MediaUploader.jsx";
import ProtectedAction from "../components/Global/ProtectedAction.jsx";
import { Button } from "@mui/material";
import { addProduct } from "../features/product/productSlice.js";

export default function ProductUploader() {
  const theme = useTheme();
  const bgColor = theme.palette.background.paper;
  const fieldColor = theme.palette.background.default;
  const borderColor = theme.palette.border.secondary;
  const textColor = theme.palette.text.primary;
  const btnColor = theme.palette.text.isActive;

  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { colors } = useSelector((state) => state.color);
  const { isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  // Dispatch actions to get categories, brands, colors
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrand());
    dispatch(getColor());
  }, [dispatch]);

  return (
    <section style={{ maxWidth: "93vw" }} className="m-3 mt-5 md:m-5 ">
      {/* loaing state handler  start*/}

      {isLoading ? (
        <Box
          sx={{
            position: "fixed",
            left: "50%",
            top: "50%",
            zIndex: 100,
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress sx={{ color: btnColor }} />
        </Box>
      ) : null}
      {/* loaing state handler  end*/}

      <div
        className="rounded-lg"
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}20`,
        }}
      >
        <h1 className="text-2xl p-5">
          <strong>Product Upload</strong>
        </h1>
      </div>

      {/* Main Form Section */}
      <main
        className="mt-5 p-5 rounded-lg shadow-lg"
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}20`,
        }}
      >
        <label className=" mb-5 text-2xl inline-block font-semibold opacity-85">
          Product Information
        </label>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            const formData = new FormData();

            Object.keys(values).forEach((key) => {
              if (key === "table") {
                formData.append(key, JSON.stringify(values[key]));
              } else if (key !== "images") {
                formData.append(key, values[key]);
              }
            });

            values.images.forEach((image) => {
              formData.append("images", image);
            });

            dispatch(addProduct(formData));
            resetForm();
          }}
        >
          {({
            errors,
            touched,
            setFieldValue,
            values,
            handleSubmit,
            resetForm,
          }) => (
            <Form>
              {/* Title Field */}
              <TextField
                label="product title"
                type="text"
                id="title"
                name="title"
                isSubmitting={isLoading}
              />

              {/* Tags Field */}
              <TextField
                label="product tags"
                type="text"
                id="tags"
                name="tags"
                isSubmitting={isLoading}
              />

              {/* Dropdown Fields */}
              <div className="flex flex-col md:flex-row gap-x-5">
                <Dropdown
                  label="Category"
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={(e) => setFieldValue("category", e.target.value)}
                  options={categories || []}
                  isSubmitting={isLoading}
                />
                <Dropdown
                  label="Brand"
                  id="brand"
                  name="brand"
                  value={values.brand}
                  onChange={(e) => setFieldValue("brand", e.target.value)}
                  options={brands || []}
                  isSubmitting={isLoading}
                />
                <MultiSelectDropdown
                  label="Colors"
                  id="colors"
                  name="colors"
                  value={values.colors}
                  onChange={(event) =>
                    setFieldValue("colors", event.target.value)
                  }
                  options={colors || []}
                  isSubmitting={isLoading}
                />
              </div>

              {/* Price, Stack, and Discount Fields */}
              <div className="flex flex-col md:flex-row gap-x-5">
                <TextField
                  label="price"
                  type="text"
                  id="price"
                  name="price"
                  isSubmitting={isLoading}
                />
                <TextField
                  label="Stack"
                  type="text"
                  id="stack"
                  name="stack"
                  isSubmitting={isLoading}
                />
                <TextField
                  label="discount"
                  type="text"
                  id="discount"
                  name="discount"
                  isSubmitting={isLoading}
                />
              </div>

              {/* Dynamic Table Field */}
              <div>
                <FieldArray
                  name="table"
                  render={({ insert, remove, push }) => (
                    <DynamicTable
                      values={values.table}
                      errors={errors}
                      touched={touched}
                      insert={insert}
                      remove={remove}
                      push={push}
                      isSubmitting={isLoading}
                    />
                  )}
                />
              </div>

              {/* Description Field (TextEditor) */}
              <div>
                <label className="mb-5 text-2xl inline-block font-semibold opacity-85">
                  Description
                </label>
                <div
                  style={{
                    color: "black",
                  }}
                >
                  <TextEditor
                    value={values.description}
                    reset={resetForm}
                    onChange={(e, editor) => {
                      setFieldValue("description", editor.getData());
                    }}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-xs mt-1 ml-1"
                  />
                </div>
              </div>

              {/* Image Field */}
              <MediaUploader
                setFieldValue={setFieldValue}
                values={values}
                isSubmitting={isLoading}
                reset={resetForm}
              />

              {/* Submit Button */}
              <div className="mt-10 mb-5">
                <ProtectedAction action={handleSubmit}>
                  <Button
                    type="button"
                    disabled={isLoading}
                    sx={{
                      backgroundColor: btnColor,
                      color: "white",
                      width: "100%",
                    }}
                  >
                    Publish
                  </Button>
                </ProtectedAction>
              </div>
            </Form>
          )}
        </Formik>
      </main>
    </section>
  );
}

// Initial Values
export const initialValues = {
  title: "",
  tags: "",
  category: "",
  brand: "",
  colors: [],
  description: "",
  stack: "",
  price: "",
  discount: "",
  table: [{ label: "", value: "", required: false }],
  images: [],
};

// Validation Schema
export const validationSchema = Yup.object({
  title: Yup.string().required("Product's title is required"),
  tags: Yup.string().required("Product's tags are required"),
  category: Yup.string().required("Product's category is required"),
  brand: Yup.string().required("Product's brand is required"),
  colors: Yup.array().min(1, "At least one color must be selected"),
  description: Yup.string()
    .required("Product's description is required")
    .min(10, "Description must be at least 10 characters"),
  stack: Yup.number()
    .typeError("Stack must be a number")
    .min(0, "Stack cannot be negative")
    .required("Product's stack is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be a positive value")
    .required("Product's price is required"),
  discount: Yup.number()
    .typeError("Discount must be a number")
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .required("Product's discount is required"),
  table: Yup.array()
    .of(
      Yup.object({
        label: Yup.string().required("Label is required"),
        value: Yup.string().required("Value is required"),
        required: Yup.boolean().default(false),
      })
    )
    .min(1, "At least one table entry is required"),
  images: Yup.array()
    .min(1, "At least one image is required")
    .required("Images are required"),
});
