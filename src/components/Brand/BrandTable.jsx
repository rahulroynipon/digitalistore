import { useTheme } from "@emotion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TableSortLabel,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteBrand,
  getBrand,
  optimisticallyDeleteBrand,
} from "../../features/brand/brandSlice";
import Modal from "../Global/Modal";
import ProtectedAction from "../Global/ProtectedAction";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import useThemeColors from "../Global/themeColors";
import LoadingSpin, { Availablity } from "../Global/LoadingSpin";

export default function BrandTable() {
  const { background, field, border, divider, text, text1, active } =
    useThemeColors();
  const dispatch = useDispatch();
  const { brands, isLoading } = useSelector((state) => state.brand);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedBrandName, setSelectedBrandName] = useState(null);
  const [sortedBrand, setSortedBrand] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const TableHeader = [
    { label: "SL.", key: null },
    { label: "Image", key: null },
    { label: "Brand", key: "name" },
    { label: "Item", key: "item" },
    { label: "Created at", key: "createdAt" },
    { label: "Action", key: null },
  ];

  useEffect(() => {
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    if (brands?.length) {
      setSortedBrand([...brands]);
    }
  }, [brands]);

  const deleteOpenHandler = (name) => {
    setSelectedBrandName(name);
    setDeleteOpen(true);
  };

  const deleteCloseHandler = () => {
    setDeleteOpen(false);
    setSelectedBrandName(null);
  };

  const removeBrand = () => {
    dispatch(optimisticallyDeleteBrand(selectedBrandName));
    dispatch(deleteBrand(selectedBrandName));
    deleteCloseHandler();
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...brands].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedBrand(sorted);
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
          <h3 className="text-center text-xl">Delete Brand</h3>
          <p className="text-xl text-center my-3 text-red-600 font-semibold">
            {selectedBrandName}
          </p>
          <p className="text-center mt-2 text-sm opacity-70">
            Are you sure you want to delete this category?
          </p>
          <div className="flex justify-around mt-4">
            <ProtectedAction action={removeBrand}>
              <Button
                sx={{ backgroundColor: "red", color: "white" }}
                className=" text-white px-4 py-2 rounded-md"
                type="button"
              >
                YES
              </Button>
            </ProtectedAction>
            <Button
              onClick={deleteCloseHandler}
              sx={{ color: "white", backgroundColor: "gray" }}
              className="bg-gray-300 text-black px-4 py-2 rounded-md"
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
              <LoadingSpin colSpan={TableHeader?.length || 0} />
            ) : sortedBrand?.length ? (
              sortedBrand?.map((category, index) => (
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
                  <TableCell sx={{ fontWeight: 500 }}>{index + 1}</TableCell>
                  <TableCell sx={{ padding: 1.5 }}>
                    <div className="relative bg-white inline-block rounded-md shadow-lg border">
                      <img
                        className="h-14 w-14 object-contain rounded-md"
                        src={category?.image}
                        alt="Category-image"
                        onError={(e) => {
                          e.target.src = image;
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {category?.name}
                  </TableCell>
                  <TableCell>{category?.count}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {category?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell>
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
              <Availablity text="No brands available" />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
