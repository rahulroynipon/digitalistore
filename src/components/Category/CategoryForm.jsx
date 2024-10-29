import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

const CategoryForm = () => {
  const theme = useTheme();
  const [image, setImage] = useState(null);

  const imageHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Box
      className="md:sticky md:top-24"
      style={{
        backgroundColor: theme.palette.color.navbar,
        border: `1px solid ${theme.palette.divider}`,
        padding: "1.5rem",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h6" className="text-xl font-semibold">
        Add New Category
      </Typography>

      <Formik
        initialValues={{ category: "", subcategory: "" }}
        validationSchema={Yup.object({
          category: Yup.string().required("Category name is required"),
          subcategory: Yup.string().required("Subcategory name is required"),
        })}
        onSubmit={(values) => console.log("Form values:", values)}
      >
        {() => (
          <Form>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col">
                <label htmlFor="category">Category Name</label>
                <Field
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Enter new category name"
                  className="py-2 px-4 mt-1 rounded w-full outline-none"
                  style={{
                    color: theme.palette.text.primary,
                    backgroundColor: `${theme.palette.background.default}`,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="subcategory">Subcategory</label>
                <Field
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  placeholder="Enter new subcategory name"
                  className="py-2 px-4 mt-1 rounded w-full outline-none"
                  style={{
                    color: theme.palette.text.primary,
                    backgroundColor: theme.palette.background.default,
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                />
                <ErrorMessage
                  name="subcategory"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col items-center mt-4">
                <label htmlFor="photo" className="mb-2  self-start">
                  Category Image
                </label>
                {!image ? (
                  <label
                    htmlFor="photo"
                    className="flex items-center justify-center h-48 w-48 border-2 border-dotted rounded-lg cursor-pointer"
                    style={{
                      borderColor: `${theme.palette.border.secondary}50`,
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.background.default,
                    }}
                  >
                    <span className="text-lg">Image Upload</span>
                  </label>
                ) : (
                  <div className="relative h-48 w-48">
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute -right-2 -top-3 h-6 w-6 bg-red-600 text-white rounded-full flex items-center justify-center"
                    >
                      <ClearIcon sx={{ fontSize: 17 }} />
                    </button>
                    <img
                      className="w-full h-full object-cover border-2 rounded-lg"
                      src={image}
                      alt="Preview"
                      style={{
                        borderColor: `${theme.palette.border.secondary}50`,
                      }}
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  className="hidden"
                  onChange={imageHandler}
                />
              </div>

              <Button
                type="submit"
                variant="outlined"
                style={{
                  color: theme.palette.text.isActive,
                  backgroundColor: `${theme.palette.text.isActive}20`,
                }}
                className="mt-4 w-full"
              >
                Add Category
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CategoryForm;
