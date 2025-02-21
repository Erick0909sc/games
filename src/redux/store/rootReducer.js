import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "../products/productsSlice";
import cartReducer from "@/redux/cart/cartSlice"; // 👈 Importamos el carrito

export const rootReducer = combineReducers({
  products: productsSlice,
  cart: cartReducer,
});
