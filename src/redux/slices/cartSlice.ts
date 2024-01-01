import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export type CartItem = {
  id: string;
  name: string;
  imageUrl: string;
  types: number[];
  sizes: number[];
  price: number;
  activeSize: number;
  activeType: number;
  count: number;
};

export interface CartSliceState {
  cartItems: CartItem[];
}

const initialState: CartSliceState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      const item = state.cartItems.find(
        (obj) =>
          obj.name === action.payload.name &&
          obj.activeSize === action.payload.activeSize &&
          obj.activeType === action.payload.activeType
      );
      if (item) {
        item.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1, id: small_id });
      }
    },
    removeCartItems: (state, action: PayloadAction<CartItem>) => {
      state.cartItems = state.cartItems.filter(
        (obj) =>
          obj.name !== action.payload.name ||
          obj.activeSize !== action.payload.activeSize ||
          obj.activeType !== action.payload.activeType
      );
    },

    plusPiece: (state, action: PayloadAction<CartItem>) => {
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      const item = state.cartItems.find(
        (obj) =>
          obj.name === action.payload.name &&
          obj.activeSize === action.payload.activeSize &&
          obj.activeType === action.payload.activeType
      );
      if (item) {
        item.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1, id: small_id });
      }
    },

    minusPiece: (state, action: PayloadAction<CartItem>) => {
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      const item = state.cartItems.find(
        (obj) =>
          obj.name === action.payload.name &&
          obj.activeSize === action.payload.activeSize &&
          obj.activeType === action.payload.activeType
      );
      if (item) {
        item.count > 1 && item.count--;
      } else {
        state.cartItems.push({ ...action.payload, count: 1, id: small_id });
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { removeCartItems, plusPiece, minusPiece, clearCart, addItem } =
  cartSlice.actions;

export default cartSlice.reducer;
