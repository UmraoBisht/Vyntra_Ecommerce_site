import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserOrders } from "./userApi";

const fetchUserOrdersAsync = createAsyncThunk(
  "/user/fetchUserOrders",
  async (userId) => {
    const response = await fetchUserOrders(userId);
    return response;
  }
);

const initialState = {
  userInfo: [],
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
        state.userInfo = action.payload;
      })
      .addCase(fetchUserOrdersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userOrdersSlice.reducer;
