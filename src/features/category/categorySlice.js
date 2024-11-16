import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryService } from "./categoryServices";
import { nanoid } from "nanoid";
import { toast } from "sonner";

export const addCategory = createAsyncThunk(
  "category/create",
  async (category, thunkAPI) => {
    try {
      return await categoryService.createCategory(category);
    } catch (error) {
      console.error("category create", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCategory = createAsyncThunk(
  "category/get",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getAllCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (name, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(name);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    optimisticallyAddCategory: (state, action) => {
      const tempCategory = {
        ...action.payload,
        _id: nanoid(),
        count: 0,
        createdAt: new Date().toISOString(),
      };

      const isDuplicate = state.categories.some(
        (cat) =>
          cat.name.trim().toLowerCase() ===
          tempCategory.name.trim().toLowerCase()
      );

      if (isDuplicate) {
        toast.error("Category already exists");
        return;
      }

      state.categories.unshift(tempCategory);

      toast.success("Category added successfully");
    },

    optimisticallyDeleteCategory: (state, action) => {
      const categoryName = action.payload;
      state.categories = state.categories.filter(
        (cat) =>
          cat.name.trim().toLowerCase() !== categoryName.trim().toLowerCase()
      );
      toast.success("Category deleted successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.categories = action.payload?.data || [];
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch categories";
      });
  },
});

export const { optimisticallyAddCategory, optimisticallyDeleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
