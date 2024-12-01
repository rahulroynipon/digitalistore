import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  optimisticallyDeleteCategory,
  deleteCategory,
  getCategory,
} from "../../features/category/categorySlice";
import Modal from "../Global/Modal";
import ProtectedAction from "../Global/ProtectedAction";
import useThemeColors from "../Global/themeColors";
import LoadingSpin, { Availablity } from "../Global/LoadingSpin";

const CategoryTable = () => {
  const { background, field, border, divider, text, text1, active } =
    useThemeColors();
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.category);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [sortedCategory, setSortedCategory] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const TableHeader = [
    { label: "SL.", key: null },
    { label: "Image", key: null },
    { label: "Category", key: "name" },
    { label: "Item", key: "item" },
    { label: "Created at", key: "createdAt" },
    { label: "Action", key: null },
  ];

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (categories?.length) {
      setSortedCategory([...categories]);
    }
  }, [categories]);

  const deleteOpenHandler = (name) => {
    setSelectedCategoryName(name);
    setDeleteOpen(true);
  };

  const deleteCloseHandler = () => {
    setDeleteOpen(false);
    setSelectedCategoryName(null);
  };

  const removeCategory = () => {
    dispatch(optimisticallyDeleteCategory(selectedCategoryName));
    dispatch(deleteCategory(selectedCategoryName));
    deleteCloseHandler();
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...categories].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedCategory(sorted);
  };

  // Button styling for action buttons
  const actionBTN = {
    width: 35,
    height: 35,
    minWidth: 0,
    padding: 0,
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteOpen} closeHandler={deleteCloseHandler}>
        <div
          style={{ backgroundColor: background }}
          className="max-w-full w-[20rem] p-5"
        >
          <h3 className="text-center text-xl">Delete Category</h3>
          <p className="text-xl text-center my-3 text-red-600 font-semibold">
            {selectedCategoryName}
          </p>
          <p className="text-center mt-2 text-sm opacity-70">
            Are you sure you want to delete this category?
          </p>
          <div className="flex justify-around mt-4">
            <ProtectedAction action={removeCategory}>
              <Button
                sx={{ backgroundColor: "red", color: "white" }}
                className="text-white px-4 py-2 rounded-md"
                type="button"
              >
                YES
              </Button>
            </ProtectedAction>
            <Button
              sx={{ color: "white", backgroundColor: "gray" }}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
              onClick={deleteCloseHandler}
            >
              NO
            </Button>
          </div>
        </div>
      </Modal>

      {/* Table Container */}
      <TableContainer
        sx={{
          backgroundColor: background,
          overflowX: "auto",
          border: `1px solid ${divider}`,
        }}
      >
        <Table sx={{ minWidth: "450px", tableLayout: "auto" }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: `${active}20`,
                textTransform: "uppercase",
              }}
            >
              {TableHeader.map(({ label, key }, index) => (
                <TableCell key={index} sx={{ color: active }}>
                  {key ? (
                    <TableSortLabel
                      active={sortConfig.key === key}
                      direction={
                        sortConfig.key === key ? sortConfig.direction : "asc"
                      }
                      onClick={() => handleSort(key)}
                    >
                      <span className=" font-semibold"> {label}</span>
                    </TableSortLabel>
                  ) : (
                    <span className=" font-semibold"> {label}</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <LoadingSpin colSpan={TableHeader?.length || 0} />
            ) : sortedCategory?.length ? (
              sortedCategory.map((category, index) => (
                <TableRow
                  key={category?._id}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? `${background}90` : background,
                    borderBottom: `2px solid ${divider}10`,
                    borderTop: `2px solid ${divider}10`,
                    "&:hover": {
                      cursor: "pointer",
                      outline: `2px solid ${active}40`,
                    },
                  }}
                >
                  <TableCell sx={{ color: text, fontWeight: 500 }}>
                    {index + 1}
                  </TableCell>
                  <TableCell sx={{ padding: 1.5 }}>
                    <div className="relative bg-white inline-block rounded-md shadow-lg border">
                      <img
                        className="h-14 w-14 object-cover rounded-md"
                        src={category?.image}
                        alt="Category"
                        onError={(e) => {
                          e.target.src = "/default-category.jpg";
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap" sx={{ color: text }}>
                    {category?.name}
                  </TableCell>
                  <TableCell sx={{ color: text }}>{category?.count}</TableCell>
                  <TableCell className="whitespace-nowrap" sx={{ color: text }}>
                    {category?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell sx={{ color: text }}>
                    <Button
                      onClick={() => deleteOpenHandler(category?.name)}
                      sx={{
                        ...actionBTN,
                        backgroundColor: "#B9181A20",
                        color: "#B9181A",
                      }}
                      size="small"
                    >
                      <DeleteOutlineIcon size="small" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <Availablity text="No categories available" />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CategoryTable;
