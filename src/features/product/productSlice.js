import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchBrands,
  fetchCategories,
  fetchProductById,
  fetchProductsByFilters,
} from "./productApi";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  selectedProduct: null,
  totalItems: 0,
  status: "idle",
  error: null,
};

export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response.data;
  }
);
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchFilterProducts = createAsyncThunk(
  "products/fetchFilterProducts",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    return response.data;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "products/category",
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk("products/brand", async () => {
  const response = await fetchBrands();
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchFilterProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilterProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchFilterProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = action.payload;
      })
      .addCase(fetchBrandsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
