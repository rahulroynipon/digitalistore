import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addColor,
  optimisticallyAddColor,
} from "../../features/color/colorSlice";
import ProtectedAction from "../Global/ProtectedAction";

export default function ColorForm({ closeHandler }) {
  const dispatch = useDispatch();

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
      <h2 className="text-lg font-semibold mb-4 text-center">Add New Color</h2>
      <Formik
        initialValues={{ color: "", code: "" }}
        validationSchema={Yup.object({
          color: Yup.string().required("Color name is required"),
          code: Yup.string().required("Color code is required"),
        })}
        onSubmit={(values, { resetForm }) => {
          dispatch(
            optimisticallyAddColor({
              name: values.color,
              code: values.code,
            })
          );
          dispatch(addColor(values));
          resetForm();
          closeHandler();
        }}
      >
        {({ setFieldValue, handleSubmit }) => (
          <Form className="flex flex-col">
            <div className="mb-4">
              <label htmlFor="color" className="block mb-1 font-medium text-sm">
                Color Name
              </label>
              <Field
                id="color"
                name="color"
                type="text"
                placeholder="Enter new color name"
                style={{
                  backgroundColor: fieldColor,
                  borderColor: `${borderColor}30`,
                }}
                className="py-2 px-4 mt-1 border rounded outline-none focus:ring-1 focus:border-blue-300 w-full"
              />
              <ErrorMessage
                name="color"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="code" className="block mb-1 font-medium text-sm">
                Color code
              </label>
              <Field
                id="code"
                name="code"
                type="color"
                placeholder="Enter new color code"
                style={{
                  backgroundColor: fieldColor,
                  borderColor: `${borderColor}30`,
                }}
                className="h-12 mt-1 border rounded outline-none focus:ring-1 focus:border-blue-300 w-full"
              />
              <ErrorMessage
                name="code"
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
                Add Color
              </Button>
            </ProtectedAction>
          </Form>
        )}
      </Formik>
    </div>
  );
}
