import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "./orderServices";
import { toast } from "sonner";

export const getOrder = createAsyncThunk("order/get", async (_, thunkAPI) => {
  try {
    return await orderService.getAllorder();
  } catch (error) {
    console.error("Order get", error);
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  orders: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    optimisticallyUpdateStatus: (state, action) => {
      const { id, status } = action.payload;

      if (!state.orders || state.orders.length === 0) {
        toast.error("No orders found in state.");
        return;
      }
      const orderIndex = state.orders.findIndex((order) => order._id === id);

      if (orderIndex === -1) {
        toast.error(`Order with ID ${id} not found.`);
        return;
      }

      if (state.orders[orderIndex].orderStatus !== status) {
        state.orders[orderIndex].orderStatus = status;
        toast.success("Order status updated successfully");
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload?.data || [];
        state.isError = false;
        state.message = action.payload?.message || "";
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.orders = [];
        state.message = action.payload || "";
      });
  },
});

export const { optimisticallyUpdateStatus } = orderSlice.actions;
export default orderSlice.reducer;
