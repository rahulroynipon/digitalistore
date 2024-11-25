import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";

import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";

export const TextField = ({ label, type, id, name, isSubmitting }) => {
  const theme = useTheme();
  const bgColor = theme.palette.background.paper;
  const fieldColor = theme.palette.background.default;
  const borderColor = theme.palette.border.secondary;
  const textColor = theme.palette.text.primary;
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={id}
        className="block text-sm mb-1 font-medium uppercase opacity-70"
      >
        {label}
      </label>
      <Field
        type={type}
        id={id}
        name={name}
        disabled={isSubmitting}
        style={{
          backgroundColor: `${fieldColor}45`,
          border: `1px solid ${borderColor}20`,
        }}
        className="w-full py-3 px-3 outline-none focus:ring-1 focus:ring-blue-500 rounded"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </div>
  );
};

export const Dropdown = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  isSubmitting,
}) => {
  const theme = useTheme();
  const bgColor = theme.palette.background.paper;
  const fieldColor = theme.palette.background.default;
  const borderColor = theme.palette.border.secondary;
  const textColor = theme.palette.text.primary;
  return (
    <FormControl style={{ marginBottom: "1rem" }} fullWidth variant="outlined">
      <label
        htmlFor={id}
        className="block text-sm mb-1 font-medium uppercase opacity-70"
      >
        {label}
      </label>
      <Field name={name}>
        {({ field }) => (
          <Select
            {...field}
            id={id}
            value={value}
            onChange={onChange}
            disabled={isSubmitting}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{
              backgroundColor: `${fieldColor}45`,
              border: `1px solid ${borderColor}20`,
            }}
            className="outline-none rounded"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {options?.map((item) => (
              <MenuItem key={item?._id} value={item?._id}>
                {item?.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </FormControl>
  );
};

// Constants for MenuProps
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// MultiSelectDropdown Component
export const MultiSelectDropdown = ({
  label,
  name,
  id,
  options,
  value,
  onChange,
  isSubmitting,
}) => {
  const theme = useTheme();
  const fieldColor = theme.palette.background.default;
  const borderColor = theme.palette.border.secondary;
  const btnColor = theme.palette.text.isActive;

  return (
    <FormControl fullWidth style={{ marginBottom: "1rem" }}>
      <label
        htmlFor={id}
        className="block text-sm mb-1 font-medium uppercase opacity-70"
      >
        {label}
      </label>
      <Field name={name}>
        {({ field }) => (
          <Select
            {...field}
            id={id}
            multiple
            value={value}
            onChange={onChange}
            disabled={isSubmitting}
            displayEmpty
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>None</em>;
              }
              return options
                .filter((option) => selected.includes(option?._id))
                .map((option) => option?.name)
                .join(", ");
            }}
            MenuProps={MenuProps}
            style={{
              backgroundColor: `${fieldColor}45`,
              border: `1px solid ${borderColor}20`,
            }}
            className="outline-none rounded"
          >
            {options?.map((option) => (
              <MenuItem key={option?._id} value={option?._id}>
                <Checkbox
                  checked={value.includes(option?._id)}
                  style={{
                    color: value.includes(option?._id) ? btnColor : "",
                  }}
                />
                <ListItemText primary={option?.name} />
              </MenuItem>
            ))}
          </Select>
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs mt-1"
      />
    </FormControl>
  );
};
