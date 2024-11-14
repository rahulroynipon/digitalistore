import React, { useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import image from "./../../assets/google.png";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { optimisticallyDeleteCategory } from "../../features/category/categorySlice";
import { deleteCategory } from "./../../features/category/categorySlice";

const CategoryTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const removeCategory = (id) => {
    dispatch(optimisticallyDeleteCategory(id));
    dispatch(deleteCategory(id));
  };

  useEffect(() => {
    console.log(categories);
  });

  const theme = useTheme();
  const isActiveText = theme.palette.text.isActive;
  const navColor = theme.palette;
  const navTextColor = theme.palette.text.secondary;
  const rowColor = theme.palette.background;
  const rowBorderColor = theme.palette.border.secondary;
  const borderColor = theme.palette.text.isActive;

  const actionBTN = {
    backgroundColor: "#B9181A20",
    color: "#B9181A",
    width: 35,
    height: 35,
    minWidth: 0,
    padding: 0,
  };

  return (
    <div className="w-full overflow-x-auto ">
      <TableContainer
        sx={{
          backgroundColor: navColor,
          overflowX: "auto",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table sx={{ minWidth: "600px", tableLayout: "auto" }}>
          {/* Adjusted table layout */}
          <TableHead>
            <TableRow sx={{ backgroundColor: `${isActiveText}15` }}>
              <TableCell sx={{ color: isActiveText }}>SL.</TableCell>
              <TableCell sx={{ color: isActiveText }}>Image</TableCell>
              <TableCell sx={{ color: isActiveText }}>Category</TableCell>
              <TableCell sx={{ color: isActiveText }}>Item</TableCell>
              <TableCell sx={{ color: isActiveText }}>Created at</TableCell>
              <TableCell sx={{ color: isActiveText }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.length ? (
              categories.map((category, index) => (
                <TableRow
                  key={category?._id}
                  sx={{
                    backgroundColor:
                      index % 2 == 0 ? `${rowColor.paper}99` : rowColor.paper,
                    borderBottom: `2px solid ${rowBorderColor}10`,
                    borderTop: `2px solid ${rowBorderColor}10`,
                    "&:hover": {
                      cursor: "pointer",
                      border: `1px solid ${borderColor}`,
                      transition:
                        "background-color 0.3s ease, border 0.3s ease",
                    },
                  }}
                >
                  <TableCell sx={{ color: navTextColor, fontWeight: 500 }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ padding: 1.5 }}>
                    <div className="bg-white inline-block rounded-md overflow-hidden shadow-lg border">
                      <img
                        className="h-14 w-14 object-cover "
                        src={category?.image || image}
                        alt="Category-image"
                        onError={(e) => {
                          e.target.src = image;
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell sx={{ color: navTextColor }}>
                    {category?.name}
                  </TableCell>
                  <TableCell sx={{ color: navTextColor }}>
                    {category?.count}
                  </TableCell>
                  <TableCell sx={{ color: navTextColor }}>
                    {category?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell sx={{ color: navTextColor }}>
                    <Button
                      onClick={() => removeCategory(category?._id)}
                      sx={actionBTN}
                      size="small"
                    >
                      <DeleteOutlineIcon size="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-28" align="center">
                  No categories available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoryTable;
