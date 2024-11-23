import { Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

export const TextField = ({ label, type, id, name }) => {
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

export const Dropdown = ({ label, id, name, value, onChange, options }) => {
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
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{
              backgroundColor: `${fieldColor}45`,
              border: `1px solid ${borderColor}20`,
            }}
            className="outline-none focus:ring-1 focus:ring-blue-500 rounded"
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
