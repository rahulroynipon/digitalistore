import { useDispatch, useSelector } from "react-redux";
import useThemeColors from "../components/Global/themeColors";
import OrderTable from "../components/Order/OrderTable";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { getOrder } from "../features/order/orderSlice";
import SelectedForm from "../components/Global/SelectedForm";

export default function OrderList() {
  const { background, field, border, text } = useThemeColors();
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortedOrders, setSortedOrders] = useState([]);

  const filterList = [
    { _id: "Order Placed", name: "Order Placed" },
    { _id: "Processing", name: "Processing" },
    { _id: "Shipped", name: "Shipped" },
    { _id: "Delivered", name: "Delivered" },
    { _id: "Cancelled", name: "Cancelled" },
    { _id: "Returned", name: "Returned" },
  ];

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <section
      style={{
        color: text,
      }}
      className="m-3 mt-5 md:m-5 overflow-auto max-w-[93vw] lg:max-w-[68.5vw] xl:max-w-[77vw] 2xl:max-w-[100vw]"
    >
      <div
        style={{
          color: text,
          backgroundColor: background,
        }}
        className="flex justify-between p-6 flex-wrap gap-3"
      >
        <h1 className="text-xl font-bold">
          Order List ({sortedOrders?.length || 0})
        </h1>

        <div>
          <SelectedForm
            label="All"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            options={filterList}
          />
        </div>
      </div>

      <OrderTable
        filter={selectedFilter}
        sortedOrders={sortedOrders}
        setSortedOrders={setSortedOrders}
      />
    </section>
  );
}
