import { FormControl, MenuItem, Select } from "@mui/material";
import useThemeColors from "./themeColors";

export default function SelectedForm({
  value,
  onChange,
  options = [],
  label,
  className = "",
}) {
  const { background, field, border, text } = useThemeColors();
  return (
    <FormControl
      size="small"
      style={{
        backgroundColor: `${field}45`,
        borderRadius: "4px",
        minWidth: "200px",
      }}
      className={className}
    >
      <Select
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        style={{ border: `1px solid ${border}20` }}
        value={value}
        onChange={onChange}
      >
        {label ? (
          <MenuItem value="">
            <em>{label}</em>
          </MenuItem>
        ) : null}
        {options.map((item, index) => (
          <MenuItem value={item?._id} key={index}>
            {item?.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
