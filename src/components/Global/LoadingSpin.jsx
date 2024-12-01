import { TableCell, TableRow } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useThemeColors from "./themeColors";

export default function LoadingSpin({ colSpan }) {
  const { background, field, border, divider, text, text1, active } =
    useThemeColors();
  return (
    <>
      <TableRow>
        <TableCell colSpan={colSpan} className="h-52" align="center">
          <Box>
            <CircularProgress sx={{ color: active }} />
          </Box>
        </TableCell>
      </TableRow>
    </>
  );
}

export function Availablity({ text }) {
  return (
    <>
      <TableRow>
        <TableCell colSpan={7} className="h-52" align="center">
          {text}
        </TableCell>
      </TableRow>
    </>
  );
}
