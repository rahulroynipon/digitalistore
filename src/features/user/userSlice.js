import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./userServices";
import { toast } from "sonner";

export const googleSignUp = createAsyncThunk(
  "auth/google",
  async (token, thunkAPI) => {
    try {
      return await authService.googleAuth(token);
    } catch (error) {
      console.error("google auth", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  isAuth: false,
  user: null,
  actionStore: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    addAction: (state, action) => {
      state.actionStore = action.payload;
    },

    performAction: (state) => {
      state.actionStore();
      state.actionStore = null;
    },
    clearAction: (state) => {
      state.actionStore = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleSignUp.pending, (state) => {
        state.isAuth = false;
        state.user = null;
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(googleSignUp.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload?.data || null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message || "";
        if (state.isSuccess) {
          toast.success(state.message);
        }
      })
      .addCase(googleSignUp.rejected, (state, action) => {
        state.isAuth = false;
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "";
      });
  },
});

export const { addAction, performAction, clearAction } = authSlice.actions;
export default authSlice.reducer;
