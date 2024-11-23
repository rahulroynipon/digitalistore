import React, { useState, useRef, useMemo, useEffect } from "react";
import { useTheme } from "@emotion/react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../features/brand/brandSlice";
import { getCategory } from "../features/category/categorySlice";

export default function ProductUpload() {
  const theme = useTheme();
  const bgColor = theme.palette.background.paper;
  const fieldColor = theme.palette.background.default;
  const borderColor = theme.palette.border.secondary;
  const textColor = theme.palette.text.primary;

  const editor = useRef(null);
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [content, setContent] = useState("");
  const [dynamicFields, setDynamicFields] = useState([
    { label: "", value: "", required: false },
  ]);
  const [imageFiles, setImageFiles] = useState([]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      style: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      },
    }),
    [theme]
  );

  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleBrandChange = (event) => setBrand(event.target.value);
  const handleColorChange = (event) => setColor(event.target.value);

  // Function to handle input changes
  const handleDynamicChange = (index, field, value) => {
    const updatedFields = [...dynamicFields];
    updatedFields[index][field] = value;
    setDynamicFields(updatedFields);
  };

  // Function to add a new row
  const addRow = () => {
    setDynamicFields([
      ...dynamicFields,
      { label: "", value: "", required: false },
    ]);
  };

  // Function to remove a row
  const removeRow = (index) => {
    const updatedFields = dynamicFields.filter((_, i) => i !== index);
    setDynamicFields(updatedFields);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImageFiles(files);
  };

  const renderInput = (id, label, type = "text", value, onChange) => (
    <div className="mt-5">
      <label htmlFor={id} className="mb-1 text-sm uppercase opacity-70">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        style={{
          backgroundColor: `${fieldColor}45`,
          border: `1px solid ${borderColor}20`,
        }}
        className="w-full py-3 px-3 outline-none focus:ring-1 focus:ring-blue-500 rounded"
      />
    </div>
  );

  useEffect(() => {
    dispatch(getBrand());
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <section className="m-3 mt-5 md:m-5 rounded-t-lg h-screen">
      <div
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}20`,
        }}
        className="p-5 rounded-lg"
      >
        <h1
          style={{ color: textColor }}
          className="text-lg md:text-2xl font-bold text-center md:text-left"
        >
          Product Upload
        </h1>
      </div>

      <form className="mt-5 gap-5">
        <div
          style={{
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}20`,
          }}
          className="px-5 py-7 flex flex-col rounded-lg"
        >
          <h5 className="text-xl font-bold">Product Information</h5>
          {renderInput("product-name", "Product Name")}
          {renderInput("product-tags", "Product Tags")}

          <section className="flex flex-col md:flex-row items-center w-full mt-5 gap-5">
            <div className="w-full">
              <label className="mb-1 text-sm uppercase opacity-70">
                Category
              </label>
              <Select
                value={category}
                onChange={handleCategoryChange}
                sx={{
                  width: "100%",
                  backgroundColor: `${fieldColor}45`,
                  border: `1px solid ${borderColor}20`,
                }}
                displayEmpty
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories?.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="w-full">
              <label className="mb-1 text-sm uppercase opacity-70">Brand</label>
              <Select
                value={brand}
                onChange={handleBrandChange}
                sx={{
                  width: "100%",
                  backgroundColor: `${fieldColor}45`,
                  border: `1px solid ${borderColor}20`,
                }}
                displayEmpty
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {brands?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </section>

          <div className="mt-5">
            <label className="mb-1 text-sm uppercase opacity-70">
              Description
            </label>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="image-upload"
              className="mb-1 text-sm uppercase opacity-70"
            >
              Upload Images
            </label>
            <input
              id="image-upload"
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full py-3 px-3 outline-none focus:ring-1 focus:ring-blue-500 rounded"
            />
            <ul className="mt-3">
              {imageFiles.map((file, index) => (
                <li key={index} className="text-sm">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          style={{
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}20`,
          }}
          className="p-5 rounded-lg shadow-md  mt-5"
        >
          <h2 className="text-lg font-semibold mb-4">Dynamic Fields</h2>
          <table
            style={{ border: `1px solid ${borderColor}20` }}
            className="table-auto w-full"
          >
            <thead>
              <tr className="">
                <th
                  style={{ border: `1px solid ${borderColor}20` }}
                  className=" px-4 py-2"
                >
                  Label
                </th>
                <th
                  style={{ border: `1px solid ${borderColor}20` }}
                  className=" px-4 py-2"
                >
                  Value
                </th>
                <th
                  style={{ border: `1px solid ${borderColor}20` }}
                  className=" px-4 py-2"
                >
                  Required
                </th>
                <th
                  style={{ border: `1px solid ${borderColor}20` }}
                  className=" px-4 py-2"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {dynamicFields.map((field, index) => (
                <tr
                  key={index}
                  style={{
                    border: `1px solid ${borderColor}20`,
                  }}
                >
                  <td
                    style={{
                      border: `1px solid ${borderColor}20`,
                    }}
                    className="px-4 py-2"
                  >
                    <input
                      type="text"
                      value={field.label}
                      onChange={(e) =>
                        handleDynamicChange(index, "label", e.target.value)
                      }
                      style={{
                        backgroundColor: `${fieldColor}45`,
                        border: `1px solid ${borderColor}20`,
                      }}
                      className="w-full py-2 px-3 rounded"
                    />
                  </td>
                  <td
                    style={{
                      border: `1px solid ${borderColor}20`,
                    }}
                    className=" px-4 py-2"
                  >
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        handleDynamicChange(index, "value", e.target.value)
                      }
                      style={{
                        backgroundColor: `${fieldColor}45`,
                        border: `1px solid ${borderColor}20`,
                      }}
                      className="w-full py-2 px-3 rounded"
                    />
                  </td>
                  <td
                    style={{
                      border: `1px solid ${borderColor}20`,
                    }}
                    className=" px-4 py-2 text-center"
                  >
                    <input
                      type="checkbox"
                      checked={field.required || false}
                      onChange={(e) =>
                        handleDynamicChange(index, "required", e.target.checked)
                      }
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                  </td>
                  <td
                    style={{
                      border: `1px solid ${borderColor}20`,
                    }}
                    className="px-4 py-2 text-center"
                  >
                    <button
                      type="button"
                      onClick={() => removeRow(index)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={addRow}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Row
          </button>
        </div>
      </form>
    </section>
  );
}
