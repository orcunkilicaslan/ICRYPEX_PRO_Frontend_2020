import { createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";

const initialState = {};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    mergeData: {
      reducer: (state, { payload }) => {
        merge(state, payload);
      },
    },
    reset: state => {
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    },
  },
});

export const { mergeData, reset } = socketSlice.actions;

export default socketSlice.reducer;
