import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "./orderApi";

export const createOrderAsync = createAsyncThunk(
  "/orders/createOrder",
  async (orderData) => {
    const response = await createOrder(orderData);
    console.log(response);

    return response;
  }
);

const initialState = {
  orders: [],
  currentOrder: null,
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = [];
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
