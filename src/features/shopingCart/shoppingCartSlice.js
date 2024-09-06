import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartByUserId,
  removeCartItem,
  updateCart,
  resetCart,
} from "./shoppingCartApi";

export const addToCartAsync = createAsyncThunk(
  "/cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response;
  }
);

export const fetchCartByUserIdAsync = createAsyncThunk(
  "/cart/fetchCartByUserId",
  async (userId) => {
    const response = await fetchCartByUserId(userId);
    return response;
  }
);

export const updateCartAsync = createAsyncThunk(
  "/cart/updateCart",
  async (item) => {
    const response = await updateCart(item);
    return response;
  }
);
export const removeCartItemAsync = createAsyncThunk(
  "/cart/removeCartItem",
  async (itemId) => {
    const response = await removeCartItem(itemId);
    return response;
  }
);
export const resetCartAsync = createAsyncThunk(
  "/cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response;
  }
);

const initialState = {
  cartItems: [],
  status: "idle",
  error: null,
};

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        // add item to cart
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        // fetch cart by user id
        state.status = "loading";
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = action.payload;
      })
      .addCase(fetchCartByUserIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(updateCartAsync.pending, (state) => {
        // update cart item
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cartItems[index] = action.payload;
      })
      .addCase(updateCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(removeCartItemAsync.pending, (state) => {
        // remove cart item
        state.status = "loading";
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        state.cartItems.splice(index, 1);
      })
      .addCase(removeCartItemAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(resetCartAsync.pending, (state) => {
        //reset cart
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cartItems = [];
      })
      .addCase(resetCartAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export default shoppingCartSlice.reducer;
