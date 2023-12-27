import { createSlice } from "@reduxjs/toolkit";

export interface CartItem {
  pId: string;
  qty: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    processItem: (state: CartItem[], action: { type: string; payload: CartItem }) => {
      const addedToCart: CartItem | undefined = state.find((p: CartItem) => p.pId === action.payload.pId);

      if (!addedToCart) state.push(action.payload);
      else if (addedToCart.qty === action.payload.qty) state.splice(state.indexOf(addedToCart), 1);
      else addedToCart.qty = action.payload.qty;
    }
  }
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;
