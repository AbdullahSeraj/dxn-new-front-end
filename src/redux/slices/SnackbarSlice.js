import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "Error Server",
  condition: "success",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    handleClickTrue: (state, action) => {
      state.message = action.payload.message;
      state.condition = action.payload.condition;
      state.open = true;
    },
    handleClickFalse: (state) => {
      state.open = false;
    },
    changeMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { handleClickTrue, handleClickFalse } = counterSlice.actions;
export default counterSlice.reducer;
