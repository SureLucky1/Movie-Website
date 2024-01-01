import {createSlice} from "@reduxjs/toolkit";

const priceSlice = createSlice({
    name: "price",
    initialState: { total: 0,
    cart:[] },
    reducers: {
      addPrice: (state , action) => {

let search = state.cart.find(item => item.title === action.payload.title)
       if (!search) {
        state.cart.push(action.payload);
        // action.payload.price是指addPrice({price})中的price
        state.total += Number.parseFloat(action.payload.price);
      }else{
      alert("The same product has been in your shopping cart.")
      }
      },
      subtractPrice: (state, action) => {
        state.total -= Number.parseFloat(action.payload.price);
      },
      clearTotal: (state) => {
        state.total = 0;
        state.cart = [];
      },
    },
  });

  export default priceSlice.reducer;
export const {addPrice, subtractPrice, clearTotal} = priceSlice.actions;

// import { createSlice } from "@reduxjs/toolkit";

// const priceSlice = createSlice({
//   name: "price",
//   initialState: { total: 0, cart: [] },
//   reducers: {
//     addPrice: (state, action) => {
//       // 檢查產品是否已經在購物車中
//       let existingProduct = state.cart.find(item => item.title === action.payload.title);
//       if (!existingProduct) {
//         // 如果產品不在購物車中，則添加到購物車並更新總額
//         state.cart.push(action.payload);
//         state.total += Number.parseFloat(action.payload.price);
//       }else{
//         alert("The same product has been in your shopping cart.")
//       }
//     },
//     subtractPrice: (state, action) => {
//       let existingProduct = state.cart.find(item => item.title === action.payload.title);
//       if (existingProduct) {
//         // 如果產品在購物車中，則從購物車中移除並更新總額
//         state.cart = state.cart.filter(item => item.title !== action.payload.title);
//         state.total -= Number.parseFloat(action.payload.price);
//       }
//     },
//     clearTotal: (state) => {
//       state.total = 0;
//       state.cart = [];
//     },
//   },
// });

// export default priceSlice.reducer;
// export const { addPrice, subtractPrice, clearTotal } = priceSlice.actions;
