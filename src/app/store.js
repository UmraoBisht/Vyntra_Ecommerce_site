import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";
import shoppingCartReducer from "../features/shopingCart/shoppingCartSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: shoppingCartReducer,
    order: orderReducer,
  },
});
