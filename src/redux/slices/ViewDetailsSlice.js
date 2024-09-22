import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isLoading: false,
  isError: false,
  error: "",
  data: {},
};

export const ViewDateilsSlice = createSlice({
  name: "view-dateils",
  initialState,
  reducers: {
    handleOpenViewDateils: (state, action) => {
      state.isOpen = true;
      state.isLoading = true;
      if (action.payload.isError) {
        state.data = {};
        state.error = action.payload.error;
      } else {
        state.error = "";
        state.data = action.payload.data;
      }
      state.isLoading = false;
    },
    handleCloseViewDateils: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { handleOpenViewDateils, handleCloseViewDateils } =
  ViewDateilsSlice.actions;
export default ViewDateilsSlice.reducer;
