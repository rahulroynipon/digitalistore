import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "./productServices";
import { toast } from "sonner";

export const addProduct = createAsyncThunk(
  "product/create",
  async (product, thunkAPI) => {
    try {
      return await productService.createProduct(product);
    } catch (error) {
      console.error("product create", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/get",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProduct();
    } catch (error) {
      console.error("product get", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      console.error("product delete", error);
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
  reducers: {
    optimisticallyDeleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product?._id !== action.payload
      );

      toast.success("Product deleted successfully");
    },
  },
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
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload?.data || [];
        state.isError = false;
        state.message = action.payload?.message || "";
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "";
      });
  },
});

export const { optimisticallyDeleteProduct } = productSlice.actions;
export default productSlice.reducer;
