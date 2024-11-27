import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductId,
  deleteProduct,
  getProduct,
  optimisticallyDeleteProduct,
} from "../../features/product/productSlice";
import { useTheme } from "@mui/material/styles";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "../Global/Modal";
import ProtectedAction from "../Global/ProtectedAction";
import Box from "@mui/material/Box";
import {
  TableBody,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  TableSortLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.product);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [sortedProduct, setSortedProduct] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });

  const TableHeader = [
    { label: "SL.", key: null },
    { label: "Product", key: "name" },
    { label: "Category", key: "category" },
    { label: "Brand", key: "brand" },
    { label: "Price", key: "price" },
    { label: "Stock", key: "stock" },
    { label: "Rating", key: "rating" },
    { label: "Order", key: "order" },
    { label: "Actions", key: null },
  ];
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  useEffect(() => {
    if (products?.length) {
      setSortedProduct([...products]);
    }
  }, [products]);

  const deleteOpenHandler = (id, name) => {
    setSelectedProductID(id);
    setSelectedProductName(name);
    setDeleteOpen(true);
  };

  const deleteCloseHandler = () => {
    setDeleteOpen(false);
    setSelectedProductID(null);
    setSelectedProductName(null);
  };

  const removeProduct = () => {
    dispatch(optimisticallyDeleteProduct(selectedProductID));
    dispatch(deleteProduct(selectedProductID));
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
    setSortedProduct(sorted);
  };

  const viewProductHandler = (id) => {
    dispatch(addProductId(id));
    navigate("/products/view");
  };

  const theme = useTheme();
  const isActiveText = theme.palette.text.isActive;
  const tableColor = theme.palette.background.default;
  const tableTextColor = theme.palette.text.secondary;
  const rowColor = theme.palette.background;
  const rowBorderColor = theme.palette.divider;
  const textColor = theme.palette.text.primary;

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
          style={{ backgroundColor: rowColor.paper }}
          className="max-w-full w-[24rem] p-5"
        >
          <h3 className="text-center text-xl">Delete Product</h3>
          <p className="text-xl text-center my-3 text-red-600 font-semibold">
            {selectedProductName}
          </p>
          <p className="text-center mt-2 text-sm opacity-70">
            Are you sure you want to delete this product?
          </p>
          <div className="flex justify-around mt-4">
            <ProtectedAction action={removeProduct}>
              <Button
                sx={{ backgroundColor: "red", color: "white" }}
                className=" text-white px-4 py-2 rounded-md"
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
      <TableContainer
        sx={{
          backgroundColor: tableColor,
          overflowX: "auto",
          overflowY: "hidden",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Table sx={{ minWidth: 450, tableLayout: "auto" }}>
          {/* Table Head */}
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: `${isActiveText}20`,
                textTransform: "uppercase",
              }}
            >
              {TableHeader.map(({ label, key }, index) => (
                <TableCell
                  key={index}
                  sx={{ color: isActiveText }}
                  align={
                    ["Stock", "Rating", "Order", "Actions"].includes(label)
                      ? "center"
                      : "left"
                  }
                >
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

          {/* Table Body */}
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-52" align="center">
                  <Box>
                    <CircularProgress sx={{ color: isActiveText }} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : sortedProduct?.length ? (
              sortedProduct?.map((item, index) => (
                <TableRow
                  key={item?._id}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? `${rowColor.paper}90` : rowColor.paper,
                    borderBottom: `2px solid ${rowBorderColor}10`,
                    borderTop: `2px solid ${rowBorderColor}10`,
                    "&:hover": {
                      cursor: "pointer",
                      outline: `2px solid ${isActiveText}40`,
                    },
                  }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex items-center">
                    {/* Product Image */}
                    <span className="flex items-center gap-3 relative group">
                      {/* Product Image */}
                      <span className="bg-white rounded-md shadow-lg border flex-shrink-0">
                        <img
                          src={
                            item?.images?.[0] ||
                            "https://via.placeholder.com/50"
                          }
                          alt={item?.title || "Product"}
                          className="w-14 h-14 object-cover rounded-md"
                        />
                      </span>

                      <p className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                        {item?.title || "N/A"}
                      </p>

                      {item?.title && (
                        <p
                          className="absolute bg-black text-white text-sm p-2 max-w-[20rem] opacity-0 group-hover:opacity-100
                         group-hover:block z-10 shadow-lg -top-8 left-16 transition-opacity duration-700"
                        >
                          {item?.title}
                        </p>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    {item?.category?.name || (
                      <span className="font-semibold text-red-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item?.brand?.name || (
                      <span className="font-semibold text-red-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {item?.discount > 0 ? (
                      <div>
                        <p className="line-through text-gray-500">
                          ${item?.price?.toFixed(2) || "0.00"}
                        </p>

                        <p className="text-green-600 font-semibold">
                          $
                          {(
                            ((100 - item?.discount) / 100) *
                            item?.price
                          ).toFixed(2)}
                        </p>
                      </div>
                    ) : (
                      <p>${item?.price?.toFixed(2) || "0.00"}</p>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {item?.stack > 0 ? (
                      <span>{item.stack}</span>
                    ) : (
                      <span className="text-red-500 text-sm ">
                        Out of Stock
                      </span>
                    )}
                  </TableCell>

                  <TableCell align="center">
                    <p>{`${item?.totalrating || 0}(${
                      item?.ratings?.length || 0
                    })`}</p>
                  </TableCell>
                  <TableCell align="center">{item?.order || "0"}</TableCell>
                  <TableCell align="center">
                    <span className="flex items-center justify-center ">
                      <Button
                        sx={{
                          ...actionBTN,
                          backgroundColor: "#B9181A20",
                          color: "#B9181A",
                        }}
                        size="small"
                        onClick={() =>
                          deleteOpenHandler(item?._id, item?.title)
                        }
                      >
                        <DeleteOutlineIcon size="small" />
                      </Button>
                      <Button
                        sx={{
                          ...actionBTN,
                          backgroundColor: "#2E7D3220",
                          color: "#2E7D32",
                          marginLeft: "8px",
                        }}
                        size="small"
                        onClick={() => viewProductHandler(item?._id)}
                      >
                        <VisibilityIcon size="small" />
                      </Button>
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="h-52" align="center">
                  No products available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}