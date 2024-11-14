import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../features/user/userSlice";
import categoryReducer from "./../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});
