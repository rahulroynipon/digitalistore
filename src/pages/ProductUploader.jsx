import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import {
  Dropdown,
  TextField,
} from "../components/Product_upload/Product_upload";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCategory } from "../features/category/categorySlice";
import { getBrand } from "../features/brand/brandSlice";
import { getColor } from "../features/color/colorSlice";

export default function ProductUploader() {
  const theme = useTheme();
  const bgColor = theme.palette.background.paper;
  const fieldColor = theme.palette.background.default;
  const borderColor = theme.palette.border.secondary;
  const textColor = theme.palette.text.primary;

  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);
  const { colors } = useSelector((state) => state.color);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrand());
    dispatch(getColor());
  }, [dispatch]);

  return (
    <section className="m-3 mt-5 md:m-5">
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
        <h2 className=" mb-5 text-2xl font-semibold opacity-85">
          Product Information
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Submitted Values:", values);
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              {/* Title Field */}
              <TextField
                label="product title"
                type="text"
                id="title"
                name="title"
              />

              {/* Tags Field */}
              <TextField
                label="product tags"
                type="text"
                id="tags"
                name="tags"
              />

              {/* Dropdown Field */}
              <div className="flex flex-col md:flex-row gap-x-5">
                {/* Category Field */}
                <Dropdown
                  label="Category"
                  id="category"
                  name="category"
                  value={values.category}
                  onChange={(e) => setFieldValue("category", e.target.value)}
                  options={categories || []}
                />
                {/* Brand Field */}
                <Dropdown
                  label="Brand"
                  id="brand"
                  name="brand"
                  value={values.brand}
                  onChange={(e) => setFieldValue("brand", e.target.value)}
                  options={brands || []}
                />

                <Dropdown
                  label="Colors"
                  id="colors"
                  name="colors"
                  value={values.colors}
                  onChange={(e) => setFieldValue("colors", e.target.value)}
                  options={colors || []}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-x-5">
                {/* Price Field */}
                <TextField label="price" type="text" id="price" name="price" />

                {/* Stack Field */}
                <TextField label="Stack" type="text" id="stack" name="stack" />

                {/* Discount Field */}
                <TextField
                  label="discount"
                  type="text"
                  id="discount"
                  name="discount"
                />
              </div>

              {/* Table Field Array */}
              {/* <div className="mb-4">
                <label className="block text-sm font-medium">
                  Table (Dynamic Fields)
                </label>
                <FieldArray name="table">
                  {({ remove, push }) => (
                    <div>
                      {values.table.map((entry, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 mb-3"
                        >
                          <div>
                            <Field
                              name={`table[${index}].label`}
                              placeholder="Label"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage
                              name={`table[${index}].label`}
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div>
                            <Field
                              name={`table[${index}].value`}
                              placeholder="Value"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                            <ErrorMessage
                              name={`table[${index}].value`}
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div>
                            <Field
                              type="checkbox"
                              name={`table[${index}].required`}
                              className="h-5 w-5"
                            />
                            <label className="ml-2">Required</label>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          push({ label: "", value: "", required: false })
                        }
                        className="mt-3 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                      >
                        Add Row
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div> */}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="mt-5 px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-700"
                >
                  Submit
                </button>
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
  colors: "",
  description: "",
  stack: "",
  price: "",
  discount: "",
  table: [{ label: "", value: "", required: false }],
};

// Validation Schema
export const validationSchema = Yup.object({
  title: Yup.string().required("Product's title is required"),
  tags: Yup.string().required("Product's tags are required"),
  category: Yup.string().required("Product's category is required"),
  brand: Yup.string().required("Product's brand is required"),
  colors: Yup.string().required("Product's colors are required"),
  description: Yup.string().required("Product's description is required"),
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
});
