import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser } from "./authApi";

export const createUserAsync = createAsyncThunk(
  "/auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const checkUserAsync = createAsyncThunk(
  "/auth/checkUser",
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    return response.data;
  }
);

const initialState = {
  loggedInUser: null,
  status: "idel",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;
