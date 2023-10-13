import {createSlice} from "@reduxjs/toolkit";

// 創建一個名為 "cart" 的切片
const cartSlice = createSlice({
  // 切片的名稱
  name: "cart",
  // 切片的初始狀態，這裡我們將購物車初始化為一個空物件
  initialState: { cart: {} },
  // 定義購物車的操作
  reducers: {
    // 添加項目到購物車
    addtoCart: (state, action) => {
      // 如果購物車中已經有該項目，則將新的項目添加到該項目的陣列中
      if (state.cart[action.payload.title]) {
        state.cart[action.payload.title].push(action.payload);
      } else {
        // 如果購物車中沒有該項目，則創建一個新的陣列並將該項目添加到其中
        state.cart[action.payload.title] = [action.payload];
      }
    },
    // 從購物車中移除項目
    removefromCart: (state, action) => {
      // 如果購物車中有該項目，則從該項目的陣列中移除最後一個項目
      if (state.cart[action.payload.title]) {
        state.cart[action.payload.title].pop();
        // 如果該項目的陣列變為空，則從購物車中刪除該項目
        if (state.cart[action.payload.title].length === 0) {
          delete state.cart[action.payload.title];
        }
      }
    },
  },
});

export default cartSlice.reducer;
export const {addtoCart, removefromCart} = cartSlice.actions;
