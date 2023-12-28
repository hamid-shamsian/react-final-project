import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  _id: string;
  qty: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    processItem: (state: CartItem[], action: { type: string; payload: CartItem }) => {
      const addedToCart: CartItem | undefined = state.find((p: CartItem) => p._id === action.payload._id);

      if (!addedToCart) state.push(action.payload);
      else if (addedToCart.qty === action.payload.qty) state.splice(state.indexOf(addedToCart), 1);
      else addedToCart.qty = action.payload.qty;
    },
    removeItemById: (state: CartItem[], action: { type: string; payload: string }) => {
      const index = state.findIndex(item => item._id === action.payload);
      state.splice(index, 1);
    },
    clearCart: _ => []
  }
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;
