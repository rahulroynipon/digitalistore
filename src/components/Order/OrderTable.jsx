import { useEffect, useState } from "react";
import useThemeColors from "../Global/themeColors";
import { useDispatch, useSelector } from "react-redux";
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
import LoadingSpin, { Availablity } from "../Global/LoadingSpin";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import SelectedForm from "../Global/SelectedForm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  optimisticallyUpdateStatus,
  updateOrder,
} from "../../features/order/orderSlice";
import { useNavigate } from "react-router-dom";
import ProtectedAction from "../Global/ProtectedAction";

export default function OrderTable({ filter, sortedOrders, setSortedOrders }) {
  const { background, border, divider, text, text1, active } = useThemeColors();
  const { isLoading, orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newStatus, setNewStatus] = useState(null);
  const [editID, setEditID] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });

  const TableHeader = [
    { label: "Sl.", key: null, align: "left" },
    { label: "Order Id", key: null, align: "center" },
    { label: "Value", key: "totalOrderValue", align: "right" },
    { label: "Unique Items", key: "products.length", align: "center" },
    { label: "Status", key: "orderStatus", align: "center" },
    { label: "Created At", key: "createdAt", align: "center" },
    { label: "Action", key: null, align: "center" },
  ];

  const filterList = [
    { _id: "Order Placed", name: "Order Placed" },
    { _id: "Processing", name: "Processing" },
    { _id: "Shipped", name: "Shipped" },
    { _id: "Delivered", name: "Delivered" },
    { _id: "Cancelled", name: "Cancelled" },
    { _id: "Returned", name: "Returned" },
  ];

  useEffect(() => {
    if (orders?.length) {
      const filteredOrders = orders.filter((order) =>
        filter ? order.orderStatus === filter : true
      );
      setSortedOrders(filteredOrders);
    }
  }, [orders, filter, setSortedOrders]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...orders].sort((a, b) => {
      const aValue = key.split(".").reduce((acc, curr) => acc?.[curr], a);
      const bValue = key.split(".").reduce((acc, curr) => acc?.[curr], b);
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setSortedOrders(sorted);
  };

  const updateStatusHandler = (id, status) => {
    dispatch(optimisticallyUpdateStatus({ id, status }));
    dispatch(updateOrder({ id, status }));
    setEditID(null);
    setNewStatus(null);
  };

  const viewOrderHandler = (id) => {
    navigate(`/orders/view/${id}`);
  };

  const actionBTNStyle = {
    width: 35,
    height: 35,
    minWidth: 0,
    padding: 0,
  };

  return (
    <TableContainer
      sx={{
        backgroundColor: background,
        overflowX: "auto",
        border: `1px solid ${divider}`,
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{ backgroundColor: `${active}20`, textTransform: "uppercase" }}
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
                    aria-label={`Sort by ${label}`}
                  >
                    <span className="text-nowrap font-semibold">{label}</span>
                  </TableSortLabel>
                ) : (
                  <span className="text-nowrap font-semibold">{label}</span>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <LoadingSpin colSpan={TableHeader.length || 0} />
          ) : sortedOrders?.length ? (
            sortedOrders.map((item, index) => (
              <TableRow
                key={item?._id || index}
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
                <TableCell align="center">{item?._id}</TableCell>
                <TableCell align="right">
                  ৳{item?.totalOrderValue?.toFixed(2) || 0}
                </TableCell>
                <TableCell align="center">
                  {item?.products?.length || 0}
                </TableCell>
                <TableCell align="center">
                  {editID === item?._id ? (
                    <SelectedForm
                      value={newStatus || item?.orderStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      options={filterList}
                    />
                  ) : (
                    item?.orderStatus || "N/A"
                  )}
                </TableCell>
                <TableCell align="center">
                  {item?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>
                <TableCell
                  align="center"
                  style={{ display: "flex", gap: 5, justifyContent: "center" }}
                >
                  {editID !== item?._id ? (
                    <ProtectedAction action={() => setEditID(item?._id)}>
                      <Button
                        sx={{
                          ...actionBTNStyle,
                          marginLeft: 1,
                          backgroundColor: `${active}20`,
                          color: active,
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </ProtectedAction>
                  ) : (
                    <Button
                      sx={{
                        ...actionBTNStyle,
                        marginLeft: 1,
                        backgroundColor: `${active}20`,
                        color: active,
                      }}
                      onClick={() =>
                        updateStatusHandler(
                          item?._id,
                          newStatus || item?.orderStatus
                        )
                      }
                    >
                      <UploadIcon />
                    </Button>
                  )}

                  <Button
                    sx={{
                      ...actionBTNStyle,
                      backgroundColor: "#2E7D3220",
                      color: "#2E7D32",
                    }}
                    onClick={() => viewOrderHandler(item?._id)}
                  >
                    <VisibilityIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <Availablity text="No orders available" />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
