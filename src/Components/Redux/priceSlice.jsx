import {createSlice} from "@reduxjs/toolkit";

const priceSlice = createSlice({
    name: "price",
    initialState: { total: 0 },
    reducers: {
      addPrice: (state, action) => {
        //action.payload.price是指addPrice({price})中的price
        state.total += Number.parseFloat(action.payload.price);
      },
      subtractPrice: (state, action) => {
        state.total -= Number.parseFloat(action.payload.price);
      },
      clearTotal: (state) => {
        state.total = 0;
      },
    },
  });

  export default priceSlice.reducer;
export const {addPrice, subtractPrice, clearTotal} = priceSlice.actions;