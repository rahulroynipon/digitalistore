import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
import LoadingSpin, { Availablity } from "../Global/LoadingSpin";
import useThemeColors from "../Global/themeColors";

export default function ProductTable() {
  const { background, field, border, divider, text, text1, active } =
    useThemeColors();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.product);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedProductID, setSelectedProductID] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState(null);
  const [sortedProduct, setSortedProduct] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "",
  });

  const TableHeader = [
    { label: "SL.", key: null, align: "left" },
    { label: "Product", key: "title", align: "left" },
    { label: "Category", key: "category.name", align: "center" },
    { label: "Brand", key: "brand.name", align: "center" },
    { label: "Price", key: "price", align: "right" },
    { label: "Stock", key: "stack", align: "right" },
    { label: "Rating", key: "totalrating", align: "right" },
    { label: "Order", key: "order", align: "right" },
    { label: "Sold", key: "sold", align: "right" },
    { label: "Actions", key: null, align: "center" },
  ];

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

    const sorted = [...sortedProduct].sort((a, b) => {
      const getNestedValue = (obj, path) =>
        path.split(".").reduce((acc, key) => acc?.[key] || "", obj);

      const valA = getNestedValue(a, key);
      const valB = getNestedValue(b, key);

      if (valA < valB) return direction === "asc" ? -1 : 1;
      if (valA > valB) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedProduct(sorted);
  };

  const viewProductHandler = (id) => {
    navigate(`/products/view/${id}`);
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
          backgroundColor: background,
          overflowX: "auto",
          overflowY: "hidden",
          border: `1px solid ${divider}`,
        }}
      >
        <Table sx={{ minWidth: 450, tableLayout: "auto" }}>
          {/* Table Head */}
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: `${active}20`,
                textTransform: "uppercase",
              }}
            >
              {TableHeader.map(({ label, key, align }, index) => (
                <TableCell key={index} sx={{ color: active }} align={align}>
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
              <LoadingSpin colSpan={TableHeader?.length || 0} />
            ) : sortedProduct?.length && products?.length ? (
              sortedProduct?.map((item, index) => (
                <TableRow
                  key={item?._id}
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
                  <TableCell align="center">
                    {item?.category?.name || (
                      <span className="font-semibold text-red-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {item?.brand?.name || (
                      <span className="font-semibold text-red-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell align="right">
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
                  <TableCell align="right">
                    {item?.stack > 0 ? (
                      <span>{item.stack}</span>
                    ) : (
                      <span className="text-red-500 text-sm ">
                        Out of Stock
                      </span>
                    )}
                  </TableCell>

                  <TableCell align="right">
                    <p>{`${item?.totalrating || 0}(${
                      item?.ratings?.length || 0
                    })`}</p>
                  </TableCell>
                  <TableCell align="right">{item?.order || "0"}</TableCell>
                  <TableCell align="right">{item?.sold || "0"}</TableCell>
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
              <Availablity text="No products available" />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
