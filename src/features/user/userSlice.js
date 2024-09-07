import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserOrders } from "./userApi";

export const fetchUserOrdersAsync = createAsyncThunk(
  "/user/fetchUserOrders",
  async (userId) => {
    const response = await fetchUserOrders(userId);
    return response;
  }
);

const initialState = {
  userOrders: [],
  status: "idle",
  error: null,
};

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrdersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userOrdersSlice.reducer;
