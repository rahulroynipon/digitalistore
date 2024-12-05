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
import Modal from "../Global/Modal";
import {
  deleteColor,
  getColor,
  optimisticallyDeleteColor,
} from "../../features/color/colorSlice";
import ProtectedAction from "../Global/ProtectedAction";
import useThemeColors from "../Global/themeColors";
import LoadingSpin, { Availablity } from "../Global/LoadingSpin";

export default function ColorTable() {
  const { background, field, border, divider, text, text1, active } =
    useThemeColors();
  const dispatch = useDispatch();
  const { colors, isLoading } = useSelector((state) => state.color);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedColorName, setSelectedColorName] = useState(null);
  const [sortedColors, setSortedColors] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const TableHeader = [
    { label: "SL.", key: null },
    { label: "Color", key: null },
    { label: "Name", key: "name" },
    { label: "Hex", key: "code" },
    { label: "Created At", key: "createdAt" },
    { label: "Action", key: null },
  ];

  useEffect(() => {
    dispatch(getColor());
  }, [dispatch]);

  useEffect(() => {
    if (colors?.length) {
      setSortedColors([...colors]);
    }
  }, [colors]);

  const deleteOpenHandler = (name) => {
    setSelectedColorName(name);
    setDeleteOpen(true);
  };

  const deleteCloseHandler = () => {
    setDeleteOpen(false);
    setSelectedColorName(null);
  };

  const removeColor = () => {
    dispatch(optimisticallyDeleteColor(selectedColorName));
    dispatch(deleteColor(selectedColorName));
    deleteCloseHandler();
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...colors].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedColors(sorted);
  };

  const actionBTN = {
    width: 35,
    height: 35,
    minWidth: 0,
    padding: 0,
  };

  return (
    <div className="w-full overflow-x-auto">
      <Modal isOpen={deleteOpen} closeHandler={deleteCloseHandler}>
        <div
          style={{ backgroundColor: background }}
          className="max-w-full w-[20rem] p-5"
        >
          <h3 className="text-center text-xl">Delete Color</h3>
          <p className="text-xl text-center my-3 text-red-600 font-semibold">
            {selectedColorName}
          </p>
          <p className="text-center mt-2 text-sm opacity-70">
            Are you sure you want to delete this Color?
          </p>
          <div className="flex justify-around mt-4">
            <ProtectedAction action={removeColor}>
              <Button
                type="button"
                sx={{ backgroundColor: "red", color: "white" }}
                className=" text-white px-4 py-2 rounded-md"
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
      <TableContainer
        sx={{
          backgroundColor: background,
          overflowX: "auto",
          border: `1px solid ${divider}`,
        }}
      >
        <Table sx={{ minWidth: "650px", tableLayout: "auto" }}>
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
                      <span className="text-nowrap font-semibold">
                        {" "}
                        {label}
                      </span>
                    </TableSortLabel>
                  ) : (
                    <span className="text-nowrap font-semibold"> {label}</span>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <LoadingSpin colSpan={TableHeader.length || 0} />
            ) : sortedColors?.length ? (
              sortedColors.map((color, index) => (
                <TableRow
                  key={color?._id}
                  sx={{
                    backgroundColor: background,
                    borderBottom: `2px solid ${divider}10`,
                    borderTop: `2px solid ${divider}10`,
                    "&:hover": {
                      cursor: "pointer",
                      outline: `2px solid ${active}40`,
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{index + 1}</TableCell>
                  <TableCell>
                    <span
                      style={{ backgroundColor: color?.code }}
                      className="relative h-14 w-14 inline-block rounded-md shadow-lg border"
                    ></span>
                  </TableCell>
                  <TableCell>{color?.name}</TableCell>
                  <TableCell>{color?.code}</TableCell>

                  <TableCell>{color?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteOpenHandler(color?.name)}
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
              <Availablity text="No colors available" />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
