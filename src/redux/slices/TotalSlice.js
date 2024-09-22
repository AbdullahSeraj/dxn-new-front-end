import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
};

export const TotalSlice = createSlice({
  name: "Total",
  initialState,
  reducers: {
    updateTotalPrice: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { updateTotalPrice } = TotalSlice.actions;
export default TotalSlice.reducer;
