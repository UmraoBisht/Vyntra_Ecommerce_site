import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoggedInUserInfo, fetchUserOrders, updateUser } from "./userApi";

export const fetchUserOrdersAsync = createAsyncThunk(
  "/user/fetchUserOrders",
  async (userId) => {
    const response = await fetchUserOrders(userId);
    return response;
  }
);

export const fetchLoggedInUserInfoAsync = createAsyncThunk(
  "/user/fetchLoggedInUserInfo",
  async (userId) => {
    const response = await fetchLoggedInUserInfo(userId);
    return response;
  }
);

export const updateUserAsync = createAsyncThunk(
  "/auth/updateUser",
  async (userData) => {
    const response = await updateUser(userData);
    return response;
  }
);


const initialState = {
  userOrders: [],
  userInfo: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
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
      })
      .addCase(fetchLoggedInUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserInfoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export default userSlice.reducer;
