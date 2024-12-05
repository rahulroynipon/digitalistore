import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./userServices";
import { toast } from "sonner";
import { saveToken, getTokens, clearToken } from "./../../context/Token";

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

export const userAuth = createAsyncThunk("auth/user", async (_, thunkAPI) => {
  try {
    return await authService.getUserAuth();
  } catch (error) {
    console.error("user auth", error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const logoutAuth = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      return await authService.logoutUser();
    } catch (error) {
      console.error("Logout auth", error);
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
    logoutAction: (state) => {
      state.isAuth = false;
      state.user = null;
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
        const { message, data } = action?.payload;
        state.isAuth = true;
        state.user = data || null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = message || "";

        saveToken(data?.accessToken, data?.refreshToken);
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
      })
      .addCase(userAuth.pending, (state) => {
        state.isAuth = false;
        state.user = null;
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(userAuth.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload?.data || null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message || "";
      })
      .addCase(userAuth.rejected, (state, action) => {
        state.isAuth = false;
        state.user = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "";
      })
      .addCase(logoutAuth.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "";
      })
      .addCase(logoutAuth.fulfilled, (state, action) => {
        state.isAuth = false;
        state.user = null;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload?.message || "";
        clearToken();
        if (state.isSuccess) {
          toast.success(state.message);
        }
      })
      .addCase(logoutAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "";
      });
  },
});

export const { logoutAction } = authSlice.actions;
export default authSlice.reducer;
