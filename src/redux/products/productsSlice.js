import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductsByApi } from "./productsApi";

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProductsByApi();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
  filteredProducts: [],
  statusAllProducts: "idle",
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    //   filterByCategory: (state, action) => {
    //     const { category } = action.payload;
    //     if (category === "todos") {
    //       state.filteredProducts = state.products;
    //     } else {
    //       state.filteredProducts = state.products.filter(
    //         (product) => product.category === category
    //       );
    //     }
    //   },
    // },
    filterByCategory: (state, action) => {
      const { categories } = action.payload;
      if (categories.includes("todos")) {
        state.filteredProducts = state.products;
      } else {
        state.filteredProducts = state.products.filter((product) =>
          categories.includes(product.category)
        );
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, actions) => {
      state.products = actions.payload;
      state.filteredProducts = actions.payload;
      state.statusAllProducts = "success";
    });
    builder.addCase(getAllProducts.pending, (state, actions) => {
      state.statusAllProducts = "pending";
    });
    builder.addCase(getAllProducts.rejected, (state, actions) => {
      state.statusAllProducts = "reject";
    });
  },
});
export const { filterByCategory } = productsSlice.actions;

export default productsSlice.reducer;
