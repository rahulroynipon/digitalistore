import { useTheme } from "@emotion/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addBrand,
  optimisticallyAddBrand,
} from "../../features/brand/brandSlice";

export default function BrandForm({ closeHandler }) {
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
  const borderColor = theme.palette.divider;
  const btnColor = theme.palette.text.isActive;

  return (
    <div
      className="px-5 py-7 max-w-full w-[23rem]"
      style={{ backgroundColor: bgColor }}
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Add New Brand</h2>
      <Formik
        initialValues={{ brand: "", image: "" }}
        validationSchema={Yup.object({
          brand: Yup.string().required("Brand name is required"),
          image: Yup.mixed()
            .required("Image is required")
            .test(
              "fileSize",
              "File is too large",
              (value) => !value || value.size <= 5 * 1024 * 1024
            )
            .test(
              "fileType",
              "Unsupported File Format",
              (value) =>
                !value ||
                ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
            ),
        })}
        onSubmit={(values, { resetForm }) => {
          const formData = new FormData();
          formData.append("brand", values.brand);
          formData.append("image", values.image);
          dispatch(
            optimisticallyAddBrand({
              name: values.brand,
              image: image,
            })
          );
          dispatch(addBrand(formData));
          resetForm();
          closeHandler();
        }}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col">
            {/* Brand Name Input */}
            <div className="mb-4">
              <label htmlFor="brand" className="block mb-1 font-medium text-sm">
                Brand Name
              </label>
              <Field
                id="brand"
                name="brand"
                type="text"
                placeholder="Enter new brand name"
                className="py-2 px-4 mt-1 border rounded outline-none focus:ring-1 focus:border-blue-300 w-full"
                style={{
                  backgroundColor: fieldColor,
                  borderColor: `${borderColor}`,
                }}
              />
              <ErrorMessage
                name="brand"
                component="div"
                className="text-red-500 text-sm mt-1"
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
                    borderColor: `${borderColor}`,
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
                    type="button"
                    onClick={() => clearImage(setFieldValue)}
                    className=" bg-red-600 rounded-full absolute -right-2 -top-3 text-white"
                  >
                    <ClearIcon />
                  </button>
                  <img
                    src={image}
                    alt="preview"
                    className="h-full object-center"
                  />
                </div>
              )}
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="outlined"
              sx={{
                backgroundColor: btnColor,
                color: "white",
                ":hover": { backgroundColor: `${btnColor}CC` },
              }}
            >
              Add Brand
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
