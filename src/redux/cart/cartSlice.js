// import { createSlice } from "@reduxjs/toolkit";

// // Estado inicial del carrito
// const initialState = {
//   items: [], // Array de productos en el carrito
// };

// // Crear slice de carrito
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const product = action.payload;
//       const existingItem = state.items.find((item) => item.id === product.id);

//       if (existingItem) {
//         existingItem.quantity += 1; // Si ya está en el carrito, aumenta la cantidad
//       } else {
//         state.items.push({ ...product, quantity: 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload);
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// // Exportamos las acciones
// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// // Exportamos el reducer para usarlo en el store
// export default cartSlice.reducer;
// features/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk para obtener el carrito del usuario
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const response = await axios.get(`/api/Cart?userId=${userId}`);
  return response.data;
});

// Async thunk para agregar un producto al carrito
// export const addToCart = createAsyncThunk(
//   "cart/addToCart",
//   async ({ userId, productId, quantity }) => {
//     const response = await axios.post("/api/Cart", {
//       userId: parseInt(userId, 10),
//       productId: parseInt(productId, 10),
//       quantity: parseInt(quantity, 10) || 1, // Asegurar que quantity sea un número válido
//     });
//     return response.data;
//   }
// );
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post("/api/Cart", {
      userId: parseInt(userId), // Asegúrate de que sea un número
      productId: parseInt(productId), // Asegúrate de que sea un número
      quantity: parseInt(quantity), // Asegúrate de que sea un número
    });
    return response.data;
  }
);
// Async thunk para eliminar un producto del carrito
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `/api/Cart?userId=${userId}&productId=${productId}`
    );
    return response.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const updatedItems = action.payload; // La API devuelve una lista de productos
        state.items = updatedItems; // Reemplazamos el carrito completo
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const removedProductId = action.payload.productId;
        state.items = state.items.filter(
          (item) => item.id !== removedProductId
        );
      });
  },
});

export default cartSlice.reducer;
