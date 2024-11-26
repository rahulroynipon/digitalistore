import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addCategory,
  optimisticallyAddCategory,
} from "../../features/category/categorySlice";
import ProtectedAction from "../Global/ProtectedAction";

export default function CategoryForm({ closeHandler }) {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const imageHandler = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  const clearImage = (setFieldValue) => {
    setImage(null);
    setFieldValue("image", "");
  };

  const theme = useTheme();
  const bgColor = theme.palette.background.default;
  const fieldColor = theme.palette.background.paper;
  const borderColor = theme.palette.border.secondary;
  const btnColor = theme.palette.text.isActive;

  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="px-5 py-7 max-w-full w-[23rem]"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">
        Add New Category
      </h2>
      <Formik
        initialValues={{ category: "", image: "" }}
        validationSchema={Yup.object({
          category: Yup.string().required("Category name is required"),
          image: Yup.mixed()
            .required("Image is required")
            .test(
              "fileSize",
              "File is too large",
              (value) => !value || (value && value.size <= 5 * 1024 * 1024)
            )
            .test(
              "fileType",
              "Unsupported File Format",
              (value) =>
                !value ||
                (value &&
                  [
                    "image/jpeg",
                    "image/png",
                    "image/jpg",
                    "image/webp",
                  ].includes(value.type))
            ),
        })}
        onSubmit={(values, { resetForm }) => {
          const formData = new FormData();
          formData.append("category", values.category);
          formData.append("image", values.image);
          dispatch(
            optimisticallyAddCategory({
              name: values.category,
              image: image,
            })
          );
          dispatch(addCategory(formData));
          resetForm();
          closeHandler();
        }}
      >
        {({ setFieldValue, handleSubmit }) => (
          <Form className="flex flex-col">
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block mb-1 font-medium text-sm"
              >
                Category Name
              </label>
              <Field
                id="category"
                name="category"
                type="text"
                placeholder="Enter new category name"
                style={{
                  backgroundColor: fieldColor,
                  borderColor: `${borderColor}30`,
                }}
                className="py-2 px-4 mt-1 border rounded outline-none focus:ring-1 focus:border-blue-300 w-full"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Image Upload Section */}
            <div className="mb-7">
              <label htmlFor="image" className="block mb-1 font-medium text-sm">
                Upload your file here
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={(e) => imageHandler(e, setFieldValue)}
              />
              {!image ? (
                <label
                  htmlFor="image"
                  style={{
                    backgroundColor: fieldColor,
                    borderColor: `${borderColor}30`,
                  }}
                  className="h-32 flex items-center justify-center border rounded cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center opacity-60">
                    <CloudUploadIcon />
                    <p>Upload a photo</p>
                  </div>
                </label>
              ) : (
                <div className="h-32 relative flex items-center justify-center border rounded bg-blue-50">
                  <button
                    onClick={clearImage}
                    className=" bg-red-600 rounded-full absolute -right-2 -top-3 text-white"
                  >
                    <ClearIcon />
                  </button>
                  <img
                    src={image}
                    alt="preview"
                    className="h-full  object-center"
                  />
                </div>
              )}
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Submit Button */}
            <ProtectedAction action={handleSubmit}>
              <Button
                type="button"
                variant="outlined"
                sx={{
                  backgroundColor: btnColor,
                  color: "white",
                  width: "100%",
                }}
              >
                Add Category
              </Button>
            </ProtectedAction>
          </Form>
        )}
      </Formik>
    </div>
  );
}
