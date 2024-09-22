import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shuffle: false,
};

export const SettingsSlice = createSlice({
  name: "Settings",
  initialState,
  reducers: {
    updateSettings: (state, action) => {
      state.shuffle = action.payload;
    },
  },
});

export const { updateTotalPrice } = SettingsSlice.actions;
export default SettingsSlice.reducer;
