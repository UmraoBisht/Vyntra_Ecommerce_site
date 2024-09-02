import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./shoppingCartApi";

export const addToCartAsync = createAsyncThunk(
  "/cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response;
  }
);

const initialState = {
  cartItems: [],
  totalPrice: 0,
  status: "idle",
  error: null,
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const existingItem = state.cartItems.find(
          (i) => i.id === action.payload.id
        );
        if (existingItem) {
          existingItem.quantity++;
        } else {
          state.cartItems.push({ ...action.payload, quantity: 1 });
        }
        state.totalPrice += action.payload.price;
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default shoppingCartSlice.reducer;
