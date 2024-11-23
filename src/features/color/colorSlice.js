import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { colorService } from "./colorServices";

export const addColor = createAsyncThunk(
  "color/create",
  async (color, thunkAPI) => {
    try {
      return await colorService.createColor(color);
    } catch (error) {
      console.error("color create", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getColor = createAsyncThunk("color/get", async (_, thunkAPI) => {
  try {
    return await colorService.getAllcolor();
  } catch (error) {
    console.error("color get", error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteColor = createAsyncThunk(
  "color/delete",
  async (name, thunkAPI) => {
    try {
      return await colorService.deleteColor(name);
    } catch (error) {
      console.error("color delete", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  colors: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    optimisticallyAddColor: (state, action) => {
      const tempColor = {
        ...action.payload,
        _id: nanoid(),
        createdAt: new Date().toISOString(),
      };

      const isDuplicate = state.colors.some(
        (item) =>
          item.name.trim().toLowerCase() === tempColor.name.trim().toLowerCase()
      );

      if (isDuplicate) {
        toast.error("Color already exists");
        return;
      }

      state.colors.unshift(tempColor);
    },

    optimisticallyDeleteColor: (state, action) => {
      const colorName = action.payload;
      state.colors = state.colors.filter(
        (item) =>
          item.name.trim().toLowerCase() !== colorName.trim().toLowerCase()
      );
      toast.success("Color deleted successfully");
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.colors = action.payload?.data || [];
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch colors";
      });
  },
});

export const { optimisticallyAddColor, optimisticallyDeleteColor } =
  colorSlice.actions;
export default colorSlice.reducer;
