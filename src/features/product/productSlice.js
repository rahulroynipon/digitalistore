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

export const viewProduct = createAsyncThunk(
  "product/view",
  async (id, thunkAPI) => {
    try {
      return await productService.getProductByID(id);
    } catch (error) {
      console.error("product view", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  viewProductId: "",
  totalProduct: 0,
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

      state.totalProduct -= 1;

      toast.success("Product deleted successfully");
    },

    addProductId: (state, action) => {
      state.viewProductId = action.payload;
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
        state.totalProduct = action.payload?.pagination?.totalProducts || 0;
        state.isError = false;
        state.message = action.payload?.message || "";
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "";
      })
      .addCase(viewProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(viewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload?.data || [];
        state.isError = false;
        state.message = action.payload?.message || "";
      })
      .addCase(viewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "";
      });
  },
});

export const { optimisticallyDeleteProduct, addProductId } =
  productSlice.actions;
export default productSlice.reducer;
