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
  async (id, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(id);
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
        (cat) => cat.name.toLowerCase() === tempCategory.name.toLowerCase()
      );

      if (!isDuplicate) {
        state.categories = [tempCategory, ...state.categories];
      } else {
        state.message = "Category already exists";
        toast.error(state.message);
      }

      console.log(state.categories);
    },

    optimisticallyDeleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (item) => item._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // getCategory
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
      })

      // addCategory
      .addCase(addCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("New category added successfully");
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to add category";
      })

      // deleteCategory
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Delete category successfully");
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to delete category";
      });
  },
});

export const { optimisticallyAddCategory, optimisticallyDeleteCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
