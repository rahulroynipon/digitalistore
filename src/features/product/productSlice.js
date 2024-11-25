import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "./productServices";
import { toast } from "sonner";

export const addProduct = createAsyncThunk(
  "product/create",
  async (product, thunkAPI) => {
    try {
      return await productService.createProduct(product);
    } catch (error) {
      console.log("product create", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message || "";
        if (state.isSuccess) {
          toast.success(state.message);
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "";

        if (state.isError) {
          toast.error(state.message);
        }
      });
  },
});

export default productSlice.reducer;
