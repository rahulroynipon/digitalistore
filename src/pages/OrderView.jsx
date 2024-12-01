import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { viewOrder } from "../features/order/orderSlice";
import useThemeColors from "../components/Global/themeColors";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import {
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function OrderView() {
  const { background, border, text, active } = useThemeColors();
  const dispatch = useDispatch();
  const { isLoading, orders } = useSelector((state) => state.order);
  const { id } = useParams();

  useEffect(() => {
    dispatch(viewOrder(id));
  }, [id, dispatch]);

  const order = orders?.[0] || null;

  if (isLoading) {
    return (
      <section className="flex items-center justify-center  h-[80vh]">
        <CircularProgress sx={{ color: active }} />
      </section>
    );
  }

  if (!order) {
    return (
      <div className="px-5 flex flex-col items-center justify-center mt-36">
        <ProductionQuantityLimitsIcon
          sx={{ fontSize: "9rem", color: `${text}80` }}
        />

        <p style={{ color: active }} className="text-3xl mt-3">
          <strong>No Order Found</strong>
        </p>
        <p style={{ color: `${text}80` }} className="text-center mt-2">
          <span>Your search did not match any order.</span> <br />
          <span>Please try again</span>
        </p>
      </div>
    );
  }

  return (
    <section
      style={{ maxWidth: "93vw" }}
      className="m-3 mt-5 md:m-5 overflow-auto"
    >
      {/* Order Summary */}
      <div
        style={{
          backgroundColor: background,
          border: `1px solid ${border}20`,
        }}
        className="p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p>
              <strong className="opacity-75">Order ID:</strong>{" "}
              <span>{order._id}</span>
            </p>
            <p>
              <strong className="opacity-75">Order By:</strong>{" "}
              <span>{order.orderby?.fullname}</span>
            </p>
            <p>
              <strong className="opacity-75">Email:</strong>{" "}
              <span>{order.orderby?.email}</span>
            </p>
          </div>
          <div>
            <p>
              <strong className="opacity-75">Total Amount:</strong> ৳
              {order.totalOrderValue?.toFixed(2)}
            </p>
            <p>
              <strong className="opacity-75">Status:</strong>
              <span
                className={`capitalize px-2 py-1 ml-1 rounded-full text-sm bg-yellow-100 text-yellow-700`}
              >
                {order.orderStatus}
              </span>
            </p>
            <p>
              <strong className="opacity-75"> Order Date:</strong>
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Products in Order */}
      <div
        style={{
          backgroundColor: background,
          border: `1px solid ${border}20`,
        }}
        className="p-6  mt-4 shadow-sm"
      >
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        {order.products && order.products.length > 0 ? (
          <TableContainer
            sx={{
              overflowX: "auto",
              overflowY: "hidden",
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Image</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell align="center">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.products.map((item, index) => {
                  const originalPrice = item.product?.price || 0;
                  const discount =
                    (originalPrice * (item.product?.discount || 0)) / 100;
                  const finalPrice = originalPrice - discount;
                  const totalPrice = finalPrice * (item?.count || 0);

                  return (
                    <TableRow key={item.product?._id || index}>
                      <TableCell>
                        <img
                          className="h-28 min-w-36 object-contain bg-white"
                          src={item.product?.images?.[0]}
                          alt="Product"
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: "25rem" }}>
                        <Link to={`/products/view/${item.product?._id}`}>
                          <strong>{item.product?.title}</strong>
                        </Link>
                        <p className="capitalize">
                          Color: {item?.color || "N/A"}
                        </p>
                      </TableCell>
                      <TableCell align="center">
                        ৳{finalPrice.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">{item?.count}</TableCell>
                      <TableCell align="center">
                        ৳{totalPrice.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No products found in this order.</p>
        )}
      </div>
    </section>
  );
}
