import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabIndex: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setTabIndex: (state, { payload }) => {
      state.tabIndex = payload;
    },
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
  extraReducers: {},
});

export const { setTabIndex, reset } = orderSlice.actions;

export default orderSlice.reducer;
