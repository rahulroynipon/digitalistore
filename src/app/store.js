import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../features/user/userSlice";
import categoryReducer from "./../features/category/categorySlice";
import brandReducer from "./../features/brand/brandSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    brand: brandReducer,
  },
});
