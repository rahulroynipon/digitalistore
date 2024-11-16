import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { brandService } from "./brandServices";

export const addBrand = createAsyncThunk(
  "brand/create",
  async (brand, thunkAPI) => {
    try {
      return await brandService.createBrand(brand);
    } catch (error) {
      console.error("brand create", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  }
);

export const getBrand = createAsyncThunk("brand/get", async (_, thunkAPI) => {
  try {
    return await brandService.getAllBrand();
  } catch (error) {
    console.error("brand get", error);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || error.message || "An error occurred"
    );
  }
});

export const deleteBrand = createAsyncThunk(
  "brand/delete",
  async (name, thunkAPI) => {
    try {
      return await brandService.deleteBrand(name);
    } catch (error) {
      console.error("brand delete", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "An error occurred"
      );
    }
  }
);

const initialState = {
  brands: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    optimisticallyAddBrand: (state, action) => {
      const tempBrand = {
        ...action.payload,
        _id: nanoid(),
        count: 0,
        createdAt: new Date().toISOString(),
      };

      const isDuplicate = state.brands.some(
        (brand) =>
          brand.name.trim().toLowerCase() ===
          tempBrand.name.trim().toLowerCase()
      );

      if (isDuplicate) {
        toast.error("Brand already exists");
        return;
      }

      state.brands.unshift(tempBrand);

      toast.success("Brand added successfully");
    },

    optimisticallyDeleteBrand: (state, action) => {
      const brandName = action.payload;
      state.brands = state.brands.filter(
        (brand) =>
          brand.name.trim().toLowerCase() !== brandName.trim().toLowerCase()
      );
      toast.success("Brand deleted successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload?.data || [];
      })
      .addCase(getBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch brands";
      });
  },
});

export const { optimisticallyAddBrand, optimisticallyDeleteBrand } =
  brandSlice.actions;

export default brandSlice.reducer;
