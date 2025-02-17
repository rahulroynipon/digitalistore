import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./../features/user/userSlice";
import categoryReducer from "./../features/category/categorySlice";
import brandReducer from "./../features/brand/brandSlice";
import colorReducer from "./../features/color/colorSlice";
import productReducer from "./../features/product/productSlice";
import orderReducer from "./../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    brand: brandReducer,
    color: colorReducer,
    product: productReducer,
    order: orderReducer,
  },
});
